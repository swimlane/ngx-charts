/**
 * Return a css-valid name starting from a string
 *
 * @export
 * @returns string
 * @param sourceName
 */
export function cssValidName(sourceName): string {
  return sourceName ? sourceName.replace(/[^\w\s]/gi, '').replace(' ', '-').toLowerCase() : '';
}
