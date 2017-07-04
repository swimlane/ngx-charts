/**
 * ngx-charts v"6.0.0" (https://github.com/swimlane/ngx-charts)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-format"), require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("d3-array"), require("d3-brush"), require("d3-color"), require("d3-force"), require("@angular/animations"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("rxjs/Observable"), require("rxjs/add/observable/fromEvent"), require("rxjs/add/operator/debounceTime"));
	else if(typeof define === 'function' && define.amd)
		define("ngx-charts", ["d3-format", "@angular/common", "@angular/core", "@angular/platform-browser", "d3-array", "d3-brush", "d3-color", "d3-force", "@angular/animations", "d3-hierarchy", "d3-interpolate", "d3-scale", "d3-selection", "d3-shape", "d3-time-format", "rxjs/Observable", "rxjs/add/observable/fromEvent", "rxjs/add/operator/debounceTime"], factory);
	else if(typeof exports === 'object')
		exports["ngx-charts"] = factory(require("d3-format"), require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("d3-array"), require("d3-brush"), require("d3-color"), require("d3-force"), require("@angular/animations"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("rxjs/Observable"), require("rxjs/add/observable/fromEvent"), require("rxjs/add/operator/debounceTime"));
	else
		root["ngx-charts"] = factory(root["d3-format"], root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["d3-array"], root["d3-brush"], root["d3-color"], root["d3-force"], root["@angular/animations"], root["d3-hierarchy"], root["d3-interpolate"], root["d3-scale"], root["d3-selection"], root["d3-shape"], root["d3-time-format"], root["rxjs/Observable"], root["rxjs/add/observable/fromEvent"], root["rxjs/add/operator/debounceTime"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__("./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__("./node_modules/ieee754/index.js")
var isArray = __webpack_require__("./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/base-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ngx-charts {\n  float: left;\n  overflow: visible; }\n  .ngx-charts .circle,\n  .ngx-charts .bar,\n  .ngx-charts .arc {\n    cursor: pointer; }\n  .ngx-charts .bar.active, .ngx-charts .bar:hover,\n  .ngx-charts .cell.active,\n  .ngx-charts .cell:hover,\n  .ngx-charts .arc.active,\n  .ngx-charts .arc:hover,\n  .ngx-charts .card.active,\n  .ngx-charts .card:hover {\n    opacity: 0.8;\n    transition: opacity 100ms ease-in-out; }\n  .ngx-charts .bar:focus,\n  .ngx-charts .cell:focus,\n  .ngx-charts .arc:focus,\n  .ngx-charts .card:focus {\n    outline: none; }\n  .ngx-charts g:focus {\n    outline: none; }\n  .ngx-charts .line-series.inactive,\n  .ngx-charts .line-series-range.inactive,\n  .ngx-charts .polar-series-path.inactive,\n  .ngx-charts .polar-series-area.inactive,\n  .ngx-charts .area-series.inactive {\n    transition: opacity 100ms ease-in-out;\n    opacity: .2; }\n  .ngx-charts .line-highlight {\n    display: none; }\n    .ngx-charts .line-highlight.active {\n      display: block; }\n  .ngx-charts .area {\n    opacity: 0.6; }\n  .ngx-charts .circle:hover {\n    cursor: pointer; }\n  .ngx-charts .label {\n    font-size: 12px;\n    font-weight: normal; }\n  .ngx-charts .tooltip-anchor {\n    fill: black; }\n  .ngx-charts .gridline-path {\n    stroke: #ddd;\n    stroke-width: 1;\n    fill: none; }\n  .ngx-charts .refline-path {\n    stroke: #a8b2c7;\n    stroke-width: 1;\n    stroke-dasharray: 5;\n    stroke-dashoffset: 5; }\n  .ngx-charts .refline-label {\n    font-size: 9px; }\n  .ngx-charts .reference-area {\n    fill-opacity: 0.05;\n    fill: #000; }\n  .ngx-charts .gridline-path-dotted {\n    stroke: #ddd;\n    stroke-width: 1;\n    fill: none;\n    stroke-dasharray: 1, 20;\n    stroke-dashoffset: 3; }\n  .ngx-charts .grid-panel rect {\n    fill: none; }\n  .ngx-charts .grid-panel.odd rect {\n    fill: rgba(0, 0, 0, 0.05); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/advanced-legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".advanced-pie-legend {\n  float: left;\n  position: relative;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n          transform: translate(0, -50%); }\n  .advanced-pie-legend .total-value {\n    font-size: 36px; }\n  .advanced-pie-legend .total-label {\n    font-size: 24px;\n    margin-bottom: 19px; }\n  .advanced-pie-legend .legend-items-container {\n    width: 100%; }\n    .advanced-pie-legend .legend-items-container .legend-items {\n      white-space: nowrap;\n      overflow: auto; }\n      .advanced-pie-legend .legend-items-container .legend-items .legend-item {\n        margin-right: 20px;\n        display: inline-block;\n        cursor: pointer; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item:focus {\n          outline: none; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item:hover {\n          color: #000;\n          transition: 0.2s; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value {\n          font-size: 24px;\n          margin-top: -6px;\n          margin-left: 11px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label {\n          font-size: 12px;\n          opacity: 0.7;\n          margin-left: 11px;\n          margin-top: -6px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent {\n          font-size: 24px;\n          opacity: 0.7;\n          margin-left: 11px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color {\n          width: 4px;\n          height: 32px;\n          float: left;\n          margin-right: 7px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".chart-legend {\n  display: inline-block;\n  padding: 0;\n  width: auto !important; }\n  .chart-legend .legend-title {\n    white-space: nowrap;\n    overflow: hidden;\n    margin-left: 10px;\n    margin-bottom: 5px;\n    font-size: 14px;\n    font-weight: bold; }\n  .chart-legend ul, .chart-legend li {\n    padding: 0;\n    margin: 0;\n    list-style: none; }\n  .chart-legend .legend-wrap {\n    width: 90%; }\n  .chart-legend .legend-labels {\n    line-height: 85%;\n    list-style: none;\n    text-align: left;\n    float: left;\n    width: 100%;\n    border-radius: 3px;\n    overflow-y: auto;\n    overflow-x: hidden;\n    white-space: nowrap;\n    background: rgba(0, 0, 0, 0.05); }\n  .chart-legend .legend-label {\n    cursor: pointer;\n    font-size: 90%;\n    margin: 8px;\n    color: #76818a; }\n    .chart-legend .legend-label:hover {\n      color: #000;\n      transition: 0.2s; }\n    .chart-legend .legend-label .active .legend-label-text {\n      color: #000; }\n  .chart-legend .legend-label-color {\n    display: inline-block;\n    height: 15px;\n    width: 15px;\n    margin-right: 5px;\n    color: #5b646b;\n    border-radius: 3px; }\n  .chart-legend .legend-label-text {\n    display: inline-block;\n    vertical-align: top;\n    line-height: 15px;\n    font-size: 12px;\n    width: 100%;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    padding-right: 20px; }\n  .chart-legend .legend-title-text {\n    vertical-align: bottom;\n    display: inline-block;\n    line-height: 16px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/scale-legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".chart-legend {\n  display: inline-block;\n  padding: 0;\n  width: auto !important; }\n  .chart-legend .scale-legend {\n    text-align: center;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  .chart-legend .scale-legend-wrap {\n    display: inline-block;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    width: 30px;\n    border-radius: 5px;\n    margin: 0 auto; }\n  .chart-legend .scale-legend-label {\n    font-size: 12px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/timeline/timeline.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".timeline .brush-background {\n  fill: rgba(0, 0, 0, 0.05); }\n\n.timeline .brush .selection {\n  fill: rgba(0, 0, 0, 0.1);\n  stroke-width: 1px;\n  stroke: #888888; }\n\n.timeline .brush .handle {\n  fill-opacity: 0; }\n\n.timeline .embedded-chart {\n  opacity: 0.6; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/tooltip/tooltip.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ngx-tooltip-content {\n  position: fixed;\n  border-radius: 3px;\n  z-index: 5000;\n  display: block;\n  font-weight: normal;\n  opacity: 0;\n  pointer-events: none !important; }\n  .ngx-tooltip-content.type-popover {\n    background: #fff;\n    color: #060709;\n    border: 1px solid #72809b;\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n    font-size: 13px;\n    padding: 4px; }\n    .ngx-tooltip-content.type-popover .tooltip-caret {\n      position: absolute;\n      z-index: 5001;\n      width: 0;\n      height: 0; }\n      .ngx-tooltip-content.type-popover .tooltip-caret.position-left {\n        border-top: 7px solid transparent;\n        border-bottom: 7px solid transparent;\n        border-left: 7px solid #fff; }\n      .ngx-tooltip-content.type-popover .tooltip-caret.position-top {\n        border-left: 7px solid transparent;\n        border-right: 7px solid transparent;\n        border-top: 7px solid #fff; }\n      .ngx-tooltip-content.type-popover .tooltip-caret.position-right {\n        border-top: 7px solid transparent;\n        border-bottom: 7px solid transparent;\n        border-right: 7px solid #fff; }\n      .ngx-tooltip-content.type-popover .tooltip-caret.position-bottom {\n        border-left: 7px solid transparent;\n        border-right: 7px solid transparent;\n        border-bottom: 7px solid #fff; }\n  .ngx-tooltip-content.type-tooltip {\n    color: #fff;\n    background: rgba(0, 0, 0, 0.75);\n    font-size: 12px;\n    padding: 0 10px;\n    text-align: center;\n    pointer-events: auto; }\n    .ngx-tooltip-content.type-tooltip .tooltip-caret.position-left {\n      border-top: 7px solid transparent;\n      border-bottom: 7px solid transparent;\n      border-left: 7px solid rgba(0, 0, 0, 0.75); }\n    .ngx-tooltip-content.type-tooltip .tooltip-caret.position-top {\n      border-left: 7px solid transparent;\n      border-right: 7px solid transparent;\n      border-top: 7px solid rgba(0, 0, 0, 0.75); }\n    .ngx-tooltip-content.type-tooltip .tooltip-caret.position-right {\n      border-top: 7px solid transparent;\n      border-bottom: 7px solid transparent;\n      border-right: 7px solid rgba(0, 0, 0, 0.75); }\n    .ngx-tooltip-content.type-tooltip .tooltip-caret.position-bottom {\n      border-left: 7px solid transparent;\n      border-right: 7px solid transparent;\n      border-bottom: 7px solid rgba(0, 0, 0, 0.75); }\n  .ngx-tooltip-content .tooltip-label {\n    display: block;\n    line-height: 1em;\n    padding: 8px 5px 5px 5px;\n    font-size: 1em; }\n  .ngx-tooltip-content .tooltip-val {\n    display: block;\n    font-size: 1.3em;\n    line-height: 1em;\n    padding: 0 5px 8px 5px; }\n  .ngx-tooltip-content .tooltip-caret {\n    position: absolute;\n    z-index: 5001;\n    width: 0;\n    height: 0; }\n  .ngx-tooltip-content.position-right {\n    -webkit-transform: translate3d(10px, 0, 0);\n            transform: translate3d(10px, 0, 0); }\n  .ngx-tooltip-content.position-left {\n    -webkit-transform: translate3d(-10px, 0, 0);\n            transform: translate3d(-10px, 0, 0); }\n  .ngx-tooltip-content.position-top {\n    -webkit-transform: translate3d(0, -10px, 0);\n            transform: translate3d(0, -10px, 0); }\n  .ngx-tooltip-content.position-bottom {\n    -webkit-transform: translate3d(0, 10px, 0);\n            transform: translate3d(0, 10px, 0); }\n  .ngx-tooltip-content.animate {\n    opacity: 1;\n    transition: opacity 0.3s, -webkit-transform 0.3s;\n    transition: opacity 0.3s, transform 0.3s;\n    transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    pointer-events: auto; }\n\n.area-tooltip-container {\n  padding: 5px 0;\n  pointer-events: none; }\n\n.tooltip-item {\n  text-align: left;\n  line-height: 1.2em;\n  padding: 5px 0; }\n  .tooltip-item .tooltip-item-color {\n    display: inline-block;\n    height: 12px;\n    width: 12px;\n    margin-right: 5px;\n    color: #5b646b;\n    border-radius: 3px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/force-directed-graph/force-directed-graph.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".force-directed-graph .edge {\n  stroke: #333; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/gauge/gauge.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".gauge .background-arc path {\n  fill: rgba(0, 0, 0, 0.05); }\n\n.gauge .gauge-tick path {\n  stroke: #666; }\n\n.gauge .gauge-tick text {\n  font-size: 12px;\n  fill: #666;\n  font-weight: bold; }\n\n.gauge .gauge-tick-large path {\n  stroke-width: 2px; }\n\n.gauge .gauge-tick-small path {\n  stroke-width: 1px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/gauge/linear-gauge.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".linear-gauge {\n  cursor: pointer; }\n  .linear-gauge .background-bar path {\n    fill: rgba(0, 0, 0, 0.05); }\n  .linear-gauge .units {\n    fill: #666; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/number-card/card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "ngx-charts-number-card .cell .trimmed-label {\n  font-size: 12px;\n  pointer-events: none;\n  text-transform: uppercase;\n  overflow: hidden;\n  text-align: left;\n  line-height: 1em; }\n  ngx-charts-number-card .cell .trimmed-label p {\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    width: 100%;\n    padding: 0;\n    margin: 0; }\n\nngx-charts-number-card .cell .value-text {\n  pointer-events: none; }\n\nngx-charts-number-card .number-card.clickable .cell .card, ngx-charts-number-card .number-card.clickable .cell .card-band {\n  cursor: pointer; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/advanced-pie-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".advanced-pie {\n  display: inline-block;\n  float: left; }\n\n.advanced-pie-legend-wrapper {\n  display: inline-block; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/pie-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".pie-label {\n  font-size: 11px;\n  -webkit-animation: 750ms ease-in fadeIn;\n          animation: 750ms ease-in fadeIn; }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.pie-label-line {\n  -webkit-animation: 3s linear drawOut;\n          animation: 3s linear drawOut;\n  stroke-dasharray: 100%;\n  transition: d 750ms; }\n\n@-webkit-keyframes drawOut {\n  from {\n    stroke-dashoffset: 100%; }\n  to {\n    stroke-dashoffset: 0; } }\n\n@keyframes drawOut {\n  from {\n    stroke-dashoffset: 100%; }\n  to {\n    stroke-dashoffset: 0; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/pie-grid.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".pie-grid .arc1 {\n  opacity: 0.4; }\n\n.pie-grid .percent-label {\n  font-size: 16px;\n  font-weight: 400; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/polar-chart/polar-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".polar-chart .polar-chart-background {\n  fill: none; }\n\n.polar-chart .radial-gridline-path {\n  stroke-dasharray: 10 10;\n  fill: none; }\n\n.polar-chart .pie-label-line {\n  stroke: #2f3646; }\n\n.polar-charts-series .polar-series-area {\n  pointer-events: none; }\n\n.polar-series-path {\n  pointer-events: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/tree-map/tree-map.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".tree-map .treemap-val {\n  font-size: 1.3em;\n  padding-top: 5px;\n  display: inline-block; }\n\n.tree-map .label p {\n  display: table-cell;\n  text-align: center;\n  line-height: 1.2em;\n  vertical-align: middle; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/area-chart/area-chart-normalized.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaChartNormalizedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AreaChartNormalizedComponent = (function (_super) {
    __extends(AreaChartNormalizedComponent, _super);
    function AreaChartNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.showGridLines = true;
        _this.curve = __WEBPACK_IMPORTED_MODULE_2_d3_shape__["curveLinear"];
        _this.activeEntries = [];
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        var _loop_1 = function (i) {
            var val = this_1.xSet[i];
            var d0 = 0;
            var total = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    total += d.value;
                }
            }
            for (var _b = 0, _c = this_1.results; _b < _c.length; _b++) {
                var group = _c[_b];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0: d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_3__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.clipPathId = 'clip' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_id__["a" /* id */])().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartNormalizedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartNormalizedComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [new Date(min), new Date(max)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
            this.xSet = values.slice().sort();
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartNormalizedComponent.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleTime"])();
        }
        else if (this.scaleType === 'linear') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])();
        }
        else if (this.scaleType === 'ordinal') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scalePoint"])()
                .padding(0.1);
        }
        scale
            .range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartNormalizedComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    return AreaChartNormalizedComponent;
}(__WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartNormalizedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartNormalizedComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('seriesTooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartNormalizedComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartNormalizedComponent.prototype, "hideCircles", null);
AreaChartNormalizedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-area-chart-normalized',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [activeEntries]=\"activeEntries\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [showPercentage]=\"true\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g ngx-charts-circle-series\n                type=\"stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            normalized=\"true\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], AreaChartNormalizedComponent);



/***/ }),

/***/ "./src/area-chart/area-chart-stacked.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaChartStackedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AreaChartStackedComponent = (function (_super) {
    __extends(AreaChartStackedComponent, _super);
    function AreaChartStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.showGridLines = true;
        _this.curve = __WEBPACK_IMPORTED_MODULE_3_d3_shape__["curveLinear"];
        _this.activeEntries = [];
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartStackedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        var _loop_1 = function (i) {
            var val = this_1.xSet[i];
            var d0 = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0: d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.clipPathId = 'clip' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_id__["a" /* id */])().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartStackedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartStackedComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [new Date(min), new Date(max)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
            this.xSet = values.slice().sort();
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartStackedComponent.prototype.getYDomain = function () {
        var _this = this;
        var domain = [];
        var _loop_2 = function (i) {
            var val = this_2.xSet[i];
            var sum = 0;
            for (var _i = 0, _a = this_2.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    sum += d.value;
                }
            }
            domain.push(sum);
        };
        var this_2 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_2(i);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    AreaChartStackedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartStackedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleTime"])();
        }
        else if (this.scaleType === 'linear') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])();
        }
        else if (this.scaleType === 'ordinal') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scalePoint"])()
                .padding(0.1);
        }
        scale
            .range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartStackedComponent.prototype.getYScale = function (domain, height) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartStackedComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartStackedComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartStackedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartStackedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartStackedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartStackedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartStackedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartStackedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartStackedComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    return AreaChartStackedComponent;
}(__WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AreaChartStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartStackedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartStackedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartStackedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartStackedComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('seriesTooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartStackedComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartStackedComponent.prototype, "hideCircles", null);
AreaChartStackedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-area-chart-stacked',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [activeEntries]=\"activeEntries\"\n              stacked=\"true\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n              <svg:g ngx-charts-circle-series\n                type=\"stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            stacked=\"true\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], AreaChartStackedComponent);



/***/ }),

/***/ "./src/area-chart/area-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AreaChartComponent = (function (_super) {
    __extends(AreaChartComponent, _super);
    function AreaChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.showGridLines = true;
        _this.curve = __WEBPACK_IMPORTED_MODULE_3_d3_shape__["curveLinear"];
        _this.activeEntries = [];
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.clipPathId = 'clip' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_id__["a" /* id */])().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [new Date(min), new Date(max)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
            this.xSet = values.slice().sort();
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    AreaChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleTime"])();
        }
        else if (this.scaleType === 'linear') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])();
        }
        else if (this.scaleType === 'ordinal') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scalePoint"])()
                .padding(0.1);
        }
        scale.range([0, width])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartComponent.prototype.getYScale = function (domain, height) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    return AreaChartComponent;
}(__WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "state", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "autoScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AreaChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AreaChartComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AreaChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('seriesTooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AreaChartComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AreaChartComponent.prototype, "hideCircles", null);
AreaChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-area-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], AreaChartComponent);



/***/ }),

