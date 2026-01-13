import { interpolate } from 'd3-interpolate';
import { IVector2D, IPoint } from '../models/coordinates.model';
import { roundedRect } from '../common/shape.helper';
import { Gradient } from '../common/types/gradient.interface';

type LineCoordinates = [IVector2D, IVector2D, IVector2D, IVector2D];

export function clonePoint(original: IPoint): IPoint {
  if (!original) {
    return original;
  }
  return {
    x: original.x,
    y: original.y
  };
}

export function cloneVector2d(original: IVector2D): IVector2D {
  if (!original) {
    return original;
  }
  return {
    v1: clonePoint(original.v1),
    v2: clonePoint(original.v2)
  };
}

export function cloneLineCoordinates(original: LineCoordinates): LineCoordinates {
  if (!original) {
    return original;
  }
  return [
    cloneVector2d(original[0]),
    cloneVector2d(original[1]),
    cloneVector2d(original[2]),
    cloneVector2d(original[3])
  ];
}

export function getBoxRadius(roundEdges: boolean, height: number, width: number): number {
  let radius = 0;
  if (roundEdges && height > 5 && width > 5) {
    radius = Math.floor(Math.min(5, height / 2, width / 2));
  }
  return radius;
}

export function getBoxPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  edges: boolean[]
): string {
  return roundedRect(x, y, width, height, Math.min(height, radius), edges);
}

export function getBoxStartingPath(
  width: number,
  lineCoordinates: [IVector2D, IVector2D, IVector2D, IVector2D],
  roundEdges: boolean,
  edges: boolean[]
): string {
  const radius = roundEdges ? 1 : 0;
  const { x, y } = lineCoordinates[2].v1;
  return roundedRect(x - width, y - 1, width, 2, radius, edges);
}

export function getBoxStartingLineCoordinates(
  lineCoordinates: [IVector2D, IVector2D, IVector2D, IVector2D]
): [IVector2D, IVector2D, IVector2D, IVector2D] {
  const coords = cloneLineCoordinates(lineCoordinates);
  coords[1].v1.y = coords[1].v2.y = coords[3].v1.y = coords[3].v2.y = coords[0].v1.y = coords[0].v2.y = coords[2].v1.y;
  return coords;
}

export function pathTween(d1: string, precision: number) {
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const path0 = this;
    const path1 = this.cloneNode();
    path1.setAttribute('d', d1);
    const n0 = path0?.getTotalLength();
    const n1 = path1?.getTotalLength();
    // Uniform sampling of distance based on specified precision.
    const distances = [0];
    let i = 0;
    const dt = precision / Math.max(n0, n1);
    while (i < 1) {
      distances.push(i);
      i += dt;
    }
    distances.push(1);

    // Compute point-interpolators at each distance.
    const points = distances.map((t: number) => {
      const p0 = path0.getPointAtLength(t * n0);
      const p1 = path1.getPointAtLength(t * n1);
      return interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    // 't': T is the fraction of time (between 0 and 1) since the transition began.
    return (t: any) => {
      return t < 1 ? 'M' + points.map((p: (t: number) => any[]) => p(t)).join('L') : d1;
    };
  };
}

export function getStartOpacity(roundEdges: boolean): number {
  if (roundEdges) {
    return 0.2;
  } else {
    return 0.5;
  }
}

export function getGradient(fill: string, roundEdges: boolean): Gradient[] {
  return [
    {
      offset: 0,
      color: fill,
      opacity: getStartOpacity(roundEdges)
    },
    {
      offset: 100,
      color: fill,
      opacity: 1
    }
  ];
}

export function getEdges(roundEdges: boolean): boolean[] {
  let edges: [boolean, boolean, boolean, boolean] = [false, false, false, false];
  if (roundEdges) {
    edges = [true, true, true, true];
  }
  return edges;
}
