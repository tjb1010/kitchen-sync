/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          dark: '#121212',
          base: '#282828',
          light: '#B3B3B3',
          lightest: '#FFFFFF',
          hover: '#2A2A2A',
          'card-hover': '#303030',
          divider: '#404040'
        }
      }
    },
  },
  plugins: [],
};