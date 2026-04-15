/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f7',
          100: '#d0daea',
          200: '#a1b5d5',
          300: '#7290c0',
          400: '#4a6faa',
          500: '#2d5490',
          600: '#1e3d73',
          700: '#132c56',
          800: '#0a1e3d',
          900: '#060f20',
        },
        gold: {
          50:  '#fdf8e7',
          100: '#f9edb5',
          200: '#f4db7a',
          300: '#edc740',
          400: '#d9a91a',
          500: '#b88a0a',
          600: '#936c06',
          700: '#6d4f03',
          800: '#4a3402',
          900: '#271b01',
        },
        cream: '#faf8f3',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "radial-gradient(ellipse at 20% 50%, rgba(30,61,115,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,138,10,0.1) 0%, transparent 50%)",
      }
    },
  },
  plugins: [],
}
