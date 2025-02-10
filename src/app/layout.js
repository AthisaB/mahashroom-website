import Link from "next/link"
import { Providers } from "./providers"
import "./globals.css"
import { Box, Flex, HStack, Heading, Spacer, Button } from "@chakra-ui/react"

export const metadata = {
  title: "Mahasroom | Mushterra",
  description: "Innovating Mushrooms for a Healthier Future",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Fixed Navbar */}
          <Box
            as="header"
            position="fixed"
            top="0"
            left="0"
            right="0"
            bg="brand.500"
            color="white"
            px={8}
            py={4}
            zIndex="9999"  // Ensures navbar is on top of all content
          >
            <Flex alignItems="center">
              <Heading size="md">Mahasroom | Mushterra</Heading>
              <Spacer />
              <HStack spacing={6}>
                <Link href="/#home">Home</Link>
                <Link href="/#about">About</Link>
                <Link href="/#products">Products</Link>
                <Link href="/#research">Research</Link>
                <Link href="/#recipes">Recipes</Link>
                <Link href="/#contact">Contact</Link>
              </HStack>
            </Flex>
          </Box>

          {/* The main content sits UNDER the navbar, so add some top padding */}
          <Box as="main" pt="80px">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  )
}
