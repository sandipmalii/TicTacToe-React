/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#44ff9a',
        'custom-blue': '#44b0ff',
        'custom-purple': '#8b44ff',
        'custom-orange': '#ff6644',
        'custom-yellow': '#ebff70',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
      },
    },
  },
  plugins: [],
}

