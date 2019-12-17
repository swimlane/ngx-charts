# Linear Gauge Chart

## Linear Gauge

{% embed data="{\"url\":\"https://stackblitz.com/edit/swimlane-linear-gauge-chart?embed=1&file=app/app.component.ts\",\"type\":\"link\",\"title\":\"linear-gauge-chart - StackBlitz\",\"description\":\"Linear Gauge Chart demo for ngx-charts\",\"icon\":{\"type\":\"icon\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0}}" %}

## Inputs

| Property        | Type               | Default Value | Description                                                                                                                  |
| --------------- | ------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| view            | number\[\]         |               | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size            |
| scheme          | object             |               | the color scheme of the chart                                                                                                |
| customColors    | function or object |               | custom colors for the chart. Used to override a color for a specific value                                                   |
| animations      | boolean            | true          | enable animations                                                                                                            |
| min             | number             | 0             | starting point of the scale                                                                                                  |
| max             | number             | 100           | ending point of the scale                                                                                                    |
| value           | number             | 0             | the value represented on the gauge                                                                                           |
| previousValue   | number             |               | the value represented by the vertical line on the gauge. Use this if you want to compare the current value to a previous one |
| units           | string             |               | text to display under the value                                                                                              |
| valueFormatting | function           |               | function that formats the value in the middle of the chart                                                                   |

## Outputs

| Property | Description |
| -------- | ----------- |
| select   | click event |
