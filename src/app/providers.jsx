"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";

const mySystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  "#f2f6ec",  // Lightest Greenish White
          100: "#e3ecd9",  // Very Pale Green
          200: "#cddcbf",  // Muted Pastel Green
          300: "#b1c9a5",  // Soft Green
          400: "#8cb685",  // Earthy Green
          500: "#6f9968",  // Primary Natural Green
          600: "#597d53",  // Deeper Forest Green
          700: "#425e3e",  // Dark Olive Green
          800: "#2a3d27",  // Dark Earthy Tone
          900: "#141e13",  // Deepest Green Black
        },
        accent: {
          50: "#fdf8ec",   // Soft Warm Cream
          100: "#f8e9cf",  // Light Beige
          200: "#edd5ac",  // Muted Earthy Orange
          300: "#e2be86",  // Warm Toasty Beige
          400: "#d8a760",  // Rich Golden Brown
          500: "#b8874b",  // Classic Earthy Brown
          600: "#936c3b",  // Deep Natural Brown
          700: "#6e502c",  // Darker Wood Brown
          800: "#4a331d",  // Espresso Brown
          900: "#26170e",  // Deepest Chocolate Brown
        },
        text: {
          light: "#f5f5f5",
          dark: "#2d2d2d",
        },
      },
      fonts: {
        heading: "'Playfair Display', serif",  // Elegant, modern typography
        body: "'Inter', sans-serif",          // Clean, readable body font
      },
      styles: {
        global: {
          "html, body": {
            backgroundColor: "brand.50",
            color: "text.dark",
          },
        },
      },
    },
  },
});

export function Providers({ children }) {
  return (
    <ChakraProvider value={mySystem}>
      {children}
    </ChakraProvider>
  );
}
