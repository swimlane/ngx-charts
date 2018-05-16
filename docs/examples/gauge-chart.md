# Gauge Chart

## Gauge

{% embed data="{\"url\":\"https://embed.plnkr.co/MylIDCFIpzg1oH5tatDs?show=preview\",\"type\":\"rich\",\"title\":\"Gauge Chart\",\"description\":\"Created on Plnkr: Helping developers build the web.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://embed.plnkr.co/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://shot.plnkr.co/MylIDCFIpzg1oH5tatDs.png?d=2017-03-31T15:03:42.511Z\",\"width\":400,\"height\":300,\"aspectRatio\":0.75},\"embed\":{\"type\":\"reader\",\"url\":\"https://embed.plnkr.co/plunk/MylIDCFIpzg1oH5tatDs?autoCloseSidebar&deferRun&show=preview\",\"html\":\"<div style=\\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6667%;\\"><iframe src=\\"https://embed.plnkr.co/plunk/MylIDCFIpzg1oH5tatDs?autoCloseSidebar&amp;deferRun&amp;show=preview\\" style=\\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\\" allowfullscreen scrolling=\\"no\\"></iframe></div>\",\"aspectRatio\":1.5}}" %}



## Inputs

| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| view | number\[\] |  | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results | object\[\] |  | the chart data |
| scheme | object |  | the color scheme of the chart |
| customColors | function or object |  | custom colors for the chart. Used to override a color for a specific value |
| animations | boolean | true | enable animations |
| legend | boolean | false | show or hide the legend |
| legendTitle | string | 'Legend' | the legend title |
| min | number | 0 | starting point of the scale |
| max | number | 100 | ending point of the scale |
| units | string |  | text to display under the value |
| bigSegments | number | 10 | number of big segments on the axis |
| smallSegments | number | 5 | number of small segments between every big segment |
| showAxis | boolean | true | show or hide the axis |
| axisTickFormatting | function |  | the axis tick formatting |
| valueFormatting | function |  | function that formats the value in the middle of the chart |
| angleSpan | number | 240 | the angle that the chart spans \(in degrees\) |
| startAngle | number | -120 | the angle that the chart is rotated by. Use negative half of the spanning angle to centralize |
| tooltipDisabled | boolean | false | show or hide the tooltip |
| tooltipTemplate | TemplateRef |  | a custom ng-template to be displayed inside the tooltip |

## Outputs

| Property | Description |
| --- | --- |
| select | click event |
| activate | element activation event \(mouse enter\) |
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

