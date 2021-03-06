const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      //custom colors start here
      primarygreen: '#20DC49',
      primaryblack: '#090B0F',
      primaryred: '#D93F21',
    },
    extend: {},
  },
  plugins: [],
}
