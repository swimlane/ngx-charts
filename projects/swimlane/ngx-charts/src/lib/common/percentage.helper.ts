/**
 * Rounds percentages using the largest remainder method to ensure they always sum to 100%
 *
 * @param values Array of numeric values
 * @returns Array of rounded percentages with decimals
 */
export function roundPercentagesWithDecimals(values: number[], decimals: number = 2): string[] {
  const total = values.reduce((a, b) => a + b, 0);
  if (total === 0) return values.map(_ => '0.00');
  const scale = Math.pow(10, decimals + 2);
  const rawUnits = values.map(v => (v / total) * scale);
  const floored = rawUnits.map(u => Math.floor(u));
  const remainders = rawUnits.map((u, i) => ({ i, rem: u - floored[i] }));

  const sumFloored = floored.reduce((a, b) => a + b, 0);
  const diff = scale - sumFloored;
  if (diff > 0) {
    remainders.sort((a, b) => b.rem - a.rem);
    for (let k = 0; k < diff; k++) {
      floored[remainders[k].i] += 1;
    }
  } else if (diff < 0) {
    remainders.sort((a, b) => a.rem - b.rem);
    for (let k = 0; k < -diff; k++) {
      floored[remainders[k].i] -= 1;
    }
  }
  return floored.map(u => (u / 100).toFixed(2));
}
