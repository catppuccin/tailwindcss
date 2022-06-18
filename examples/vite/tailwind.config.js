/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@nekowinston/ctp-tailwindcss')({
      prefix: 'ctp',
      defaultFlavour: 'latte'
    }),
  ],
}
