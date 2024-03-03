/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    screens: {
      'xs': '600px',
      // => @media (min-width: 520px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1922px', //2k için ekran
      
      '4xl': '3840px', // 4k ekran için yeni bir ekran boyutu ekledik

    },
    extend: {
      colors: {
        'delta-yellow': '#f8e61b',
        'sidebar': '#092635',
        'form': '#e0d2d1',
        'admin': '#ebebeb',
        'delta-green-1200': '#001204',
        'delta-green-1000': '#12372A',
        'delta-green-800': '#436850',
        'delta-green-600': '#ADBC9F',
        'delta-green-400': '#FBFADA',
        'form': '#FBF6EE',
        'admin': '#ebebeb'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
})