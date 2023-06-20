/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tonus: ["Tonus"],
      },
      borderWidth : {
        1: '1px',
      },
      colors: {
        primary: "#212121",
        primaryLight: "#484848",
        primaryDark: "#000000",
        secondary: "#424242",
        secondaryLight: "#6d6d6d",
        secondaryDark: "#1b1b1b",
      },
      backgroundImage: {
        "purple-box": "url('/1.png')",
        "blue-box": "url('/2.png')",
        "orange-box": "url('/3.png')",
        "gray-box": "url('/4.png')",
      },
      fontSize: {
        "xxs": ".5rem",
      }
    },
  },
  plugins: [],

}