/***/ "./src/area-chart/area-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AreaChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__area_chart_component__ = __webpack_require__("./src/area-chart/area-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__area_chart_normalized_component__ = __webpack_require__("./src/area-chart/area-chart-normalized.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__area_chart_stacked_component__ = __webpack_require__("./src/area-chart/area-chart-stacked.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__area_series_component__ = __webpack_require__("./src/area-chart/area-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__area_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart_normalized_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__area_chart_stacked_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__area_series_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    return AreaChartModule;
}());
AreaChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_5__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__area_chart_component__["a" /* AreaChartComponent */],
            __WEBPACK_IMPORTED_MODULE_2__area_chart_normalized_component__["a" /* AreaChartNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_3__area_chart_stacked_component__["a" /* AreaChartStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_4__area_series_component__["a" /* AreaSeriesComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__area_chart_component__["a" /* AreaChartComponent */],
            __WEBPACK_IMPORTED_MODULE_2__area_chart_normalized_component__["a" /* AreaChartNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_3__area_chart_stacked_component__["a" /* AreaChartStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_4__area_series_component__["a" /* AreaSeriesComponent */]
        ]
    })
], AreaChartModule);



/***/ }),

/***/ "./src/area-chart/area-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_sort__ = __webpack_require__("./src/utils/sort.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AreaSeriesComponent = (function () {
    function AreaSeriesComponent() {
        this.stacked = false;
        this.normalized = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var currentArea;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["area"])()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["area"])()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            currentArea = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["area"])()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["area"])()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_sort__["a" /* sortLinear */])(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_sort__["b" /* sortByTime */])(data, 'name');
        }
        else {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_sort__["c" /* sortByDomain */])(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                var max = Math.max.apply(Math, d1values);
                var min = Math.min.apply(Math, d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    return AreaSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaSeriesComponent.prototype, "stacked", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaSeriesComponent.prototype, "normalized", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AreaSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "select", void 0);
AreaSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-area-series]',
        template: "\n    <svg:g ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], AreaSeriesComponent);



/***/ }),

/***/ "./src/area-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__area_chart_module__ = __webpack_require__("./src/area-chart/area-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__area_chart_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__area_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__area_chart_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__area_chart_module__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__area_chart_module__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__area_chart_component__ = __webpack_require__("./src/area-chart/area-chart.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__area_chart_normalized_component__ = __webpack_require__("./src/area-chart/area-chart-normalized.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__area_chart_stacked_component__ = __webpack_require__("./src/area-chart/area-chart-stacked.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__area_series_component__ = __webpack_require__("./src/area-chart/area-series.component.ts");
/* unused harmony namespace reexport */







/***/ }),

/***/ "./src/bar-chart/bar-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bar_component__ = __webpack_require__("./src/bar-chart/bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bar_horizontal_component__ = __webpack_require__("./src/bar-chart/bar-horizontal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bar_horizontal_2d_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-2d.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bar_horizontal_normalized_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-normalized.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bar_horizontal_stacked_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-stacked.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bar_vertical_component__ = __webpack_require__("./src/bar-chart/bar-vertical.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bar_vertical_2d_component__ = __webpack_require__("./src/bar-chart/bar-vertical-2d.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bar_vertical_normalized_component__ = __webpack_require__("./src/bar-chart/bar-vertical-normalized.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bar_vertical_stacked_component__ = __webpack_require__("./src/bar-chart/bar-vertical-stacked.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__series_horizontal_component__ = __webpack_require__("./src/bar-chart/series-horizontal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__series_vertical_component__ = __webpack_require__("./src/bar-chart/series-vertical.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__bar_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_horizontal_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__bar_horizontal_2d_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__bar_horizontal_normalized_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__bar_horizontal_stacked_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__bar_vertical_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__bar_vertical_2d_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__bar_vertical_normalized_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_10__bar_vertical_stacked_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_11__series_horizontal_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_12__series_vertical_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var BarChartModule = (function () {
    function BarChartModule() {
    }
    return BarChartModule;
}());
BarChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__bar_component__["a" /* BarComponent */],
            __WEBPACK_IMPORTED_MODULE_3__bar_horizontal_component__["a" /* BarHorizontalComponent */],
            __WEBPACK_IMPORTED_MODULE_4__bar_horizontal_2d_component__["a" /* BarHorizontal2DComponent */],
            __WEBPACK_IMPORTED_MODULE_5__bar_horizontal_normalized_component__["a" /* BarHorizontalNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_6__bar_horizontal_stacked_component__["a" /* BarHorizontalStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_7__bar_vertical_component__["a" /* BarVerticalComponent */],
            __WEBPACK_IMPORTED_MODULE_8__bar_vertical_2d_component__["a" /* BarVertical2DComponent */],
            __WEBPACK_IMPORTED_MODULE_9__bar_vertical_normalized_component__["a" /* BarVerticalNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_10__bar_vertical_stacked_component__["a" /* BarVerticalStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_11__series_horizontal_component__["a" /* SeriesHorizontal */],
            __WEBPACK_IMPORTED_MODULE_12__series_vertical_component__["a" /* SeriesVerticalComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__bar_component__["a" /* BarComponent */],
            __WEBPACK_IMPORTED_MODULE_3__bar_horizontal_component__["a" /* BarHorizontalComponent */],
            __WEBPACK_IMPORTED_MODULE_4__bar_horizontal_2d_component__["a" /* BarHorizontal2DComponent */],
            __WEBPACK_IMPORTED_MODULE_5__bar_horizontal_normalized_component__["a" /* BarHorizontalNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_6__bar_horizontal_stacked_component__["a" /* BarHorizontalStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_7__bar_vertical_component__["a" /* BarVerticalComponent */],
            __WEBPACK_IMPORTED_MODULE_8__bar_vertical_2d_component__["a" /* BarVertical2DComponent */],
            __WEBPACK_IMPORTED_MODULE_9__bar_vertical_normalized_component__["a" /* BarVerticalNormalizedComponent */],
            __WEBPACK_IMPORTED_MODULE_10__bar_vertical_stacked_component__["a" /* BarVerticalStackedComponent */],
            __WEBPACK_IMPORTED_MODULE_11__series_horizontal_component__["a" /* SeriesHorizontal */],
            __WEBPACK_IMPORTED_MODULE_12__series_vertical_component__["a" /* SeriesVerticalComponent */]
        ]
    })
], BarChartModule);



/***/ }),

/***/ "./src/bar-chart/bar-horizontal-2d.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarHorizontal2DComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarHorizontal2DComponent = (function (_super) {
    __extends(BarHorizontal2DComponent, _super);
    function BarHorizontal2DComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.groupPadding = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarHorizontal2DComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal2DComponent.prototype.getGroupScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarHorizontal2DComponent.prototype.getInnerScale = function () {
        var height = this.groupScale.bandwidth();
        var spacing = this.innerDomain.length / (height / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, height])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2DComponent.prototype.getValueScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontal2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontal2DComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontal2DComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontal2DComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.name) + ")";
    };
    BarHorizontal2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontal2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontal2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontal2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontal2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontal2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontal2DComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontal2DComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarHorizontal2DComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontal2DComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontal2DComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "groupPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontal2DComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontal2DComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontal2DComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontal2DComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarHorizontal2DComponent.prototype, "tooltipTemplate", void 0);
BarHorizontal2DComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-horizontal-2d',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-grid-panel-series\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\">\n        </svg:g>\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            [xScale]=\"valueScale\"\n            [activeEntries]=\"activeEntries\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [roundEdges]=\"roundEdges\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarHorizontal2DComponent);



/***/ }),

/***/ "./src/bar-chart/bar-horizontal-normalized.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarHorizontalNormalizedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarHorizontalNormalizedComponent = (function (_super) {
    __extends(BarHorizontalNormalizedComponent, _super);
    function BarHorizontalNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarHorizontalNormalizedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalNormalizedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarHorizontalNormalizedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalNormalizedComponent.prototype.getXScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalNormalizedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarHorizontalNormalizedComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarHorizontalNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalNormalizedComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalNormalizedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarHorizontalNormalizedComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalNormalizedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-horizontal-normalized',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarHorizontalNormalizedComponent);



/***/ }),

/***/ "./src/bar-chart/bar-horizontal-stacked.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarHorizontalStackedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarHorizontalStackedComponent = (function (_super) {
    __extends(BarHorizontalStackedComponent, _super);
    function BarHorizontalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarHorizontalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontalStackedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStackedComponent.prototype.getXScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarHorizontalStackedComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalStackedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalStackedComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalStackedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarHorizontalStackedComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalStackedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-horizontal-stacked',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarHorizontalStackedComponent);



/***/ }),

/***/ "./src/bar-chart/bar-horizontal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarHorizontalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BarHorizontalComponent = (function (_super) {
    __extends(BarHorizontalComponent, _super);
    function BarHorizontalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarHorizontalComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .range([0, this.dims.width])
            .domain(this.xDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontalComponent.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarHorizontalComponent.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarHorizontalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarHorizontalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.yDomain;
        }
        else {
            domain = this.xDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_3__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.yDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.xDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarHorizontalComponent;
}(__WEBPACK_IMPORTED_MODULE_4__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarHorizontalComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarHorizontalComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarHorizontalComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarHorizontalComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarHorizontalComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarHorizontalComponent.prototype, "tooltipTemplate", void 0);
BarHorizontalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-horizontal',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-horizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], BarHorizontalComponent);



/***/ }),

/***/ "./src/bar-chart/bar-vertical-2d.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarVertical2DComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarVertical2DComponent = (function (_super) {
    __extends(BarVertical2DComponent, _super);
    function BarVertical2DComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.scaleType = 'ordinal';
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.groupPadding = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVertical2DComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical2DComponent.prototype.getGroupScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarVertical2DComponent.prototype.getInnerScale = function () {
        var width = this.groupScale.bandwidth();
        var spacing = this.innerDomain.length / (width / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, width])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2DComponent.prototype.getValueScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVertical2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVertical2DComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.name) + ", 0)";
    };
    BarVertical2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVertical2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVertical2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVertical2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVertical2DComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVertical2DComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarVertical2DComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVertical2DComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarVertical2DComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVertical2DComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "groupPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVertical2DComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVertical2DComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVertical2DComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVertical2DComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarVertical2DComponent.prototype, "tooltipTemplate", void 0);
BarVertical2DComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-vertical-2d',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-grid-panel-series\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\">\n        </svg:g>\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n          [activeEntries]=\"activeEntries\"\n          [xScale]=\"innerScale\"\n          [yScale]=\"valueScale\"\n          [colors]=\"colors\"\n          [series]=\"group.series\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [seriesName]=\"group.name\"\n          [roundEdges]=\"roundEdges\"\n          (select)=\"onClick($event, group)\"\n          (activate)=\"onActivate($event, group)\"\n          (deactivate)=\"onDeactivate($event, group)\"\n        />\n        </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarVertical2DComponent);



/***/ }),

/***/ "./src/bar-chart/bar-vertical-normalized.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarVerticalNormalizedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarVerticalNormalizedComponent = (function (_super) {
    __extends(BarVerticalNormalizedComponent, _super);
    function BarVerticalNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVerticalNormalizedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalNormalizedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVerticalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarVerticalNormalizedComponent.prototype.getXScale = function () {
        var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalNormalizedComponent.prototype.getYScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalNormalizedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarVerticalNormalizedComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalNormalizedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalNormalizedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalNormalizedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalNormalizedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarVerticalNormalizedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalNormalizedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalNormalizedComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalNormalizedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalNormalizedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalNormalizedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarVerticalNormalizedComponent.prototype, "tooltipTemplate", void 0);
BarVerticalNormalizedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-vertical-normalized',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-vertical\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarVerticalNormalizedComponent);



/***/ }),

/***/ "./src/bar-chart/bar-vertical-stacked.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarVerticalStackedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BarVerticalStackedComponent = (function (_super) {
    __extends(BarVerticalStackedComponent, _super);
    function BarVerticalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVerticalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalStackedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVerticalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVerticalStackedComponent.prototype.getXScale = function () {
        var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStackedComponent.prototype.getYScale = function () {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarVerticalStackedComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalStackedComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalStackedComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalStackedComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalStackedComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalStackedComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalStackedComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalStackedComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalStackedComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarVerticalStackedComponent.prototype, "tooltipTemplate", void 0);
BarVerticalStackedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-vertical-stacked',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-vertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                        transform: '*',
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0, transform: 'scale(0)' }))
                ])
            ])
        ]
    })
], BarVerticalStackedComponent);



/***/ }),

/***/ "./src/bar-chart/bar-vertical.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarVerticalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BarVerticalComponent = (function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVerticalComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_3__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return BarVerticalComponent;
}(__WEBPACK_IMPORTED_MODULE_4__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BarVerticalComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarVerticalComponent.prototype, "barPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BarVerticalComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
BarVerticalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bar-vertical',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\">\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], BarVerticalComponent);



/***/ }),

/***/ "./src/bar-chart/bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_shape_helper__ = __webpack_require__("./src/common/shape.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BarComponent = (function () {
    function BarComponent(element, location) {
        this.location = location;
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    BarComponent.prototype.update = function () {
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_id__["a" /* id */])().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.animateToCurrentForm();
    };
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.animateToCurrentForm = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(500)
            .attr('d', path);
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    BarComponent.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        var edges = [false, false, false, false];
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    };
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    Object.defineProperty(BarComponent.prototype, "edges", {
        get: function () {
            var edges = [false, false, false, false];
            if (this.roundEdges) {
                if (this.orientation === 'vertical') {
                    if (this.data.value > 0) {
                        edges = [true, true, false, false];
                    }
                    else {
                        edges = [false, false, true, true];
                    }
                }
                else if (this.orientation === 'horizontal') {
                    if (this.data.value > 0) {
                        edges = [false, true, false, true];
                    }
                    else {
                        edges = [true, false, true, false];
                    }
                }
            }
            return edges;
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    return BarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "x", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "y", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "orientation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "offset", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BarComponent.prototype, "stops", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BarComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseEnter", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseLeave", null);
BarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-bar]',
        template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [class.active]=\"isActive\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], BarComponent);



/***/ }),

/***/ "./src/bar-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__ = __webpack_require__("./src/bar-chart/bar-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["j"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["k"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["l"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_0__bar_chart_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bar_component__ = __webpack_require__("./src/bar-chart/bar.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bar_horizontal_component__ = __webpack_require__("./src/bar-chart/bar-horizontal.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bar_horizontal_2d_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-2d.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bar_horizontal_normalized_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-normalized.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bar_horizontal_stacked_component__ = __webpack_require__("./src/bar-chart/bar-horizontal-stacked.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__series_horizontal_component__ = __webpack_require__("./src/bar-chart/series-horizontal.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bar_vertical_component__ = __webpack_require__("./src/bar-chart/bar-vertical.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bar_vertical_2d_component__ = __webpack_require__("./src/bar-chart/bar-vertical-2d.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bar_vertical_normalized_component__ = __webpack_require__("./src/bar-chart/bar-vertical-normalized.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__bar_vertical_stacked_component__ = __webpack_require__("./src/bar-chart/bar-vertical-stacked.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__series_vertical_component__ = __webpack_require__("./src/bar-chart/series-vertical.component.ts");
/* unused harmony namespace reexport */














/***/ }),

/***/ "./src/bar-chart/series-horizontal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesHorizontal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SeriesHorizontal = (function () {
    function SeriesHorizontal() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _this = this;
        this.updateTooltipSettings();
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(label);
            var roundEdges = _this.roundEdges;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                formattedLabel: formattedLabel
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = Math.abs(_this.xScale(value) - _this.xScale(0));
                if (value < 0) {
                    bar.x = _this.xScale(value);
                }
                else {
                    bar.x = _this.xScale(0);
                }
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
            }
            bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
    };
    SeriesHorizontal.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesHorizontal.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesHorizontal.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.select.emit(data);
    };
    return SeriesHorizontal;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "series", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesHorizontal.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesHorizontal.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SeriesHorizontal.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SeriesHorizontal.prototype, "seriesName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], SeriesHorizontal.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesHorizontal.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesHorizontal.prototype, "deactivate", void 0);
SeriesHorizontal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-series-horizontal]',
        template: "\n    <svg:g ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesHorizontal);



/***/ }),

/***/ "./src/bar-chart/series-vertical.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeriesVerticalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SeriesVerticalComponent = (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _this = this;
        this.updateTooltipSettings();
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(label);
            var roundEdges = _this.roundEdges;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(0));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
            }
            bar.tooltipText = _this.tooltipDisabled ? undefined : "\n        <span class=\"tooltip-label\">" + tooltipLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
    };
    SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    return SeriesVerticalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "series", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesVerticalComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SeriesVerticalComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SeriesVerticalComponent.prototype, "seriesName", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SeriesVerticalComponent.prototype, "roundEdges", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SeriesVerticalComponent.prototype, "deactivate", void 0);
SeriesVerticalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-series-vertical]',
        template: "\n    <svg:g ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0 }))
                ])
            ])
        ]
    })
], SeriesVerticalComponent);



/***/ }),

/***/ "./src/bubble-chart/bubble-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BubbleChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__ = __webpack_require__("./src/bubble-chart/bubble-chart.utils.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BubbleChartComponent = (function (_super) {
    __extends(BubbleChartComponent, _super);
    function BubbleChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showGridLines = true;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.xAxis = true;
        _this.yAxis = true;
        _this.roundDomains = false;
        _this.maxRadius = 10;
        _this.minRadius = 3;
        _this.schemeType = 'ordinal';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.scaleType = 'linear';
        _this.margin = [10, 20, 10, 20];
        _this.bubblePadding = [0, 0, 0, 0];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.activeEntries = [];
        return _this;
    }
    BubbleChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        this.seriesDomain = this.results.map(function (d) { return d.name; });
        this.rDomain = this.getRDomain();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.transform = "translate(" + this.dims.xOffset + "," + this.margin[0] + ")";
        var colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, colorDomain, this.customColors);
        this.data = this.results;
        this.minRadius = Math.max(this.minRadius, 1);
        this.maxRadius = Math.max(this.maxRadius, 1);
        this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
        this.bubblePadding = [0, 0, 0, 0];
        this.setScales();
        this.bubblePadding = this.getBubblePadding();
        this.setScales();
        this.legendOptions = this.getLegendOptions();
    };
    BubbleChartComponent.prototype.hideCircles = function () {
        this.deactivateAll();
    };
    BubbleChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    BubbleChartComponent.prototype.getBubblePadding = function () {
        var yMin = 0;
        var xMin = 0;
        var yMax = this.dims.height;
        var xMax = this.dims.width;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var s = _a[_i];
            for (var _b = 0, _c = s.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var r = this.rScale(d.r);
                var cx = (this.xScaleType === 'linear') ? this.xScale(Number(d.x)) : this.xScale(d.x);
                var cy = (this.yScaleType === 'linear') ? this.yScale(Number(d.y)) : this.yScale(d.y);
                xMin = Math.max(r - cx, xMin);
                yMin = Math.max(r - cy, yMin);
                yMax = Math.max(cy + r, yMax);
                xMax = Math.max(cx + r, xMax);
            }
        }
        xMax = Math.max(xMax - this.dims.width, 0);
        yMax = Math.max(yMax - this.dims.height, 0);
        return [yMin, xMax, yMax, xMin];
    };
    BubbleChartComponent.prototype.setScales = function () {
        this.xScale = this.getXScale(this.xDomain, this.dims.width - this.bubblePadding[1]);
        this.yScale = this.getYScale(this.yDomain, this.dims.height - this.bubblePadding[2]);
    };
    BubbleChartComponent.prototype.getYScale = function (domain, height) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["a" /* getScale */])(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getXScale = function (domain, width) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["a" /* getScale */])(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getRScale = function (domain, range) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range(range)
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BubbleChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            position: this.legendPosition,
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BubbleChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.x)) {
                    values.push(d.x);
                }
            }
        }
        this.xScaleType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["b" /* getScaleType */])(values);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["c" /* getDomain */])(values, this.xScaleType, this.autoScale);
    };
    BubbleChartComponent.prototype.getYDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.y)) {
                    values.push(d.y);
                }
            }
        }
        this.yScaleType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["b" /* getScaleType */])(values);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__bubble_chart_utils__["c" /* getDomain */])(values, this.yScaleType, this.autoScale);
    };
    BubbleChartComponent.prototype.getRDomain = function () {
        var min = Infinity;
        var max = -Infinity;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var value = Number(d.r) || 1;
                min = Math.min(min, value);
                max = Math.max(max, value);
            }
        }
        return [min, max];
    };
    BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BubbleChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    BubbleChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    return BubbleChartComponent;
}(__WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "maxRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "minRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "autoScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleChartComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleChartComponent.prototype, "legendPosition", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BubbleChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], BubbleChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BubbleChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BubbleChartComponent.prototype, "hideCircles", null);
BubbleChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-bubble-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath>\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"/>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"/>\n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n        <svg:g *ngFor=\"let series of data; trackBy:trackBy\" [@animationState]=\"'active'\">\n          <svg:g ngx-charts-bubble-series\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [rScale]=\"rScale\"\n            [xScaleType]=\"xScaleType\"\n            [yScaleType]=\"yScaleType\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [activeEntries]=\"activeEntries\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            (select)=\"onClick($event, series)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\" />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0
                    }))
                ])
            ])
        ]
    })
], BubbleChartComponent);



