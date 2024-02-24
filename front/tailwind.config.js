/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cigaleLogo: '#cf2e2e',
        dogstar: '#aa6427',
        doug: '#8ea332',
        alice: '#efebd9',
      },
      fontFamily: {
        'sans': ['Arimo', 'sans-serif'],
        'gothic': ['League Gothic', 'sans-serif']
      }
    },
  },
  plugins: [],
}
