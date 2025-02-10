import { Box, Grid, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export default async function ProductsPage() {
  const query = groq`
    *[_type == "product"]{
      _id,
      name,
      slug,
      image{
        asset->{
          url
        }
      }
    } | order(_createdAt desc)
  `;
  const products = await client.fetch(query);

  return (
    <Box width="100%" px={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {products?.length > 0 ? (
          products.map((prod) => (
            <Box key={prod._id} border="1px solid" borderColor="gray.200">
              <Link href={`/products/${prod.slug.current}`}>
                {prod.image?.asset?.url ? (
                  <Box>
                    <img
                      src={prod.image.asset.url}
                      alt={prod.name}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                  </Box>
                ) : (
                  <Box height="250px" bg="black" />
                )}
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {prod.name}
                  </Text>
                </Box>
              </Link>
            </Box>
          ))
        ) : (
          <Text>No products found.</Text>
        )}
      </Grid>
    </Box>
  );
}
