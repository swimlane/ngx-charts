export function calculateTextWidth(fontFamilyKey: Record<string, never>, text: string, defaultWidth = 8) {
  return text.split('').reduce((acc, curr) => {
    const width = fontFamilyKey[curr] || defaultWidth;
    return acc + width;
  }, 0);
}
