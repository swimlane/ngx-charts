"use strict";
function calculateViewDimensions(width, height, margins, showXLabel, showYLabel, showLegend, columns) {
    if (columns === void 0) { columns = 12; }
    var xOffset = margins[3];
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
    return { width: width, height: height, xOffset: xOffset };
}
exports.calculateViewDimensions = calculateViewDimensions;
//# sourceMappingURL=view-dimensions.helper.js.map