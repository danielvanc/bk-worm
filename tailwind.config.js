module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rosyWorm: {
          900: "#81334F",
          DEFAULT: "#610023",
        },
        grayWorm: {
          100: "#EEE7E1",
          200: "#EAE2DA",
          300: "#333333",
          800: "#D9D1C9",
          DEFAULT: "#393131",
        },
        peachy: "#DDCCC8",
      },
      fontSize: {
        hSmall: "3.875rem",
        hMedium: "6rem",
        hLarge: "8.4375rem",
        h2Normal: "2rem",
      },
      screens: {
        lm: "400px",
        desktop: "1200px",
      },
      lineHeight: {
        tighter: 0.8,
      },
    },
    fontFamily: {
      fred: ['"Fredoka One"', "cursive"],
      monty: ["Montserrat", "sans-serif"],
      serifPro: ['"Source Serif Pro"', "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
