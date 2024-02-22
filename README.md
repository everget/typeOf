# typeOf

A smart replacement of the typeof operator and robust type checker. This is my first ever published module on npm (2017).
I have rewritten it to the modern stack (TypeScript, Vitest) without functional changes.

[![codecov](https://codecov.io/gh/everget/typeOf/graph/badge.svg?token=BLRZNVXKZS)](https://codecov.io/gh/everget/typeOf)
[![Coverage Status](https://coveralls.io/repos/github/everget/typeOf/badge.svg?branch=master)](https://coveralls.io/github/everget/typeOf?branch=master)
![License](https://img.shields.io/github/license/everget/typeOf.svg)

### Installation

`pnpm add @everget/typeof`

### Usage

```js
const typeOf = require('@everget/typeof');
// or
import typeOf from '@everget/typeof';
```

```js
let value = 'awesome string';

typeOf(value)();
// => 'string'

typeOf(value) == 'string';
// => true

typeOf(value).expect('string');
// => true

typeOf(value).expect('number');
// => TypeError: The value is of type `string`, but expected `number`
```

```js
/** NOTE: you must use `==` operator for correct work */
let isMap = (value) => typeOf(value)() == 'map';

let smth = new Map();

if (isMap(smth)) {
  /** Do your staff */
}
```

```js
let isFunction = (value) => {
  return typeOf(value).expect('function|asyncfunction|generatorfunction');
}

let smth = async () => {};

if (isFunction(smth)) {
  /** Do your staff */
}
```

```js
function sum(a, b) {
  typeOf(a).expect('number');
  typeOf(b).expect('number');

  return typeOf(a + b).expect('number') && (a + b);
}

sum(1, () => {});
// => TypeError: The value is of type `function`, but expected `number`

sum(1, 2);
// => 3
```

### Examples of returned values

#### ES

Value                               | Type
\----------------------------------- | ----
{}                                  | 'object'
Math                                | 'math'
JSON                                | 'object'
function() {}                       | 'function'
\[]                                  | 'array'
null                                | 'null'
(function() { return arguments })() | 'arguments'
new Error                           | 'error'
undefined                           | 'underfined'

#### ES6, ES7

Value                         | Type
\----------------------------- | ----
Reflect                       | 'object'
class {}                      | 'function'
Proxy                         | 'function'
new Proxy({}, {})             | 'object'
() => {}                      | 'function'
function\* () {}               | 'generatorfunction'
async function() {}           | 'asyncfunction'
Symbol                        | 'function'
Symbol()                      | 'symbol'
new Map                       | 'map'
new WeakMap                   | 'weakmap'
new Set                       | 'set'
new WeakSet                   | 'weakset'
\[1, 2, 3].entries()           | 'arrayiterator'
new Set().entries()           | 'setiterator'
new Map().entries()           | 'mapiterator'
''[Symbol.iterator]()         | 'stringiterator'
new ArrayBuffer()             | 'arraybuffer'
new DataView(new ArrayBuffer) | 'dataview'

#### Browser

Value                              | Type
\---------------------------------- | ----
window                             | 'global'
document                           | 'htmldocument'
localStorage                       | 'storage'
new DOMException                   | 'domexception'
document.createDocumentFragment()  | 'documentfragment'
document.createElement('a')        | 'htmlanchorelement'
document.createElement('body')     | 'htmlbodyelement'
document.createElement('template') | 'htmltemplateelement'
document.createTextNode('')        | 'text'
document.createComment('')         | 'comment'

#### Node.js

Value   | Type
\------- | ----
global  | 'global'
process | 'process'

### Tests

`npm test`

### Release History

* 0.1.0 Initial release
* 0.1.1 Added detection of typed arrays
* 2.0.0 Corrections for global object, Math, JSON, async functions and generators
* 3.0.0 Implemented new usage syntax. Added correct detection of iterators
