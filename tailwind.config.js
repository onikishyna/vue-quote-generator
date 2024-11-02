/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif']
      },
      fontSize: {
        'main': '18px',
        'xs': '14px',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        beat: 'beat 0.5s infinite',
      },
      screens: {
        'xs': '340px', 
      },
      minWidth: {
        '72': '18rem', 
      },
    },
  },
  plugins: [],
}

