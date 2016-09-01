// Ensure we don't duplicate ids
// during our session
let cache = {};

/**
 * Unique Object ID Generation.
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