/***/ }),

/***/ "./src/bubble-chart/bubble-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BubbleChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bubble_chart_component__ = __webpack_require__("./src/bubble-chart/bubble-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bubble_series_component__ = __webpack_require__("./src/bubble-chart/bubble-series.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__bubble_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__bubble_series_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BubbleChartModule = (function () {
    function BubbleChartModule() {
    }
    return BubbleChartModule;
}());
BubbleChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__bubble_chart_component__["a" /* BubbleChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__bubble_series_component__["a" /* BubbleSeriesComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__bubble_chart_component__["a" /* BubbleChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__bubble_series_component__["a" /* BubbleSeriesComponent */]
        ]
    })
], BubbleChartModule);



/***/ }),

/***/ "./src/bubble-chart/bubble-chart.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getScaleType;
/* harmony export (immutable) */ __webpack_exports__["c"] = getDomain;
/* harmony export (immutable) */ __webpack_exports__["a"] = getScale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_scale__);

function getScaleType(values) {
    var date = true;
    var num = true;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        if (!isDate(value)) {
            date = false;
        }
        if (typeof value !== 'number') {
            num = false;
        }
    }
    if (date)
        return 'time';
    if (num)
        return 'linear';
    return 'ordinal';
}
function isDate(value) {
    if (value instanceof Date) {
        return true;
    }
    return false;
}
function getDomain(values, scaleType, autoScale) {
    var domain = [];
    if (scaleType === 'time') {
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        domain = [min, max];
    }
    else if (scaleType === 'linear') {
        values = values.map(function (v) { return Number(v); });
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        if (!autoScale) {
            min = Math.min(0, min);
        }
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
function getScale(domain, range, scaleType, roundDomains) {
    var scale;
    if (scaleType === 'time') {
        scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_scale__["scaleTime"])()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_scale__["scaleLinear"])()
            .range(range)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_scale__["scalePoint"])()
            .range([range[0], range[1]])
            .domain(domain);
    }
    return scale;
}


/***/ }),

/***/ "./src/bubble-chart/bubble-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BubbleSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BubbleSeriesComponent = (function () {
    function BubbleSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BubbleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    BubbleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                var y = d.y;
                var x = d.x;
                var r = d.r;
                var radius = _this.rScale(r || 1);
                var tooltipLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(d.name);
                var cx = (_this.xScaleType === 'linear') ? _this.xScale(Number(x)) : _this.xScale(x);
                var cy = (_this.yScaleType === 'linear') ? _this.yScale(Number(y)) : _this.yScale(y);
                var color = (_this.colors.scaleType === 'linear') ?
                    _this.colors.getColor(r) :
                    _this.colors.getColor(seriesName);
                var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                var opacity = isActive ? 1 : 0.3;
                var data = {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    radius: d.r
                };
                return {
                    data: data,
                    x: x,
                    y: y,
                    r: r,
                    classNames: ["circle-data-" + i],
                    value: y,
                    label: x,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    isActive: isActive,
                    transform: "translate(" + cx + "," + cy + ")"
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
        var hasRadius = typeof circle.r !== 'undefined';
        var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        var hasSeriesName = circle.seriesName && circle.seriesName.length;
        var radiusValue = hasRadius ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(circle.r) : '';
        var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
        var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
        var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(circle.x);
        var y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_label_helper__["a" /* formatLabel */])(circle.y);
        var name = (hasSeriesName && hasTooltipLabel) ?
            circle.seriesName + " \u2022 " + circle.tooltipLabel :
            circle.seriesName + circle.tooltipLabel;
        var tooltipTitle = (hasSeriesName || hasTooltipLabel) ?
            "<span class=\"tooltip-label\">" + name + "</span>" :
            '';
        return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + xAxisLabel + "</label> " + x + "<br />\n        <label>" + yAxisLabel + "</label> " + y + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + radiusValue + "\n      </span>\n    ";
    };
    BubbleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    BubbleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    BubbleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    BubbleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
        return circle.data.series + " " + circle.data.name;
    };
    return BubbleSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "rScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "xScaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "yScaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BubbleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BubbleSeriesComponent.prototype, "deactivate", void 0);
BubbleSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-bubble-series]',
        template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g ngx-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick($event, circle.label)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"'top'\"\n          [tooltipType]=\"'tooltip'\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0,
                        transform: 'scale(0)'
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(250, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 1, transform: 'scale(1)' }))
                ])
            ])
        ]
    })
], BubbleSeriesComponent);



/***/ }),

/***/ "./src/bubble-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubble_chart_module__ = __webpack_require__("./src/bubble-chart/bubble-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__bubble_chart_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__bubble_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__bubble_chart_module__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bubble_chart_component__ = __webpack_require__("./src/bubble-chart/bubble-chart.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bubble_series_component__ = __webpack_require__("./src/bubble-chart/bubble-series.component.ts");
/* unused harmony namespace reexport */





/***/ }),

/***/ "./src/common/area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AreaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AreaComponent = (function () {
    function AreaComponent(element, location) {
        this.location = location;
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_id__["a" /* id */])().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.animateToCurrentForm();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.animateToCurrentForm = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["select"])(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    };
    return AreaComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "path", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startingPath", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "opacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "endOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "activeLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AreaComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AreaComponent.prototype, "stops", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "select", void 0);
AreaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-area]',
        template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_2__angular_common__["LocationStrategy"]])
], AreaComponent);



/***/ }),

/***/ "./src/common/axes/axes.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AxesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__axis_label_component__ = __webpack_require__("./src/common/axes/axis-label.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__x_axis_component__ = __webpack_require__("./src/common/axes/x-axis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__x_axis_ticks_component__ = __webpack_require__("./src/common/axes/x-axis-ticks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__y_axis_component__ = __webpack_require__("./src/common/axes/y-axis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__y_axis_ticks_component__ = __webpack_require__("./src/common/axes/y-axis-ticks.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__angular_common__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AxesModule = (function () {
    function AxesModule() {
    }
    return AxesModule;
}());
AxesModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["CommonModule"]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__axis_label_component__["a" /* AxisLabelComponent */], __WEBPACK_IMPORTED_MODULE_2__x_axis_component__["a" /* XAxisComponent */], __WEBPACK_IMPORTED_MODULE_3__x_axis_ticks_component__["a" /* XAxisTicksComponent */], __WEBPACK_IMPORTED_MODULE_4__y_axis_component__["a" /* YAxisComponent */], __WEBPACK_IMPORTED_MODULE_5__y_axis_ticks_component__["a" /* YAxisTicksComponent */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__axis_label_component__["a" /* AxisLabelComponent */], __WEBPACK_IMPORTED_MODULE_2__x_axis_component__["a" /* XAxisComponent */], __WEBPACK_IMPORTED_MODULE_3__x_axis_ticks_component__["a" /* XAxisTicksComponent */], __WEBPACK_IMPORTED_MODULE_4__y_axis_component__["a" /* YAxisComponent */], __WEBPACK_IMPORTED_MODULE_5__y_axis_ticks_component__["a" /* YAxisTicksComponent */]]
    })
], AxesModule);



/***/ }),

/***/ "./src/common/axes/axis-label.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AxisLabelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AxisLabelComponent = (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    };
    return AxisLabelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "orient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "offset", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AxisLabelComponent.prototype, "height", void 0);
AxisLabelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-axis-label]',
        template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], AxisLabelComponent);



/***/ }),

/***/ "./src/common/axes/ticks.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reduceTicks;
function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        var reduced = [];
        var modulus = Math.floor(ticks.length / maxTicks);
        for (var i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}


/***/ }),

/***/ "./src/common/axes/x-axis-ticks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XAxisTicksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticks_helper__ = __webpack_require__("./src/common/axes/ticks.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var XAxisTicksComponent = (function () {
    function XAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.dimensionsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
        this.trimLabel = __WEBPACK_IMPORTED_MODULE_1__trim_label_helper__["a" /* trimLabel */];
    }
    XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height: height });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    XAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        var angle = this.getRotationAngle(this.ticks);
        this.adjustedScale = this.scale.bandwidth ? function (d) {
            return this.scale(d) + this.scale.bandwidth() * 0.5;
        } : this.scale;
        this.textTransform = '';
        if (angle !== 0) {
            this.textTransform = "rotate(" + angle + ")";
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = ticks[i].toString();
            if (tick.length > this.maxTicksLength) {
                this.maxTicksLength = tick.length;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8; // need to measure this
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(100);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ticks_helper__["a" /* reduceTicks */])(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicksComponent.prototype.getMaxTicks = function (tickWidth) {
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    return XAxisTicksComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ticksel'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], XAxisTicksComponent.prototype, "ticksElement", void 0);
XAxisTicksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-x-axis-ticks]',
        template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"tickTransform(tick)\">\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          class=\"gridline-path gridline-path-vertical\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [])
], XAxisTicksComponent);



/***/ }),

/***/ "./src/common/axes/x-axis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XAxisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__x_axis_ticks_component__ = __webpack_require__("./src/common/axes/x-axis-ticks.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var XAxisComponent = (function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.dimensionsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.xAxisOffset = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    return XAxisComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "labelText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickInterval", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickCount", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], XAxisComponent.prototype, "xOrient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__x_axis_ticks_component__["a" /* XAxisTicksComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__x_axis_ticks_component__["a" /* XAxisTicksComponent */])
], XAxisComponent.prototype, "ticksComponent", void 0);
XAxisComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-x-axis]',
        template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], XAxisComponent);



/***/ }),

/***/ "./src/common/axes/y-axis-ticks.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YAxisTicksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticks_helper__ = __webpack_require__("./src/common/axes/ticks.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_shape_helper__ = __webpack_require__("./src/common/shape.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YAxisTicksComponent = (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
        this.trimLabel = __WEBPACK_IMPORTED_MODULE_1__trim_label_helper__["a" /* trimLabel */];
    }
    YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width: width });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    YAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.setReferencelines = function () {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_shape_helper__["a" /* roundedRect */])(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [false, false, false, false]);
    };
    YAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ticks_helper__["a" /* reduceTicks */])(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    return YAxisTicksComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "referenceLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], YAxisTicksComponent.prototype, "showRefLabels", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], YAxisTicksComponent.prototype, "showRefLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ticksel'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-y-axis-ticks]',
        template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line *ngIf=\"orient === 'left'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line *ngIf=\"orient === 'right'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"/>\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{trimLabel(tickFormat(refLine.value))}}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\" >\n            {{refLine.name}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [])
], YAxisTicksComponent);



/***/ }),

/***/ "./src/common/axes/y-axis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YAxisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__y_axis_ticks_component__ = __webpack_require__("./src/common/axes/y-axis-ticks.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YAxisComponent = (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.dimensionsChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.yAxisClassName = 'y axis';
        this.yAxisOffset = -5;
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = this.yAxisOffset;
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    return YAxisComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "labelText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickInterval", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickCount", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], YAxisComponent.prototype, "yOrient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "referenceLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showRefLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showRefLabels", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__y_axis_ticks_component__["a" /* YAxisTicksComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__y_axis_ticks_component__["a" /* YAxisTicksComponent */])
], YAxisComponent.prototype, "ticksComponent", void 0);
YAxisComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-y-axis]',
        template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], YAxisComponent);



/***/ }),

/***/ "./src/common/base-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/base-chart.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/base-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__("./src/utils/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BaseChartComponent = (function () {
    function BaseChartComponent(chartElement, zone, cd, location) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.location = location;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    BaseChartComponent.prototype.ngAfterViewInit = function () {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* VisibilityObserver */](this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    };
    BaseChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    };
    BaseChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BaseChartComponent.prototype.update = function () {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        this.width = ~~this.width;
        this.height = ~~this.height;
        if (this.cd) {
            this.cd.markForCheck();
        }
    };
    BaseChartComponent.prototype.getContainerDims = function () {
        var width;
        var height;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            var dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width: width, height: height };
        }
        return null;
    };
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    BaseChartComponent.prototype.formatDates = function () {
        for (var i = 0; i < this.results.length; i++) {
            var g = this.results[i];
            if (g.name instanceof Date) {
                g.name = g.name.toLocaleDateString();
            }
            if (g.series) {
                for (var j = 0; j < g.series.length; j++) {
                    var d = g.series[j];
                    if (d.name instanceof Date) {
                        d.name = d.name.toLocaleDateString();
                    }
                }
            }
        }
    };
    BaseChartComponent.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChartComponent.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        var source = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(window, 'resize', null, null);
        var subscription = source.debounceTime(200).subscribe(function (e) {
            _this.update();
            if (_this.cd) {
                _this.cd.markForCheck();
            }
        });
        this.resizeSubscription = subscription;
    };
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    BaseChartComponent.prototype.cloneData = function (data) {
        var results = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var copy = {
                name: item['name']
            };
            if (item['value'] !== undefined) {
                copy['value'] = item['value'];
            }
            if (item['series'] !== undefined) {
                copy['series'] = [];
                for (var _a = 0, _b = item['series']; _a < _b.length; _a++) {
                    var seriesItem = _b[_a];
                    var seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            if (item['extra'] !== undefined) {
                copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
            }
            results.push(copy);
        }
        return results;
    };
    return BaseChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "results", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BaseChartComponent.prototype, "view", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "scheme", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BaseChartComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "customColors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], BaseChartComponent.prototype, "select", void 0);
BaseChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'base-chart',
        template: "<div></div>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], BaseChartComponent);



/***/ }),

/***/ "./src/common/chart-common.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartCommonModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__charts_chart_component__ = __webpack_require__("./src/common/charts/chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__legend__ = __webpack_require__("./src/common/legend/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__axes_axes_module__ = __webpack_require__("./src/common/axes/axes.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tooltip__ = __webpack_require__("./src/common/tooltip/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__circle_series_component__ = __webpack_require__("./src/common/circle-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__circle_component__ = __webpack_require__("./src/common/circle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__grid_panel_component__ = __webpack_require__("./src/common/grid-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__grid_panel_series_component__ = __webpack_require__("./src/common/grid-panel-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__svg_linear_gradient_component__ = __webpack_require__("./src/common/svg-linear-gradient.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__svg_radial_gradient_component__ = __webpack_require__("./src/common/svg-radial-gradient.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__timeline__ = __webpack_require__("./src/common/timeline/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__area_component__ = __webpack_require__("./src/common/area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tooltip_area_component__ = __webpack_require__("./src/common/tooltip-area.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__count__ = __webpack_require__("./src/common/count/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_14__area_component__["a" /* AreaComponent */],
    __WEBPACK_IMPORTED_MODULE_4__base_chart_component__["a" /* BaseChartComponent */],
    __WEBPACK_IMPORTED_MODULE_16__count__["a" /* CountUpDirective */],
    __WEBPACK_IMPORTED_MODULE_15__tooltip_area_component__["a" /* TooltipArea */],
    __WEBPACK_IMPORTED_MODULE_2__charts_chart_component__["a" /* ChartComponent */],
    __WEBPACK_IMPORTED_MODULE_3__legend__["a" /* LegendComponent */],
    __WEBPACK_IMPORTED_MODULE_3__legend__["b" /* LegendEntryComponent */],
    __WEBPACK_IMPORTED_MODULE_3__legend__["c" /* ScaleLegendComponent */],
    __WEBPACK_IMPORTED_MODULE_8__circle_component__["a" /* CircleComponent */],
    __WEBPACK_IMPORTED_MODULE_7__circle_series_component__["a" /* CircleSeriesComponent */],
    __WEBPACK_IMPORTED_MODULE_9__grid_panel_component__["a" /* GridPanelComponent */],
    __WEBPACK_IMPORTED_MODULE_10__grid_panel_series_component__["a" /* GridPanelSeriesComponent */],
    __WEBPACK_IMPORTED_MODULE_11__svg_linear_gradient_component__["a" /* SvgLinearGradientComponent */],
    __WEBPACK_IMPORTED_MODULE_12__svg_radial_gradient_component__["a" /* SvgRadialGradientComponent */],
    __WEBPACK_IMPORTED_MODULE_13__timeline__["a" /* Timeline */],
    __WEBPACK_IMPORTED_MODULE_3__legend__["d" /* AdvancedLegendComponent */]
];
var ChartCommonModule = (function () {
    function ChartCommonModule() {
    }
    return ChartCommonModule;
}());
ChartCommonModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["Location"],
            {
                provide: __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"],
                useClass: __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            }
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__axes_axes_module__["a" /* AxesModule */],
            __WEBPACK_IMPORTED_MODULE_6__tooltip__["a" /* TooltipModule */]
        ],
        declarations: COMPONENTS.slice(),
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__axes_axes_module__["a" /* AxesModule */],
            __WEBPACK_IMPORTED_MODULE_6__tooltip__["a" /* TooltipModule */]
        ].concat(COMPONENTS)
    })
], ChartCommonModule);



/***/ }),

/***/ "./src/common/charts/chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip__ = __webpack_require__("./src/common/tooltip/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChartComponent = (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.legendLabelClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.legendLabelActivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.legendLabelDeactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tooltipService.injectionService.setRootViewContainer(vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                legendColumns = 1;
            }
            else {
                legendColumns = 2;
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = ~~(this.view[0] * chartColumns / 12.0);
        this.legendWidth = ~~(this.view[0] * legendColumns / 12.0);
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    return ChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "view", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "showLegend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendOptions", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ChartComponent.prototype, "legendLabelClick", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ChartComponent.prototype, "legendLabelActivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ChartComponent.prototype, "legendLabelDeactivate", void 0);
ChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        providers: [__WEBPACK_IMPORTED_MODULE_2__tooltip__["b" /* TooltipService */]],
        selector: 'ngx-charts-chart',
        template: "\n    <div\n      class=\"ngx-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0 }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])('500ms 100ms', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 1 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
        __WEBPACK_IMPORTED_MODULE_2__tooltip__["b" /* TooltipService */]])
], ChartComponent);



