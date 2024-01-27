/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ef82ff',
      },
      fontFamily: {
        body: ['Upright', 'sans-serif'],
        menu: ['"Duke Condensed Bold"', 'sans-serif'],
        modal: ['Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.vertical-rl': {
          writingMode: 'vertical-rl',
        },
      });
    }),
  ],
};
