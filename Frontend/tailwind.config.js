/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#EC4899',
        dark: '#0F172A',
        light: '#F8FAFC',
        linkedin: {
          blue: '#0A66C2',
          light: '#FFFFFF',
          dark: '#000000',
          gray: '#666666',
          lightgray: '#F3F2EF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}