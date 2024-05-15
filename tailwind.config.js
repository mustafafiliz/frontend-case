/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "#2A59FE",
        "secondary-500": "#333333",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
