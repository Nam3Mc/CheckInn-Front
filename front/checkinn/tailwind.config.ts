import { light } from "@mui/material/styles/createPalette";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFFFFF",
        powerBackground: "#EBD3F8",
        powerPurple: "#7A1CAC",
        powerGray: "#666666",
        lavenderBlush: "#F9E7F3", // Tono claro de fondo
        thistle: "#D8BFD8", // Tono suave para elementos secundarios
        orchid: "#DA70D6", // Tono principal
        mediumOrchid: "#BA55D3", // Tono para acentos
        darkOrchid: "#9932CC", // Tono oscuro para textos o detalles
        purple: "#800080", // Tono más oscuro para bordes o énfasis

        darkMode: {
          black: "#000000",
          darkSlateBlue: "#483D8B", // Fondo oscuro
          rebeccaPurple: "#663399", // Tono para elementos secundarios
          slateBlue: "#6A5ACD", // Tono principal
          mediumSlateBlue: "#7B68EE", // Tono para acentos
          mediumPurple: "#9370DB", // Tono para textos o detalles
          lightPurple: "#E6E6FA", // Tono suave para contrastar
          ghostWhite: "#F8F8FF", // Tono claro para énfasis o detalles
        },
      },
      fontFamily: {
        Judson: ["Judson", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