/***/ }),

/***/ "./src/common/charts/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chart_component__ = __webpack_require__("./src/common/charts/chart.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chart_component__["a"]; });



/***/ }),

/***/ "./src/common/circle-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircleSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CircleSeriesComponent = (function () {
    function CircleSeriesComponent(location) {
        this.location = location;
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_id__["a" /* id */])().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
        this.circle = this.circles.find(function (c) {
            return c.opacity !== 0;
        });
    };
    CircleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var tooltipLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_label_helper__["a" /* formatLabel */])(label);
            if (value) {
                var cx = void 0;
                if (_this.scaleType === 'time') {
                    cx = _this.xScale(label);
                }
                else if (_this.scaleType === 'linear') {
                    cx = _this.xScale(Number(label));
                }
                else {
                    cx = _this.xScale(label);
                }
                var cy = _this.yScale(_this.type === 'standard' ? value : d.d1);
                var radius = 5;
                var height = _this.yScale.range()[0] - cy;
                var opacity = 0;
                if (label && _this.visibleValue && label.toString() === _this.visibleValue.toString()) {
                    opacity = 1;
                }
                var color = void 0;
                if (_this.colors.scaleType === 'linear') {
                    if (_this.type === 'standard') {
                        color = _this.colors.getColor(value);
                    }
                    else {
                        color = _this.colors.getColor(d.d1);
                    }
                }
                else {
                    color = _this.colors.getColor(seriesName);
                }
                var data = {
                    series: seriesName,
                    value: value,
                    name: label
                };
                return {
                    classNames: ["circle-data-" + i],
                    value: value,
                    label: label,
                    data: data,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    gradientStops: _this.getGradientStops(color),
                    min: d.min,
                    max: d.max
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }
        ];
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    return CircleSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "visibleValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CircleSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleSeriesComponent.prototype, "deactivate", void 0);
CircleSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-circle-series]',
        template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(250, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 1 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common__["LocationStrategy"]])
], CircleSeriesComponent);



/***/ }),

/***/ "./src/common/circle.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CircleComponent = (function () {
    function CircleComponent() {
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = Array.isArray(this.classNames) ?
            this.classNames.join(' ') :
            '';
        this.classNames += 'circle';
    };
    return CircleComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cx", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cy", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "r", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "stroke", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "classNames", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "circleOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "pointerEvents", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onClick", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseEnter", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseLeave", null);
CircleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-circle]',
        template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], CircleComponent);



/***/ }),

/***/ "./src/common/color.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_color_sets__ = __webpack_require__("./src/utils/color-sets.ts");



var ColorHelper = (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof (scheme) === 'string') {
            scheme = __WEBPACK_IMPORTED_MODULE_2__utils_color_sets__["a" /* colorSets */].find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof (scheme) === 'string') {
            scheme = __WEBPACK_IMPORTED_MODULE_2__utils_color_sets__["a" /* colorSets */].find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleQuantile"])()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleOrdinal"])()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            var colorDomain = scheme.domain.slice();
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["range"])(0, 1, 1.0 / colorDomain.length);
            colorScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (this.scaleType === 'linear') {
            var valueScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
                .domain(this.domain)
                .range([0, 1]);
            return (this.scale(valueScale(value)));
        }
        else {
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        var valueScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleBand"])()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 1;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
                    var s = stops_1[_i];
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    };
    return ColorHelper;
}());



/***/ }),

/***/ "./src/common/count/count.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountUpDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__count_helper__ = __webpack_require__("./src/common/count/count.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
var CountUpDirective = (function () {
    function CountUpDirective(cd, zone, element) {
        this.cd = cd;
        this.zone = zone;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.countFinish = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__count_helper__["a" /* decimalChecker */])(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var valueFormatting = this.valueFormatting ||
            (function (data) { return "" + _this.countPrefix + data.value.toLocaleString() + _this.countSuffix; });
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.value = valueFormatting({ value: value });
            _this.cd.markForCheck();
            if (!finished)
                _this.countChange.emit({ value: value, progress: progress });
            if (finished)
                _this.countFinish.emit({ value: value, progress: progress });
        };
        this.animationReq = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__count_helper__["b" /* count */])(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    return CountUpDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], CountUpDirective.prototype, "countDuration", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CountUpDirective.prototype, "countPrefix", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CountUpDirective.prototype, "countSuffix", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CountUpDirective.prototype, "countDecimals", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countTo", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countFrom", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countFinish", void 0);
CountUpDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: '[ngx-charts-count-up]',
        template: "{{value}}"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], CountUpDirective);



/***/ }),

/***/ "./src/common/count/count.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = count;
/* harmony export (immutable) */ __webpack_exports__["a"] = decimalChecker;
// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
}
/**
 * Counts from a number to the end incrementally.
 *
 * @export
 * @param {any} countFrom
 * @param {any} countTo
 * @param {any} countDecimals
 * @param {any} countDuration
 * @param {any} callback
 * @returns
 */
function count(countFrom, countTo, countDecimals, countDuration, callback) {
    var startVal = Number(countFrom);
    var endVal = Number(countTo);
    var countDown = (startVal > endVal);
    var decimals = Math.max(0, countDecimals);
    var dec = Math.pow(10, decimals);
    var duration = Number(countDuration) * 1000;
    var startTime;
    function runCount(timestamp) {
        var frameVal;
        var progress = timestamp - startTime;
        if (countDown) {
            frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
        }
        else {
            frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
        }
        if (countDown) {
            frameVal = (frameVal < endVal) ? endVal : frameVal;
        }
        else {
            frameVal = (frameVal > endVal) ? endVal : frameVal;
        }
        frameVal = Math.round(frameVal * dec) / dec;
        var tick = progress < duration;
        callback({
            value: frameVal,
            progress: progress,
            timestamp: timestamp,
            finished: !tick
        });
        if (tick) {
            return requestAnimationFrame(function (val) { return runCount(val); });
        }
    }
    return requestAnimationFrame(function (timestamp) {
        startTime = timestamp;
        return runCount(timestamp);
    });
}
/**
 * Determine decimals places
 *
 * @export
 * @param {any} countTo
 * @returns
 */
function decimalChecker(countTo) {
    var endVal = Number(countTo);
    if (endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
        return 2;
    }
    return 0;
}


/***/ }),

/***/ "./src/common/count/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__count_directive__ = __webpack_require__("./src/common/count/count.directive.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__count_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__count_helper__ = __webpack_require__("./src/common/count/count.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__count_helper__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__count_helper__["b"]; });




/***/ }),

/***/ "./src/common/grid-layout.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = gridSize;
/* harmony export (immutable) */ __webpack_exports__["a"] = gridLayout;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_scale__);

function gridSize(dims, len, minWidth) {
    var rows = 1;
    var cols = len;
    var width = dims.width;
    var height = dims.height;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
function gridLayout(dims, data, minWidth) {
    var xScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_scale__["scaleBand"])();
    var yScale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_scale__["scaleBand"])();
    var width = dims.width;
    var height = dims.height;
    var _a = gridSize(dims, data.length, minWidth), columns = _a[0], rows = _a[1];
    var xDomain = [];
    var yDomain = [];
    for (var i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (var i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    var res = [];
    var total = getTotal(data);
    var cardWidth = xScale.bandwidth();
    var cardHeight = yScale.bandwidth();
    for (var i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = (total > 0) ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results
        .map(function (d) { return d ? d.value : 0; })
        .reduce(function (sum, val) { return sum + val; }, 0);
}


/***/ }),

/***/ "./src/common/grid-panel-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridPanelSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GridPanelSeriesComponent = (function () {
    function GridPanelSeriesComponent() {
    }
    GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GridPanelSeriesComponent.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeriesComponent.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d, i) {
            var offset;
            var width;
            var height;
            var x;
            var y;
            var className = 'odd';
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = Number.parseInt((position / _this.xScale.step()).toString());
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                width = _this.xScale.bandwidth() + offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = Number.parseInt((position / _this.yScale.step()).toString());
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + offset;
                x = 0;
                y = _this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    return GridPanelSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelSeriesComponent.prototype, "orient", void 0);
GridPanelSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-grid-panel-series]',
        template: "\n    <svg:g ngx-charts-grid-panel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], GridPanelSeriesComponent);



/***/ }),

/***/ "./src/common/grid-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GridPanelComponent = (function () {
    function GridPanelComponent() {
    }
    return GridPanelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "path", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "x", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GridPanelComponent.prototype, "y", void 0);
GridPanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-grid-panel]',
        template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], GridPanelComponent);



/***/ }),

/***/ "./src/common/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chart_common_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__legend__ = __webpack_require__("./src/common/legend/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_1__legend__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_1__legend__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_1__legend__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_1__legend__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip__ = __webpack_require__("./src/common/tooltip/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__count__ = __webpack_require__("./src/common/count/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_3__count__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_3__count__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_3__count__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__timeline__ = __webpack_require__("./src/common/timeline/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_4__timeline__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__color_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__charts__ = __webpack_require__("./src/common/charts/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_6__charts__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__area_component__ = __webpack_require__("./src/common/area.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__area_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__base_chart_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__circle_component__ = __webpack_require__("./src/common/circle.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__circle_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__circle_series_component__ = __webpack_require__("./src/common/circle-series.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_10__circle_series_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__grid_layout_helper__ = __webpack_require__("./src/common/grid-layout.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_11__grid_layout_helper__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_11__grid_layout_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__grid_panel_component__ = __webpack_require__("./src/common/grid-panel.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_12__grid_panel_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__grid_panel_series_component__ = __webpack_require__("./src/common/grid-panel-series.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_13__grid_panel_series_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__svg_linear_gradient_component__ = __webpack_require__("./src/common/svg-linear-gradient.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_14__svg_linear_gradient_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__svg_radial_gradient_component__ = __webpack_require__("./src/common/svg-radial-gradient.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_15__svg_radial_gradient_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__tooltip_area_component__ = __webpack_require__("./src/common/tooltip-area.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_16__tooltip_area_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__tick_format_helper__ = __webpack_require__("./src/common/tick-format.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_17__tick_format_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_18__trim_label_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_19__view_dimensions_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__label_helper__ = __webpack_require__("./src/common/label.helper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_20__label_helper__["a"]; });























/***/ }),

/***/ "./src/common/label.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = formatLabel;
/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */ function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}


/***/ }),

/***/ "./src/common/legend/advanced-legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/advanced-legend.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/legend/advanced-legend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedLegendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdvancedLegendComponent = (function () {
    function AdvancedLegendComponent() {
        this.label = 'Total';
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.legendItems = [];
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d, index) {
            var label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__label_helper__["a" /* formatLabel */])(d.name);
            var value = d.value;
            var percentage = value / _this.total * 100;
            var color = _this.colors.getColor(label);
            return {
                value: value,
                color: color,
                label: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__trim_label_helper__["a" /* trimLabel */])(label, 20),
                originalLabel: d.name,
                percentage: percentage
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    return AdvancedLegendComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], AdvancedLegendComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AdvancedLegendComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AdvancedLegendComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AdvancedLegendComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AdvancedLegendComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AdvancedLegendComponent.prototype, "deactivate", void 0);
AdvancedLegendComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-advanced-legend',
        template: "\n    <div class=\"advanced-pie-legend\"\n      [style.width.px]=\"width\">\n      <div\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\">\n      </div>\n      <div class=\"total-label\">\n        {{label}}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy:trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div\n              class=\"item-color\"\n              [style.background]=\"legendItem.color\">\n            </div>\n            <div\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.value\">\n            </div>\n            <div class=\"item-label\">{{legendItem.label}}</div>\n            <div\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        styles: [__webpack_require__("./src/common/legend/advanced-legend.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], AdvancedLegendComponent);



/***/ }),

/***/ "./src/common/legend/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__legend_component__ = __webpack_require__("./src/common/legend/legend.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__legend_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scale_legend_component__ = __webpack_require__("./src/common/legend/scale-legend.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__scale_legend_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__legend_entry_component__ = __webpack_require__("./src/common/legend/legend-entry.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__legend_entry_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__advanced_legend_component__ = __webpack_require__("./src/common/legend/advanced-legend.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__advanced_legend_component__["a"]; });






/***/ }),

/***/ "./src/common/legend/legend-entry.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LegendEntryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LegendEntryComponent = (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.toggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    return LegendEntryComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendEntryComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "formattedLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LegendEntryComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendEntryComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendEntryComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendEntryComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendEntryComponent.prototype, "toggle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseEnter", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseLeave", null);
LegendEntryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-legend-entry',
        template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], LegendEntryComponent);



/***/ }),

/***/ "./src/common/legend/legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/legend.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/legend/legend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LegendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LegendComponent = (function () {
    function LegendComponent(cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.labelClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.labelActivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.labelDeactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__label_helper__["a" /* formatLabel */])(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var label = _a[_i];
            _loop_1(label);
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        this.labelActivate.emit(item);
    };
    LegendComponent.prototype.deactivate = function (item) {
        this.labelDeactivate.emit(item);
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    return LegendComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendComponent.prototype, "labelClick", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendComponent.prototype, "labelActivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LegendComponent.prototype, "labelDeactivate", void 0);
LegendComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-legend',
        template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
        styles: [__webpack_require__("./src/common/legend/legend.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], LegendComponent);



/***/ }),

/***/ "./src/common/legend/scale-legend.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/legend/scale-legend.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/legend/scale-legend.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScaleLegendComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScaleLegendComponent = (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    return ScaleLegendComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "valueRange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ScaleLegendComponent.prototype, "width", void 0);
ScaleLegendComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-scale-legend',
        template: "\n    <div\n      class=\"scale-legend\"\n      [style.height.px]=\"height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
        styles: [__webpack_require__("./src/common/legend/scale-legend.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]])
], ScaleLegendComponent);



/***/ }),

/***/ "./src/common/shape.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = roundedRect;
/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */
/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */ function roundedRect(x, y, w, h, r, _a) {
    var tl = _a[0], tr = _a[1], bl = _a[2], br = _a[3];
    var retval = '';
    retval = "M" + [x + r, y];
    retval += "h" + (w - 2 * r);
    if (tr) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, r];
    }
    else {
        retval += "h" + r + "v" + r;
    }
    retval += "v" + (h - 2 * r);
    if (br) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, r];
    }
    else {
        retval += "v" + r + "h" + -r;
    }
    retval += "h" + (2 * r - w);
    if (bl) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, -r];
    }
    else {
        retval += "h" + -r + "v" + -r;
    }
    retval += "v" + (2 * r - h);
    if (tl) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, -r];
    }
    else {
        retval += "v" + -r + "h" + r;
    }
    retval += "z";
    return retval;
}


/***/ }),

/***/ "./src/common/svg-linear-gradient.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgLinearGradientComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SvgLinearGradientComponent = (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    return SvgLinearGradientComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "orientation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgLinearGradientComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SvgLinearGradientComponent.prototype, "stops", void 0);
SvgLinearGradientComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-svg-linear-gradient]',
        template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:linearGradient>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], SvgLinearGradientComponent);



/***/ }),

/***/ "./src/common/svg-radial-gradient.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SvgRadialGradientComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SvgRadialGradientComponent = (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        this.stops = this.stops || [{
                offset: 0,
                color: this.color,
                opacity: this.startOpacity
            }, {
                offset: 100,
                color: this.color,
                opacity: this.endOpacity
            }];
    };
    return SvgRadialGradientComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SvgRadialGradientComponent.prototype, "cx", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SvgRadialGradientComponent.prototype, "cy", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SvgRadialGradientComponent.prototype, "stops", void 0);
SvgRadialGradientComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-svg-radial-gradient]',
        template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], SvgRadialGradientComponent);



/***/ }),

/***/ "./src/common/tick-format.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tickFormat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_time_format__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_time_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_time_format__);

function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time_format__["timeFormat"])('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}


/***/ }),

/***/ "./src/common/timeline/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeline_component__ = __webpack_require__("./src/common/timeline/timeline.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__timeline_component__["a"]; });



/***/ }),

/***/ "./src/common/timeline/timeline.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/timeline/timeline.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/timeline/timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timeline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_brush__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_brush___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_brush__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__("./src/utils/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Timeline = (function () {
    function Timeline(element, zone, cd, location) {
        this.zone = zone;
        this.cd = cd;
        this.location = location;
        this.height = 50;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDomainChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        this.dims = this.getDims();
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.filterId = 'filter' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* id */])().toString();
        this.filter = "url(" + pageUrl + "#" + this.filterId + ")";
        this.cd.markForCheck();
    };
    Timeline.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    Timeline.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scaleTime"])()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scaleLinear"])()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scalePoint"])()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_brush__["brushX"])()
            .extent([[0, 0], [width, height]])
            .on('brush end', function () {
            var selection = __WEBPACK_IMPORTED_MODULE_4_d3_selection__["event"].selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
            _this.cd.markForCheck();
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_d3_selection__["select"])(this.element)
            .select('.brush')
            .call(this.brush);
    };
    Timeline.prototype.updateBrush = function () {
        if (!this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_d3_selection__["select"])(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_d3_selection__["select"])(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    };
    Timeline.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    return Timeline;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "view", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "state", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "results", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "scheme", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "customColors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "miniChart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "autoScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], Timeline.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], Timeline.prototype, "onDomainChange", void 0);
Timeline = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-timeline]',
        template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
        styles: [__webpack_require__("./src/common/timeline/timeline.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], Timeline);



/***/ }),

/***/ "./src/common/tooltip-area.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipArea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TooltipArea = (function () {
    function TooltipArea(renderer) {
        this.renderer = renderer;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TooltipArea.prototype.getValues = function (xVal) {
        var results = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
            var groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                var label = item.name;
                if (label instanceof Date) {
                    label = label.toLocaleDateString();
                }
                var val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                var color = void 0;
                if (this.colors.scaleType === 'linear') {
                    var v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                results.push({
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color: color
                });
            }
        }
        return results;
    };
    TooltipArea.prototype.mouseMove = function (event) {
        var xPos = event.offsetX - this.dims.xOffset;
        var closestIndex = this.findClosestPointIndex(xPos);
        var closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            var ev = new MouseEvent('mouseleave', { bubbles: false });
            this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [ev]);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    };
    TooltipArea.prototype.findClosestPointIndex = function (xPos) {
        var minIndex = 0;
        var maxIndex = this.xSet.length - 1;
        var minDiff = Number.MAX_VALUE;
        var closestIndex = 0;
        while (minIndex <= maxIndex) {
            var currentIndex = (minIndex + maxIndex) / 2 | 0;
            var currentElement = this.xScale(this.xSet[currentIndex]);
            var curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    };
    TooltipArea.prototype.showTooltip = function () {
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [event]);
    };
    TooltipArea.prototype.hideTooltip = function () {
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [event]);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    };
    TooltipArea.prototype.getToolTipText = function (tooltipItem) {
        var result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    };
    return TooltipArea;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "xSet", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "results", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipArea.prototype, "showPercentage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipArea.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], TooltipArea.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TooltipArea.prototype, "hover", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tooltipAnchor'),
    __metadata("design:type", Object)
], TooltipArea.prototype, "tooltipAnchor", void 0);
TooltipArea = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-tooltip-area]',
        template: "\n    <svg:g>\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"0\"\n        y=\"0\"\n        [attr.width]=\"dims.width\"\n        [attr.height]=\"dims.height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mousemove)=\"mouseMove($event)\"\n        (mouseleave)=\"hideTooltip()\"\n      />\n      <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div\n            *ngFor=\"let tooltipItem of model\"\n            class=\"tooltip-item\">\n            <span\n              class=\"tooltip-item-color\"\n              [style.background-color]=\"tooltipItem.color\">\n            </span>\n            {{getToolTipText(tooltipItem)}}\n          </xhtml:div>\n        </xhtml:div>\n      </xhtml:ng-template>\n      <svg:rect\n        #tooltipAnchor\n        [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"anchorPos\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"dims.height\"\n        [style.opacity]=\"anchorOpacity\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate\"\n        [tooltipContext]=\"anchorValues\"\n        [tooltipImmediateExit]=\"true\"\n      />\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('inactive => active', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(250, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0.7 }))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])('active => inactive', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0.7,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(250, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({ opacity: 0 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], TooltipArea);



