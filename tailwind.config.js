/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      mdlg: '870px',
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
          300: '#50618f',
          400: '#43537d',
          500: '#90CCA8',
          600: '#96B4FF',
          700: '#293f78',
          800: '#19284d',
          900: '#4b5d80',
        },
      },
      height: {
        76: '19rem',
        100: '25rem',
        104: '26rem',
      },
    },
  },
  plugins: [require('daisyui')],
};
