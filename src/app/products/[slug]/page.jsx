import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { PortableText } from '@/components/PortableText';

export async function generateMetadata({ params }) {
  const query = groq`
    *[_type == "product" && slug.current == $slug][0]{
      name,
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
  const product = await client.fetch(query, { slug: params.slug });
  if (!product) return { title: "Not Found" };

  return {
    title: product.seo?.titleTag || `${product.name} | Mahasroom Products`,
    description: product.seo?.metaDescription || `Learn more about ${product.name}`,
    keywords: product.seo?.keywords ? product.seo.keywords.join(', ') : undefined,
    openGraph: {
      images: product.seo?.openGraphImage?.asset?.url ? [product.seo.openGraphImage.asset.url] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const query = groq`
    *[_type == "product" && slug.current == $slug][0]{
      name,
      description,
      price,
      image{
        asset->{
          url
        }
      }
    }
  `;
  const product = await client.fetch(query, { slug });

  if (!product) {
    return (
      <Box width="100%" px={0} py={4}>
        <Text>Product not found.</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" px={0} py={4}>
      <Heading as="h1" textAlign="center" mb={4}>
        {product.name}
      </Heading>
      {product.image?.asset?.url && (
        <Image
          src={product.image.asset.url}
          alt={product.name}
          mb={4}
          width="100%"
          objectFit="cover"
        />
      )}
      {product.price !== undefined && (
        <Text fontSize="lg" mb={4} px={10}>
          Price: Rp. {product.price}
        </Text>
      )}
      <Box fontSize="lg" px={10}>
        <PortableText value={product.description} />
      </Box>
    </Box>
  );
}
