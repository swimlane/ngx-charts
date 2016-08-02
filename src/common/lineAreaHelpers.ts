import moment = require("moment");
/**
 * Finds and returns the index of the nearest point on the X scale range
 */
function nearestPosition(x, y, scaleType, xScale, props) {
  var xRange;
  var position = 0;
  if (scaleType === 'time') {
    var valuesMap = props.results.d0Domain
      .filter(d => {
        return d !== 'No Value' && d !== 'Other';
      })
      .map(d => {
        return moment(d).toDate();
      });

    xRange = valuesMap.map(function(v) {
      return xScale(v);
    });
  } else {
    xRange = xScale.range();
  }

  xRange = xRange.sort((a, b) => {
    return a - b;
  });

  for (var i = 0; i < xRange.length; i++) {
    if (Math.abs(xRange[i]) - x < Math.abs(xRange[position] - x)) {
      position = i;
    }
  }

  return position;
}

/**
 * Finds and returns the circle that is being hovered over
 */
function nearestCircle(x, y, chartEl) {
  var circles = chartEl.selectAll('.circle');

  var circle = undefined;
  circles[0].forEach(function(c) {
    var cx = c.attributes.cx.value;
    var cy = c.attributes.cy.value;

    if (Math.abs(x - cx) <= 5 && Math.abs(y - cy) <= 5) {
      circle = c;
    }
  });

  return circle;
}

/**
 * Returns the data for the tooltip
 */
function getTooltipData(series, position) {
  let results = series
    .map(s => {
      let label;
      if (!s[position]) {
        return {
          label: null,
          value: null
        };
      }
      let ob = s[position].vals[0];
      if (ob.label[0].length === 2) {
        label = ob.label[0][1];
      } else {
        label = ob.title;
      }
      let value = ob.value;
      return {
        label: label,
        value: value
      };
    })
    .filter(s => {
      return s.value != null;
    });

  return results;
}

/**
 * Updates the tooltip for line and area charts
 */
export function updateTooltip(el, chartEl, chart) {
  // get coordinates
  var x = d3.mouse(el)[0];
  var y = d3.mouse(el)[1];

  // get x axis position
  var position = nearestPosition(x, y, chart.scaleType, chart.xScale, chart);

  // find data at position
  var domain = chart.results.d0Domain;
  if (chart.scaleType === 'time') {
    domain = domain
      .filter(d => {
        return d !== 'No Value' && d !== 'Other';
      })
      .map(d => {
        return moment(d).toDate();
      });
  }
  var d = domain[position];

  // if different than old position, recreate tooltip with new data
  if (position !== chart.tooltipPosition) {
    chart.handleMouseOut();
    chart.tooltipPosition = position;

    let tooltipData = getTooltipData(chart.results.series, chart.tooltipPosition);
    if (tooltipData.length) {
      chart.showLineAreaTooltip(el, tooltipData);
    }
  }

  // highlight all circles in current position
  chartEl.selectAll('.circle')
    .style('opacity', 0);
  chartEl.selectAll('.circle-data-' + position)
    .style('opacity', 1);

  // if over a circle, change cursor
  var circle = nearestCircle(x, y, chartEl);
  if (circle) {
    d3.select(el).style('cursor', 'pointer');
  } else {
    d3.select(el).style('cursor', 'auto');
  }

  // update position of tooltip
  var xPos = Math.max(chart.xScale.range()[0], chart.xScale(d));
  xPos = Math.min(xPos, chart.xScale.range()[chart.xScale.range().length - 1]);
  xPos = el.getBoundingClientRect().left + xPos;

  var tTip: HTMLElement = <HTMLElement>d3.select('.popover')[0][0];
  if (tTip) {
    var newY = d3.event['pageY'] - tTip.getClientRects()[0].height / 2;
    d3.select('.popover').style('left', xPos + 10);
    d3.select('.popover').style('top', newY);
  }
}

/**
 * Displays the tooltip on line/area charts
 */
export function showTooltip(chart) {
  chart.handleMouseOut();
  if (chart.tooltipPosition === undefined) {
    return;
  }
  let el = d3.select(chart.element).select('.tooltip-area')[0][0];
  let tooltipData = getTooltipData(chart.results.series, chart.tooltipPosition);
  if (tooltipData.length) {
    chart.showLineAreaTooltip(el, tooltipData);
  }
}

/**
 * Hides the tooltip on line/area charts
 */
export function hideTooltip(chart) {
  let chartEl = d3.select(chart.element);
  chartEl.selectAll('.circle')
    .style('opacity', 0);
  chart.handleMouseOut();
}
