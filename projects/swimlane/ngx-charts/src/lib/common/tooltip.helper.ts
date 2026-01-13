import { ColorHelper } from '../common/color.helper';
import { ScaleType } from './types/scale-type.enum';

export interface Tooltip {
  color: string;
  d0: number;
  d1: number;
  max: number;
  min: number;
  name: any;
  series: any;
  value: any;
}

export function getTooltipValues(xVal: any, results: any[], colors: ColorHelper, showPercentage: boolean): Tooltip[] {
  const tooltipResults = [];

  for (const group of results) {
    const item = group.series.find(d => d.name.toString() === xVal.toString());
    let groupName = group.name;
    if (groupName instanceof Date) {
      groupName = groupName.toLocaleDateString();
    }

    if (item) {
      const label = item.name;
      let val = item.value;
      if (showPercentage) {
        val = (item.d1 - item.d0).toFixed(2) + '%';
      }
      let color;
      if (colors.scaleType === ScaleType.Linear) {
        let v = val;
        if (item.d1) {
          v = item.d1;
        }
        color = colors.getColor(v);
      } else {
        color = colors.getColor(group.name);
      }

      const data = Object.assign({}, item, {
        value: val,
        name: label,
        series: groupName,
        min: item.min,
        max: item.max,
        color
      });

      tooltipResults.push(data);
    }
  }

  return tooltipResults;
}

export function findClosestPointIndex(xPos: number, xSet: any[], xScale: any): number {
  let minIndex = 0;
  let maxIndex = xSet.length - 1;
  let minDiff = Number.MAX_VALUE;
  let closestIndex = 0;

  while (minIndex <= maxIndex) {
    const currentIndex = ((minIndex + maxIndex) / 2) | 0;
    const currentElement = xScale(xSet[currentIndex]);

    const curDiff = Math.abs(currentElement - xPos);

    if (curDiff < minDiff) {
      minDiff = curDiff;
      closestIndex = currentIndex;
    }

    if (currentElement < xPos) {
      minIndex = currentIndex + 1;
    } else if (currentElement > xPos) {
      maxIndex = currentIndex - 1;
    } else {
      minDiff = 0;
      closestIndex = currentIndex;
      break;
    }
  }

  return closestIndex;
}

export function getTooltipAreaText(tooltipItem: Tooltip): string {
  let result: string = '';
  if (tooltipItem.series !== undefined) {
    result += tooltipItem.series;
  } else {
    result += '???';
  }
  result += ': ';
  if (tooltipItem.value !== undefined) {
    result += tooltipItem.value.toLocaleString();
  }
  if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
    result += ' (';
    if (tooltipItem.min !== undefined) {
      if (tooltipItem.max === undefined) {
        result += '≥';
      }
      result += tooltipItem.min.toLocaleString();
      if (tooltipItem.max !== undefined) {
        result += ' - ';
      }
    } else if (tooltipItem.max !== undefined) {
      result += '≤';
    }
    if (tooltipItem.max !== undefined) {
      result += tooltipItem.max.toLocaleString();
    }
    result += ')';
  }
  return result;
}

export function tooltipAreaMove(
  event: any,
  xSet: any[],
  xScale: any,
  dims: any,
  results: any[],
  colors: any,
  showPercentage: boolean
): any {
  const xPos = event.pageX - event.target.getBoundingClientRect().left;
  const closestIndex = findClosestPointIndex(xPos, xSet, xScale);
  const closestPoint = xSet[closestIndex];
  let anchorPos = xScale(closestPoint);
  anchorPos = Math.max(0, anchorPos);
  anchorPos = Math.min(dims.width, anchorPos);

  const anchorValues = getTooltipValues(closestPoint, results, colors, showPercentage);
  return { anchorPos, anchorValues, closestPoint };
}
