import { Box, Heading, Text, Image, List, ListItem } from '@chakra-ui/react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { PortableText } from '@/components/PortableText';

export async function generateMetadata({ params }) {
  const query = groq`
    *[_type == "recipe" && slug.current == $slug][0]{
      title,
      seo {
        titleTag,
        metaDescription,
        keywords,
        openGraphImage {
          asset->{
            url
          }
        }
      }
    }
  `;
  const recipe = await client.fetch(query, { slug: params.slug });
  if (!recipe) return { title: "Not Found" };

  return {
    title: recipe.seo?.titleTag || `${recipe.title} | Mahasroom Recipes`,
    description: recipe.seo?.metaDescription || `Check out the recipe: ${recipe.title}`,
    keywords: recipe.seo?.keywords ? recipe.seo.keywords.join(', ') : undefined,
    openGraph: {
      images: recipe.seo?.openGraphImage?.asset?.url ? [recipe.seo.openGraphImage.asset.url] : [],
    },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = params;
  const query = groq`
    *[_type == "recipe" && slug.current == $slug][0]{
      title,
      ingredients,
      instructions,
      image{
        asset->{
          url
        },
        alt
      },
      relatedProducts[]->{
        name,
        slug
      }
    }
  `;
  const recipe = await client.fetch(query, { slug });

  if (!recipe) {
    return (
      <Box width="100%" px={0} py={4}>
        <Text>Recipe not found.</Text>
      </Box>
    );
  }
  return (
    <Box width="100%" px={0} py={4}>
      <Heading as="h1" mb={4} textAlign="center">
        {recipe.title}
      </Heading>
      {recipe.image?.asset?.url && (
        <Image
          src={recipe.image.asset.url}
          alt={recipe.image.alt || 'Recipe Image'}
          mb={4}
          width="100%"
          objectFit="cover"
        />
      )}

      {recipe.ingredients?.length > 0 && (
        <>
          <Heading as="h2" size="lg" mb={2} px={10}>Ingredients</Heading>
          <List.Root spacing={2} mb={4} px={10}>
            {recipe.ingredients.map((item, idx) => (
              <List.Item key={idx}>{item}</List.Item>
            ))}
          </List.Root>
        </>
      )}
      {recipe.instructions && (
        <>
          <Heading as="h2" size="lg" mb={2} px={10}>Instructions</Heading>
          <Box fontSize="lg" mb={4} px={10}>
            <PortableText value={recipe.instructions} />
          </Box>
        </>
      )}

    </Box>
  );
}
