import { lineRadial } from 'd3-shape';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
import { escapeLabel } from '../common/label.helper';
import { ScaleType } from '../common/types/scale-type.enum';
import { DataItem, Series } from '../models/chart-data.model';
import { id } from '../utils/id';

export interface PolarChartCircle {
  color: string;
  cx: number;
  cy: number;
  data: Series;
  label: string;
  value: number;
}

export function getAngle(d: DataItem, scaleType: ScaleType, xScale: any): number {
  const label = d.name;
  if (scaleType === ScaleType.Time) {
    return xScale(label);
  } else if (scaleType === ScaleType.Linear) {
    return xScale(Number(label));
  }
  return xScale(label);
}

export function getRadius(d: DataItem, yScale: any): number {
  return yScale(d.value);
}

export function getLineGenerator(scaleType: ScaleType, xScale: any, yScale: any, curve: any): any {
  return lineRadial<any>()
    .angle(d => getAngle(d, scaleType, xScale))
    .radius(d => getRadius(d, yScale))
    .curve(curve);
}

export function sortData(data: any, scaleType: ScaleType, xScale: any): any[] {
  if (scaleType === ScaleType.Linear) {
    return sortLinear(data, 'name');
  } else if (scaleType === ScaleType.Time) {
    return sortByTime(data, 'name');
  }
  return sortByDomain(data, 'name', 'asc', xScale.domain());
}

export function defaultTooltipText(label: string, value: number, seriesName: string): string {
  return `
    <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(label)}</span>
    <span class="tooltip-val">${value.toLocaleString()}</span>
  `;
}

export function getPolarSeriesCircles(
  data: any,
  seriesName: string,
  linearScaleType: boolean,
  scaleType: ScaleType,
  xScale: any,
  yScale: any,
  colors: any
): PolarChartCircle[] {
  return data.map(d => {
    const a = getAngle(d, scaleType, xScale);
    const r = getRadius(d, yScale);
    const value = d.value;

    const color = colors.getColor(linearScaleType ? Math.abs(value) : seriesName);

    const cData = Object.assign({}, d, {
      series: seriesName,
      value,
      name: d.name
    });

    return {
      data: cData,
      cx: r * Math.sin(a),
      cy: -r * Math.cos(a),
      value,
      color,
      label: d.name
    };
  });
}

export function getPolarSeriesGradients(
  gradient: boolean,
  colors: any,
  seriesData: any
): { hasGradient: boolean; gradientId: string; gradientUrl: string; gradientStops: any[] } {
  const hasGradient = gradient || colors.scaleType === ScaleType.Linear;

  if (!hasGradient) {
    return { hasGradient: false, gradientId: '', gradientUrl: '', gradientStops: undefined };
  }

  const gradientId = 'grad' + id().toString();
  const gradientUrl = `url(#${gradientId})`;
  let gradientStops: any[];

  if (colors.scaleType === ScaleType.Linear) {
    const values = seriesData.series.map(d => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    gradientStops = colors.getLinearGradientStops(max, min);
  } else {
    gradientStops = undefined;
  }

  return { hasGradient, gradientId, gradientUrl, gradientStops };
}

export function isPolarSeriesActive(entry: any, activeEntries: any[]): boolean {
  if (!activeEntries) return false;
  return activeEntries.some(d => entry.name === d.name);
}

export function isPolarSeriesInactive(entry: any, activeEntries: any[]): boolean {
  if (!activeEntries || activeEntries.length === 0) return false;
  return !activeEntries.some(d => entry.name === d.name);
}