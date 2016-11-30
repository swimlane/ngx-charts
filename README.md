# ng2d3 [![Join the chat at https://gitter.im/swimlane/ng2d3](https://badges.gitter.im/swimlane/ng2d3.svg)](https://gitter.im/swimlane/ng2d3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/swimlane/ng2d3.svg?branch=master)](https://travis-ci.org/swimlane/ng2d3) [![Code Climate](https://codeclimate.com/github/swimlane/ng2d3/badges/gpa.svg)](https://codeclimate.com/github/swimlane/ng2d3) [![Test Coverage](https://codeclimate.com/github/swimlane/ng2d3/badges/coverage.svg)](https://codeclimate.com/github/swimlane/ng2d3/coverage) [![Dependency Status](https://david-dm.org/swimlane/ng2d3.svg)](https://david-dm.org/swimlane/ng2d3) [![devDependency Status](https://david-dm.org/swimlane/ng2d3/dev-status.svg)](https://david-dm.org/swimlane/ng2d3#info=devDependencies) [![npm version](https://badge.fury.io/js/ng2d3.svg)](http://badge.fury.io/js/ng2d3) [![npm downloads](https://img.shields.io/npm/dm/ng2d3.svg)](https://npmjs.org/ng2d3)

Angular2 + D3js Composable Re-usable Charting Framework. 

ng2d3 is unique because we don't merely wrap d3, nor any other chart engine for that matter. It is using Angular to render and animate the SVG elements with all of its binding and speed goodness, and uses d3 for the excellent math functions, scales, axis and shape generators, etc. By having Angular do all of the rendering it opens us up to endless possibilities the Angular platform provides such as AoT, Universal, etc. 

Data visualization is a science but that doesn't mean it has to be ugly. One of the big efforts we've made while creating this project is to make the charts aesthetically pleasing. The styles are also completely customizable through CSS, so you can override them as you please.

Also, constructing custom charts is possible by leveraging the various ng2d3 components that are exposed through the ng2d3 module.

For more info, check out the [documentation](https://swimlane.gitbooks.io/ng2d3/content/) and the [demos](https://swimlane.github.io/ng2d3/).

## Features
### Chart Types
- Horizontal & Vertical Bar Charts (Standard, Grouped, Stacked, Normalized)
- Line 
- Area (Standard, Stacked, Normalized)
- Pie (Explodable, Grid, Custom legends)
- Donut
- Gauge
- Force Directed Graph
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

## Credits
`ng2d3` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.
