const should = require('chai').should();
const typeOf = require('../index');

describe('typeOf', () => {

  it('should be defined as a function', () => {
    typeOf.should.exist;
    typeOf.should.be.a('function');
    typeOf(typeOf).should.equal('function');
  });

  it('should detect type of Node.js global object as `global`', () => {
    typeOf(global).should.equal('global');
  });

  it('should detect type of Node.js process object as `process`', () => {
    typeOf(global.process).should.equal('process');
  });

  it('should detect type of plain objects as `object`', () => {
    typeOf({}).should.equal('object');
    typeOf({ foo: 1, bar: 2 }).should.equal('object');
    typeOf(new Proxy({}, {})).should.equal('object');
  });

  it('should detect type of Reflect object as `object`', () => {
    typeOf(Reflect).should.equal('object');
  });

  it('should detect type of Math object as `object`', () => {
    typeOf(Math).should.equal('object');
  });

  it('should detect type of JSON object as `object`', () => {
    typeOf(JSON).should.equal('object');
  });

  it('should detect type of functions as `function`', () => {
    typeOf(function() {}).should.equal('function');
    typeOf(function foo() {}).should.equal('function');
    typeOf(() => {}).should.equal('function');
    typeOf(Proxy).should.equal('function');
  });

  it('should detect type of classes as `function`', () => {
    typeOf(class {}).should.equal('function');
    typeOf(class Foo extends (class {}) {}).should.equal('function');
  });

  it('should detect type of generator functions as `function`', () => {
    typeOf(function*() {}).should.equal('function');
    typeOf(function* foo() { yield 'foo' }).should.equal('function');
  });

  it('should detect type of async functions as `function`', () => {
    typeOf(async function() {}).should.equal('function');
    typeOf(async () => {}).should.equal('function');
  });

  it('should detect type of maps as `map`', () => {
    typeOf(new Map).should.equal('map');
    typeOf(new Map([['foo', 1], ['bar', 2]])).should.equal('map');
  });

  it('should detect type of weakmaps as `weakmap`', () => {
    typeOf(new WeakMap).should.equal('weakmap');
    typeOf(new WeakMap([[{}, 1], [() => {}, 2]])).should.equal('weakmap');
  });

  it('should detect type of sets as `set`', () => {
    typeOf(new Set).should.equal('set');
    typeOf(new Set([1, 'foo', 'bar'])).should.equal('set');
  });

  it('should detect type of weaksets as `weakset`', () => {
    typeOf(new WeakSet).should.equal('weakset');
    typeOf(new WeakSet([{foo: 1}, {bar: 2}, {baz: 3}])).should.equal('weakset');
  });

  it('should detect type of arrays as `array`', () => {
    typeOf(new Array).should.equal('array');
    typeOf(new Array(24)).should.equal('array');
    typeOf([]).should.equal('array');
    typeOf(['typeOf', 'is', 'awesome']).should.equal('array');
  });

  it('should detect type of typed arrays as `<type>array`', (done) => {
    typeOf(new Buffer([])).should.equal('uint8array');
    typeOf(new Int8Array).should.equal('int8array');
    typeOf(new Int16Array).should.equal('int16array');
    typeOf(new Int32Array).should.equal('int32array');
    typeOf(new Float32Array).should.equal('float32array');
    typeOf(new Float64Array).should.equal('float64array');
    typeOf(new Uint8Array).should.equal('uint8array');
    typeOf(new Uint8ClampedArray).should.equal('uint8clampedarray');
    typeOf(new Uint16Array).should.equal('uint16array');
    typeOf(new Uint32Array).should.equal('uint32array');
    done();
  });

  it('should detect type of dates as `date`', () => {
    typeOf(new Date).should.equal('date');
    typeOf(new Date(-666)).should.equal('date');
  });

  it('should detect type of regexps as `regexp`', () => {
    typeOf(new RegExp).should.equal('regexp');
    typeOf(/foo/i).should.equal('regexp');
  });

  it('should detect type of arguments object as `arguments`', () => {
    typeOf((function() { return arguments })()).should.equal('arguments');
  });

  it('should detect type of standard iterators as `<type> iterator`', () => {
    typeOf([1, 2, 3].entries()).should.equal('array iterator');
  });

  it('should detect type of errors as `error`', () => {
    typeOf(new Error).should.equal('error');
    typeOf(new EvalError).should.equal('error');
    typeOf(new RangeError).should.equal('error');
    typeOf(new ReferenceError).should.equal('error');
    typeOf(new SyntaxError).should.equal('error');
    typeOf(new TypeError).should.equal('error');
    typeOf(new URIError).should.equal('error');
  });

  it('should detect type of symbols as `symbol`', () => {
    typeOf(Symbol()).should.equal('symbol');
    typeOf(Symbol('foo')).should.equal('symbol');
  });

  it('should detect type of strings as `string`', () => {
    typeOf('').should.equal('string');
    typeOf('foo').should.equal('string');
    typeOf('123').should.equal('string');
    typeOf(`${123}`).should.equal('string');
    typeOf(new String(NaN)).should.equal('string');
  });

  it('should detect type of numbers as `number`', () => {
    typeOf(NaN).should.equal('number');
    typeOf(Infinity).should.equal('number');
    typeOf(new Number(666)).should.equal('number')
    typeOf(2410).should.equal('number');
    typeOf(0b00000001).should.equal('number');
  });

  it('should detect type of booleans as `boolean`', () => {
    typeOf(true).should.equal('boolean');
    typeOf(false).should.equal('boolean');
    typeOf(new Boolean('NaN')).should.equal('boolean')
  });

  it('should detect type of undefined as `undefined`', () => {
    typeOf(undefined).should.equal('undefined');
    typeOf(void 0).should.equal('undefined');
  });

  it('should detect type of null as `null`', () => {
    typeOf(null).should.equal('null');
    typeOf(Object.getPrototypeOf(Object.prototype)).should.equal('null');
  });

});
