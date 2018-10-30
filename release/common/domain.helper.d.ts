/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
export declare function getUniqueXDomainValues(results: any[]): any[];
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
export declare function getScaleType(values: any[], checkDateType?: boolean): string;
