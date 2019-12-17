import { MultiSeries } from '../models/chart-data.model';

/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export function getUniqueXDomainValues(results: MultiSeries): Array<string | number | Date> {
  const valueSet = new Set<string | number | Date>();
  for (const result of results) {
    for (const d of result.series) {
      valueSet.add(d.name);
    }
  }
  return Array.from(valueSet);
}

/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export function getScaleType(values: any[], checkDateType = true): string {
  if (checkDateType) {
    const allDates = values.every(value => value instanceof Date);
    if (allDates) {
      return 'time';
    }
  }

  const allNumbers = values.every(value => typeof value === 'number');
  if (allNumbers) {
    return 'linear';
  }

  return 'ordinal';
}

export function getXDomainArray(
  values: Array<string | number | Date>,
  xScaleMin?: number,
  xScaleMax?: number
): { domain: any[]; xSet: any[]; scaleType: string } {
  const scaleType = getScaleType(values);
  let xSet = [];
  let domain = [];

  if (scaleType === 'linear') {
    values = values.map(v => Number(v));
  }

  let min: number;
  let max: number;
  if (scaleType === 'time' || scaleType === 'linear') {
    const mappedValues = values.map(v => Number(v));
    min = xScaleMin ? xScaleMin : Math.min(...mappedValues);
    max = xScaleMax ? xScaleMax : Math.max(...mappedValues);
  }

  if (scaleType === 'time') {
    domain = [new Date(min), new Date(max)];
    xSet = [...values].sort((a: Date, b: Date) => {
      const aDate = a.getTime();
      const bDate = b.getTime();
      if (aDate > bDate) return 1;
      if (bDate > aDate) return -1;
      return 0;
    });
  } else if (scaleType === 'linear') {
    domain = [min, max];
    // Use compare function to sort numbers numerically
    xSet = [...values].sort((a: number, b: number) => a - b);
  } else {
    domain = values;
    xSet = values;
  }

  return { domain, xSet, scaleType };
}
