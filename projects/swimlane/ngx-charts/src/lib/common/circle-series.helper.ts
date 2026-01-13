import { ScaleType } from './types/scale-type.enum';
import { formatLabel, escapeLabel } from './label.helper';
import { Gradient } from './types/gradient.interface';
import { ColorHelper } from './color.helper';

export enum SeriesType {
  Standard = 'standard',
  Stacked = 'stacked'
}

export interface Circle {
  classNames: string[];
  value: number;
  label: string;
  data: any;
  cx: number;
  cy: number;
  radius: number;
  height: number;
  tooltipLabel: string;
  color: string;
  opacity: number;
  seriesName: string;
  gradientStops: Gradient[];
  min: number;
  max: number;
}

export function mapDataPointToCircle(
  d: any,
  i: number,
  data: any,
  xScale: any,
  yScale: any,
  scaleType: ScaleType,
  type: SeriesType,
  colors: ColorHelper
): Circle {
  const seriesName = data.name as string;
  const value = d.value;
  const label = d.name;
  const tooltipLabel = formatLabel(label);

  let cx;
  if (scaleType === ScaleType.Time) {
    cx = xScale(label);
  } else if (scaleType === ScaleType.Linear) {
    cx = xScale(Number(label));
  } else {
    cx = xScale(label);
  }

  const cy = yScale(type === SeriesType.Standard ? value : d.d1);
  const radius = 5;
  const height = yScale.range()[0] - cy;
  const opacity = 1;

  let color;
  if (colors.scaleType === ScaleType.Linear) {
    color = colors.getColor(type === SeriesType.Standard ? value : d.d1);
  } else {
    color = colors.getColor(seriesName);
  }

  const circleData = Object.assign({}, d, {
    series: seriesName,
    value,
    name: label
  });

  return {
    classNames: [`circle-data-${i}`],
    value,
    label,
    data: circleData,
    cx,
    cy,
    radius,
    height,
    tooltipLabel,
    color,
    opacity,
    seriesName,
    gradientStops: [
      { offset: 0, color, opacity: 0.2 },
      { offset: 100, color, opacity: 1 }
    ],
    min: d.min,
    max: d.max
  };
}

export function getCircleTooltipText(circle: any): string {
  const { tooltipLabel, value, seriesName, min, max } = circle;
  let minMaxText = '';
  if (min !== undefined || max !== undefined) {
    minMaxText = ' (';
    if (min !== undefined) {
      if (max === undefined) minMaxText += '≥';
      minMaxText += min.toLocaleString();
      if (max !== undefined) minMaxText += ' - ';
    } else if (max !== undefined) {
      minMaxText += '≤';
    }
    if (max !== undefined) minMaxText += max.toLocaleString();
    minMaxText += ')';
  }

  return `
    <span class="tooltip-label">${escapeLabel(seriesName)} • ${escapeLabel(tooltipLabel)}</span>
    <span class="tooltip-val">${value.toLocaleString()}${minMaxText}</span>
  `;
}

export function getActiveCircle(
  data: any,
  visibleValue: any,
  xScale: any,
  yScale: any,
  scaleType: ScaleType,
  type: SeriesType,
  colors: any
): Circle {
  const indexActiveDataPoint = data.series.findIndex(d => {
    const label = d.name;
    return label && visibleValue && label.toString() === visibleValue.toString() && d.value !== undefined;
  });

  if (indexActiveDataPoint === -1) return undefined;

  return mapDataPointToCircle(
    data.series[indexActiveDataPoint],
    indexActiveDataPoint,
    data,
    xScale,
    yScale,
    scaleType,
    type,
    colors
  );
}

export function getCircleGradientStops(color: string): Gradient[] {
  return [
    { offset: 0, color, opacity: 0.2 },
    { offset: 100, color, opacity: 1 }
  ];
}
