/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
export function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
/**
 * Escapes a label.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
export function escapeLabel(label) {
    return label.toLocaleString().replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            '\'': '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match];
    });
}
//# sourceMappingURL=label.helper.js.map