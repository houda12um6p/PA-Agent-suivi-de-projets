/** @type {import('tailwindcss').Config} */
module.exports = {
  // tell tailwind where to look for classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // OCP brand colors
        primary: "#0B1F3A",
        accent: "#00A86B",
      },
    },
  },
  plugins: [],
};
