# Heat Map Chart

## Heat Map

{% embed data="{\"url\":\"https://stackblitz.com/edit/swimlane-heat-map-chart?embed=1&file=app/app.component.ts\",\"type\":\"link\",\"title\":\"heat-map-chart - StackBlitz\",\"description\":\"Heat Map Chart demo for ngx-charts\",\"icon\":{\"type\":\"icon\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0}}" %}

## Inputs

| Property            | Type                 | Default Value  | Description                                                                                                       |
| ------------------- | -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| view                | number\[\]           |                | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results             | object\[\]           |                | the chart data                                                                                                    |
| scheme              | object               |                | the color scheme of the chart                                                                                     |
| animations          | boolean              | true           | enable animations                                                                                                 |
| legend              | boolean              | false          | show or hide the legend                                                                                           |
| legendTitle         | string               | 'Legend'       | the legend title                                                                                                  |
| legendPosition      | string               | 'right'        | the legend position ['right', 'below']                                                                            |
| xAxis               | boolean              | false          | show or hide the x axis                                                                                           |
| yAxis               | boolean              | false          | show or hide the y axis                                                                                           |
| showXAxisLabel      | boolean              | false          | show or hide the x axis label                                                                                     |
| showYAxisLabel      | boolean              | false          | show or hide the y axis label                                                                                     |
| xAxisLabel          | string               |                | the x axis label text                                                                                             |
| yAxisLabel          | string               |                | the y axis label text                                                                                             |
| trimXAxisTicks      | boolean              | true           | trim or not ticks on the x axis                                                                                   |
| trimYAxisTicks      | boolean              | true           | trim or not ticks on the Y axis                                                                                   |
| rotateXAxisTicks    | boolean              | true           | enable automic rotation of x-axis ticks to prevent overlaps                                                       |
| maxXAxisTickLength  | number               | 16             | max length of the ticks. If `trimXAxisTicks` is `true`, ticks over this length will be trimmed                    |
| maxYAxisTickLength  | number               | 16             | max length of the ticks. If `trimYAxisTicks` is `true`, ticks over this length will be trimmed                    |
| xAxisTickFormatting | function             |                | the x axis tick formatting                                                                                        |
| yAxisTickFormatting | function             |                | the y axis tick formatting                                                                                        |
| xAxisTicks          | any\[\]              |                | predefined list of x axis tick values                                                                             |
| yAxisTicks          | any\[\]              |                | predefined list of y axis tick values                                                                             |
| gradient            | boolean              | false          | fill elements with a gradient instead of a solid color                                                            |
| innerPadding        | number or number\[\] | 8              | the inner padding in px                                                                                           |
| tooltipDisabled     | boolean              | false          | show or hide the tooltip                                                                                          |
| tooltipText         | function             | \(see source\) | the HTML text to display in the tooltip                                                                           |
| tooltipTemplate     | TemplateRef          |                | a custom ng-template to be displayed inside the tooltip                                                           |
| wrapTicks           | boolean            | false         | axis tick labels will wrap based on available space

## Outputs

| Property | Description |
| -------- | ----------- |
| select   | click event |

## Data Format

The data format is multi series:

```text
[
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  }
]
```
