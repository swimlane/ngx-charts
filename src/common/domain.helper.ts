/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
export function getUniqueXDomainValues(results: any[]): any[] {
  const valueSet = new Set();
  for (const result of results) {
    for (const d of result.series) {
      valueSet.add(d.name);
    }
  }
  return Array.from(valueSet);
}

/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
export function getScaleType(values): string {
    const allDates = values.every(value => this.isDate(value));
    const allNumbers = values.every(value => typeof value === 'number');

    if (allDates) {
      return 'time';
    }

    if (allNumbers) {
      return 'linear';
    }

    return 'ordinal';
}
