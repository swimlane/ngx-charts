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
