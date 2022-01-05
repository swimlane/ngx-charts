# @okendo/ngx-charts

Fork from [https://github.com/swimlane/ngx-charts]

## Install

`npm i @okendo/ngx-charts`

## Add-on Features

## 14.0.1
- `tooltipBarDisabled` Option to disable the tool tip bar on data point hover
- `trueZero` Gradient effect flow towards 0
- `gradientDirection` Sets the flow of the gradient fade effect per chart line
- `gradient` Can be passed as an input from the initial line chart reference. Enabled by default.
- `margins` Can be passed as an input from pie chart reference

### Max width of each bar on bar chart

Use `barMaxWidth` attribute with default value 100px

#### Example

```angular
<ngx-charts-bar-vertical-stacked
    [animations]="false"
    [results]="result"
    [barMaxWidth]="100"
>
</ngx-charts-bar-vertical-stacked>
```
