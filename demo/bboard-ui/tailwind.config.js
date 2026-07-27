/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFDEA',
          100: '#FEF08A',
          200: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        emeraldAcc: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        glow: '0 0 25px -5px rgba(250, 204, 21, 0.25)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  plugins: [],
};
