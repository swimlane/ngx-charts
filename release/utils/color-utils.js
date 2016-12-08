"use strict";
/**
 * Converts a hex to RGB
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
function hexToRgb(hex) {
    var result = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; })
        .substring(1).match(/.{2}/g)
        .map(function (x) { return parseInt(x, 16); });
    return {
        r: result[0],
        g: result[1],
        b: result[2]
    };
}
exports.hexToRgb = hexToRgb;
/**
 * Accepts a hex color and returns a inverted hex color
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} color
 * @returns {string}
 */
function invertColor(hex) {
    var _a = hexToRgb(hex), r = _a.r, g = _a.g, b = _a.b;
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    var darken = (yiq >= 128);
    var depth = darken ? -.8 : .8;
    return shadeRGBColor({ r: r, g: g, b: b }, depth);
}
exports.invertColor = invertColor;
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param {any} { r, g, b }
 * @param {any} percent
 * @returns
 */
function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
exports.shadeRGBColor = shadeRGBColor;
//# sourceMappingURL=color-utils.js.map