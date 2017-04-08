# typeOf
A smart native typeof operator replacement

### Installation

```npm i @everget/typeof -S```

### Usage
```js
const typeOf = require('@everget/typeof');

let isItFunction = typeOf(() => {}) === 'function';
```

### Examples

#### ES5
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

typeOf(class {})
// => 'function'
```

#### ES6
```js
typeOf(Reflect)
// => 'object'

typeOf(function* () {})
// => 'generatorfunction'

typeOf(async function() {})
// => 'asyncfunction'

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

typeOf(Proxy)
// => 'function'

typeOf(new Proxy({}, {}))
// => 'object'

typeOf(Symbol())
// => 'symbol'

typeOf(Symbol)
// => 'function'
```

#### BOM
```js
typeOf(window)
// => 'window'

typeOf(localStorage)
// => 'storage'

typeOf(new DOMException)
// => 'domexception'
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
