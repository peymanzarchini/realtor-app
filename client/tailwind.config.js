/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0,0,0,0.6)",
        "black-rgba-light": "rgba(0,0,0,0.3)",
        "footer-background": "rgb(43,43,43)",
        "main-background": "rgb(241,245,241)",
      },
      backgroundImage: {
        "Trend-image": "url('/src/assets/trends.webp')",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        xs: { max: "450px" },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
