module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	safelist: [
		{
			pattern: /bg-.+/
		},
		'mocha',
		'macchiato',
		'frappe',
		'latte'
	],
	plugins: [
		require('@tailwindcss/forms'),
		require('@nekowinston/ctp-tailwindcss')({
			prefix: false,
			defaultFlavour: 'mocha'
		})
	]
};
