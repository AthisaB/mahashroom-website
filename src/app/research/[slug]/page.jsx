import { Box, Heading, Text } from '@chakra-ui/react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { PortableText } from '@/components/PortableText';

export async function generateMetadata({ params }) {
  const query = groq`
    *[_type == "researchArticle" && slug.current == $slug][0]{
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
  const article = await client.fetch(query, { slug: params.slug });
  if (!article) return { title: "Not Found" };

  return {
    title: article.seo?.titleTag || `${article.title} | Mahasroom Research`,
    description: article.seo?.metaDescription || `Read the research article: ${article.title}`,
    keywords: article.seo?.keywords ? article.seo.keywords.join(', ') : undefined,
    openGraph: {
      images: article.seo?.openGraphImage?.asset?.url ? [article.seo.openGraphImage.asset.url] : [],
    },
  };
}

export default async function ResearchArticlePage({ params }) {
  const { slug } = params;
  const query = groq`
    *[_type == "researchArticle" && slug.current == $slug][0]{
      title,
      body
    }
  `;
  const article = await client.fetch(query, { slug });

  if (!article) {
    return (
      <Box width="100%" px={0} py={4}>
        <Text>Article not found</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" px={0} py={4}>
      <Heading as="h1" mb={4} textAlign="center">{article.title}</Heading>
      <Box fontSize="lg" px={10}>
        <PortableText value={article.body} />
      </Box>
    </Box>
  );
}
