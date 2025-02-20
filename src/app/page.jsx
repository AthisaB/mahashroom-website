import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  SimpleGrid,
  Flex
} from "@chakra-ui/react"
import Link from "next/link"
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export default async function LandingPage() {

  const productQuery = groq`
  *[_type == "product"] | order(_createdAt desc)[0..2] {
    _id,
    name,
    slug,
    image {
      asset->{
        url
      }
    }
  }
`;
  const products = await client.fetch(productQuery);

  // Fetch the latest 3 recipes from Sanity.io
  const recipeQuery = groq`
  *[_type == "recipe"] | order(_createdAt desc)[0..2] {
    _id,
    title,
    slug,
    image {
      asset->{
        url
      }
    }
  }
`;
  const recipes = await client.fetch(recipeQuery);

  return (
    <>
      {/* HOME/HERO SECTION */}
      <Box
        id="home"
        as="section"
        height="100vh"
        bgImage="url('/images/hero_mushrooms.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {/* Overlay to darken the background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="brand.900"
          opacity={0.6}   // adjust this to control how dark the overlay is
        />

        {/* Hero content on top */}
        <Box
          zIndex={1}
          textAlign="center"
          color="white"
          maxW="2xl"
          px={4}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Innovating Mushrooms for a Healthier Future
          </Heading>
          <Text fontSize="lg" mb={6}>
            Discover sustainable solutions through our mushroom-based products.
          </Text>
          <Stack direction={["column", "row"]} spacing={4} justify="center">
            <Button
              as={Link}
              href="/#products"
              variant="outline"
              colorScheme="brand"
              size="lg"
              px={8}
              py={6}
              _hover={{ opacity: 0.8 }}
            >
              Explore Our Products
            </Button>
            <Button
              as={Link}
              href="/#about"
              variant="outline"
              colorScheme="brand"
              size="lg"
              px={8}
              py={6}
              _hover={{ bg: "brand.50", color: "brand.700" }}
            >
              Learn More About Us
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* ABOUT SECTION */}
      <Box
        id="about"
        as="section"
        py={16}
        px={[4, 8, 16]}
        bg="brand.700"
        color="white"
      >
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          About Us
        </Heading>
        <Text fontSize="lg" mb={8}>
          We are committed to pioneering mushroom-based innovations that support
          healthier lifestyles and a more sustainable world. Our dedicated R&D
          efforts, ethical practices, and passion for mycology guide everything we do.
        </Text>

        <Heading as="h3" size="md" mb={2}>
          Our Mission & Vision
        </Heading>
        <Text mb={6}>
          Our mission is to leverage the power of mushrooms to create healthier,
          eco-friendly products that improve the well-being of people and communities
          worldwide.
        </Text>

        <Heading as="h3" size="md" mb={2}>
          History & Expertise
        </Heading>
        <Text mb={6}>
          Founded in 20XX, we started as a small research lab exploring the potential
          of fungi. Over the years, we've developed expertise in mushroom cultivation
          and processing, focusing on sustainability and innovation.
        </Text>

        <Heading as="h3" size="md" mb={2}>
          Sustainability & R&D
        </Heading>
        <Text mb={8}>
          Sustainability is at the core of our business. We practice zero-waste methods
          by recycling baglogs and partnering with local communities to ensure ethical
          sourcing. Our R&D lab collaborates with universities and scientific institutions
          to push the boundaries of mushroom applications in foods, supplements, and more.
        </Text>

        {/* R&D Lab and Production Images */}
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box>
            <Image
              src="/images/lab1.jpg"
              alt="R&D Lab 1"
              borderRadius="md"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Image
              src="/images/lab2.jpg"
              alt="R&D Lab 2"
              borderRadius="md"
              objectFit="cover"
              mb={2}
            />
          </Box>
          <Box>
            <Image
              src="/images/production1.jpg"
              alt="Production Process"
              borderRadius="md"
              objectFit="cover"
              mb={2}
            />
          </Box>
        </SimpleGrid>

        {/* Blog Link at Bottom Right */}
        <Box textAlign="right" mt={6} pr={6}>
          <Button as={Link} href="/blog/" variant="link" color="blue.200">
            Read More on Our Blog →
          </Button>
        </Box>
      </Box>

      {/* PRODUCTS SECTION */}
      < Box
        id="products"
        as="section"
        py={16}
        px={[4, 8, 16]}
        bg="brand.500"
        color="white"
      >
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Our Products
        </Heading>
        <Text fontSize="lg" mb={8} textAlign="center">
          Experience the diverse range of mushroom-based products designed for healthier
          cooking and snacking.
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={6} gap={2}>
          {products?.length > 0 ? (
            products.map((prod) => (
              <Box
                key={prod._id}
                border="1px solid"
                borderColor="gray.200"
                p={4}
                borderRadius="md"
              >
                <Link href={`/products/${prod.slug.current}`}>
                  {prod.image?.asset?.url ? (
                    <Image
                      src={prod.image.asset.url}
                      alt={prod.name}
                      borderRadius="md"
                      mb={3}
                    />
                  ) : (
                    <Box height="250px" bg="gray.200" />
                  )}
                  <Heading as="h4" size="md">
                    {prod.name}
                  </Heading>
                </Link>
              </Box>
            ))
          ) : (
            <Text>No recent products found.</Text>
          )}
        </SimpleGrid>

        {/* View All Products Link */}
        <Box textAlign="right" mt={6} pr={6}>
          <Button as={Link} href="/products/" variant="link" color="blue.200">
            View All Products →
          </Button>
        </Box>
      </Box>

      {/* RESEARCH SECTION */}
      < Box
        id="research"
        as="section"
        py={16}
        px={[4, 8, 16]}
        bg="accent.500"
        color="white"
      >
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Research & Innovation
        </Heading>
        <Text fontSize="lg" mb={8}>
          Our research team is constantly exploring new ways mushrooms can enhance health, sustainability, and industry applications. From bio-packaging to functional foods, we are pioneering innovative uses of fungi.
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box>
            <Image src="/images/research1.jpg" alt="Research Lab" borderRadius="md" mb={2} />
          </Box>
          <Box>
            <Image src="/images/research2.jpg" alt="Lab Work" borderRadius="md" mb={2} />
          </Box>
          <Box>
            <Image src="/images/research3.jpg" alt="Sustainability" borderRadius="md" mb={2} />
          </Box>
        </SimpleGrid>

        {/* View All Research Link */}
        <Box textAlign="right" mt={6} pr={6}>
          <Button as={Link} href="/research/" variant="link" color="blue.200">
            View All Research →
          </Button>
        </Box>
      </Box >

      {/* RECIPES SECTION */}
      <Box id="recipes" as="section" py={16} px={[4, 8, 16]} color="white" bg="accent.600">
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Mushroom Recipes
        </Heading>
        <Text fontSize="lg" mb={8} textAlign="center">
          Discover delicious ways to use our mushroom products in your daily cooking.
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={6} gap={2}>
          {recipes?.length > 0 ? (
            recipes.map((recipe) => (
              <Box key={recipe._id} border="1px solid" borderColor="gray.200" p={4} borderRadius="md">
                <Link href={`/recipes/${recipe.slug.current}`}>
                  {recipe.image?.asset?.url ? (
                    <Image src={recipe.image.asset.url} alt={recipe.title} borderRadius="md" mb={3} />
                  ) : (
                    <Box height="250px" bg="gray.200" />
                  )}
                  <Heading as="h4" size="md">{recipe.title}</Heading>
                </Link>
              </Box>
            ))
          ) : (
            <Text>No recent recipes found.</Text>
          )}
        </SimpleGrid>

        {/* View All Recipes Link */}
        <Box textAlign="right" mt={6} pr={6}>
          <Button as={Link} href="/recipes/" variant="link" color="blue.200">
            View All Recipes →
          </Button>
        </Box>
      </Box>

      {/* CONTACT / FOOTER SECTION */}
      < Box
        id="contact"
        as="section"
        py={16}
        px={[4, 8, 16]}
        bg="accent.800"
        color="white"
      >
        <Heading as="h2" size="xl" mb={4}>
          Contact Us
        </Heading>
        <Text fontSize="lg" mb={6}>
          Interested in partnerships, bulk orders, or learning more?
          Reach out to us directly for any inquiries.
        </Text>

        {/* Contact Buttons */}
        <Flex mt={6} justify="center" gap={4}>
          <Button
            as="a"
            href="https://wa.me/628118753010"
            target="_blank"
            colorScheme="green"
            size="lg"
          >
            WhatsApp
          </Button>
          <Button
            as="a"
            href="https://www.tokopedia.com/mush4all"
            target="_blank"
            colorScheme="blue"
            size="lg"
          >
            Tokopedia
          </Button>
        </Flex>

        {/* Address */}
        <Box mt={8} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">Our Address:</Text>
          <Text href="https://maps.app.goo.gl/CLP1k7WSKGcWFp8H7" colorScheme="blue">Jl. Ke Surnagalih, Kp. Limus Nunggal, Desa No.03, RT.02/RW.02/03, Sukaresmi</Text>
          <Text>Indonesia</Text>
        </Box>
      </Box >
    </>
  )
}
