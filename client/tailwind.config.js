/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], 
      },
      colors: {
        "gray": {
          50: "#f9f9f9",
          100: "#f3f4f4",
          200: "#e9ebeb",
          300: "#d8dada",
          400: "#c0c3c5",
          500: "#a6a9ac",
          600: "#95989c",
          700: "#7d8084",
          800: "#686b6f",
          900: "#57595b",
          950: "#393a3c",
        },
        "blue": {
          50: "#f2f3fb",
          100: "#e7eaf8",
          200: "#d3d6f2",
          300: "#b8bde9",
          400: "#9b9bde",
          500: "#8782d2",
          600: "#7164c0",
          700: "#6558aa",
          800: "#53498a",
          900: "#46406f",
          950: "#292640",
        },
      },
    },
  },
  plugins: [],
};
