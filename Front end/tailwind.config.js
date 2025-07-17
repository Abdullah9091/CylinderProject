const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral, // Avoid Tailwind’s new oklch colors
        yellow: colors.yellow,
        green: colors.green,
        blue: colors.blue,
        red: colors.red,
      },
    },
  },
  plugins: [],
};
