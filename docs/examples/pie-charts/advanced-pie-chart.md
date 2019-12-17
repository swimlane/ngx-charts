# Advanced Pie Chart

## Advanced Pie Chart

{% embed data="{\"url\":\"https://stackblitz.com/edit/swimlane-pie-chart-advanced?embed=1&file=app/app.component.ts\",\"type\":\"link\",\"title\":\"advanced-pie-chart - StackBlitz\",\"description\":\"Advanced Pie Chart demo for ngx-charts\",\"icon\":{\"type\":\"icon\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0}}" %}

## Inputs

| Property             | Type               | Default Value | Description                                                                                                       |
| -------------------- | ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------- |
| view                 | number\[\]         |               | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results              | object\[\]         |               | the chart data                                                                                                    |
| scheme               | object             |               | the color scheme of the chart                                                                                     |
| customColors         | function or object |               | custom colors for the chart. Used to override a color for a specific value                                        |
| animations           | boolean            | true          | enable animations                                                                                                 |
| gradient             | boolean            | false         | fill elements with a gradient instead of a solid color                                                            |
| activeEntries        | object\[\]         | \[\]          | elements to highlight                                                                                             |
| label                | string             | 'Total'       | the text to show under the total value                                                                            |
| tooltipDisabled      | boolean            | false         | show or hide the tooltip                                                                                          |
| tooltipTemplate      | TemplateRef        |               | a custom ng-template to be displayed inside the tooltip                                                           |
| valueFormatting      | function           |               | function that formats the numerical value in the chart legend                                                     |
| nameFormatting       | function           |               | function that formats name in the chart legend                                                                    |
| percentageFormatting | function           |               | function that formats the percentage number in the chart legend                                                   |

## Outputs

| Property   | Description                                |
| ---------- | ------------------------------------------ |
| select     | click event                                |
| activate   | element activation event \(mouse enter\)   |
| deactivate | element deactivation event \(mouse leave\) |

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
