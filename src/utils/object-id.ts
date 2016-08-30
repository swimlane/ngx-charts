// Ensure we don't duplicate ids
// during our session
let cache = {};

/**
 * MongoDB Object ID Generation.
 * Example: `571785e57b215b3968f25c3c`
 */
export default function ObjectId() {
  /* tslint:disable:no-bitwise */
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  const id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  /* tslint:enable */

  // ensure not already used
  if (!cache[id]) {
    cache[id] = true;
    return id;
  }

  return ObjectId();
};

/**
 * Generates a short id.
 *
 * Description:
 *  A 4-character alphanumeric sequence (364 = 1.6 million)
 *  This should only be used for JavaScript specific models.
 *  http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *  Example: `ebgf`
 */
export function ShortId() {
  /* tslint:disable:no-bitwise */
  let id = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  /* tslint:enable */
  // append a 'a' because neo gets mad
  id = `a${id}`;

  // ensure not already used
  if (!cache[id]) {
    cache[id] = true;
    return id;
  }

  return ShortId();
}
