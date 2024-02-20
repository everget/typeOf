/* eslint-disable max-classes-per-file */
import { beforeEach, describe, expect, it } from 'vitest';
import { typeOf, type ResulterFunction, ResulterExpect } from './index';

describe('Function: typeOf', () => {
	describe('Definition', () => {
		it('should be a function', () => {
			expect(typeof typeOf).toEqual('function');
			expect(typeOf(typeOf)()).toEqual('function');
		});
	});

	describe('Returned value: Function `resulter`', () => {
		let resulter: ResulterFunction;

		beforeEach(() => {
			resulter = typeOf();
		});

		it('should be a function', () => {
			expect(typeof resulter).toEqual('function');
		});

		it('should have `name` of `resulter`', () => {
			expect(resulter.name).toEqual('resulter');
		});

		it('should haven`t parameters', () => {
			expect(resulter.length).toEqual(0);
		});

		describe('Static method: `valueOf`', () => {
			it('should be a function', () => {
				expect(typeof resulter.valueOf).toEqual('function');
			});

			it('should haven`t parameters', () => {
				expect(resulter.valueOf.length).toEqual(0);
			});

			it('should coerce `resulter` to `string` type in non-strict comparisons', () => {
				expect(resulter.valueOf() == 'undefined').toEqual(true); // eslint-disable-line eqeqeq
			});

			it('should return type of value in non-strict comparisons', () => {
				expect(resulter.valueOf() == 'undefined').toEqual(true); // eslint-disable-line eqeqeq
			});
		});

		describe('Static method: `expect`', () => {
			let resulterExpect: ResulterExpect;

			beforeEach(() => {
				resulterExpect = typeOf().expect;
			});

			it('should be a function', () => {
				expect(typeof resulterExpect).toEqual('function');
			});

			it('should have one parameter of `string` type', () => {
				expect(resulterExpect.length).toEqual(1);
			});

			it('should throw `TypeError` if argument is not of `string` type', () => {
				expect(() => {
					resulterExpect();
				}).toThrow();
			});

			it('should have one parameter of `string` type which can have `|` delimeters between types', () => {
				expect(resulterExpect('number|undefined')).toEqual(true);
				expect(resulterExpect('number |  undefined | string')).toEqual(true);
			});

			it('should throw `TypeError` if type of value is not equal to argument', () => {
				expect(() => {
					resulterExpect('number');
				}).toThrow();
			});

			it('should throw `TypeError` if type of value is not equal to piped types', () => {
				expect(() => {
					resulterExpect('string | number | function');
				}).toThrow();
			});
		});
	});

	describe('Primitive types detection', () => {
		it('should detect type of undefined as `undefined`', () => {
			expect(typeOf(undefined)()).toEqual('undefined');
			expect(typeOf(void 0)()).toEqual('undefined'); // eslint-disable-line no-void
		});

		it('should detect type of null as `null`', () => {
			expect(typeOf(null)()).toEqual('null');
			expect(typeOf(Object.getPrototypeOf(Object.prototype))()).toEqual('null');
		});

		it('should detect type of symbols as `symbol`', () => {
			expect(typeOf(Symbol())()).toEqual('symbol'); // eslint-disable-line symbol-description
			expect(typeOf(Symbol('foo'))()).toEqual('symbol');
		});

		it('should detect type of booleans as `boolean`', () => {
			expect(typeOf(true)()).toEqual('boolean');
			expect(typeOf(false)()).toEqual('boolean');
			expect(typeOf(new Boolean('NaN'))()).toEqual('boolean'); // eslint-disable-line no-new-wrappers
		});

		it('should detect type of numbers as `number`', () => {
			expect(typeOf(NaN)()).toEqual('number');
			expect(typeOf(Infinity)()).toEqual('number');
			expect(typeOf(2410)()).toEqual('number');
			expect(typeOf(0b00000001)()).toEqual('number');
			expect(typeOf(new Number(666))()).toEqual('number'); // eslint-disable-line no-new-wrappers
		});

		it('should detect type of strings as `string`', () => {
			expect(typeOf('')()).toEqual('string');
			expect(typeOf('foo')()).toEqual('string');
			expect(typeOf('123')()).toEqual('string');
			expect(typeOf(`${123}`)()).toEqual('string');
			expect(typeOf(new String(NaN))()).toEqual('string'); // eslint-disable-line no-new-wrappers
		});
	});

	describe('Object types detection', () => {
		it('should detect type of Node.js global object as `global`', () => {
			expect(typeOf(global)()).toEqual('global');
		});

		it('should detect type of Node.js process object as `process`', () => {
			expect(typeOf(global.process)()).toEqual('process');
		});

		it('should detect type of plain objects as `object`', () => {
			expect(typeOf({})()).toEqual('object');
			expect(typeOf({ foo: 1, bar: 2 })()).toEqual('object');
			expect(typeOf(new Proxy({}, {}))()).toEqual('object');
		});

		it('should detect type of Reflect object as `object`', () => {
			expect(typeOf(Reflect)()).toEqual('reflect');
		});

		it('should detect type of Math object as `math`', () => {
			expect(typeOf(Math)()).toEqual('math');
		});

		it('should detect type of JSON object as `json`', () => {
			expect(typeOf(JSON)()).toEqual('json');
		});

		it('should detect type of functions as `function`', () => {
			expect(typeOf(function () {})()).toEqual('function'); // eslint-disable-line prefer-arrow-callback, func-names, @typescript-eslint/no-empty-function
			expect(typeOf(function foo() {})()).toEqual('function'); // eslint-disable-line prefer-arrow-callback, @typescript-eslint/no-empty-function
			expect(typeOf(() => {})()).toEqual('function'); // eslint-disable-line @typescript-eslint/no-empty-function
			expect(typeOf(Proxy)()).toEqual('function');
		});

		it('should detect type of classes as `function`', () => {
			expect(typeOf(class {})()).toEqual('function');
			expect(typeOf(class Foo extends class {} {})()).toEqual('function');
		});

		it('should detect type of async functions as `asyncfunction`', () => {
			expect(typeOf(async function () {})()).toEqual('asyncfunction'); // eslint-disable-line prefer-arrow-callback, func-names, @typescript-eslint/no-empty-function
			expect(typeOf(async () => {})()).toEqual('asyncfunction'); // eslint-disable-line @typescript-eslint/no-empty-function
		});

		it('should detect type of generator functions as `generatorfunction`', () => {
			expect(typeOf(function* () {})()).toEqual('generatorfunction'); // eslint-disable-line func-names, @typescript-eslint/no-empty-function
			expect(
				typeOf(function* foo() {
					yield 'foo';
				})()
			).toEqual('generatorfunction');
		});

		it('should detect type of generator object as `generator`', () => {
			const generatorObject = (function* foo() {
				yield 1;
			})();
			expect(typeOf(generatorObject)()).toEqual('generator');
		});

		it('should detect type of promises as `promise`', () => {
			expect(typeOf(Promise.resolve())()).toEqual('promise');
			expect(typeOf((async function () {})())()).toEqual('promise'); // eslint-disable-line @typescript-eslint/no-empty-function, func-names
		});

		it('should detect type of maps as `map`', () => {
			expect(typeOf(new Map())()).toEqual('map');
			expect(
				typeOf(
					new Map([
						['foo', 1],
						['bar', 2],
					])
				)()
			).toEqual('map');
		});

		it('should detect type of weakmaps as `weakmap`', () => {
			expect(typeOf(new WeakMap())()).toEqual('weakmap');
			expect(
				typeOf(
					new WeakMap([
						[() => {}, 2], // eslint-disable-line @typescript-eslint/no-empty-function
					])
				)()
			).toEqual('weakmap');
		});

		it('should detect type of sets as `set`', () => {
			expect(typeOf(new Set())()).toEqual('set');
			expect(typeOf(new Set([1, 'foo', 'bar']))()).toEqual('set');
		});

		it('should detect type of weaksets as `weakset`', () => {
			expect(typeOf(new WeakSet())()).toEqual('weakset');
			expect(typeOf(new WeakSet([{ foo: 1 }, { bar: 2 }, { baz: 3 }]))()).toEqual('weakset');
		});

		it('should detect type of arrays as `array`', () => {
			expect(typeOf(new Array())()).toEqual('array'); // eslint-disable-line @typescript-eslint/no-array-constructor
			expect(typeOf(new Array(24))()).toEqual('array'); // eslint-disable-line @typescript-eslint/no-array-constructor
			expect(typeOf([])()).toEqual('array');
			expect(typeOf(['typeOf', 'is', 'awesome'])()).toEqual('array');
		});

		it('should detect type of typed arrays as `<type>array`', () => {
			expect(typeOf(Buffer.from([]))()).toEqual('uint8array');
			expect(typeOf(new Int8Array())()).toEqual('int8array');
			expect(typeOf(new Int16Array())()).toEqual('int16array');
			expect(typeOf(new Int32Array())()).toEqual('int32array');
			expect(typeOf(new Float32Array())()).toEqual('float32array');
			expect(typeOf(new Float64Array())()).toEqual('float64array');
			expect(typeOf(new Uint8Array())()).toEqual('uint8array');
			expect(typeOf(new Uint8ClampedArray())()).toEqual('uint8clampedarray');
			expect(typeOf(new Uint16Array())()).toEqual('uint16array');
			expect(typeOf(new Uint32Array())()).toEqual('uint32array');
		});

		it('should detect type of dates as `date`', () => {
			expect(typeOf(new Date())()).toEqual('date');
			expect(typeOf(new Date(-666))()).toEqual('date');
		});

		it('should detect type of regexps as `regexp`', () => {
			expect(typeOf(new RegExp('g', 'g'))()).toEqual('regexp'); // eslint-disable-line prefer-regex-literals
			expect(typeOf(/foo/i)()).toEqual('regexp');
		});

		it('should detect type of arguments object as `arguments`', () => {
			// prettier-ignore
			expect(typeOf((function () { return arguments; })())()).toEqual('arguments'); // eslint-disable-line func-names, prefer-rest-params
		});

		it('should detect type of string iterators as `stringiterator`', () => {
			expect(typeOf(''[Symbol.iterator]())()).toEqual('stringiterator');
		});

		it('should detect type of array iterators as `arrayiterator`', () => {
			expect(typeOf([1, 2, 3].entries())()).toEqual('arrayiterator');
			expect(typeOf([][Symbol.iterator]())()).toEqual('arrayiterator');
		});

		it('should detect type of set iterators as `setiterator`', () => {
			expect(typeOf(new Set().entries())()).toEqual('setiterator');
		});

		it('should detect type of map iterators as `mapiterator`', () => {
			expect(typeOf(new Map().entries())()).toEqual('mapiterator');
		});

		it('should detect type of errors as `error`', () => {
			expect(typeOf(new Error())()).toEqual('error');
			expect(typeOf(new EvalError())()).toEqual('error');
			expect(typeOf(new RangeError())()).toEqual('error');
			expect(typeOf(new ReferenceError())()).toEqual('error');
			expect(typeOf(new SyntaxError())()).toEqual('error');
			expect(typeOf(new TypeError())()).toEqual('error');
			expect(typeOf(new URIError())()).toEqual('error');
		});
	});
});
