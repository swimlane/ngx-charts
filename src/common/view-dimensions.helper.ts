export interface ViewDimensions {
  width: number;
  height: number;
  xOffset: number;
}

export function calculateViewDimensions(width, height, margins, showXLabel, showYLabel, showLegend, columns = 12): ViewDimensions {
  let xOffset = margins[3];
  // let yOffset = margins[0]; // unused
  if (showLegend) {
    width = width * columns / 12;
  }

  width = width - margins[1] - margins[3];
  height = height - margins[0] - margins[2];

  if (showXLabel) {
    height -= 40;
  }

  if (showYLabel) {
    width -= 60;
    xOffset += 60;
  }

  width = Math.max(0, width);
  height = Math.max(0, height);

  return {width: width, height: height, xOffset: xOffset};
}
