import { area, line } from 'd3-shape';
import { ScaleType } from '../common/types/scale-type.enum';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
import { id } from '../utils/id';
import { Gradient } from '../common/types/gradient.interface';

export function getLineGenerator(xScale: any, yScale: any, scaleType: ScaleType, curve: any): any {
  return line<any>()
    .x(d => {
      const label = d.name;
      if (scaleType === ScaleType.Time) return xScale(label);
      if (scaleType === ScaleType.Linear) return xScale(Number(label));
      return xScale(label);
    })
    .y(d => yScale(d.value))
    .curve(curve);
}

export function getRangeGenerator(xScale: any, yScale: any, scaleType: ScaleType, curve: any): any {
  return area<any>()
    .x(d => {
      const label = d.name;
      if (scaleType === ScaleType.Time) return xScale(label);
      if (scaleType === ScaleType.Linear) return xScale(Number(label));
      return xScale(label);
    })
    .y0(d => yScale(typeof d.min === 'number' ? d.min : d.value))
    .y1(d => yScale(typeof d.max === 'number' ? d.max : d.value))
    .curve(curve);
}

export function getAreaGenerator(xScale: any, yScale: any, curve: any): any {
  return area<any>()
    .x(d => xScale(d.name))
    .y0(() => yScale.range()[0])
    .y1(d => yScale(d.value))
    .curve(curve);
}

export function sortLineData(data: any[], scaleType: ScaleType, xScale: any) {
  if (scaleType === ScaleType.Linear) {
    return sortLinear(data, 'name');
  } else if (scaleType === ScaleType.Time) {
    return sortByTime(data, 'name');
  } else {
    return sortByDomain(data, 'name', 'asc', xScale.domain());
  }
}

export function getLineSeriesGradients(
  colors: any,
  series: any[]
): {
  hasGradient: boolean;
  gradientId: string;
  gradientUrl: string;
  gradientStops: Gradient[];
  areaGradientStops: Gradient[];
} {
  if (colors.scaleType === ScaleType.Linear) {
    const gradientId = 'grad' + id().toString();
    const values = series.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return {
      hasGradient: true,
      gradientId,
      gradientUrl: `url(#${gradientId})`,
      gradientStops: colors.getLinearGradientStops(max, min),
      areaGradientStops: colors.getLinearGradientStops(max)
    };
  }
  return {
    hasGradient: false,
    gradientId: undefined,
    gradientUrl: undefined,
    gradientStops: undefined,
    areaGradientStops: undefined
  };
}

export function updateLineSeries(component: any): void {
  const { hasGradient, gradientId, gradientUrl, gradientStops, areaGradientStops } = getLineSeriesGradients(
    component.colors,
    component.data.series
  );
  component.hasGradient = hasGradient;
  component.gradientId = gradientId;
  component.gradientUrl = gradientUrl;
  component.gradientStops = gradientStops;
  component.areaGradientStops = areaGradientStops;

  const data = sortLineData(component.data.series, component.scaleType, component.xScale);

  component.path =
    getLineGenerator(component.xScale, component.yScale, component.scaleType, component.curve)(data) || '';
  component.areaPath = getAreaGenerator(component.xScale, component.yScale, component.curve)(data) || '';

  if (component.hasRange) {
    component.outerPath =
      getRangeGenerator(component.xScale, component.yScale, component.scaleType, component.curve)(data) || '';
  }

  if (component.hasGradient) {
    component.stroke = component.gradientUrl;
    const values = component.data.series.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    if (max === min) component.stroke = component.colors.getColor(max);
  } else {
    component.stroke = component.colors.getColor(component.data.name);
  }
}

export function areActiveEntriesEqual(prev: any[], curr: any[]): boolean {
  if (prev === curr) return true;
  if (!prev || !curr) return false;
  if (prev.length !== curr.length) return false;
  if (prev.length === 0 && curr.length === 0) return true;
  return prev.every((v, i) => v === curr[i]);
}
