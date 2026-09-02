/** Max whole characters that fit in a pixel width (SSR / axis layout). */
export function maxCharsForPixelWidth(maxWidthPx: number, charWidth: number = 6): number {
  if (maxWidthPx <= 0 || charWidth <= 0) {
    return 0;
  }
  return Math.floor(maxWidthPx / charWidth);
}

export function trimLabel(s: any, max: number = 16): string {
  if (typeof s !== 'string') {
    if (typeof s === 'number') {
      return s + '';
    } else {
      return '';
    }
  }

  s = s.trim();
  if (s.length <= max) {
    return s;
  } else {
    return `${s.slice(0, max)}...`;
  }
}
