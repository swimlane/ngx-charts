// If we don't check whether 'window' and 'global' variables are defined,
// code will fail in browser/node with 'variable is undefined' error.
var root;
if (typeof (window) !== 'undefined') {
    root = window;
}
else if (typeof (global) !== 'undefined') {
    root = global;
}
/* tslint:disable:variable-name */
export var MouseEvent = root.MouseEvent;
//# sourceMappingURL=events.js.map