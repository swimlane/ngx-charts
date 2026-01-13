import { arc } from 'd3-shape';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { PieData } from './pie-label.helper';

export function calculateLabelPositions(
  pieData: PieData[],
  outerRadius: number,
  showLabels: boolean
): PieData[] {
  const factor = 1.5;
  const minDistance = 10;
  const labelPositions = pieData;

  const outerArcGenerator = arc()
    .innerRadius(outerRadius * factor)
    .outerRadius(outerRadius * factor);

  labelPositions.forEach(d => {
    d.pos = outerArcGenerator.centroid(d as any);
    d.pos[0] = factor * outerRadius * (midAngle(d) < Math.PI ? 1 : -1);
  });

  for (let i = 0; i < labelPositions.length - 1; i++) {
    const a = labelPositions[i];
    if (!labelVisible(a, showLabels)) {
      continue;
    }

    for (let j = i + 1; j < labelPositions.length; j++) {
      const b = labelPositions[j];
      if (!labelVisible(b, showLabels)) {
        continue;
      }
      // if they're on the same side
      if (b.pos[0] * a.pos[0] > 0) {
        // if they're overlapping
        const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
        if (o > 0) {
          // push the second up or down
          b.pos[1] += Math.sign(b.pos[0]) * o;
        }
      }
    }
  }

  return labelPositions;
}

export function labelVisible(myArc: any, showLabels: boolean): boolean {
  return showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
}

export function defaultTooltipText(myArc: any): string {
  const label = formatLabel(myArc.data.name);
  const val = formatLabel(myArc.data.value);

  return `
    <span class="tooltip-label">${escapeLabel(label)}</span>
    <span class="tooltip-val">${val}</span>
  `;
}

function midAngle(d): number {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}

export function getPieSeriesLabel(myArc: any): string {
  return formatLabel(myArc.data.name);
}

export function getPieSeriesLabelText(myArc: any, labelFormatting?: (name: any) => string): string {
  if (labelFormatting) {
    return labelFormatting(myArc.data.name);
  }
  return getPieSeriesLabel(myArc);
}

export function isPieArcActive(entry: any, activeEntries: any[]): boolean {
  if (!activeEntries) return false;
  return activeEntries.some(d => {
    return entry.name === d.name && entry.series === d.series;
  });
}