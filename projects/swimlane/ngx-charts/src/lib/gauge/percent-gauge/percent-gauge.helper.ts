import { ColorHelper } from '../../common/color.helper';
import { ViewDimensions } from '../../common/types/view-dimension.interface';
import { calculateViewDimensions } from '../../common/view-dimensions.helper';
import { ScaleType } from '../../common/types/scale-type.enum';

export interface PercentGaugeState {
  margin: number[];
  dims: ViewDimensions;
  percent: number;
  ticHeight: number;
  radius: number;
  circumference: number;
  dashes: string;
  valueFontSize: number;
  targetRadius: number;
  targetTextTransform: string;
  valueDomain: [number, number];
  displayValue: string;
  targetColor: string;
  transform: string;
  labelTransform: string;
  targetTransform: string;
  ticks: any[];
}

export function generateCirclePoints(radius: number, numPoints: number): { x: number; y: number }[] {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}

export function generatePercentGaugeTicks(
  radius: number,
  ticHeight: number,
  colors: ColorHelper,
  max: number
): any[] {
  const numPoints = 60;
  const points = generateCirclePoints(radius, numPoints);
  const ticks = [];
  for (let j = 0; j < points.length; j++) {
    const { x, y } = points[j];
    let progress = j / numPoints;
    if (progress === 1) {
      progress = 0;
    }
    ticks.push({
      height: ticHeight,
      width: radius / 60,
      fill: colors.getColor(progress * max),
      transform: `translate(${x}, ${y}), rotate(${360 * progress - 90})`
    });
  }
  return ticks;
}

export function getPercentGaugeDisplayValue(value: any, percent: number, valueFormatting?: (value: any) => string): string {
  if (valueFormatting) {
    return valueFormatting(value);
  }
  return percent + '%';
}

export function getPercentGaugeTargetTransform(radius: number, target: number, targetRadius: number): string {
  const angle = (target / 100) * Math.PI * 2 - Math.PI / 2;
  return `translate(${radius * 0.97 * Math.cos(angle) + targetRadius / 2}, ${
    radius * 0.97 * Math.sin(angle) + targetRadius / 2
  })`;
}

export function calculatePercentGaugeState(
  width: number,
  height: number,
  max: number,
  value: number,
  target: number,
  showLabel: boolean,
  valueFormatting: any,
  scheme: any,
  customColors: any,
  defaultMargin: number[]
): PercentGaugeState {
  const margin = [...defaultMargin];
  if (showLabel) {
    margin[2] = 50;
  }

  const dims = calculateViewDimensions({
    width,
    height,
    margins: margin
  });

  const percent = Math.round((value / max) * 100);
  const ticHeight = Math.min(dims.width, dims.height) / 10;
  const radius = Math.min(dims.width, dims.height) / 2 - ticHeight / 2;
  const circumference = 2 * Math.PI * radius;
  const dashes = `${radius / 60} ${circumference / 60 - radius / 60}`;
  const valueFontSize = Math.floor(radius / 3);
  const targetRadius = radius / 4;
  const targetTextTransform = `translate(${-targetRadius / 2}, ${-targetRadius / 2}), scale(${
    targetRadius / 28
  })`;

  const valueDomain: [number, number] = [0, max];
  const displayValue = getPercentGaugeDisplayValue(value, percent, valueFormatting);

  const colors = new ColorHelper(scheme, ScaleType.Linear, valueDomain, customColors);
  const targetColor = colors.getColor((target / 100) * max);

  const xOffset = margin[3] + dims.width / 2;
  const yOffset = margin[0] + dims.height / 2;

  const transform = `translate(${xOffset}, ${yOffset})`;
  const labelTransform = `translate(0, ${height / 2 + radius + margin[0] + ticHeight / 2 - 3})`;

  const targetTransform = getPercentGaugeTargetTransform(radius, target, targetRadius);
  const ticks = generatePercentGaugeTicks(radius, ticHeight, colors, max);

  return {
    margin,
    dims,
    percent,
    ticHeight,
    radius,
    circumference,
    dashes,
    valueFontSize,
    targetRadius,
    targetTextTransform,
    valueDomain,
    displayValue,
    targetColor,
    transform,
    labelTransform,
    targetTransform,
    ticks
  };
}