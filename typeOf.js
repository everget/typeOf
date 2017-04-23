module.exports = function typeOf(value) {
  let result = getTag(value);

  if (result === 'window') {
    result = 'global';
  }

  if (['asyncfunction', 'generatorfunction'].includes(result)) {
    result = 'function';
  }

  if (result === 'domexception') {
    result = 'error';
  }

  if (['math', 'json'].includes(result)) {
    result = 'object';
  }

  return result;

  function getTag(value) {
    return ({}).toString.call(value)
      .match(/\s([a-zA-Z\d]+(\s[a-zA-Z]+)*)/)[1]
      .toLowerCase();
  }
}
