export function calculateViewDimensions(view, margins, showXLabel, showYLabel, showLegend, columns){
  let width = view[0];
  let height = view[1];
  let xOffset = margins[3];
  let yOffset = margins[0];
  if (showLegend){
    width = width * columns / 12.0
  }

  width = width - margins[1] - margins[3];
  height = height - margins[0] - margins[2];

  if (showXLabel){
    height -= 40;
  }

  if (showYLabel){
    width -= 60;
    xOffset += 60;
  }

  width = Math.max(0, width);
  height = Math.max(0, height);

  return {width: width, height: height, xOffset: xOffset };
}
