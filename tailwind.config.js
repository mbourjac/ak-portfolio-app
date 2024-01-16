/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
