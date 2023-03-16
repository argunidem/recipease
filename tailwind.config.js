/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
      'red-hat': ['Red Hat Display', 'sans-serif'],
    },
    extend: {
      colors: {
        recipease: {
          50: '#203260',
          100: '#465879',
          200: '#64779B',
          300: '#90CCA8',
          400: '#96B4FF',
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
