import * as d3_color from 'd3-color';

/**
 * Converts a hex to RGB
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
export function hexToRgb(value: string): any {
  // deprecated, use d3.color()
  return d3_color.rgb(value);
}

/**
 * Accepts a color (string) and returns a inverted hex color (string)
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} value
 * @returns {string}
 */
export function invertColor(value: string): string {
  const color = d3_color.rgb(value);
  const { r, g, b, opacity } = color;
  if (opacity === 0) {
    return color.toString();
  }
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  const depth = (yiq >= 128) ? -.8 : .8;

  return shadeRGBColor(color, depth);
}

/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param {any} { r, g, b }
 * @param {any} percent
 * @returns
 */
export function shadeRGBColor({ r, g, b }, percent) {
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;

  r = (Math.round((t - r) * p) + r);
  g = (Math.round((t - g) * p) + g);
  b = (Math.round((t - b) * p) + b);

  return `rgb(${r}, ${g}, ${b})`;
}
