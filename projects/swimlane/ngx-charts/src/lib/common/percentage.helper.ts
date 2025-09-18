/**
 * Rounds percentages using the largest remainder method to ensure they always sum to 100%
 *
 * @param values Array of numeric values
 * @returns Array of rounded percentages
 */
export function roundPercentages(values: number[]): number[] {
  const totalValue = values.reduce((a, b) => a + b, 0);

  if (totalValue === 0) {
    // It total is 0 return all values as 0
    return Array(values.length).fill(0);
  }

  const raw = values.map(v => (v / totalValue) * 100);
  const floored = raw.map(v => Math.floor(v));
  const remainders = raw.map((v, i) => ({ i, remainder: v - floored[i] }));
  const sum = floored.reduce((a, b) => a + b, 0);
  const diff = 100 - sum;

  if (diff > 0) {
    // Adding points to values with large remainder
    remainders
      .sort((a, b) => b.remainder - a.remainder)
      .slice(0, diff)
      .forEach(r => floored[r.i]++);
  } else if (diff < 0) {
    // Removing points from values with small remainder
    remainders
      .sort((a, b) => a.remainder - b.remainder)
      .slice(0, -diff)
      .forEach(r => floored[r.i]--);
  }

  return floored;
}

/**
 * Calculates and formats percentages
 *
 * @param values Array of numeric values
 * @returns Array of formatted percentage strings
 */
export function calculateAccuratePercentages(values: number[]): string[] {
  const roundedPercentages = roundPercentages(values);
  return roundedPercentages.map(p => p.toString());
}
