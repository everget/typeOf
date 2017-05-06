/**
 * !
 * typeOf
 * Copyright(c) 2017 @everget Alex Orekhov <alex.everget161@gmail.com>
 * MIT Licensed
 */

'use strict';

const VERSION = '3.0.0';

/**
* @param {*} value - The value for type detection
* @returns {Function} - The result type holder with two static methods
*/
function typeOf(value) {
  /** Detect free variable `global` from Node.js. */
  const freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  const freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  const root = freeGlobal || freeSelf || Function('return this')();

  const weakType = typeof value;

  let result;

  /** Catches `number`, `boolean`, `undefined`, `string`, `symbol` */
  if (weakType !== 'object' && weakType !== 'function') {
    result = weakType;
  }

  if (value === null) {
    result = 'null';
  }

  if (value === root) {
    result = 'global';
  }

  if (!result) {
    result = getTag(value);

    if (result === 'json') {
      result = 'object';
    }
  }

  /**
  * @returns {String} - The type of value
  */
  function resulter() {
    return result;
  }

  /**
  * @returns {String} - The type of value
  */
  resulter.valueOf = () => result;

  /**
  * @param {String} typings - The type of value
  * @throws {TypeError} - Throws `TypeError` if argument is not of `string` type
  *                       or if argument is empty string
  *                       or if types is not matched
  * @returns {Boolean} - Returns `true` if types is matched
  */
  resulter.expect = (typings) => {
    if (typeof typings !== 'string' || typings.length === 0) {
      throw new TypeError('Argument for `expect` function must be non-empty string');
    } else {
      const splitedTypings = typings.trim().split('|').map((str) => str.trim());

      if (splitedTypings.includes(result)) {
        return true;
      } else {
        if (splitedTypings.length === 1) {
          throw new TypeError(`The value is of type \`${result}\` but expected \`${typings}\``);
        } else {
          throw new TypeError(`The value is of type \`${result}\` but expected \`${splitedTypings.join(' | ')}\``);
        }
      }
    }
  }

  return resulter;

  /////////////////////////////

  /**
  * @param {*} value - The value for type detection
  * @returns {String} - The sliced internal [[Class]] property of value
  */
  function getTag(value) {
    return ({}).toString.call(value)
      .slice(8, -1)
      .split(' ')
      .join('')
      .toLowerCase();
  }
}

typeOf.VERSION = VERSION;

module.exports = typeOf;
