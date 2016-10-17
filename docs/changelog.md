# Changelog

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
