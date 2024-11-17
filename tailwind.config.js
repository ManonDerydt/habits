/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f8f4b2',
        secondary: '#A5D6A7',
        background: '#FAFAFA',
        text: {
          primary: '#424242',
          secondary: '#B0BEC5',
        },
        accent: '#FF8A80',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};