# @okendo/ngx-charts

Fork from [https://github.com/swimlane/ngx-charts]

## Install

`npm i @okendo/ngx-charts`

## Add-on Features

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

## Potential features(bar-chart)

- center the chart

- round corner of each bar svg

- adjust padding for small amount of values