/***/ }),

/***/ "./src/common/tooltip/alignment.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlignmentTypes; });
var AlignmentTypes;
(function (AlignmentTypes) {
    AlignmentTypes[AlignmentTypes["left"] = 'left'] = "left";
    AlignmentTypes[AlignmentTypes["center"] = 'center'] = "center";
    AlignmentTypes[AlignmentTypes["right"] = 'right'] = "right";
})(AlignmentTypes || (AlignmentTypes = {}));


/***/ }),

/***/ "./src/common/tooltip/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tooltip_module__ = __webpack_require__("./src/common/tooltip/tooltip.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tooltip_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tooltip_service__ = __webpack_require__("./src/common/tooltip/tooltip.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tooltip_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_component__ = __webpack_require__("./src/common/tooltip/tooltip.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__tooltip_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip_directive__ = __webpack_require__("./src/common/tooltip/tooltip.directive.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__tooltip_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_type__ = __webpack_require__("./src/common/tooltip/style.type.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__style_type__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alignment_type__ = __webpack_require__("./src/common/tooltip/alignment.type.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__alignment_type__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__show_type__ = __webpack_require__("./src/common/tooltip/show.type.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__show_type__["a"]; });









/***/ }),

/***/ "./src/common/tooltip/injection-registery.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InjectionRegistery; });
var InjectionRegistery = (function () {
    function InjectionRegistery(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegistery.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegistery.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegistery.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegistery.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegistery.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegistery.prototype.destroyByType = function (type) {
        var comps = this.components.get(type);
        if (comps) {
            for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                var comp = comps_1[_i];
                this.destroy(comp);
            }
        }
    };
    InjectionRegistery.prototype.assignDefaults = function (bindings) {
        var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegistery.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegistery.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    return InjectionRegistery;
}());



/***/ }),

/***/ "./src/common/tooltip/injection.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InjectionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
var InjectionService = (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        var rootComponents = this.applicationRef['_rootComponents'];
        if (rootComponents.length)
            return rootComponents[0];
        if (this._container)
            return this._container;
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        // the top most component root node has no `hostView`
        if (!componentRef.hostView)
            return componentRef.element.nativeElement;
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function () {
        return this.getComponentRootNode(this.getRootViewContainer());
    };
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (var _i = 0, bindingKeys_1 = bindingKeys; _i < bindingKeys_1.length; _i++) {
                    var bindingName = bindingKeys_1[_i];
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (var _a = 0, eventKeys_1 = eventKeys; _a < eventKeys_1.length; _a++) {
                    var eventName = eventKeys_1[_a];
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @template T
     * @param {Type<T>} componentClass
     * @param {*} [options={}]
     * @param {Element} [location=this.getRootViewContainerNode()]
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (location === void 0) { location = this.getRootViewContainerNode(); }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.injector);
        var appRef = this.applicationRef;
        var componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        // use the renderer to append the element for univseral support
        var renderer = componentRef.instance.renderer;
        renderer.projectNodes(location, [componentRootNode]);
        return componentRef;
    };
    return InjectionService;
}());
InjectionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
], InjectionService);



/***/ }),

/***/ "./src/common/tooltip/position/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__placement_type__ = __webpack_require__("./src/common/tooltip/position/placement.type.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__placement_type__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__position__ = __webpack_require__("./src/common/tooltip/position/position.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__position__["a"]; });




/***/ }),

/***/ "./src/common/tooltip/position/placement.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacementTypes; });
var PlacementTypes;
(function (PlacementTypes) {
    PlacementTypes[PlacementTypes["top"] = 'top'] = "top";
    PlacementTypes[PlacementTypes["bottom"] = 'bottom'] = "bottom";
    PlacementTypes[PlacementTypes["left"] = 'left'] = "left";
    PlacementTypes[PlacementTypes["right"] = 'right'] = "right";
})(PlacementTypes || (PlacementTypes = {}));


/***/ }),

/***/ "./src/common/tooltip/position/position.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PositionHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__placement_type__ = __webpack_require__("./src/common/tooltip/position/placement.type.ts");

var caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'top') {
        return elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
var PositionHelper = (function () {
    function PositionHelper() {
    }
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} alignment
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, alignment, spacing) {
        var flip = false;
        if (placement === 'right') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
        var top = 0;
        var left = 0;
        if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
        var top = 0;
        var left = 0;
        if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing, alignment) {
        var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
        if (shouldFlip) {
            if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].right) {
                return __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].left;
            }
            else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].left) {
                return __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].right;
            }
            else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].top) {
                return __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].bottom;
            }
            else if (placement === __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].bottom) {
                return __WEBPACK_IMPORTED_MODULE_0__placement_type__["a" /* PlacementTypes */].top;
            }
        }
        return placement;
    };
    return PositionHelper;
}());



/***/ }),

/***/ "./src/common/tooltip/show.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowTypes; });
var ShowTypes;
(function (ShowTypes) {
    ShowTypes[ShowTypes["all"] = 'all'] = "all";
    ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
    ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
})(ShowTypes || (ShowTypes = {}));


/***/ }),

/***/ "./src/common/tooltip/style.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleTypes; });
var StyleTypes;
(function (StyleTypes) {
    StyleTypes[StyleTypes["popover"] = 'popover'] = "popover";
    StyleTypes[StyleTypes["tooltip"] = 'tooltip'] = "tooltip";
})(StyleTypes || (StyleTypes = {}));


/***/ }),

/***/ "./src/common/tooltip/tooltip.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/common/tooltip/tooltip.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/common/tooltip/tooltip.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_throttle__ = __webpack_require__("./src/utils/throttle.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__position__ = __webpack_require__("./src/common/tooltip/position/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_type__ = __webpack_require__("./src/common/tooltip/style.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alignment_type__ = __webpack_require__("./src/common/tooltip/alignment.type.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TooltipContentComponent = (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ngx-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () { return _this.renderer.setElementClass(nativeElm, 'animate', true); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = __WEBPACK_IMPORTED_MODULE_2__position__["b" /* PositionHelper */].positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(nativeElm, 'top', top + "px");
        this.renderer.setElementStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = __WEBPACK_IMPORTED_MODULE_2__position__["b" /* PositionHelper */].positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(caretElm, 'top', top + "px");
        this.renderer.setElementStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = __WEBPACK_IMPORTED_MODULE_2__position__["b" /* PositionHelper */].determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    return TooltipContentComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "host", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipContentComponent.prototype, "showCaret", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "placement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "alignment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipContentComponent.prototype, "spacing", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TooltipContentComponent.prototype, "cssClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TooltipContentComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('caretElm'),
    __metadata("design:type", Object)
], TooltipContentComponent.prototype, "caretElm", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TooltipContentComponent.prototype, "cssClasses", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize'),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_throttle__["a" /* throttleable */])(100),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipContentComponent.prototype, "onWindowResize", null);
TooltipContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-tooltip-content',
        template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template\n            [ngTemplateOutlet]=\"template\"\n            [ngOutletContext]=\"{ model: context }\">\n          </ng-template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: [__webpack_require__("./src/common/tooltip/tooltip.component.scss")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], TooltipContentComponent);



/***/ }),

/***/ "./src/common/tooltip/tooltip.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__position__ = __webpack_require__("./src/common/tooltip/position/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_type__ = __webpack_require__("./src/common/tooltip/style.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alignment_type__ = __webpack_require__("./src/common/tooltip/alignment.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__show_type__ = __webpack_require__("./src/common/tooltip/show.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tooltip_service__ = __webpack_require__("./src/common/tooltip/tooltip.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TooltipDirective = (function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer, element, zone) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = __WEBPACK_IMPORTED_MODULE_1__position__["a" /* PlacementTypes */].top;
        this.tooltipAlignment = __WEBPACK_IMPORTED_MODULE_3__alignment_type__["a" /* AlignmentTypes */].center;
        this.tooltipType = __WEBPACK_IMPORTED_MODULE_2__style_type__["a" /* StyleTypes */].popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = __WEBPACK_IMPORTED_MODULE_4__show_type__["a" /* ShowTypes */].all;
        this.tooltipImmediateExit = false;
        this.show = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.hide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === __WEBPACK_IMPORTED_MODULE_4__show_type__["a" /* ShowTypes */].all ||
                this.tooltipShowEvent === __WEBPACK_IMPORTED_MODULE_4__show_type__["a" /* ShowTypes */].focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === __WEBPACK_IMPORTED_MODULE_4__show_type__["a" /* ShowTypes */].all ||
                this.tooltipShowEvent === __WEBPACK_IMPORTED_MODULE_4__show_type__["a" /* ShowTypes */].mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled)
            return;
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                if (_this.component) {
                    _this.addHideListeners(_this.component.instance.element.nativeElement);
                }
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip(_this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains)
                    _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (!this.component)
            return;
        var destroyFn = function () {
            // remove events
            if (_this.mouseLeaveContentEvent)
                _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent)
                _this.mouseEnterContentEvent();
            if (_this.documentClickEvent)
                _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    return TooltipDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TooltipDirective.prototype, "tooltipCssClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TooltipDirective.prototype, "tooltipTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipSpacing", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipShowCaret", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipPlacement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipAlignment", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], TooltipDirective.prototype, "tooltipShowEvent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltipContext", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "show", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "hide", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focusin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onFocus", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onBlur", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseEnter", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseLeave", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TooltipDirective.prototype, "onMouseClick", null);
TooltipDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[ngx-tooltip]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__tooltip_service__["a" /* TooltipService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], TooltipDirective);



/***/ }),

/***/ "./src/common/tooltip/tooltip.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tooltip_directive__ = __webpack_require__("./src/common/tooltip/tooltip.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip_component__ = __webpack_require__("./src/common/tooltip/tooltip.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tooltip_service__ = __webpack_require__("./src/common/tooltip/tooltip.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__injection_service__ = __webpack_require__("./src/common/tooltip/injection.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
TooltipModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_3__tooltip_component__["a" /* TooltipContentComponent */], __WEBPACK_IMPORTED_MODULE_2__tooltip_directive__["a" /* TooltipDirective */]],
        providers: [__WEBPACK_IMPORTED_MODULE_5__injection_service__["a" /* InjectionService */], __WEBPACK_IMPORTED_MODULE_4__tooltip_service__["a" /* TooltipService */]],
        exports: [__WEBPACK_IMPORTED_MODULE_3__tooltip_component__["a" /* TooltipContentComponent */], __WEBPACK_IMPORTED_MODULE_2__tooltip_directive__["a" /* TooltipDirective */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_3__tooltip_component__["a" /* TooltipContentComponent */]]
    })
], TooltipModule);



/***/ }),

/***/ "./src/common/tooltip/tooltip.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TooltipService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__injection_service__ = __webpack_require__("./src/common/tooltip/injection.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__injection_registery_service__ = __webpack_require__("./src/common/tooltip/injection-registery.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip_component__ = __webpack_require__("./src/common/tooltip/tooltip.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.injectionService = injectionService;
        _this.type = __WEBPACK_IMPORTED_MODULE_3__tooltip_component__["a" /* TooltipContentComponent */];
        return _this;
    }
    return TooltipService;
}(__WEBPACK_IMPORTED_MODULE_2__injection_registery_service__["a" /* InjectionRegistery */]));
TooltipService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__injection_service__["a" /* InjectionService */]])
], TooltipService);



/***/ }),

/***/ "./src/common/trim-label.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = trimLabel;
function trimLabel(s, max) {
    if (max === void 0) { max = 16; }
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    s = s.trim();
    if (s.length <= max) {
        return s;
    }
    else {
        return s.slice(0, max) + "...";
    }
}


/***/ }),

/***/ "./src/common/view-dimensions.helper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateViewDimensions;
function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.columns, columns = _k === void 0 ? 12 : _k;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
    if (showLegend) {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = chartWidth * columns / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        width: ~~chartWidth,
        height: ~~chartHeight,
        xOffset: ~~xOffset
    };
}


/***/ }),

/***/ "./src/force-directed-graph/force-directed-graph.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/force-directed-graph/force-directed-graph.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/force-directed-graph/force-directed-graph.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForceDirectedGraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_force__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_force___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_force__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_charts_chart_component__ = __webpack_require__("./src/common/charts/chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ForceDirectedGraphComponent = (function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceSimulation"])()
            .force('charge', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceManyBody"])())
            .force('collide', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceCollide"])(5))
            .force('x', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceX"])())
            .force('y', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceY"])());
        _this.forceLink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_force__["forceLink"])().id(function (node) { return node.value; });
        _this.legendTitle = 'Legend';
        _this.nodes = [];
        _this.links = [];
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [0, 0, 0, 0];
        _this.results = [];
        _this.groupResultsBy = function (node) { return node.value; };
        return _this;
    }
    ForceDirectedGraphComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        // center graph
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
        });
        this.seriesDomain = this.getSeriesDomain();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "\n      translate(" + (this.dims.xOffset + this.dims.width / 2) + ", " + (this.margin[0] + this.dims.height / 2) + ")\n    ";
        if (this.force) {
            this.force.nodes(this.nodes)
                .force('link', this.forceLink.links(this.links))
                .alpha(0.5).restart();
        }
    };
    ForceDirectedGraphComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    ForceDirectedGraphComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.getSeriesDomain = function () {
        var _this = this;
        return this.nodes.map(function (d) { return _this.groupResultsBy(d); })
            .reduce(function (nodes, node) { return nodes.includes(node) ? nodes : nodes.concat([node]); }, [])
            .sort();
    };
    ForceDirectedGraphComponent.prototype.trackLinkBy = function (index, link) {
        return link.index;
    };
    ForceDirectedGraphComponent.prototype.trackNodeBy = function (index, node) {
        return node.value;
    };
    ForceDirectedGraphComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    ForceDirectedGraphComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.seriesDomain,
            colors: this.colors,
            title: this.legendTitle
        };
    };
    // Easier to use Angular2 event management than use d3.drag
    ForceDirectedGraphComponent.prototype.onDragStart = function (node, $event) {
        this.force.alphaTarget(0.3).restart();
        this.draggingNode = node;
        this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDrag = function ($event) {
        if (!this.draggingNode)
            return;
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDragEnd = function ($event) {
        if (!this.draggingNode)
            return;
        this.force.alphaTarget(0);
        this.draggingNode.fx = undefined;
        this.draggingNode.fy = undefined;
        this.draggingNode = undefined;
    };
    return ForceDirectedGraphComponent;
}(__WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ForceDirectedGraphComponent.prototype, "force", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ForceDirectedGraphComponent.prototype, "forceLink", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ForceDirectedGraphComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ForceDirectedGraphComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "nodes", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "links", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ForceDirectedGraphComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ForceDirectedGraphComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ForceDirectedGraphComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('linkTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], ForceDirectedGraphComponent.prototype, "linkTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('nodeTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], ForceDirectedGraphComponent.prototype, "nodeTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], ForceDirectedGraphComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__common_charts_chart_component__["a" /* ChartComponent */], { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], ForceDirectedGraphComponent.prototype, "chart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], ForceDirectedGraphComponent.prototype, "groupResultsBy", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ForceDirectedGraphComponent.prototype, "onDrag", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:mouseup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ForceDirectedGraphComponent.prototype, "onDragEnd", null);
ForceDirectedGraphComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-force-directed-graph',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy:trackLinkBy\">\n            <ng-template *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngOutletContext]=\"{ $implicit: link }\">\n            </ng-template>\n            <svg:line *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\" class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g *ngFor=\"let node of nodes; trackBy:trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors.getColor(groupResultsBy(node))\"\n            [attr.stroke]=\"colors.getColor(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({name: node.value})\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : node.value\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"node\">\n            <ng-template *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngOutletContext]=\"{ $implicit: node }\">\n            </ng-template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/force-directed-graph/force-directed-graph.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], ForceDirectedGraphComponent);



/***/ }),

/***/ "./src/force-directed-graph/force-directed-graph.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ForceDirectedGraphModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__force_directed_graph_component__ = __webpack_require__("./src/force-directed-graph/force-directed-graph.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__force_directed_graph_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    return ForceDirectedGraphModule;
}());
ForceDirectedGraphModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__force_directed_graph_component__["a" /* ForceDirectedGraphComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__force_directed_graph_component__["a" /* ForceDirectedGraphComponent */],
        ]
    })
], ForceDirectedGraphModule);



/***/ }),

/***/ "./src/force-directed-graph/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__force_directed_graph_module__ = __webpack_require__("./src/force-directed-graph/force-directed-graph.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__force_directed_graph_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__force_directed_graph_module__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__force_directed_graph_component__ = __webpack_require__("./src/force-directed-graph/force-directed-graph.component.ts");
/* unused harmony namespace reexport */




/***/ }),

/***/ "./src/gauge/gauge-arc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaugeArcComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GaugeArcComponent = (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_label_helper__["a" /* formatLabel */])(arc.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_label_helper__["a" /* formatLabel */])(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    return GaugeArcComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "backgroundArc", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "valueArc", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__common_color_helper__["a" /* ColorHelper */])
], GaugeArcComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], GaugeArcComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], GaugeArcComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "deactivate", void 0);
GaugeArcComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-gauge-arc]',
        template: "\n    <svg:g ngx-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"true\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], GaugeArcComponent);



/***/ }),

/***/ "./src/gauge/gauge-axis.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaugeAxisComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_shape__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GaugeAxisComponent = (function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / (this.smallSegments);
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            var skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor: textAnchor,
                    text: text,
                    textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var lineGenerator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["line"])().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return lineGenerator(points);
    };
    return GaugeAxisComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "bigSegments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "smallSegments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "min", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeAxisComponent.prototype, "angleSpan", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeAxisComponent.prototype, "startAngle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "radius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "valueScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeAxisComponent.prototype, "tickFormatting", void 0);
GaugeAxisComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-gauge-axis]',
        template: "\n    <svg:g [attr.transform]=\"rotate\">\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:text\n                [style.textAnchor]=\"tick.textAnchor\"\n                [attr.transform]=\"tick.textTransform\"\n                alignment-baseline=\"central\">\n                {{tick.text}}\n            </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"\n            class=\"gauge-tick gauge-tick-small\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], GaugeAxisComponent);



/***/ }),

