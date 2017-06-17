import { interpolate } from 'd3-interpolate';

export function pathTween(d1, precision) {
  return function() {
    const path0 = this;
    const path1 = path0.cloneNode();
    const n0 = path0.getTotalLength();
    const n1 = (path1.setAttribute('d', d1), path1).getTotalLength();

    // Uniform sampling of distance based on specified precision.
    const distances = [0];
    const dt = precision / Math.max(n0, n1);
    let i = dt;

    while (i < 1) {
      distances.push(i);
      i += dt;
    }

    distances.push(1);

    // Compute point-interpolators at each distance.
    const points = distances.map(function(t) {
      const p0 = path0.getPointAtLength(t * n0);
      const p1 = path1.getPointAtLength(t * n1);
      return interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return function(t) {
      return t < 1 ? 'M' + points.map(p => p(t)).join('L') : d1;
    };
  };
}
