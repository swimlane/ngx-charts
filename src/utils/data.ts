import d3 from 'd3';

export var calculateScales = function(chartWidth, chartHeight, xValues, yValues) {

  var xScale, yScale;

  if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]') {
    xScale = d3.time.scale()
      .range([0, chartWidth]);
  } else {
    xScale = d3.scale.linear()
      .range([0, chartWidth]);
  }
  xScale.domain(d3.extent(xValues));

  if (yValues.length > 0 && Object.prototype.toString.call(yValues[0]) === '[object Date]') {
    yScale = d3.time.scale()
      .range([chartHeight, 0]);
  } else {
    yScale = d3.scale.linear()
      .range([chartHeight, 0]);
  }

  yScale.domain(d3.extent(yValues));

  return {
    xScale: xScale,
    yScale: yScale
  };

};

export var flattenData = function(data, xAccessor, yAccessor) {
  var allValues = [];
  var xValues = [];
  var yValues = [];

  var coincidentCoordinateCheck = {};

  data.forEach(function(series) {
    series.values.forEach(function(item, idx) {

      var x = xAccessor(item);

      // Check for NaN since d3's Voronoi cannot handle NaN values
      // Go ahead and Proceed to next iteration since we don't want NaN
      // in allValues or in xValues or yValues
      if (isNaN(x)) {
        return;
      }
      xValues.push(x);

      var y = yAccessor(item);
      // when yAccessor returns an object (as in the case of candlestick)
      // iterate over the keys and push all the values to yValues array
      var yNode;
      if (typeof y === 'object' && Object.keys(y).length > 0) {
        Object.keys(y).forEach(function(key) {
          // Check for NaN since d3's Voronoi cannot handle NaN values
          // Go ahead and Proceed to next iteration since we don't want NaN
          // in allValues or in xValues or yValues
          if (isNaN(y[key])) {
            return;
          }
          yValues.push(y[key]);
          // if multiple y points are to be plotted for a single x
          // as in the case of candlestick, default to y value of 0
          yNode = 0;
        });
      } else {
        // Check for NaN since d3's Voronoi cannot handle NaN values
        // Go ahead and Proceed to next iteration since we don't want NaN
        // in allValues or in xValues or yValues
        if (isNaN(y)) {
          return;
        }
        yValues.push(y);
        yNode = y;
      }

      var xyCoords = `${ x }-${ yNode }`;
      if (xyCoords in coincidentCoordinateCheck) {
        // Proceed to next iteration if the x y pair already exists
        // d3's Voronoi cannot handle NaN values or coincident coords
        // But we push them into xValues and yValues above because
        // we still may handle them there (labels, etc.)
        return;
      }
      coincidentCoordinateCheck[xyCoords] = '';
      var pointItem = {
        coord: {
          x: x,
          y: yNode,
        },
        id: `${ series.name }-${ idx }`
      };
      allValues.push(pointItem);
    });
  });

  return {
    allValues: allValues,
    xValues: xValues,
    yValues: yValues
  };
};