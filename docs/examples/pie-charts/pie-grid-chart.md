# Pie Grid Chart

## Pie Grid Chart

{% embed data="{\"url\":\"https://stackblitz.com/edit/swimlane-pie-chart-grid?embed=1&file=app/app.component.ts\",\"type\":\"link\",\"title\":\"pie-grid-chart - StackBlitz\",\"description\":\"Pie Grid Chart demo for ngx-charts\",\"icon\":{\"type\":\"icon\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0}}" %}

## Inputs

| Property        | Type               | Default Value | Description                                                                                                                                                                                                          |
| --------------- | ------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| view            | number\[\]         |               | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size                                                                                                    |
| results         | object\[\]         |               | the chart data                                                                                                                                                                                                       |
| scheme          | object             |               | the color scheme of the chart                                                                                                                                                                                        |
| customColors    | function or object |               | custom colors for the chart. Used to override a color for a specific value                                                                                                                                           |
| animations      | boolean            | true          | enable animations                                                                                                                                                                                                    |
| label           | string             | 'Total'       | the text to show under the total value                                                                                                                                                                               |
| tooltipDisabled | boolean            | false         | show or hide the tooltip                                                                                                                                                                                             |
| tooltipTemplate | TemplateRef        |               | a custom ng-template to be displayed inside the tooltip                                                                                                                                                              |
| designatedTotal | number             |               | total number that the value of each object in the results array will be compared to. If left undefined, the value of each object will automatically be compared to the total of all the values in the results array. |
| minWidth        | number             | 150           | minimum width of each graph in grid                                                                                                                                                                                  |

## Outputs

| Property | Description |
| -------- | ----------- |
| select   | click event |

## Data Format

The data format is single series:

```text
[
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  }
]
```
