// If we don't check whether 'window' and 'global' variables are defined,
// code will fail in browser/node with 'variable is undefined' error.
var root;
if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global;
}
// tslint:disable-next-line:variable-name
export var MouseEvent = root.MouseEvent;
export function createMouseEvent(name, bubbles, cancelable) {
    if (bubbles === void 0) { bubbles = false; }
    if (cancelable === void 0) { cancelable = true; }
    // Calling new of an event does not work correctly on IE. The following is a tested workaround
    // See https://stackoverflow.com/questions/27176983/dispatchevent-not-working-in-ie11
    if (typeof (MouseEvent) === 'function') {
        // Sane browsers
        return new MouseEvent(name, { bubbles: bubbles, cancelable: cancelable });
    }
    else {
        // IE
        var event_1 = document.createEvent('MouseEvent');
        event_1.initEvent(name, bubbles, cancelable);
        return event_1;
    }
}
//# sourceMappingURL=events.js.map