/***/ "./src/gauge/gauge.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/gauge/gauge.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/gauge/gauge.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaugeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GaugeComponent = (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.min = 0;
        _this.max = 100;
        _this.bigSegments = 10;
        _this.smallSegments = 5;
        _this.showAxis = true;
        _this.startAngle = -120;
        _this.angleSpan = 240;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.resizeScale = 1;
        _this.rotation = '';
        _this.textTransform = 'scale(1, 1)';
        _this.cornerRadius = 10;
        return _this;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        // make the starting angle positive
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.rotation = "rotate(" + this.startAngle + ")";
        setTimeout(function () { return _this.scaleText(); }, 50);
    };
    GaugeComponent.prototype.getArcs = function () {
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var d = _a[_i];
            var outerRadius = this.outerRadius - (i * radiusPerArc);
            var innerRadius = outerRadius - arcWidth;
            var backgroundArc = {
                endAngle: this.angleSpan * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            var valueArc = {
                endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            var arc = {
                backgroundArc: backgroundArc,
                valueArc: valueArc
            };
            arcs.push(arc);
            i++;
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, values);
        var dataMax = Math.max.apply(Math, values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function (repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        var oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            var availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { return _this.scaleText(false); }, 50);
            }
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle
        };
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    GaugeComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    GaugeComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    return GaugeComponent;
}(__WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], GaugeComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "min", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], GaugeComponent.prototype, "textValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], GaugeComponent.prototype, "units", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "bigSegments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "smallSegments", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "results", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], GaugeComponent.prototype, "showAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "startAngle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], GaugeComponent.prototype, "angleSpan", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], GaugeComponent.prototype, "axisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], GaugeComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], GaugeComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], GaugeComponent.prototype, "margin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], GaugeComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], GaugeComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], GaugeComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('textEl'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], GaugeComponent.prototype, "textEl", void 0);
GaugeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-gauge',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs\" [attr.transform]=\"rotation\">\n          <svg:g ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            [isActive]=\"isActive(arc.valueArc.data)\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [valueFormatting]=\"valueFormatting\"\n            (select)=\"onClick($event)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\">\n          </svg:g>\n        </svg:g>\n\n        <svg:g ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\"\n          [tickFormatting]=\"axisTickFormatting\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"0\">{{displayValue}}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{units}}</tspan>\n        </svg:text>\n\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/gauge/gauge.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], GaugeComponent);



/***/ }),

/***/ "./src/gauge/gauge.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GaugeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__linear_gauge_component__ = __webpack_require__("./src/gauge/linear-gauge.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gauge_component__ = __webpack_require__("./src/gauge/gauge.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gauge_arc_component__ = __webpack_require__("./src/gauge/gauge-arc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gauge_axis_component__ = __webpack_require__("./src/gauge/gauge-axis.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pie_chart_pie_chart_module__ = __webpack_require__("./src/pie-chart/pie-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bar_chart_bar_chart_module__ = __webpack_require__("./src/bar-chart/bar-chart.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__gauge_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__gauge_arc_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__gauge_axis_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__linear_gauge_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var GaugeModule = (function () {
    function GaugeModule() {
    }
    return GaugeModule;
}());
GaugeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */], __WEBPACK_IMPORTED_MODULE_6__pie_chart_pie_chart_module__["a" /* PieChartModule */], __WEBPACK_IMPORTED_MODULE_7__bar_chart_bar_chart_module__["a" /* BarChartModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__linear_gauge_component__["a" /* LinearGaugeComponent */],
            __WEBPACK_IMPORTED_MODULE_3__gauge_component__["a" /* GaugeComponent */],
            __WEBPACK_IMPORTED_MODULE_4__gauge_arc_component__["a" /* GaugeArcComponent */],
            __WEBPACK_IMPORTED_MODULE_5__gauge_axis_component__["a" /* GaugeAxisComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__linear_gauge_component__["a" /* LinearGaugeComponent */],
            __WEBPACK_IMPORTED_MODULE_3__gauge_component__["a" /* GaugeComponent */],
            __WEBPACK_IMPORTED_MODULE_4__gauge_arc_component__["a" /* GaugeArcComponent */],
            __WEBPACK_IMPORTED_MODULE_5__gauge_axis_component__["a" /* GaugeAxisComponent */]
        ]
    })
], GaugeModule);



/***/ }),

/***/ "./src/gauge/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gauge_module__ = __webpack_require__("./src/gauge/gauge.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__gauge_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__gauge_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__gauge_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__gauge_module__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__gauge_module__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gauge_component__ = __webpack_require__("./src/gauge/gauge.component.ts");
/* unused harmony namespace reexport */




/***/ }),

/***/ "./src/gauge/linear-gauge.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/gauge/linear-gauge.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/gauge/linear-gauge.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinearGaugeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LinearGaugeComponent = (function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.value = 0;
        _this.margin = [10, 20, 10, 20];
        _this.valueResizeScale = 1;
        _this.unitsResizeScale = 1;
        _this.valueTextTransform = '';
        _this.valueTranslate = '';
        _this.unitsTextTransform = '';
        _this.unitsTranslate = '';
        return _this;
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
        this.valueTranslate = "translate(0, -15)";
        this.unitsTranslate = "translate(0, 15)";
        setTimeout(function () { return _this.scaleText('value'); }, 50);
        setTimeout(function () { return _this.scaleText('units'); }, 50);
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleLinear"])()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0)
            return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { _this.scaleText(element, false); }, 50);
            }
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', [this.value], this.customColors);
    };
    return LinearGaugeComponent;
}(__WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LinearGaugeComponent.prototype, "min", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LinearGaugeComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LinearGaugeComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LinearGaugeComponent.prototype, "units", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "previousValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LinearGaugeComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('valueTextEl'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], LinearGaugeComponent.prototype, "valueTextEl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('unitsTextEl'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
LinearGaugeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-linear-gauge',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g ngx-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\">\n        </svg:g>\n        <svg:g ngx-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\">\n        </svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\">\n              {{displayValue}}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\">\n              {{units}}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/gauge/linear-gauge.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], LinearGaugeComponent);



/***/ }),

/***/ "./src/heat-map/heat-map-cell-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeatCellSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeatCellSeriesComponent = (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HeatCellSeriesComponent.prototype.ngOnInit = function () {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    };
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                cells.push({
                    row: row,
                    cell: cell,
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_label_helper__["a" /* formatLabel */])(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + series + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (value, label, series) {
        this.select.emit({
            name: label,
            value: value,
            series: series
        });
    };
    return HeatCellSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], HeatCellSeriesComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HeatCellSeriesComponent.prototype, "select", void 0);
HeatCellSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-heat-map-cell-series]',
        template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{series: c.series, name: c.label, value: c.data}\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], HeatCellSeriesComponent);



/***/ }),

/***/ "./src/heat-map/heat-map-cell.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeatMapCellComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeatMapCellComponent = (function () {
    function HeatMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_id__["a" /* id */])().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        this.loadAnimation();
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    return HeatMapCellComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "x", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "y", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], HeatMapCellComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "select", void 0);
HeatMapCellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-heat-map-cell]',
        template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], HeatMapCellComponent);



/***/ }),

/***/ "./src/heat-map/heat-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeatMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeatMapComponent = (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.innerPadding = 8;
        _this.tooltipDisabled = false;
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.scaleType = 'linear';
        return _this;
    }
    HeatMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.formatDates();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.scaleType = this.getScaleType(this.valueDomain);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.scaleType
        });
        if (this.scaleType === 'linear') {
            var min = Math.min.apply(Math, [0].concat(this.valueDomain));
            var max = Math.max.apply(Math, this.valueDomain);
            this.valueDomain = [min, max];
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        return domain;
    };
    /**
     * Converts the input to gap paddingInner in fraction
     * Supports the following inputs:
     *    Numbers: 8
     *    Strings: "8", "8px", "8%"
     *    Arrays: [8,2], "8,2", "[8,2]"
     *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
     *
     * @param {(string | number | Array<string | number>)} value
     * @param {number} [index=0]
     * @param {number} N
     * @param {number} L
     * @returns {number}
     *
     * @memberOf HeatMapComponent
     */
    HeatMapComponent.prototype.getDimension = function (value, index, N, L) {
        if (index === void 0) { index = 0; }
        if (typeof value === 'string') {
            value = value
                .replace('[', '')
                .replace(']', '')
                .replace('px', '')
                .replace('\'', '');
            if (value.includes(',')) {
                value = value.split(',');
            }
        }
        if (Array.isArray(value) && typeof index === 'number') {
            return this.getDimension(value[index], null, N, L);
        }
        if (typeof value === 'string' && value.includes('%')) {
            return +value.replace('%', '') / 100;
        }
        return N / (L / +value + 1);
    };
    HeatMapComponent.prototype.getXScale = function () {
        var f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleBand"])()
            .rangeRound([0, this.dims.width])
            .domain(this.xDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getYScale = function () {
        var f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_scale__["scaleBand"])()
            .rangeRound([this.dims.height, 0])
            .domain(this.yDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.getScaleType = function (values) {
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (num)
            return 'linear';
        return 'ordinal';
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, this.scaleType, this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: this.scaleType,
            domain: this.valueDomain,
            colors: this.scaleType === 'ordinal' ? this.colors : this.colors.scale,
            title: this.scaleType === 'ordinal' ? this.legendTitle : undefined
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    return HeatMapComponent;
}(__WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], HeatMapComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], HeatMapComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "innerPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], HeatMapComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], HeatMapComponent.prototype, "tooltipTemplate", void 0);
HeatMapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-heat-map',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], HeatMapComponent);



/***/ }),

/***/ "./src/heat-map/heat-map.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HeatMapModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heat_map_cell_component__ = __webpack_require__("./src/heat-map/heat-map-cell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heat_map_cell_series_component__ = __webpack_require__("./src/heat-map/heat-map-cell-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__heat_map_component__ = __webpack_require__("./src/heat-map/heat-map.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__heat_map_cell_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__heat_map_cell_series_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__heat_map_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    return HeatMapModule;
}());
HeatMapModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__heat_map_cell_component__["a" /* HeatMapCellComponent */],
            __WEBPACK_IMPORTED_MODULE_3__heat_map_cell_series_component__["a" /* HeatCellSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__heat_map_component__["a" /* HeatMapComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__heat_map_cell_component__["a" /* HeatMapCellComponent */],
            __WEBPACK_IMPORTED_MODULE_3__heat_map_cell_series_component__["a" /* HeatCellSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__heat_map_component__["a" /* HeatMapComponent */]
        ]
    })
], HeatMapModule);



/***/ }),

/***/ "./src/heat-map/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heat_map_module__ = __webpack_require__("./src/heat-map/heat-map.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__heat_map_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__heat_map_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__heat_map_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__heat_map_module__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__heat_map_component__ = __webpack_require__("./src/heat-map/heat-map.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__heat_map_cell_component__ = __webpack_require__("./src/heat-map/heat-map-cell.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heat_map_cell_series_component__ = __webpack_require__("./src/heat-map/heat-map-cell-series.component.ts");
/* unused harmony namespace reexport */






/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_charts_module__ = __webpack_require__("./src/ngx-charts.module.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NgxChartsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__ngx_charts_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__("./src/common/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ChartCommonModule", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColorHelper", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BaseChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CircleComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CircleSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "gridSize", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "gridLayout", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GridPanelComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GridPanelSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SvgLinearGradientComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SvgRadialGradientComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TooltipArea", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "tickFormat", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "trimLabel", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "calculateViewDimensions", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "formatLabel", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LegendComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ScaleLegendComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LegendEntryComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AdvancedLegendComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TooltipModule", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TooltipService", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TooltipContentComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TooltipDirective", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StyleTypes", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AlignmentTypes", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ShowTypes", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CountUpDirective", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "count", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "decimalChecker", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__common__["G"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__area_chart__ = __webpack_require__("./src/area-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaChartNormalizedComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaChartStackedComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AreaChartModule", function() { return __WEBPACK_IMPORTED_MODULE_2__area_chart__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bar_chart__ = __webpack_require__("./src/bar-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarHorizontalComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarHorizontal2DComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarHorizontalNormalizedComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarHorizontalStackedComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarVerticalComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarVertical2DComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarVerticalNormalizedComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarVerticalStackedComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SeriesHorizontal", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SeriesVerticalComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BarChartModule", function() { return __WEBPACK_IMPORTED_MODULE_3__bar_chart__["l"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bubble_chart__ = __webpack_require__("./src/bubble-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BubbleChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__bubble_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BubbleSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__bubble_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BubbleChartModule", function() { return __WEBPACK_IMPORTED_MODULE_4__bubble_chart__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__force_directed_graph__ = __webpack_require__("./src/force-directed-graph/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ForceDirectedGraphComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__force_directed_graph__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ForceDirectedGraphModule", function() { return __WEBPACK_IMPORTED_MODULE_5__force_directed_graph__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heat_map__ = __webpack_require__("./src/heat-map/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HeatMapCellComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__heat_map__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HeatCellSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__heat_map__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HeatMapComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__heat_map__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HeatMapModule", function() { return __WEBPACK_IMPORTED_MODULE_6__heat_map__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__line_chart__ = __webpack_require__("./src/line-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LineComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__line_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LineChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__line_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LineSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__line_chart__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LineChartModule", function() { return __WEBPACK_IMPORTED_MODULE_7__line_chart__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polar_chart__ = __webpack_require__("./src/polar-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PolarChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__polar_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PolarSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__polar_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PolarChartModule", function() { return __WEBPACK_IMPORTED_MODULE_8__polar_chart__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__number_card__ = __webpack_require__("./src/number-card/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__number_card__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CardSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__number_card__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NumberCardComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__number_card__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NumberCardModule", function() { return __WEBPACK_IMPORTED_MODULE_9__number_card__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pie_chart__ = __webpack_require__("./src/pie-chart/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AdvancedPieChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieLabelComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieArcComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieChartComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieGridComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieGridSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PieChartModule", function() { return __WEBPACK_IMPORTED_MODULE_10__pie_chart__["h"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tree_map__ = __webpack_require__("./src/tree-map/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeMapCellComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__tree_map__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeMapCellSeriesComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__tree_map__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeMapComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__tree_map__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeMapModule", function() { return __WEBPACK_IMPORTED_MODULE_11__tree_map__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__gauge__ = __webpack_require__("./src/gauge/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GaugeComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__gauge__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GaugeArcComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__gauge__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GaugeAxisComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__gauge__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LinearGaugeComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__gauge__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GaugeModule", function() { return __WEBPACK_IMPORTED_MODULE_12__gauge__["e"]; });















/***/ }),

/***/ "./src/line-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__line_chart_module__ = __webpack_require__("./src/line-chart/line-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__line_chart_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__line_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__line_chart_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__line_chart_module__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line_chart_component__ = __webpack_require__("./src/line-chart/line-chart.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_component__ = __webpack_require__("./src/line-chart/line.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line_series_component__ = __webpack_require__("./src/line-chart/line-series.component.ts");
/* unused harmony namespace reexport */






/***/ }),

/***/ "./src/line-chart/line-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LineChartComponent = (function (_super) {
    __extends(LineChartComponent, _super);
    function LineChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.showGridLines = true;
        _this.curve = __WEBPACK_IMPORTED_MODULE_4_d3_shape__["curveLinear"];
        _this.activeEntries = [];
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showRefLines = false;
        _this.showRefLabels = true;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    LineChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
        });
        if (this.timeline) {
            this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.clipPathId = 'clip' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_id__["a" /* id */])().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    LineChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    LineChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [new Date(min), new Date(max)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
            this.xSet = values.slice().sort();
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    LineChartComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    LineChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scaleTime"])()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scaleLinear"])()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scalePoint"])()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    LineChartComponent.prototype.getYScale = function (domain, height) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_scale__["scaleLinear"])()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    LineChartComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date)
            return 'time';
        if (num)
            return 'linear';
        return 'ordinal';
    };
    LineChartComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    LineChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    LineChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    LineChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    LineChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    LineChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    LineChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new __WEBPACK_IMPORTED_MODULE_6__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    LineChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    LineChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    LineChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    LineChartComponent.prototype.onActivate = function (item) {
        this.deactivateAll();
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item];
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    return LineChartComponent;
}(__WEBPACK_IMPORTED_MODULE_7__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LineChartComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "autoScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], LineChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LineChartComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LineChartComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "showRefLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineChartComponent.prototype, "referenceLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineChartComponent.prototype, "showRefLabels", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LineChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], LineChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], LineChartComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('seriesTooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LineChartComponent.prototype, "hideCircles", null);
LineChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-line-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [referenceLines]=\"referenceLines\"\n          [showRefLines]=\"showRefLines\"\n          [showRefLabels]=\"showRefLabels\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\" [@animationState]=\"'active'\">\n            <svg:g ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [hasRange]=\"hasRange\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [activeEntries]=\"activeEntries\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n            [hasRange]=\"hasRange\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/common/base-chart.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0
                    }))
                ])
            ])
        ]
    })
], LineChartComponent);



/***/ }),

/***/ "./src/line-chart/line-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LineChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line_component__ = __webpack_require__("./src/line-chart/line.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line_chart_component__ = __webpack_require__("./src/line-chart/line-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__line_series_component__ = __webpack_require__("./src/line-chart/line-series.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__line_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__line_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__line_series_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LineChartModule = (function () {
    function LineChartModule() {
    }
    return LineChartModule;
}());
LineChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__line_component__["a" /* LineComponent */],
            __WEBPACK_IMPORTED_MODULE_3__line_chart_component__["a" /* LineChartComponent */],
            __WEBPACK_IMPORTED_MODULE_4__line_series_component__["a" /* LineSeriesComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__line_component__["a" /* LineComponent */],
            __WEBPACK_IMPORTED_MODULE_3__line_chart_component__["a" /* LineChartComponent */],
            __WEBPACK_IMPORTED_MODULE_4__line_series_component__["a" /* LineSeriesComponent */]
        ]
    })
], LineChartModule);



/***/ }),

/***/ "./src/line-chart/line-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_id__ = __webpack_require__("./src/utils/id.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_sort__ = __webpack_require__("./src/utils/sort.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LineSeriesComponent = (function () {
    function LineSeriesComponent(location) {
        this.location = location;
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var data = this.sortData(this.data.series);
        var line = this.getLineGenerator();
        this.path = line(data) || '';
        var area = this.getAreaGenerator();
        this.areaPath = area(data) || '';
        if (this.hasRange) {
            var range = this.getRangeGenerator();
            this.outerPath = range(data) || '';
        }
        this.stroke = this.hasGradient ? this.gradientUrl : this.colors.getColor(this.data.name);
        var values = this.data.series.map(function (d) { return d.value; });
        var max = Math.max.apply(Math, values);
        var min = Math.min.apply(Math, values);
        if (max === min) {
            this.stroke = this.colors.getColor(max);
        }
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["line"])()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getRangeGenerator = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["area"])()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y0(function (d) { return _this.yScale(d.min ? d.min : d.value); })
            .y1(function (d) { return _this.yScale(d.max ? d.max : d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["area"])()
            .x(xProperty)
            .y0(function () { return _this.yScale.range()[0]; })
            .y1(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["a" /* sortLinear */])(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["b" /* sortByTime */])(data, 'name');
        }
        else {
            data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["c" /* sortByDomain */])(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
                ? this.location.path()
                : '';
            this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_id__["a" /* id */])().toString();
            this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    return LineSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], LineSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LineSeriesComponent.prototype, "hasRange", void 0);
LineSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-line-series]',
        template: "\n    <svg:g>\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n      <svg:g ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n     <svg:g ngx-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n      />\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], LineSeriesComponent);



/***/ }),

/***/ "./src/line-chart/line.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_selection__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LineComponent = (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.animateToCurrentForm();
        }
    };
    LineComponent.prototype.animateToCurrentForm = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element.nativeElement).select('.line');
        node
            .transition().duration(750)
            .attr('d', this.path);
    };
    return LineComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineComponent.prototype, "path", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineComponent.prototype, "stroke", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], LineComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], LineComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], LineComponent.prototype, "select", void 0);
LineComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-line]',
        template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':enter', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        strokeDasharray: 2000,
                        strokeDashoffset: 2000,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(1000, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        strokeDashoffset: 0
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], LineComponent);



