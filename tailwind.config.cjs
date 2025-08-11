module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"League Spartan"', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: '#0a0a0a',
        lightGray: '#e5e5e5',
        midGray: '#a3a3a3',
      },
    },
  },
  plugins: [],
}
