// tailwind.config.js

module.exports = {
  mode: 'jit', // Just-In-Time compiler mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'searchbg': "url('./src/assets/images/movies.jpg')",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
