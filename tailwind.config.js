module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rosyWorm: {
          900: '#81334F',
          DEFAULT: '#610023'
        },
        grayWorm: {
          100: '#EEE7E1',
          200: '#EAE2DA',
          800: '#D9D1C9',
          DEFAULT: '#393131'
        },
        peachy: '#DDCCC8'
      },
    },
    fontFamily: {
      fred: ['"Fredoka One"', 'cursive'],
      monty: ['Montserrat', 'sans-serif'],
      serifPro: ['"Source Serif Pro"', 'serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}