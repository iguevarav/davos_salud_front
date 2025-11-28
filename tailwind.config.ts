import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores Davos Salud
        "derma-pink": {
          50: "#FEFBFC",
          100: "#FBF3F6",
          200: "#F8EEF2",
          300: "#F0B5C5",
          400: "#E5A3B6",
          500: "#D991A7",
        },
        "derma-gray": {
          50: "#FEFEFE",
          100: "#F8F8F8",
          400: "#B8B8B8",
          500: "#8B8B8B",
          900: "#3D3D3D",
        },
      },
    },
  },
  plugins: [],
};

export default config;
