const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plex-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  safelist: [
    // this is for demonstration purposes only, not required for basic usage
    {
      pattern: /bg-.+/,
    },
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("../../dist/index")({
      prefix: false,
      defaultFlavour: "mocha",
    }),
  ],
};