/***/ }),

/***/ "./src/ngx-charts.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxChartsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__area_chart_area_chart_module__ = __webpack_require__("./src/area-chart/area-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bar_chart_bar_chart_module__ = __webpack_require__("./src/bar-chart/bar-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bubble_chart_bubble_chart_module__ = __webpack_require__("./src/bubble-chart/bubble-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__force_directed_graph_force_directed_graph_module__ = __webpack_require__("./src/force-directed-graph/force-directed-graph.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__heat_map_heat_map_module__ = __webpack_require__("./src/heat-map/heat-map.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__line_chart_line_chart_module__ = __webpack_require__("./src/line-chart/line-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polar_chart_polar_chart_module__ = __webpack_require__("./src/polar-chart/polar-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__number_card_number_card_module__ = __webpack_require__("./src/number-card/number-card.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pie_chart_pie_chart_module__ = __webpack_require__("./src/pie-chart/pie-chart.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tree_map_tree_map_module__ = __webpack_require__("./src/tree-map/tree-map.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__gauge_gauge_module__ = __webpack_require__("./src/gauge/gauge.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var NgxChartsModule = (function () {
    function NgxChartsModule() {
    }
    return NgxChartsModule;
}());
NgxChartsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__area_chart_area_chart_module__["e" /* AreaChartModule */],
            __WEBPACK_IMPORTED_MODULE_3__bar_chart_bar_chart_module__["a" /* BarChartModule */],
            __WEBPACK_IMPORTED_MODULE_4__bubble_chart_bubble_chart_module__["c" /* BubbleChartModule */],
            __WEBPACK_IMPORTED_MODULE_5__force_directed_graph_force_directed_graph_module__["b" /* ForceDirectedGraphModule */],
            __WEBPACK_IMPORTED_MODULE_6__heat_map_heat_map_module__["d" /* HeatMapModule */],
            __WEBPACK_IMPORTED_MODULE_7__line_chart_line_chart_module__["d" /* LineChartModule */],
            __WEBPACK_IMPORTED_MODULE_8__polar_chart_polar_chart_module__["c" /* PolarChartModule */],
            __WEBPACK_IMPORTED_MODULE_9__number_card_number_card_module__["d" /* NumberCardModule */],
            __WEBPACK_IMPORTED_MODULE_10__pie_chart_pie_chart_module__["a" /* PieChartModule */],
            __WEBPACK_IMPORTED_MODULE_11__tree_map_tree_map_module__["d" /* TreeMapModule */],
            __WEBPACK_IMPORTED_MODULE_12__gauge_gauge_module__["e" /* GaugeModule */]
        ]
    })
], NgxChartsModule);



/***/ }),

/***/ "./src/number-card/card-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_color_utils__ = __webpack_require__("./src/utils/color-utils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardSeriesComponent = (function () {
    function CardSeriesComponent(zone) {
        this.zone = zone;
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        if (this.data.length > 2) {
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var sortedLengths = this.data
                .map(function (d) {
                var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue ? valueFormatting_1({
                    data: d.data,
                    label: d ? d.data.name : '',
                    value: (d && d.data) ? d.data.value : ''
                }).length : 0;
            })
                .sort(function (a, b) { return b - a; });
            var idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        var cards = this.getCards();
        this.cards = cards.filter(function (d) { return d.data.value !== null; });
        this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        var yPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[0] + this.innerPadding[2];
        var xPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[1] + this.innerPadding[3];
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            d.data.name = label;
            var value = d.data.value;
            var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
            var color = _this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color: color,
                bandColor: _this.bandColor || valueColor,
                textColor: _this.textColor || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_color_utils__["a" /* invertColor */])(color),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    return CardSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CardSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CardSeriesComponent.prototype, "slots", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "innerPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "cardColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "bandColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "emptyColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "textColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "select", void 0);
CardSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-card-series]',
        template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy:trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g ngx-charts-card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      (select)=\"onClick($event)\"\n    />\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], CardSeriesComponent);



/***/ }),

/***/ "./src/number-card/card.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/number-card/card.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/number-card/card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_shape_helper__ = __webpack_require__("./src/common/shape.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_count__ = __webpack_require__("./src/common/count/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CardComponent = (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 10, 20];
        this.labelFontSize = 12;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_trim_label_helper__["a" /* trimLabel */])(card.label, 55); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.data ? _this.data.name : '';
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_shape_helper__["a" /* roundedRect */])(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_count__["b" /* decimalChecker */])(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_count__["c" /* count */])(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = _this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8;
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 12);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    return CardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "bandColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "textColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "x", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "y", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], CardComponent.prototype, "medianSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CardComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('textEl'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], CardComponent.prototype, "textEl", void 0);
CardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-card]',
        template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\">\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\">\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], CardComponent);



/***/ }),

/***/ "./src/number-card/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_card_module__ = __webpack_require__("./src/number-card/number-card.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__number_card_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__number_card_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__number_card_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__number_card_module__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__number_card_component__ = __webpack_require__("./src/number-card/number-card.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_component__ = __webpack_require__("./src/number-card/card.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_series_component__ = __webpack_require__("./src/number-card/card-series.component.ts");
/* unused harmony namespace reexport */






/***/ }),

/***/ "./src/number-card/number-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_grid_layout_helper__ = __webpack_require__("./src/common/grid-layout.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NumberCardComponent = (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyColor = 'rgba(0, 0, 0, 0)';
        _this.innerPadding = 15;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    Object.defineProperty(NumberCardComponent.prototype, "clickable", {
        get: function () {
            return !!this.select.observers.length;
        },
        enumerable: true,
        configurable: true
    });
    NumberCardComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_grid_layout_helper__["b" /* gridSize */])(this.dims, this.results.length, 150);
        var N = size[0] * size[1];
        var data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_grid_layout_helper__["a" /* gridLayout */])(this.dims, data, 150);
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_3__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return NumberCardComponent;
}(__WEBPACK_IMPORTED_MODULE_1__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "cardColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "bandColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "emptyColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "innerPadding", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], NumberCardComponent.prototype, "textColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NumberCardComponent.prototype, "labelFormatting", void 0);
NumberCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-number-card',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n        <svg:g ngx-charts-card-series\n          [colors]=\"colors\"\n          [cardColor]=\"cardColor\"\n          [bandColor]=\"bandColor\"\n          [textColor]=\"textColor\"\n          [emptyColor]=\"emptyColor\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [innerPadding]=\"innerPadding\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/number-card/card.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], NumberCardComponent);



/***/ }),

/***/ "./src/number-card/number-card.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NumberCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_component__ = __webpack_require__("./src/number-card/card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_series_component__ = __webpack_require__("./src/number-card/card-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__number_card_component__ = __webpack_require__("./src/number-card/number-card.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__card_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__card_series_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__number_card_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    return NumberCardModule;
}());
NumberCardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__card_component__["a" /* CardComponent */],
            __WEBPACK_IMPORTED_MODULE_3__card_series_component__["a" /* CardSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__number_card_component__["a" /* NumberCardComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__card_component__["a" /* CardComponent */],
            __WEBPACK_IMPORTED_MODULE_3__card_series_component__["a" /* CardSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__number_card_component__["a" /* NumberCardComponent */]
        ]
    })
], NumberCardModule);



/***/ }),

/***/ "./src/pie-chart/advanced-pie-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/advanced-pie-chart.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/pie-chart/advanced-pie-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedPieChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdvancedPieChartComponent = (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    AdvancedPieChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width * 4 / 12.0,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.legendWidth = this.width - this.dims.width - this.margin[1];
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_2__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    AdvancedPieChartComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    return AdvancedPieChartComponent;
}(__WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AdvancedPieChartComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AdvancedPieChartComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AdvancedPieChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], AdvancedPieChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
AdvancedPieChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-advanced-pie-chart',
        template: "\n    <div\n      [style.width.px]=\"width\"\n      [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\"\n        [style.width.px]=\"dims.width\"\n        [style.height.px]=\"dims.height\">\n        <ngx-charts-chart\n          [view]=\"[width, height]\"\n          [showLegend]=\"false\">\n          <svg:g\n            [attr.transform]=\"transform\"\n            class=\"pie chart\">\n            <svg:g ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\">\n            </svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div\n        class=\"advanced-pie-legend-wrapper\"\n        [style.width.px]=\"width - dims.width\"\n        [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\">\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/pie-chart/advanced-pie-chart.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], AdvancedPieChartComponent);



/***/ }),

/***/ "./src/pie-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__ = __webpack_require__("./src/pie-chart/pie-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__pie_chart_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pie_chart_component__ = __webpack_require__("./src/pie-chart/pie-chart.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pie_arc_component__ = __webpack_require__("./src/pie-chart/pie-arc.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pie_grid_component__ = __webpack_require__("./src/pie-chart/pie-grid.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pie_series_component__ = __webpack_require__("./src/pie-chart/pie-series.component.ts");
/* inactive harmony reexport namespace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pie_label_component__ = __webpack_require__("./src/pie-chart/pie-label.component.ts");
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */









/***/ }),

/***/ "./src/pie-chart/pie-arc.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieArcComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_interpolate__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_interpolate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_interpolate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PieArcComponent = (function () {
    function PieArcComponent(element, location) {
        this.location = location;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.update = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.5;
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.radialGradientId = 'linearGrad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_id__["a" /* id */])().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_d3_shape__["arc"])()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_selection__["select"])(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_interpolate__["interpolate"])(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        })
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_interpolate__["interpolate"])(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_selection__["select"])(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_interpolate__["interpolate"])(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    return PieArcComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "startAngle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "endAngle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "innerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "outerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "explodeSlices", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "animate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "pointerEvents", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "deactivate", void 0);
PieArcComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-pie-arc]',
        template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"onClick()\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"pointerEvents ? 'auto' : 'none'\"\n      />\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], PieArcComponent);



/***/ }),

/***/ "./src/pie-chart/pie-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/pie-chart.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/pie-chart/pie-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PieChartComponent = (function (_super) {
    __extends(PieChartComponent, _super);
    function PieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labels = false;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.explodeSlices = false;
        _this.doughnut = false;
        _this.arcWidth = 0.25;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (this.labels) {
            this.margin = [30, 80, 30, 80];
        }
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
        });
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(this.dims.width, this.dims.height);
        if (this.labels) {
            // make room for labels
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * (1 - this.arcWidth);
        }
        this.domain = this.getDomain();
        // sort data according to domain
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
        this.legendOptions = this.getLegendOptions();
    };
    PieChartComponent.prototype.getDomain = function () {
        var items = [];
        this.results.map(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            if (items.indexOf(label) === -1) {
                items.push(label);
            }
        });
        return items;
    };
    PieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieChartComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_2__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieChartComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors,
            title: this.legendTitle
        };
    };
    PieChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return PieChartComponent;
}(__WEBPACK_IMPORTED_MODULE_3__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "labels", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PieChartComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "explodeSlices", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "doughnut", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "arcWidth", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieChartComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PieChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PieChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], PieChartComponent.prototype, "tooltipTemplate", void 0);
PieChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-pie-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n        <svg:g ngx-charts-pie-series\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [labelFormatting]=\"labelFormatting\"\n          [series]=\"data\"\n          [activeEntries]=\"activeEntries\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/pie-chart/pie-chart.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], PieChartComponent);



/***/ }),

/***/ "./src/pie-chart/pie-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advanced_pie_chart_component__ = __webpack_require__("./src/pie-chart/advanced-pie-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pie_label_component__ = __webpack_require__("./src/pie-chart/pie-label.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pie_arc_component__ = __webpack_require__("./src/pie-chart/pie-arc.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pie_chart_component__ = __webpack_require__("./src/pie-chart/pie-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pie_grid_component__ = __webpack_require__("./src/pie-chart/pie-grid.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pie_grid_series_component__ = __webpack_require__("./src/pie-chart/pie-grid-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pie_series_component__ = __webpack_require__("./src/pie-chart/pie-series.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__advanced_pie_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__pie_label_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__pie_arc_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__pie_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__pie_grid_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__pie_grid_series_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__pie_series_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var PieChartModule = (function () {
    function PieChartModule() {
    }
    return PieChartModule;
}());
PieChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__advanced_pie_chart_component__["a" /* AdvancedPieChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__pie_label_component__["a" /* PieLabelComponent */],
            __WEBPACK_IMPORTED_MODULE_4__pie_arc_component__["a" /* PieArcComponent */],
            __WEBPACK_IMPORTED_MODULE_5__pie_chart_component__["a" /* PieChartComponent */],
            __WEBPACK_IMPORTED_MODULE_6__pie_grid_component__["a" /* PieGridComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pie_grid_series_component__["a" /* PieGridSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pie_series_component__["a" /* PieSeriesComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__advanced_pie_chart_component__["a" /* AdvancedPieChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__pie_label_component__["a" /* PieLabelComponent */],
            __WEBPACK_IMPORTED_MODULE_4__pie_arc_component__["a" /* PieArcComponent */],
            __WEBPACK_IMPORTED_MODULE_5__pie_chart_component__["a" /* PieChartComponent */],
            __WEBPACK_IMPORTED_MODULE_6__pie_grid_component__["a" /* PieGridComponent */],
            __WEBPACK_IMPORTED_MODULE_7__pie_grid_series_component__["a" /* PieGridSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pie_series_component__["a" /* PieSeriesComponent */]
        ]
    })
], PieChartModule);



/***/ }),

/***/ "./src/pie-chart/pie-grid-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieGridSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_shape__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PieGridSeriesComponent = (function () {
    function PieGridSeriesComponent(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.element = element.nativeElement;
    }
    PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieGridSeriesComponent.prototype.update = function () {
        this.layout = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["pie"])()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeriesComponent.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeriesComponent.prototype.onClick = function (data) {
        this.select.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    PieGridSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeriesComponent.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieGridSeriesComponent.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    return PieGridSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "innerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "outerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieGridSeriesComponent.prototype, "select", void 0);
PieGridSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-pie-grid-series]',
        template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g ngx-charts-pie-arc *ngFor=\"let arc of arcs; trackBy:trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], PieGridSeriesComponent);



/***/ }),

/***/ "./src/pie-chart/pie-grid.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/pie-chart/pie-grid.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/pie-chart/pie-grid.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieGridComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_array__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_format__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_format__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_grid_layout_helper__ = __webpack_require__("./src/common/grid-layout.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PieGridComponent = (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieGridComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__common_grid_layout_helper__["a" /* gridLayout */])(this.dims, this.results, 150);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieGridComponent.prototype.defaultTooltipText = function (_a) {
        var data = _a.data;
        var label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__common_trim_label_helper__["a" /* trimLabel */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__common_label_helper__["a" /* formatLabel */])(data.name));
        var val = data.value.toLocaleString();
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var name = d.data.name;
            var label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__common_label_helper__["a" /* formatLabel */])(name);
            var value = d.data.value;
            var radius = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_array__["min"])([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                name: name,
                label: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__common_trim_label_helper__["a" /* trimLabel */])(label),
                total: value,
                value: value,
                percent: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_format__["format"])('.1%')(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return PieGridComponent;
}(__WEBPACK_IMPORTED_MODULE_5__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieGridComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], PieGridComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], PieGridComponent.prototype, "tooltipTemplate", void 0);
PieGridComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-pie-grid',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n          <svg:g ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText({data: series})\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"series.data[0].data\"\n          />\n          <svg:text\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\">\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"'Total: '\">\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/pie-chart/pie-grid.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], PieGridComponent);



/***/ }),

/***/ "./src/pie-chart/pie-label.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieLabelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PieLabelComponent = (function () {
    function PieLabelComponent() {
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = __WEBPACK_IMPORTED_MODULE_2__common_trim_label_helper__["a" /* trimLabel */];
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var factor = 1.5;
        var outerArc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["arc"])()
            .innerRadius(this.radius * factor)
            .outerRadius(this.radius * factor);
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_shape__["arc"])()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function () {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function () {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function () {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function () {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function () {
            return this.isIE ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    return PieLabelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "radius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "color", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieLabelComponent.prototype, "explodeSlices", void 0);
PieLabelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-pie-label]',
        template: "\n    <title>{{label}}</title>\n    <svg:g\n      [attr.transform]=\"attrTransform\"\n      [style.transform]=\"styleTransform\"\n      [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\"\n        [style.textTransform]=\"'uppercase'\">\n        {{trimLabel(label, 10)}}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\">\n    </svg:path>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [])
], PieLabelComponent);



/***/ }),

/***/ "./src/pie-chart/pie-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PieSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_array__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_label_helper__ = __webpack_require__("./src/common/label.helper.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PieSeriesComponent = (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pieGenerator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["pie"])()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pieGenerator(this.series);
        this.max = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_array__["max"])(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["arc"])()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var factor = 1.5;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeriesComponent.prototype.labelText = function (arc) {
        if (this.labelFormatting) {
            return this.labelFormatting(arc.data.name);
        }
        return this.label(arc);
    };
    PieSeriesComponent.prototype.label = function (arc) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_label_helper__["a" /* formatLabel */])(arc.data.name);
    };
    PieSeriesComponent.prototype.defaultTooltipText = function (arc) {
        var label = this.label(arc);
        var val = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_label_helper__["a" /* formatLabel */])(arc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (arc) {
        return this.colors.getColor(this.label(arc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    return PieSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "series", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "innerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "outerRadius", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "explodeSlices", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "showLabels", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieSeriesComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], PieSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], PieSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PieSeriesComponent.prototype, "deactivate", void 0);
PieSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-pie-series]',
        template: "\n    <svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n      <svg:g ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"labelText(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n      <svg:g\n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(arc)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"arc.data\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
    })
], PieSeriesComponent);



/***/ }),

/***/ "./src/polar-chart/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polar_chart_module__ = __webpack_require__("./src/polar-chart/polar-chart.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__polar_chart_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__polar_chart_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__polar_chart_module__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polar_chart_component__ = __webpack_require__("./src/polar-chart/polar-chart.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polar_series_component__ = __webpack_require__("./src/polar-chart/polar-series.component.ts");
/* unused harmony namespace reexport */





/***/ }),

