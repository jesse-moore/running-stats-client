const { color } = require("d3-color");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
	  blue: colors.blue,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
	  blueGray: colors.blueGray,
      darkBlue: "#192638",
    },
    extend: {
      gridTemplateColumns: {
        // Complex site-specific column configuration
        statsGrid: "auto auto",
      },
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [],
};
