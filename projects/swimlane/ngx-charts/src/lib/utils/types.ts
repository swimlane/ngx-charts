export function isDate(value): boolean {
  return toString.call(value) === '[object Date]';
}

export function isNumber(value): boolean {
  return typeof value === 'number';
}
