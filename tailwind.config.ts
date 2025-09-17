
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#eaf0ff',
          200: '#d5e1ff',
          300: '#b3c8ff',
          400: '#89a6ff',
          500: '#5c7dff',
          600: '#3d59f5',
          700: '#2e44d6',
          800: '#2838aa',
          900: '#253382'
        }
      },
      boxShadow: {
        soft: '0 2px 20px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        xl: '1rem'
      }
    },
  },
  plugins: [],
}
export default config

