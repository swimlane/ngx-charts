export interface ViewDimensions {
  width: number;
  height: number;
  xOffset: number;
}

export function calculateViewDimensions({width, height, margins, showXAxis = false, showYAxis = false, showXLabel = false, showYLabel = false, showLegend = false, columns = 12}): ViewDimensions {
  let xOffset = margins[3];
  let chartWidth = width;
  let chartHeight = height - margins[0] - margins[2];
  let yAxisWidth = 0;
  let xAxisHeight = 0;


  // let yOffset = margins[0]; // unused
  if (showLegend) {
    chartWidth = chartWidth * columns / 12;
  }

  chartWidth = chartWidth - margins[1] - margins[3];

  if (showXLabel) {
    chartHeight -= 40;
  }

  if (showYLabel) {
    chartWidth -= 60;
    xOffset += 60;
  }

  chartWidth = Math.max(0, chartWidth);
  chartHeight = Math.max(0, chartHeight);

  return {
    width: chartWidth,
    height: chartHeight,
    xOffset: xOffset,
    yAxisWidth: yAxisWidth,
    xAxisHeight: xAxisHeight
  };
}
