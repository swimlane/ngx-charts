# Changelog

## 2.0.0
- BREAKING: Renamed `clickHandler` to `select` (#120)
- Bug: Tooltips show up in top left corner sometimes
- Polish: Tooltips have animation entry now
- Polish: Add highight gradient and column when hovering a circle
- Polish: Remove outline on focus (#106)
- Polish: Make pie grid less ugly (#90)
- Polish: Highlighting a line/area chart in legend, defocuses others
- Polish: Radial gradients on pie charts vs linear
- Polish: Better sizing for heatmap legends
- Chore: Refactor Advanced Legend (#125)
- Chore: Webpack html templates for Google Analytics

## 1.9.0
- Enhancement: Hover of legend doesn't highlight bar (#73)
- API: Added `activate` and `deactivate` events to chart for hovers
- Bug: Fix number card positioning due to count up
- Bug: Fix decimal places on advanced pie legend
- Chore: Fix rx mapping (#123)
- Polish: Tweak label color bg
- Polish: Tweak circle / heat map tooltip titles
- Perf: Improve perf of circles using ngIf

## 1.8.2
- Bug: Fix for number cards not updating to last value
- Bug: Revert RxJS Import Optimized (#62) due to (#119)
- Polish: Added animation on treemap
- Polish: Better formatting for treemap values
- Polish: Added animation on advanced pie
- Polish: Added animation on pie grid

## 1.8.1
- Polish: Treemap/Number card label color improvements
- Polish: Tooltip formatting improvements
- Backlog: RxJS Import Optimized (#62)
- Backlog: AoT fixes

## 1.8.0
- Renamed CommonModule to ChartCommonModule to fix name conflicts with other frameworks #109
- Converted date objets to formatted strings in some charts
- Removed rounded corners on thin bars
- Improved on destroy hooks in tooltips
- Merged `legendLabelClick` output into `select` output
- Fixed legend click data format

## 1.7.3
- Fixed pie chart labels going out of bounds
- Updated area tooltip formatting and legend colors for dates
- Updated numbercard height scale max size

## 1.7.2
- Bug: Fix number card text scaling
- Added custom timeline background element
- Wrapped timeline updates in zone.run
- Style updates

## 1.7.1
- Bug: Advanced Pie Legend not clickable
- Bug: Date equality not scaling properly

## 1.7.0
- Enhancement: Added `legendLabelClick` event
- Enhancement: Properly format labels and numbers in axis, tooltips, and legends
- Bug: Fix typo in legend eye class
- Style: Hover styling for legend entries 
- Chore: Upgrade to Angular 2.2.2
- Chore: Better Webpack Config
- Chore: Normalized exports

## 1.6.3
- Bug: Wrap all updates in zone.run to fix issue in hybrid apps
- Perf: Add starting value to reduce calls
- Bug: Fix sorting in line and area charts
- Bug: Fix change detection in hybrid Angular applications
- Style: Better tooltip styling

## 1.6.2
- Chore: Export BaseCharts
- Perf: Switch change detection strategy to OnPush

## 1.6.1
- Bug: Don't do rounded edges on bars smaller than their radius
- Bug: Scale number cards by height
- Bug: Set text inside number cards to prevent overflow (#89)
- Bug: Format numbers and dates according to locale
- Bug: Fix timeline width when no legend is present
- Bug: Embed charts into timeline; Restyle timeline
- Bug: Show percentages in tooltips for normalized bar charts (#79)
- Chore: Change legend class name to prevent style conflicts (#98)
- Chore: Upgrade to Angular 2.2.1
- Chore: Fix tooltips in hybrid apps

## 1.6.0
- Added gauge chart
- Fixed source map file name
- Fixed bug where grid panels in grouped bar chart would have the wrong size and position

## 1.5.2
- Added fade in animation to charts
- Excluded d3 from the release bundle
- Decreased the pie grid doughnut width

## 1.5.1
- Fixed bug where view dimension feedback would enter into a loop due to float decimals
- Fixed bug where tree map would not call update on the base chart
- Switched legend label truncation to css ellipsis
- Added maximum height to legend, and scrollbars on overflow
- Added a count up animation to number cards
- Fixed advanced pie layout
- Updated pie grid layout and padding
- Refactored pie grid to use the pie arc component
- Updated testing framework

## 1.5.0
- Added force directed graph chart (#64)
- Fixed bug where tooltip would not work when library is used in an angular 1 application using ngUpgrade
- Fixed tooltip positioning
- Added line interpolation option for line and area charts (#52)
- Updated view dimension calculation to properly take into account the width and height of the axis tick labels.
- Various bug fixes and code style fixes

## 1.4.0
- Chore: Upgrade Webpack 2.25
- Chore: Remove rollup in favor of webpack builds

## 1.3.0
- Added option to resize charts to fit containers if `view` property is not set (#44)
- Fixed legend size and positioning (#47)
- Added scale legend to heat map chart
- Added option to show/hide the grid lines on the chart (#53)
- Added support for negative values in bar charts (#17)
- Fixed bug with reduce call (#56)
- Changed the tooltip to be hidden initially in order to avoid overflow and scrollbars. (#57)
- Fixed AOT bugs (#46)

## 1.2.2
- Added AOT compilation support
- Fixed bug where BrowserModule was imported multiple times

## 1.2.1
- Added transition animation to TreeMap chart
- Added tooltips to TreeMap, Line, Area, and Pie Grid charts
- Fixed TreeMap click event
- Updated TreeMap label positioning and style
- Changed the starting opacity of bars in bar chart
- Updated the circles behavior on Line and Area charts

## 1.2.0
- Added Tooltips to charts
- Added TreeMap chart

## 1.1.0
- Upgraded to Angular 2.0.0
- Upgraded to TypeScript 2.0.2
- Added timeline line and area charts
- Removed margin from inputs
- Prevented charts from double rendering on init
- Added transition animations to pie, line and area charts, and updated transitions on bar charts

## 1.0.1
- Implemented smart axis labels (#32)
- Upgraded D3 to 4.0 (#6)

## 1.0.0
- Initial release
