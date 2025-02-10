import { Box, Grid, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export default async function RecipeIndexPage() {
  const query = groq`
    *[_type == "recipe"]{
      _id,
      title,
      slug,
      image{
        asset->{
          url
        },
        alt
      }
    } | order(_createdAt desc)
  `;
  const recipes = await client.fetch(query);

  return (
    <Box width="100%" px={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <Box key={recipe._id} border="1px solid" borderColor="gray.200">
              <Link href={`/recipes/${recipe.slug.current}`}>
                {recipe.image?.asset?.url ? (
                  <img
                    src={recipe.image.asset.url}
                    alt={recipe.image.alt || recipe.title}
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                ) : (
                  <Box height="250px" bg="black" />
                )}
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {recipe.title}
                  </Text>
                </Box>
              </Link>
            </Box>
          ))
        ) : (
          <Text>No recipes found.</Text>
        )}
      </Grid>
    </Box>
  );
}
