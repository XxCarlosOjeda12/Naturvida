/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#59ba07',  
          dark: '#4a9b06',     
        },
        dark: '#222222',       
        medium: '#555555',     
        light: '#e5e7eb',      
        white: '#ffffff',      
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 5px 20px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}