/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fb',
          100: '#c5d7f5',
          200: '#9ebcee',
          300: '#77a0e7',
          400: '#578be2',
          500: '#3776dd',
          600: '#1e5bb8',
          700: '#0f3d8a',
          800: '#0a2960',
          900: '#051535',
          DEFAULT: '#0f2952',
        },
        green: {
          DEFAULT: '#16a34a',
          light: '#22c55e',
          dark: '#14532d',
        },
        gold: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/LogoSansFond.png')",
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(15, 41, 82, 0.25)',
        'green': '0 10px 30px -5px rgba(22, 163, 74, 0.4)',
        'glow': '0 0 30px rgba(55, 118, 221, 0.3)',
      }
    },
  },
  plugins: [],
};
