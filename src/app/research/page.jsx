import { Box, Grid, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export default async function ResearchIndexPage() {
  const query = groq`
    *[_type == "researchArticle"]{
      _id,
      title,
      slug
    } | order(_createdAt desc)
  `;
  const articles = await client.fetch(query);

  return (
    <Box width="100%" px={10}>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {articles?.length > 0 ? (
          articles.map((article) => (
            <Box key={article._id} border="1px solid" borderColor="gray.200">
              <Link href={`/research/${article.slug.current}`}>
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {article.title}
                  </Text>
                </Box>
              </Link>
            </Box>
          ))
        ) : (
          <Text>No research articles found.</Text>
        )}
      </Grid>
    </Box>
  );
}
