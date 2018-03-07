/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */
export function roundedRect(x, y, w, h, r, _a) {
    var tl = _a[0], tr = _a[1], bl = _a[2], br = _a[3];
    var retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = "M" + [x + r, y];
    retval += "h" + (w - 2 * r);
    if (tr) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, r];
    }
    else {
        retval += "h" + r + "v" + r;
    }
    retval += "v" + (h - 2 * r);
    if (br) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, r];
    }
    else {
        retval += "v" + r + "h" + -r;
    }
    retval += "h" + (2 * r - w);
    if (bl) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, -r];
    }
    else {
        retval += "h" + -r + "v" + -r;
    }
    retval += "v" + (2 * r - h);
    if (tl) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, -r];
    }
    else {
        retval += "v" + -r + "h" + r;
    }
    retval += "z";
    return retval;
}
//# sourceMappingURL=shape.helper.js.map