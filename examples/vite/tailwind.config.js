/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@catppuccin/tailwindcss")({
			prefix: "ctp",
			defaultFlavour: "latte",
		}),
	],
};
