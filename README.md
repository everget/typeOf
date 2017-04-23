# typeOf
A smart native typeof operator replacement

### Installation

```npm i @everget/typeof -S```

### Usage
```js
const typeOf = require('@everget/typeof');

let isFunction = (value) => typeOf(value) === 'function';

if (isFunction(async () => {})) {
  /** Do your staff */
}
```

### Examples

#### ES
```js
typeOf({})
// => 'object'

typeOf([])
// => 'array'

typeOf(null)
// => 'null'

typeOf((function() { return arguments })())
// => 'arguments'

typeOf(new Error)
// => 'error'

typeOf(undefined)
// => 'underfined'
```

#### ES6
```js
typeOf(Reflect)
// => 'object'

typeOf(class {})
// => 'function'

typeOf(Proxy)
// => 'function'

typeOf(() => {})
// => 'function'

typeOf(function* () {})
// => 'function'

typeOf(async function() {})
// => 'function'

typeOf(new Map)
// => 'map'

typeOf(new WeakMap)
// => 'weakmap'

typeOf(new Set)
// => 'set'

typeOf(new WeakSet)
// => 'weakset'

typeOf([1, 2, 3].entries())
// => 'array iterator'

typeOf(new ArrayBuffer())
// => 'arraybuffer'

typeOf(new DataView(new ArrayBuffer))
// => 'dataview'

typeOf(new Proxy({}, {}))
// => 'object'

typeOf(Symbol())
// => 'symbol'

typeOf(Symbol)
// => 'function'
```

#### Browser
```js
typeOf(window)
// => 'global'

typeOf(localStorage)
// => 'storage'

typeOf(new DOMException)
// => 'error'
```

#### Node.js
```js
typeOf(global)
// => 'global'

typeOf(process)
// => 'process'
```

### Tests

```npm test```

### Release History

* 0.1.0 Initial release
* 0.1.1 Added detection of typed arrays
* 1.0.0 Corrections for global object, Math, JSON, async functions and generators
