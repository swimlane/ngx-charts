/// <reference path="../node_modules/awesome-typescript-loader/lib/runtime.d.ts" />

let array = require("d3-array");
let brush = require("d3-brush");
let color = require("d3-color");
let force = require("d3-force");
let format = require("d3-format");
let interpolate = require("d3-interpolate");
let scales = require("d3-scale");
let selection = require("d3-selection");
let shape = require("d3-shape");
let hierarchy = require("d3-hierarchy");

export default {
  arc: shape.arc,
  area: shape.area,
  brush: brush.brush,
  brushX: brush.brushX,
  brushY: brush.brushY,
  event: selection.event,
  extent: array.extent,
  forceCollide: force.forceCollide,
  forceLink: force.forceLink,
  forceManyBody: force.forceManyBody,
  forceSimulation: force.forceSimulation,
  forceX: force.forceX,
  forceY: force.forceY,
  format: format.format,
  interpolate: interpolate.interpolate,
  line: shape.line,
  max: array.max,
  min: array.min,
  mouse: selection.mouse,
  pie: shape.pie,
  range: array.range,
  rgb: color.rgb,
  selection: selection,
  select: selection.select,
  selectAll: selection.selectAll,
  scaleBand: scales.scaleBand,
  scaleLinear: scales.scaleLinear,
  scaleOrdinal: scales.scaleOrdinal,
  scalePoint: scales.scalePoint,
  scaleQuantile: scales.scaleQuantile,
  scaleTime: scales.scaleTime,
  shape: shape,
  treemap: hierarchy.treemap,
  stratify: hierarchy.stratify
};
