/**
 * Determines whether or not the provided value is a Date object.
 * https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
 * @param value The value to check.
 * @returns True if the provided value is a Date object; false otherwise.
 */
export function isDate(value: unknown): boolean {
  return value instanceof Date || toString.call(value) === '[object Date]';
}

/**
 * Determines whether or not the provided value is a number.
 * @param value The value to check.
 * @returns True if the provided value is a number; false otherwise.
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

/**
 * Determines whether or not the provided value is defined.
 * @param value The value to check.
 * @returns True if the provided value is defined; false otherwise.
 */
export function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null;
}
