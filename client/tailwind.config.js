/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0,0,0,0.6)",
        "black-rgba-light": "rgba(0,0,0,0.3)",
        "footer-background": "rgb(43,43,43)",
      },
      backgroundImage: {
        "Trend-image": "url('./src/assets/trends.webp')",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
