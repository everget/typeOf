/*
 * !
 * typeOf
 * Copyright(c) 2017 @everget Alex Orekhov <alex.everget161@gmail.com>
 * MIT Licensed
 */

declare const global: any; // eslint-disable-line @typescript-eslint/no-explicit-any

function errorMessage(actual: string, expected: string): string {
	return `The value is of type '${actual}' but expected '${expected}'`;
}

/*
 * @param {*} value - The value for type detection
 * @returns {String} - The sliced internal [[Class]] property of value
 */
function getTag(value: unknown): string {
	return {}.toString.call(value).slice(8, -1).split(' ').join('').toLowerCase();
}

export type ResulterExpect = (types?: string) => boolean | never;
export interface ResulterFunction {
	(): string;
	valueOf: () => string;
	expect: ResulterExpect;
}

/*
 * @param {*} value - The value for type detection
 * @returns {Function} - The result type holder with two static methods
 */
export function typeOf(value?: unknown): ResulterFunction {
	/* Detect free variable `global` from Node.js. */
	const freeGlobal = typeof global == 'object' && global && global.Object === Object && global; // eslint-disable-line eqeqeq

	/* Detect free variable `self`. */
	const freeSelf = typeof self === 'object' && self && self.Object === Object && self; // eslint-disable-line eqeqeq, no-restricted-globals

	/* Used as a reference to the global object. */
	const root = freeGlobal || freeSelf || Function('return this')(); // eslint-disable-line no-new-func

	const weakType = typeof value;
	let result: string;

	/* Catches `number`, `boolean`, `undefined`, `string`, `symbol` */
	if (weakType !== 'object' && weakType !== 'function') {
		result = weakType;
	}

	if (value === null) {
		result = 'null';
	} else if (value === root) {
		result = 'global';
	} else {
		result = getTag(value);
	}

	/*
	 * @returns {String} - The type of value
	 */
	function resulter(): string {
		return result;
	}

	/*
	 * @returns {String} - The type of value
	 */
	resulter.valueOf = () => result;

	/*
	 * @param {String} types - The type of value
	 * @throws {TypeError} - Throws `TypeError` if argument is not of `string` type
	 *                       or if argument is empty string
	 *                       or if types is not matched
	 * @returns {Boolean} - Returns `true` if types is matched
	 */
	resulter.expect = (types?: string): boolean | never => {
		if (typeof types !== 'string' || types.length === 0) {
			throw new TypeError('Argument for `expect` function must be non-empty string');
		}

		const splittedTypes = types
			.trim()
			.split('|')
			.map((str) => str.trim());

		if (!splittedTypes.includes(result)) {
			throw new TypeError(errorMessage(result, splittedTypes.join(' | ')));
		}

		return true;
	};

	return resulter;
}
