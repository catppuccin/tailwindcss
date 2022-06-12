module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {},
	safelist: [
		// this is for demonstration purposes only, not required for basic usage
		{
			pattern: /bg-.+/,
		},
	],
	plugins: [
		require("@tailwindcss/forms"),
		require("@nekowinston/ctp-tailwindcss")({
			prefix: false,
			defaultFlavour: "mocha",
		}),
	],
};
