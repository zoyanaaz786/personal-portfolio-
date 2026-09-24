/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        ink: {
          950: '#0A0D12',
          900: '#0F131A',
          800: '#161B24',
          700: '#1F2733',
          600: '#2B3543',
          500: '#3E4B5C',
          400: '#5C6B7E',
          300: '#8895A5',
          200: '#B9C2CE',
          100: '#DDE2E8',
          50: '#F4F6F8'
        },
        amber: {
          600: '#B8792E',
          500: '#D69A4E',
          400: '#E3AF6C',
          300: '#EFC793'
        }
      },
      maxWidth: {
        content: '1180px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,13,18,0.04), 0 8px 24px -12px rgba(10,13,18,0.18)',
        cardDark: '0 1px 2px rgba(0,0,0,0.3), 0 8px 28px -12px rgba(0,0,0,0.5)'
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 }
        }
      },
      animation: {
        blink: 'blink 1s steps(1) infinite'
      }
    }
  },
  plugins: []
}
