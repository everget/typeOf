module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		'eslint:recommended',
		'eslint-config-airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/stylistic',
		'eslint-config-prettier',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
	},
};
