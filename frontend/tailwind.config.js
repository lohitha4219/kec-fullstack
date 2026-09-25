/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        campus: {
          navy: '#132242',
          navy2: '#1B2E52',
          blue: '#2F6FED',
          gold: '#C99A3F',
          mist: '#F5F7FB',
          slate: '#5B6478',
          ink: '#1E2433',
          green: '#2F9E66',
          red: '#D8534F',
        },
      },
    },
  },
  plugins: [],
}
