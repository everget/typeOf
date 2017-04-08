const should = require('chai').should();
const typeOf = require('../index');

describe('typeOf', () => {
  it('should be defined as a function', () => {
    typeOf.should.exist;
    typeOf.should.be.a('function');
  });

  it('should detects type of Node global', () => {
    typeOf(global).should.equal('global');
  });

  it('should detects type of Node process', () => {
    typeOf(global.process).should.equal('process');
  });

  it('should detects type of plain objects', () => {
    typeOf({}).should.equal('object');
    typeOf({ foo: 1, bar: 2 }).should.equal('object');
    typeOf(Reflect).should.equal('object');
    typeOf(new Proxy({}, {})).should.equal('object');
  });

  it('should detects type of functions', () => {
    typeOf(function() {}).should.equal('function');
    typeOf(() => {}).should.equal('function');
    typeOf(function foo() {}).should.equal('function');
    typeOf(class {}).should.equal('function');
    typeOf(Proxy).should.equal('function');
    typeOf(typeOf).should.equal('function');
  });

  it('should detects type of generator functions', () => {
    typeOf(function*() {}).should.equal('generatorfunction');
    typeOf(function* foo() { yield 'foo' }).should.equal('generatorfunction');
  });

  // it('should detects type of async functions', () => {
  //   typeOf(async function() {}).should.equal('asyncfunction');
  //   typeOf(async () => {}).should.equal('asyncfunction');
  // });

  it('should detects type of maps', () => {
    typeOf(new Map).should.equal('map');
    typeOf(new Map([['foo', 1], ['bar', 2]])).should.equal('map');
  });

  it('should detects type of weakmaps', () => {
    typeOf(new WeakMap).should.equal('weakmap');
    typeOf(new WeakMap([[{}, 1], [() => {}, 2]])).should.equal('weakmap');
  });

  it('should detects type of sets', () => {
    typeOf(new Set).should.equal('set');
    typeOf(new Set([1, 'foo', 'bar'])).should.equal('set');
  });

  it('should detects type of weaksets', () => {
    typeOf(new WeakSet).should.equal('weakset');
    typeOf(new WeakSet([{foo: 1}, {bar: 2}, {baz: 3}])).should.equal('weakset');
  });

  it('should detects type of arrays', () => {
    typeOf(new Array).should.equal('array');
    typeOf(new Array(24)).should.equal('array');
    typeOf([]).should.equal('array');
    typeOf(['typeOf', 'is', 'awesome']).should.equal('array');
  });

  it('should detects type of regexps', () => {
    typeOf(new RegExp).should.equal('regexp');
    typeOf(/foo/i).should.equal('regexp');
  });

  it('should detects type of arguments object', () => {
    typeOf((function() { return arguments })()).should.equal('arguments');
  });

  it('should detects type of iterators', () => {
    typeOf([1, 2, 3].entries()).should.equal('array iterator');
  });

  it('should detects type of errors', () => {
    typeOf(new Error).should.equal('error');
    typeOf(new EvalError).should.equal('error');
    typeOf(new RangeError).should.equal('error');
    typeOf(new ReferenceError).should.equal('error');
    typeOf(new SyntaxError).should.equal('error');
    typeOf(new TypeError).should.equal('error');
    typeOf(new URIError).should.equal('error');
  });

  it('should detects type of symbols', () => {
    typeOf(Symbol()).should.equal('symbol');
    typeOf(Symbol('foo')).should.equal('symbol');
  });

  it('should detects type of strings', () => {
    typeOf('').should.equal('string');
    typeOf('foo').should.equal('string');
    typeOf('123').should.equal('string');
    typeOf(`${123}`).should.equal('string');
    typeOf(new String(NaN)).should.equal('string');
  });

  it('should detects type of numbers', () => {
    typeOf(NaN).should.equal('number');
    typeOf(Infinity).should.equal('number');
    typeOf(new Number(666)).should.equal('number')
    typeOf(2410).should.equal('number');
    typeOf(0b00000001).should.equal('number');
  });

  it('should detects type of booleans', () => {
    typeOf(true).should.equal('boolean');
    typeOf(false).should.equal('boolean');
    typeOf(new Boolean('NaN')).should.equal('boolean')
  });

  it('should detects type of undefined', () => {
    typeOf(undefined).should.equal('undefined');
    typeOf(void 0).should.equal('undefined');
  });

  it('should detects type of null', () => {
    typeOf(null).should.equal('null');
  });
})
