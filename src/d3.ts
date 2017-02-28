/// <reference path="../node_modules/awesome-typescript-loader/lib/runtime.d.ts" />

import * as array from 'd3-array';
import * as brush from 'd3-brush';
import * as color from 'd3-color';
import * as force from 'd3-force';
import * as format from 'd3-format';
import * as interpolate from 'd3-interpolate';
import * as scales from 'd3-scale';
import * as selection from 'd3-selection';
import * as shape from 'd3-shape';
import * as hierarchy from 'd3-hierarchy';
import * as tInterval from 'd3-time';
import * as tFormat from 'd3-time-format';

export default {
  arc: shape.arc as any,
  area: shape.area as any,
  brush: brush.brush as any,
  brushX: brush.brushX as any,
  brushY: brush.brushY as any,
  event: selection.event as any,
  extent: array.extent as any,
  forceCollide: force.forceCollide as any,
  forceLink: force.forceLink as any,
  forceManyBody: force.forceManyBody as any,
  forceSimulation: force.forceSimulation as any,
  forceX: force.forceX as any,
  forceY: force.forceY as any,
  format: format.format as any,
  interpolate: interpolate.interpolate as any,
  line: shape.line as any,
  max: array.max as any,
  min: array.min as any,
  mouse: selection.mouse as any,
  pie: shape.pie as any,
  range: array.range as any,
  rgb: color.rgb as any,
  selection: selection as any,
  select: selection.select as any,
  selectAll: selection.selectAll as any,
  scaleBand: scales.scaleBand as any,
  scaleLinear: scales.scaleLinear as any,
  scaleOrdinal: scales.scaleOrdinal as any,
  scalePoint: scales.scalePoint as any,
  scaleQuantile: scales.scaleQuantile as any,
  scaleTime: scales.scaleTime as any,
  shape: shape as any,
  treemap: hierarchy.treemap as any,
  stratify: hierarchy.stratify as any,
  timeFormat: tFormat.timeFormat as any,
  timeParse: tFormat.timeParse as any,
  timeHour: tInterval.timeHour as any
};
