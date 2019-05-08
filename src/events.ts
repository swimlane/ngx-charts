declare let global: any;

// If we don't check whether 'window' and 'global' variables are defined,
// code will fail in browser/node with 'variable is undefined' error.
let root: any;
if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
}

// tslint:disable-next-line:variable-name
export const MouseEvent = root.MouseEvent as MouseEvent & {
  prototype?: MouseEvent;
  new (typeArg: string, eventInitDict?: MouseEventInit): MouseEvent;
};

export function createMouseEvent(name: string, bubbles: boolean = false, cancelable: boolean = true): MouseEvent {
  // Calling new of an event does not work correctly on IE. The following is a tested workaround
  // See https://stackoverflow.com/questions/27176983/dispatchevent-not-working-in-ie11
  if (typeof(MouseEvent) === 'function') {
    // Sane browsers
    return new MouseEvent(name, {bubbles, cancelable});
  } else {
    // IE
    const event = document.createEvent('MouseEvent');
    event.initEvent(name, bubbles, cancelable);
    return event;
  }
}
