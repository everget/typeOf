# typeOf
Smart typeof operator replacement

### Magic
```js
function typeOf(value) {
  let result;

  result = getTag(value);

  return result || void 0;

  function getTag(value) {
    return ({}).toString.call(value)
      .match(/\s([a-zA-Z]+(\s[a-zA-Z]+)*)/)[1]
      .toLowerCase();
  }
}
```

### Examples
```js
typeOf({})
// => 'object'

typeOf([])
// => 'array'

typeOf(null)
// => 'null'

typeOf([1, 2, 3].entries())
// => 'array iterator'

typeOf(class {})
// => 'function'

typeOf(function* () {})
// => 'generatorfunction'

typeOf(Symbol())
// => 'symbol'

typeOf(Symbol)
// => 'function'

typeOf(new ArrayBuffer())
// => 'arraybuffer'

typeOf(new DataView(new ArrayBuffer))
// => 'dataview'

typeOf((function() { return arguments })())
// => 'arguments'

typeOf(new Proxy({}, {}))
// => 'object'

typeOf(Proxy)
// => 'function'

typeOf(localStorage)
// => 'storage'

typeOf(new Error)
// => 'error'

typeOf(new DOMException)
// => 'domexception'
```
