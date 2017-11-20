// The export is needed here to generate a valid polyfills.metadata.json file
export function ngxChartsPolyfills() {
  // IE11 fix
  // Ref: https://github.com/swimlane/ngx-charts/issues/386
  if (typeof(SVGElement) !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
  }
  // IE11 fix (http://caniuse.com/#search=classList)
  if (!('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    const descr = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
    Object.defineProperty(SVGElement.prototype, 'classList', descr);
  }
}

ngxChartsPolyfills();
