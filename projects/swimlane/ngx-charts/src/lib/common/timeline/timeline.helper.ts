import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { ScaleType } from '../types/scale-type.enum';
import { ViewDimensions } from '../types/view-dimension.interface';

export function getXDomain(results: any[], scaleType: ScaleType): any[] {
  let values = [];

  for (const result of results) {
    for (const d of result.series) {
      if (!values.includes(d.name)) {
        values.push(d.name);
      }
    }
  }

  let domain = [];
  if (scaleType === ScaleType.Time) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    domain = [min, max];
  } else if (scaleType === ScaleType.Linear) {
    values = values.map(v => Number(v));
    const min = Math.min(...values);
    const max = Math.max(...values);
    domain = [min, max];
  } else {
    domain = values;
  }

  return domain;
}

export function getXScale(xDomain: any[], width: number, scaleType: ScaleType): any {
  let scale;

  if (scaleType === ScaleType.Time) {
    scale = scaleTime().range([0, width]).domain(xDomain);
  } else if (scaleType === ScaleType.Linear) {
    scale = scaleLinear().range([0, width]).domain(xDomain);
  } else if (scaleType === ScaleType.Ordinal) {
    scale = scalePoint().range([0, width]).padding(0.1).domain(xDomain);
  }

  return scale;
}

export function getTimelineDims(view: [number, number], height: number): ViewDimensions {
  return {
    width: view[0],
    height
  };
}

export function getTimelineTransform(view: [number, number], height: number): string {
  const offsetY = view[1] - height;
  return `translate(0 , ${offsetY})`;
}
