/// <reference path="../node_modules/awesome-typescript-loader/lib/runtime.d.ts" />

let selection = require("d3-selection");
let scales = require("d3-scale");
let format = require("d3-format");
let shape = require("d3-shape");
let interpolate = require("d3-interpolate");
let array = require("d3-array");
let brush = require("d3-brush");
let color = require("d3-color");

export default {
  arc: shape.arc,
  area: shape.area,
  brush: brush.brush,
  brushX: brush.brushX,
  brushY: brush.brushY,
  extent: array.extent,
  format: format.format,
  interpolate: interpolate.interpolate,
  line: shape.line,
  max: array.max,
  min: array.min,
  mouse: selection.mouse,
  pie: shape.pie,
  range: array.range,
  rgb: color.rgb,
  select: selection.select,
  selectAll: selection.selectAll,
  scaleBand: scales.scaleBand,
  scaleLinear: scales.scaleLinear,
  scaleOrdinal: scales.scaleOrdinal,
  scalePoint: scales.scalePoint,
  scaleQuantile: scales.scaleQuantile,
  scaleTime: scales.scaleTime,
  treemap: shape.treemap
};
