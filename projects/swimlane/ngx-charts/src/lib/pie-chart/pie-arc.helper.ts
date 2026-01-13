import { arc } from 'd3-shape';
import { interpolate } from 'd3-interpolate';

export function calculatePieArcPath(
  innerRadius: number,
  outerRadius: number,
  max: number,
  value: number,
  cornerRadius: number,
  explodeSlices: boolean
): any {
  let actualOuterRadius = outerRadius;
  if (explodeSlices && innerRadius === 0) {
    actualOuterRadius = (outerRadius * value) / max;
  }

  return arc().innerRadius(innerRadius).outerRadius(actualOuterRadius).cornerRadius(cornerRadius);
}

export function animatePieArc(
  element: HTMLElement,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
  max: number,
  value: number,
  cornerRadius: number,
  explodeSlices: boolean,
  isUpdate: boolean,
  nodeSelection: any
): void {
  const calc = calculatePieArcPath(innerRadius, outerRadius, max, value, cornerRadius, explodeSlices);
  const node = nodeSelection || nodeSelection.selectAll('.arc').data([{ startAngle, endAngle }]);

  if (isUpdate) {
    node
      .transition()
      .duration(750)
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function (t) {
          return calc(interpolater(t));
        };
      });
  } else {
    node
      .attr('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const copyOfD = Object.assign({}, d);
        copyOfD.endAngle = copyOfD.startAngle;
        (<any>this)._current = copyOfD;
        return calc(copyOfD);
      })
      .transition()
      .duration(750)
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function (t) {
          return calc(interpolater(t));
        };
      });
  }
}

export function getGradient(gradient: boolean, gradientFill: string, fill: string): string {
  return gradient ? gradientFill : fill;
}

export function getPointerEvents(pointerEvents: boolean): string {
  return pointerEvents ? 'auto' : 'none';
}
