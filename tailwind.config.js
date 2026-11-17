/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        campus: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a3c0fd',
          400: '#759cfb',
          500: '#4872f7',
          600: '#2c4eeb',
          700: '#2238d8',
          800: '#2030af',
          900: '#1e2d8a',
          950: '#161d55',
        },
        dark: {
          bg: '#0A0E17',
          card: '#111827',
          hover: '#1F2937',
          border: '#2A3649',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
