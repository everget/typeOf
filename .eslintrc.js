module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		mocha: true,
	},
	ignorePatterns: ['!src'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		'eslint:recommended',
		'eslint-config-airbnb-base',
		'eslint-config-prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/stylistic',
	],
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'import/no-extraneous-dependencies': 'off',
    	'import/no-unresolved': 'off',
    	'import/extensions': 'off',
	}
};


