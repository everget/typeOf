module.exports = function typeOf(value) {
  let result;

  result = getTag(value);

  return result || void 0;

  function getTag(value) {
    return ({}).toString.call(value)
      .match(/\s([a-zA-Z\d]+(\s[a-zA-Z]+)*)/)[1]
      .toLowerCase();
  }
}
