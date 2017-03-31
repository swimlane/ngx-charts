/**
 * Converts a hex to RGB
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
export function hexToRgb(hex: string): any {
  const result =
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
      , (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

  return {
    r: result[0],
    g: result[1],
    b: result[2]
  };
}

/**
 * Accepts a hex color and returns a inverted hex color
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} color
 * @returns {string}
 */
export function invertColor(hex): any {
  const { r, g, b } = hexToRgb(hex);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  const darken = (yiq >= 128);
  const depth = darken ? -.8 : .8;

  return shadeRGBColor({ r, g, b }, depth);
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
