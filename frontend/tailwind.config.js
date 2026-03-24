/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#121212',
        text: '#ffffff',
        accent: {
          light: '#ff8a00',
          DEFAULT: '#ff5e00',
          dark: '#e65100',
        }
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 94, 0, 0.4)',
        'glow-orange-lg': '0 0 40px rgba(255, 94, 0, 0.6)',
      },
      animation: {
        'pulse-orange': 'pulse-orange 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 94, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 94, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
