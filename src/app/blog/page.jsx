import { Box, Grid, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export default async function BlogIndexPage() {
  const query = groq`
    *[_type == "post"]{
      _id,
      title,
      slug,
      mainImage{
        asset->{
          url
        },
        alt
      }
    } | order(_createdAt desc)
  `;
  const posts = await client.fetch(query);

  return (
    <Box width="100%" px={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Box key={post._id} border="1px solid" borderColor="gray.200">
              <Link href={`/blog/${post.slug.current}`}>
                {post.mainImage?.asset?.url ? (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || 'Blog post image'}
                    width="100%"
                    height="250px"
                    objectFit="cover"
                  />
                ) : (
                  <Box height="250px" bg="black" />
                )}
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {post.title}
                  </Text>
                </Box>
              </Link>
            </Box>
          ))
        ) : (
          <Text>No posts found.</Text>
        )}
      </Grid>
    </Box>
  );
}
