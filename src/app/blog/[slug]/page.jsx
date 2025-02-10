import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { PortableText } from '@/components/PortableText';

export async function generateMetadata({ params }) {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
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
  const post = await client.fetch(query, { slug: params.slug });
  if (!post) return { title: "Not Found" };

  return {
    title: post.seo?.titleTag || `${post.title} | Mahasroom Blog`,
    description: post.seo?.metaDescription || `Read the blog post: ${post.title}`,
    keywords: post.seo?.keywords ? post.seo.keywords.join(', ') : undefined,
    openGraph: {
      images: post.seo?.openGraphImage?.asset?.url ? [post.seo.openGraphImage.asset.url] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage{
        asset->{
          url
        },
        alt
      },
      body
    }
  `;
  const post = await client.fetch(query, { slug });

  if (!post) {
    return (
      <Box width="100%" px={0} py={4}>
        <Text>Post not found</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" px={0} py={4}>
      <Heading as="h1" size="2xl" textAlign="center" mb={4}>
        {post.title}
      </Heading>
      {post.mainImage?.asset?.url && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || 'Blog Post Image'}
          mb={4}
          width="100%"
          maxHeight="400px"
          objectFit="cover"
        />
      )}
      <Box fontSize="lg" px={10}>
        <PortableText value={post.body} m={4}/>
      </Box>
    </Box>
  );
}
