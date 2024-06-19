/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-neon-green': '#a5ffb1',
        'soft-neon-red': '#ff7b92',
        'soft-neon-blue': '#a5fff8',
      },
      boxShadow: {
        'soft-neon-green': '0 0 5px #a5ffb1, 0 0 10px #a5ffb1, 0 0 15px #a5ffb1',
        'soft-neon-red': '0 0 5px #ff7b92, 0 0 10px #ff7b92, 0 0 15px #ff7b92',
        'soft-neon-blue': '0 0 5px #a5fff8, 0 0 10px #a5fff8, 0 0 15px #a5fff8',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}