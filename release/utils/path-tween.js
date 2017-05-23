import { interpolate } from 'd3-interpolate';
export function pathTween(d1, precision) {
    return function () {
        var path0 = this;
        var path1 = path0.cloneNode();
        var n0 = path0.getTotalLength();
        var n1 = (path1.setAttribute('d', d1), path1).getTotalLength();
        // Uniform sampling of distance based on specified precision.
        var distances = [0];
        var dt = precision / Math.max(n0, n1);
        var i = dt;
        while (i < 1) {
            distances.push(i);
            i += dt;
        }
        distances.push(1);
        // Compute point-interpolators at each distance.
        var points = distances.map(function (t) {
            var p0 = path0.getPointAtLength(t * n0);
            var p1 = path1.getPointAtLength(t * n1);
            return interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
        return function (t) {
            return t < 1 ? 'M' + points.map(function (p) { return p(t); }).join('L') : d1;
        };
    };
}
//# sourceMappingURL=path-tween.js.map