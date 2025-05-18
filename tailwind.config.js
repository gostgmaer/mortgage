// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./src/**/*.{js,ts,jsx,tsx}", // your React components
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // HeroUI theme
],

  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
