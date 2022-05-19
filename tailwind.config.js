module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6' // violet 500
      },
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
