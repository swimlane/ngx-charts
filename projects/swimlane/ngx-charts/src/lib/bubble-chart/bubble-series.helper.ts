import { formatLabel, escapeLabel } from '../common/label.helper';
import { ScaleType } from '../common/types/scale-type.enum';

export function getBubbleTooltipText(circle: any, xAxisLabel: string, yAxisLabel: string): string {
  const hasRadius = typeof circle.r !== 'undefined';
  const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
  const hasSeriesName = circle.seriesName && circle.seriesName.length;

  const radiusValue = hasRadius ? formatLabel(circle.r) : '';
  const xLabel = xAxisLabel && xAxisLabel !== '' ? `${xAxisLabel}:` : '';
  const yLabel = yAxisLabel && yAxisLabel !== '' ? `${yAxisLabel}:` : '';
  const x = formatLabel(circle.x);
  const y = formatLabel(circle.y);
  const name =
    hasSeriesName && hasTooltipLabel
      ? `${circle.seriesName} • ${circle.tooltipLabel}`
      : circle.seriesName + circle.tooltipLabel;
  const tooltipTitle =
    hasSeriesName || hasTooltipLabel ? `<span class="tooltip-label">${escapeLabel(name)}</span>` : '';

  return `
    ${tooltipTitle}
    <span class="tooltip-label">
      <label>${escapeLabel(xLabel)}</label> ${escapeLabel(x)}<br />
      <label>${escapeLabel(yLabel)}</label> ${escapeLabel(y)}
    </span>
    <span class="tooltip-val">
      ${escapeLabel(radiusValue)}
    </span>
  `;
}

export function getBubbleCircles(
  data: any,
  xScale: any,
  yScale: any,
  rScale: any,
  xScaleType: ScaleType,
  yScaleType: ScaleType,
  colors: any,
  activeEntries: any[]
): any[] {
  const seriesName = data.name;

  return data.series
    .map((d, i) => {
      if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
        const y = d.y;
        const x = d.x;
        const r = d.r;

        const radius = rScale(r || 1);
        const tooltipLabel = formatLabel(d.name);

        const cx = xScaleType === ScaleType.Linear ? xScale(Number(x)) : xScale(x);
        const cy = yScaleType === ScaleType.Linear ? yScale(Number(y)) : yScale(y);

        const color =
          colors.scaleType === ScaleType.Linear ? colors.getColor(r) : colors.getColor(seriesName);

        const isActive = !activeEntries.length ? true : activeEntries.some(e => e.name === seriesName);
        const opacity = isActive ? 1 : 0.3;

        const cData = Object.assign({}, d, {
          series: seriesName,
          name: d.name,
          value: d.y,
          x: d.x,
          radius: d.r
        });

        return {
          data: cData,
          x,
          y,
          r,
          classNames: [`circle-data-${i}`],
          value: y,
          label: x,
          cx,
          cy,
          radius,
          tooltipLabel,
          color,
          opacity,
          seriesName,
          isActive,
          transform: `translate(${cx},${cy})`
        };
      }
    })
    .filter(circle => circle !== undefined);
}
