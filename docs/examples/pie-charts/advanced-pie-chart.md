# Advanced Pie Chart

## Advanced Pie Chart

{% embed data="{\"url\":\"https://embed.plnkr.co/732px9P6WMqDeirILWox?show=preview\",\"type\":\"rich\",\"title\":\"Advanced Pie Chart\",\"description\":\"Created on Plnkr: Helping developers build the web.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://embed.plnkr.co/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://shot.plnkr.co/732px9P6WMqDeirILWox.png?d=2017-03-31T15:14:59.833Z\",\"width\":400,\"height\":300,\"aspectRatio\":0.75},\"embed\":{\"type\":\"reader\",\"url\":\"https://embed.plnkr.co/plunk/732px9P6WMqDeirILWox?autoCloseSidebar&deferRun&show=preview\",\"html\":\"<div style=\\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6667%;\\"><iframe src=\\"https://embed.plnkr.co/plunk/732px9P6WMqDeirILWox?autoCloseSidebar&amp;deferRun&amp;show=preview\\" style=\\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\\" allowfullscreen scrolling=\\"no\\"></iframe></div>\",\"aspectRatio\":1.5}}" %}

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
