import * as d3_color from 'd3-color';
/**
 * Converts a hex to RGB
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
export function hexToRgb(value) {
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
export function invertColor(value) {
    var color = d3_color.rgb(value);
    var r = color.r, g = color.g, b = color.b, opacity = color.opacity;
    if (opacity === 0) {
        return color.toString();
    }
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    var depth = (yiq >= 128) ? -.8 : .8;
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
export function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
//# sourceMappingURL=color-utils.js.map