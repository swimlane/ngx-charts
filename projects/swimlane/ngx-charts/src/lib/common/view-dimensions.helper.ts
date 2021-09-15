import { LegendPosition } from './types/legend.model';
import { ScaleType } from './types/scale-type.enum';
import { ViewDimensions } from './types/view-dimension.interface';

export function calculateViewDimensions({
  width,
  height,
  margins,
  showXAxis = false,
  showYAxis = false,
  xAxisHeight = 0,
  yAxisWidth = 0,
  showXLabel = false,
  showYLabel = false,
  showLegend = false,
  legendType = ScaleType.Ordinal,
  legendPosition = LegendPosition.Right,
  columns = 12
}): ViewDimensions {
  let xOffset = margins[3];
  let chartWidth = width;
  let chartHeight = height - margins[0] - margins[2];

  if (showLegend && legendPosition === LegendPosition.Right) {
    if (legendType === ScaleType.Ordinal) {
      columns -= 2;
    } else {
      columns -= 1;
    }
  }

  chartWidth = (chartWidth * columns) / 12;

  chartWidth = chartWidth - margins[1] - margins[3];

  if (showXAxis) {
    chartHeight -= 5;
    chartHeight -= xAxisHeight;

    if (showXLabel) {
      // text height + spacing between axis label and tick labels
      const offset = 25 + 5;
      chartHeight -= offset;
    }
  }

  if (showYAxis) {
    chartWidth -= 5;
    chartWidth -= yAxisWidth;
    xOffset += yAxisWidth;
    xOffset += 10;

    if (showYLabel) {
      // text height + spacing between axis label and tick labels
      const offset = 25 + 5;
      chartWidth -= offset;
      xOffset += offset;
    }
  }

  chartWidth = Math.max(0, chartWidth);
  chartHeight = Math.max(0, chartHeight);

  return {
    width: Math.floor(chartWidth),
    height: Math.floor(chartHeight),
    xOffset: Math.floor(xOffset)
  };
}
