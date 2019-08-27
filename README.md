# ngx-charts

[![Join the chat at https://gitter.im/swimlane/ngx-charts](https://badges.gitter.im/swimlane/ngx-charts.svg)](https://gitter.im/swimlane/ngx-charts?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/swimlane/ngx-charts.svg?branch=master)](https://travis-ci.org/swimlane/ngx-charts)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b097196f7f544412a79a99080a41bbc1)](https://www.codacy.com/app/Swimlane/ngx-charts?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-charts&utm_campaign=Badge_Grade)
[![Test Coverage](https://codeclimate.com/github/swimlane/ngx-charts/badges/coverage.svg)](https://codeclimate.com/github/swimlane/ngx-charts/coverage)
[![npm version](https://badge.fury.io/js/%40swimlane%2Fngx-charts.svg)](https://badge.fury.io/js/%40swimlane%2Fngx-charts)
[![npm downloads](https://img.shields.io/npm/dm/@swimlane/ngx-charts.svg)](https://npmjs.org/@swimlane/ngx-charts)

Declarative Charting Framework for Angular2 and beyond!

ngx-charts is unique because we don't merely wrap d3, nor any other chart engine for that matter. It is using Angular to render and animate the SVG elements with all of its binding and speed goodness, and uses d3 for the excellent math functions, scales, axis and shape generators, etc. By having Angular do all of the rendering it opens us up to endless possibilities the Angular platform provides such as AoT, Universal, etc.

Data visualization is a science but that doesn't mean it has to be ugly. One of the big efforts we've made while creating this project is to make the charts aesthetically pleasing. The styles are also completely customizable through CSS, so you can override them as you please.

Also, constructing custom charts is possible by leveraging the various ngx-charts components that are exposed through the ngx-charts module.

For more info, check out the [documentation](https://swimlane.gitbook.io/ngx-charts) and the [demos](https://swimlane.github.io/ngx-charts/).

## Features

### Chart Types

- Horizontal & Vertical Bar Charts (Standard, Grouped, Stacked, Normalized)
- Line
- Area (Standard, Stacked, Normalized)
- Pie (Explodable, Grid, Custom legends)
- Bubble
- Donut
- Gauge (Linear & Radial)
- Force Directed Graph (deprecated, please use [ngx-graph](https://github.com/swimlane/ngx-graph) instead)
- Heatmap
- Treemap
- Number Cards

### Customization

- Autoscaling
- Timeline Filtering
- Line Interpolation
- Configurable Axis Labels
- Legends (Labels & Gradient)
- Advanced Label Positioning
- Real-time data support
- Advanced Tooltips
- Data point Event Handlers
- Works with ngUpgrade

## Install

To use ngx-charts in your project install it via [npm](https://www.npmjs.com/package/@swimlane/ngx-charts):

```
npm i @swimlane/ngx-charts --save
```

## Custom Charts

To learn how to use the ngx-charts components to build custom charts and find examples, please refer to our [Custom Charts Page](https://github.com/swimlane/ngx-charts/blob/master/docs/custom-charts.md).

## Credits

`ngx-charts` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.

[SecOps Hub](http://secopshub.com) is an open, product-agnostic, online community for security professionals to share ideas, use cases, best practices, and incident response strategies.