/***/ "./src/polar-chart/polar-chart.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/polar-chart/polar-chart.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/polar-chart/polar-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolarChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_animations__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_scale___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_scale__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_types__ = __webpack_require__("./src/utils/types.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var twoPI = 2 * Math.PI;
var PolarChartComponent = (function (_super) {
    __extends(PolarChartComponent, _super);
    function PolarChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.showGridLines = true;
        _this.curve = __WEBPACK_IMPORTED_MODULE_3_d3_shape__["curveCardinalClosed"];
        _this.activeEntries = [];
        _this.rangeFillOpacity = 0.15;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showSeriesOnHover = true;
        _this.gradient = false;
        _this.activate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.deactivate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    PolarChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.setDims();
        this.setScales();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.setTicks();
    };
    PolarChartComponent.prototype.setDims = function () {
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType
        });
        var halfWidth = ~~(this.dims.width / 2);
        var halfHeight = ~~(this.dims.height / 2);
        var outerRadius = this.outerRadius = Math.min(halfHeight / 1.5, halfWidth / 1.5);
        var yOffset = Math.max(0, halfHeight - outerRadius);
        this.yAxisDims = __assign({}, this.dims, { width: halfWidth });
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        this.transformYAxis = "translate(0, " + yOffset + ")";
        this.labelOffset = this.dims.height + 40;
        this.transformPlot = "translate(" + halfWidth + ", " + halfHeight + ")";
    };
    PolarChartComponent.prototype.setScales = function () {
        var xValues = this.getXValues();
        this.scaleType = this.getScaleType(xValues);
        this.xDomain = this.filteredDomain || this.getXDomain(xValues);
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, twoPI);
        this.yScale = this.getYScale(this.yDomain, this.outerRadius);
        this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);
    };
    PolarChartComponent.prototype.setTicks = function () {
        var _this = this;
        var tickFormat;
        if (this.xAxisTickFormatting) {
            tickFormat = this.xAxisTickFormatting;
        }
        else if (this.xScale.tickFormat) {
            tickFormat = this.xScale.tickFormat.apply(this.xScale, [5]);
        }
        else {
            tickFormat = function (d) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_types__["a" /* isDate */])(d)) {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        var outerRadius = this.outerRadius;
        var s = 1.1;
        this.thetaTicks = this.xDomain.map(function (d) {
            var startAngle = _this.xScale(d);
            var dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);
            var label = tickFormat(d);
            var startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
            var pos = [dd, s * startPos[1]];
            return {
                innerRadius: 0,
                outerRadius: outerRadius,
                startAngle: startAngle,
                endAngle: startAngle,
                value: outerRadius,
                label: label,
                startPos: startPos,
                pos: pos
            };
        });
        var minDistance = 10;
        /* from pie chart, abstract out -*/
        for (var i = 0; i < this.thetaTicks.length - 1; i++) {
            var a = this.thetaTicks[i];
            for (var j = i + 1; j < this.thetaTicks.length; j++) {
                var b = this.thetaTicks[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        this.radiusTicks = this.yAxisScale
            .ticks(~~(this.dims.height / 50))
            .map(function (d) { return _this.yScale(d); });
    };
    PolarChartComponent.prototype.getXValues = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        return values;
    };
    PolarChartComponent.prototype.getXDomain = function (values) {
        if (values === void 0) { values = this.getXValues(); }
        if (this.scaleType === 'time') {
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            return [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            return [min, max];
        }
        return values;
    };
    PolarChartComponent.prototype.getYValues = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        return domain;
    };
    PolarChartComponent.prototype.getYDomain = function (domain) {
        if (domain === void 0) { domain = this.getYValues(); }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        min = Math.max(0, min);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    PolarChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PolarChartComponent.prototype.getXScale = function (domain, width) {
        switch (this.scaleType) {
            case 'time':
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleTime"])()
                    .range([0, width])
                    .domain(domain);
            case 'linear':
                var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
                    .range([0, width])
                    .domain(domain);
                return this.roundDomains ? scale.nice() : scale;
            default:
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scalePoint"])()
                    .range([0, width - twoPI / domain.length])
                    .padding(0)
                    .domain(domain);
        }
    };
    PolarChartComponent.prototype.getYScale = function (domain, height) {
        var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_scale__["scaleLinear"])()
            .range([0, height])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    PolarChartComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_types__["a" /* isDate */])(value)) {
                date = false;
            }
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_types__["b" /* isNumber */])(value)) {
                num = false;
            }
        }
        if (date)
            return 'time';
        if (num)
            return 'linear';
        return 'ordinal';
    };
    PolarChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    PolarChartComponent.prototype.setColors = function () {
        var domain = (this.schemeType === 'ordinal') ?
            this.seriesDomain :
            this.yDomain.reverse();
        this.colors = new __WEBPACK_IMPORTED_MODULE_5__common_color_helper__["a" /* ColorHelper */](this.scheme, this.schemeType, domain, this.customColors);
    };
    PolarChartComponent.prototype.getLegendOptions = function () {
        if (this.schemeType === 'ordinal') {
            return {
                scaleType: this.schemeType,
                colors: this.colors,
                domain: this.seriesDomain,
                title: this.legendTitle
            };
        }
        return {
            scaleType: this.schemeType,
            colors: this.colors.scale,
            domain: this.yDomain,
            title: undefined
        };
    };
    PolarChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    PolarChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    PolarChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = this.showSeriesOnHover ? [item].concat(this.activeEntries) : this.activeEntries;
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PolarChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    PolarChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    PolarChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    return PolarChartComponent;
}(__WEBPACK_IMPORTED_MODULE_6__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "legend", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "legendTitle", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "xAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "yAxis", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "xAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "yAxisLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "autoScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showGridLines", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarChartComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], PolarChartComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolarChartComponent.prototype, "schemeType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], PolarChartComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], PolarChartComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], PolarChartComponent.prototype, "yAxisTickFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "roundDomains", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "showSeriesOnHover", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarChartComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PolarChartComponent.prototype, "activate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PolarChartComponent.prototype, "deactivate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], PolarChartComponent.prototype, "tooltipTemplate", void 0);
PolarChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-polar-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g class=\"polar-chart chart\" [attr.transform]=\"transform\">\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:circle\n            class=\"polar-chart-background\"\n            cx=\"0\" cy=\"0\"\n            [attr.r]=\"this.outerRadius\" />\n          <svg:g *ngIf=\"showGridLines\">\n            <svg:circle\n              *ngFor=\"let r of radiusTicks\"\n              class=\"gridline-path radial-gridline-path\"\n              cx=\"0\" cy=\"0\"\n              [attr.r]=\"r\" />\n          </svg:g>\n          <svg:g *ngIf=\"xAxis\">\n            <svg:g ngx-charts-pie-label\n              *ngFor=\"let tick of thetaTicks\"\n              [data]=\"tick\"\n              [radius]=\"outerRadius\"\n              [label]=\"tick.label\"\n              [max]=\"outerRadius\"\n              [value]=\"showGridLines ? 1 : outerRadius\"\n              [explodeSlices]=\"true\">\n            </svg:g>\n          </svg:g>\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          [attr.transform]=\"transformYAxis\"\n          *ngIf=\"yAxis\"\n          [yScale]=\"yAxisScale\"\n          [dims]=\"yAxisDims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-axis-label\n          *ngIf=\"xAxis && showXAxisLabel\"\n          [label]=\"xAxisLabel\"\n          [offset]=\"labelOffset\"\n          [orient]=\"'bottom'\"\n          [height]=\"dims.height\"\n          [width]=\"dims.width\">\n        </svg:g>\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\" [@animationState]=\"'active'\">\n            <svg:g ngx-charts-polar-series\n              [gradient]=\"gradient\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [
            __webpack_require__("./src/common/base-chart.component.scss"),
            __webpack_require__("./src/pie-chart/pie-chart.component.scss"),
            __webpack_require__("./src/polar-chart/polar-chart.component.scss")
        ],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["trigger"])('animationState', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["transition"])(':leave', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 1,
                    }),
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["animate"])(500, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["style"])({
                        opacity: 0
                    }))
                ])
            ])
        ]
    })
], PolarChartComponent);



/***/ }),

/***/ "./src/polar-chart/polar-chart.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PolarChartModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polar_chart_component__ = __webpack_require__("./src/polar-chart/polar-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polar_series_component__ = __webpack_require__("./src/polar-chart/polar-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pie_chart___ = __webpack_require__("./src/pie-chart/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__line_chart___ = __webpack_require__("./src/line-chart/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__polar_chart_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__polar_series_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PolarChartModule = (function () {
    function PolarChartModule() {
    }
    return PolarChartModule;
}());
PolarChartModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */], __WEBPACK_IMPORTED_MODULE_4__pie_chart___["h" /* PieChartModule */], __WEBPACK_IMPORTED_MODULE_5__line_chart___["d" /* LineChartModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__polar_chart_component__["a" /* PolarChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__polar_series_component__["a" /* PolarSeriesComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__polar_chart_component__["a" /* PolarChartComponent */],
            __WEBPACK_IMPORTED_MODULE_3__polar_series_component__["a" /* PolarSeriesComponent */]
        ]
    })
], PolarChartModule);



/***/ }),

/***/ "./src/polar-chart/polar-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolarSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_shape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_shape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_id__ = __webpack_require__("./src/utils/id.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_sort__ = __webpack_require__("./src/utils/sort.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PolarSeriesComponent = (function () {
    function PolarSeriesComponent(location) {
        this.location = location;
        this.tooltipDisabled = false;
        this.gradient = false;
        this.circleRadius = 3;
    }
    PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PolarSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradients();
        var line = this.getLineGenerator();
        var data = this.sortData(this.data.series);
        var seriesName = this.data.name;
        var linearScaleType = this.colors.scaleType === 'linear';
        var min = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
        this.path = line(data) || '';
        this.circles = data.map(function (d) {
            var a = _this.getAngle(d);
            var r = _this.getRadius(d);
            var value = d.value;
            var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            var cData = {
                series: seriesName,
                value: value,
                name: d.name
            };
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value: value,
                color: color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
    };
    PolarSeriesComponent.prototype.getAngle = function (d) {
        var label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    };
    PolarSeriesComponent.prototype.getRadius = function (d) {
        return this.yScale(d.value);
    };
    PolarSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_shape__["radialLine"])()
            .angle(function (d) { return _this.getAngle(d); })
            .radius(function (d) { return _this.getRadius(d); })
            .curve(this.curve);
    };
    PolarSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["a" /* sortLinear */])(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["b" /* sortByTime */])(data, 'name');
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_sort__["c" /* sortByDomain */])(data, 'name', 'asc', this.xScale.domain());
    };
    PolarSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    PolarSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + this.data.name + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    PolarSeriesComponent.prototype.updateGradients = function () {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_id__["a" /* id */])().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.colors.scaleType === 'linear') {
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
        }
        else {
            this.gradientStops = undefined;
        }
    };
    return PolarSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "xScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "yScale", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolarSeriesComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], PolarSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], PolarSeriesComponent.prototype, "tooltipText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], PolarSeriesComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
PolarSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-polar-series]',
        template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g ngx-charts-svg-radial-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n      />\n      <svg:g ngx-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        tooltipType=\"tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], PolarSeriesComponent);



/***/ }),

/***/ "./src/tree-map/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_map_module__ = __webpack_require__("./src/tree-map/tree-map.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_map_module__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_map_module__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_map_module__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_map_module__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_map_component__ = __webpack_require__("./src/tree-map/tree-map.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_map_cell_component__ = __webpack_require__("./src/tree-map/tree-map-cell.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_map_cell_series_component__ = __webpack_require__("./src/tree-map/tree-map-cell-series.component.ts");
/* unused harmony namespace reexport */






/***/ }),

/***/ "./src/tree-map/tree-map-cell-series.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeMapCellSeriesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TreeMapCellSeriesComponent = (function () {
    function TreeMapCellSeriesComponent() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            var data = {
                name: label,
                value: d.value
            };
            return {
                data: data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    return TreeMapCellSeriesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "dims", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "colors", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TreeMapCellSeriesComponent.prototype, "select", void 0);
TreeMapCellSeriesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-tree-map-cell-series]',
        template: "\n    <svg:g ngx-charts-tree-map-cell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [data]=\"c\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [gradient]=\"gradient\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"c.data\">\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], TreeMapCellSeriesComponent);



/***/ }),

/***/ "./src/tree-map/tree-map-cell.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeMapCellComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3_selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_color_utils__ = __webpack_require__("./src/utils/color-utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_trim_label_helper__ = __webpack_require__("./src/common/trim-label.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_id__ = __webpack_require__("./src/utils/id.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TreeMapCellComponent = (function () {
    function TreeMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function () {
        this.update();
        var hasValue = this.data && typeof this.data.value !== 'undefined';
        this.valueFormatting = this.valueFormatting || (function (cell) { return cell.value.toLocaleString(); });
        var labelFormatting = this.labelFormatting || (function (cell) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_trim_label_helper__["a" /* trimLabel */])(cell.label, 55); });
        var cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedLabel = labelFormatting(cellData);
        var pageUrl = this.location instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common__["PathLocationStrategy"]
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_id__["a" /* id */])().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            this.loadAnimation();
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_color_utils__["a" /* invertColor */])(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3_selection__["select"])(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1)
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height);
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.label,
            value: this.value
        });
    };
    TreeMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    return TreeMapCellComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "fill", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "x", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "y", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "height", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "valueType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TreeMapCellComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "select", void 0);
TreeMapCellComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'g[ngx-charts-tree-map-cell]',
        template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.color]=\"getTextColor()\"\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\">\n          </xhtml:span>\n          <xhtml:br />\n          <xhtml:span \n            class=\"treemap-val\" \n            ngx-charts-count-up \n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\">\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["LocationStrategy"]])
], TreeMapCellComponent);



/***/ }),

/***/ "./src/tree-map/tree-map.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/lib/loader.js?sourceMap!./src/tree-map/tree-map.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/tree-map/tree-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_hierarchy__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_hierarchy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3_hierarchy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__ = __webpack_require__("./src/common/base-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__ = __webpack_require__("./src/common/view-dimensions.helper.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_color_helper__ = __webpack_require__("./src/common/color.helper.ts");
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TreeMapComponent = (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.gradient = false;
        _this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    TreeMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_view_dimensions_helper__["a" /* calculateViewDimensions */])({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_hierarchy__["treemap"])()
            .size([this.dims.width, this.dims.height]);
        var rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        var root = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_hierarchy__["stratify"])()
            .id(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(function (d) { return d.isRoot ? null : 'root'; })([rootNode].concat(this.results))
            .sum(function (d) { return d.value; });
        this.data = this.treemap(root);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMapComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    TreeMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapComponent.prototype.setColors = function () {
        this.colors = new __WEBPACK_IMPORTED_MODULE_4__common_color_helper__["a" /* ColorHelper */](this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return TreeMapComponent;
}(__WEBPACK_IMPORTED_MODULE_2__common_base_chart_component__["a" /* BaseChartComponent */]));
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "results", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TreeMapComponent.prototype, "tooltipDisabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "valueFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "labelFormatting", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TreeMapComponent.prototype, "gradient", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TreeMapComponent.prototype, "select", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])('tooltipTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], TreeMapComponent.prototype, "tooltipTemplate", void 0);
TreeMapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ngx-charts-tree-map',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styles: [__webpack_require__("./src/tree-map/tree-map.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    })
], TreeMapComponent);



/***/ }),

/***/ "./src/tree-map/tree-map.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TreeMapModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__ = __webpack_require__("./src/common/chart-common.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tree_map_cell_component__ = __webpack_require__("./src/tree-map/tree-map-cell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tree_map_cell_series_component__ = __webpack_require__("./src/tree-map/tree-map-cell-series.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tree_map_component__ = __webpack_require__("./src/tree-map/tree-map.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__tree_map_cell_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__tree_map_cell_series_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__tree_map_component__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    return TreeMapModule;
}());
TreeMapModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__common_chart_common_module__["a" /* ChartCommonModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__tree_map_cell_component__["a" /* TreeMapCellComponent */],
            __WEBPACK_IMPORTED_MODULE_3__tree_map_cell_series_component__["a" /* TreeMapCellSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__tree_map_component__["a" /* TreeMapComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__tree_map_cell_component__["a" /* TreeMapCellComponent */],
            __WEBPACK_IMPORTED_MODULE_3__tree_map_cell_series_component__["a" /* TreeMapCellSeriesComponent */],
            __WEBPACK_IMPORTED_MODULE_4__tree_map_component__["a" /* TreeMapComponent */]
        ]
    })
], TreeMapModule);



/***/ }),

/***/ "./src/utils/color-sets.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colorSets; });
var colorSets = [
    {
        name: 'vivid',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
        ]
    },
    {
        name: 'natural',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
        ]
    },
    {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
        ]
    },
    {
        name: 'fire',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
        ]
    },
    {
        name: 'solar',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
        ]
    },
    {
        name: 'air',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
        ]
    },
    {
        name: 'aqua',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
        ]
    },
    {
        name: 'flame',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
        ]
    },
    {
        name: 'ocean',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
        ]
    },
    {
        name: 'forest',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
        ]
    },
    {
        name: 'horizon',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
        ]
    },
    {
        name: 'neons',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
        ]
    },
    {
        name: 'picnic',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
        ]
    },
    {
        name: 'night',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
            '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
        ]
    },
    {
        name: 'nightLights',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
            '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
        ]
    }
];


/***/ }),

/***/ "./src/utils/color-utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hexToRgb */
/* harmony export (immutable) */ __webpack_exports__["a"] = invertColor;
/* unused harmony export shadeRGBColor */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_color__);

/**
 * Converts a hex to RGB
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
function hexToRgb(value) {
    // deprecated, use d3.color()
    return __WEBPACK_IMPORTED_MODULE_0_d3_color__["rgb"](value);
}
/**
 * Accepts a color (string) and returns a inverted hex color (string)
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} value
 * @returns {string}
 */
function invertColor(value) {
    var color = __WEBPACK_IMPORTED_MODULE_0_d3_color__["rgb"](value);
    var r = color.r, g = color.g, b = color.b, opacity = color.opacity;
    if (opacity === 0) {
        return color.toString();
    }
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    var depth = (yiq >= 128) ? -.8 : .8;
    return shadeRGBColor(color, depth);
}
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param {any} { r, g, b }
 * @param {any} percent
 * @returns
 */
function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


/***/ }),

/***/ "./src/utils/id.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = id;
var cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
function id() {
    var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = "a" + newId;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}


/***/ }),

/***/ "./src/utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__id__ = __webpack_require__("./src/utils/id.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__id__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_sets__ = __webpack_require__("./src/utils/color-sets.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sort__ = __webpack_require__("./src/utils/sort.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__throttle__ = __webpack_require__("./src/utils/throttle.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__color_utils__ = __webpack_require__("./src/utils/color-utils.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visibility_observer__ = __webpack_require__("./src/utils/visibility-observer.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__visibility_observer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__types__ = __webpack_require__("./src/utils/types.ts");
/* unused harmony namespace reexport */









/***/ }),

/***/ "./src/utils/sort.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sortLinear;
/* harmony export (immutable) */ __webpack_exports__["c"] = sortByDomain;
/* harmony export (immutable) */ __webpack_exports__["b"] = sortByTime;
function sortLinear(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        if (direction === 'asc') {
            return a[property] - b[property];
        }
        else {
            return b[property] - a[property];
        }
    });
}
function sortByDomain(data, property, direction, domain) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aVal = a[property];
        var bVal = b[property];
        var aIdx = domain.indexOf(aVal);
        var bIdx = domain.indexOf(bVal);
        if (direction === 'asc') {
            return aIdx - bIdx;
        }
        else {
            return bIdx - aIdx;
        }
    });
}
function sortByTime(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aDate = a[property].getTime();
        var bDate = b[property].getTime();
        if (direction === 'asc') {
            if (aDate > bDate)
                return 1;
            if (bDate > aDate)
                return -1;
            return 0;
        }
        else {
            if (aDate > bDate)
                return -1;
            if (bDate > aDate)
                return 1;
            return 0;
        }
    });
}


/***/ }),

/***/ "./src/utils/throttle.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export throttle */
/* harmony export (immutable) */ __webpack_exports__["a"] = throttleable;
/**
 * Throttle a function
 *
 * @export
 * @param {*}      func
 * @param {number} wait
 * @param {*}      [options]
 * @returns
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}


/***/ }),

/***/ "./src/utils/types.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isDate;
/* harmony export (immutable) */ __webpack_exports__["b"] = isNumber;
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
function isNumber(value) {
    return typeof value === 'number';
}


/***/ }),

/***/ "./src/utils/visibility-observer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisibilityObserver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Visibility Observer
 */
var VisibilityObserver = (function () {
    function VisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isVisible = false;
        this.runCheck();
    }
    VisibilityObserver.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            if (!_this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 50);
                });
            }
        };
        setTimeout(function () { return check(); });
    };
    return VisibilityObserver;
}());

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], VisibilityObserver.prototype, "visible", void 0);


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map