# Linear Gauge Chart

## Linear Gauge

{% embed data="{\"url\":\"https://embed.plnkr.co/yIm5sYQEXdJ8ThIxg0gM?show=preview\",\"type\":\"rich\",\"title\":\"Linear Gauge Chart\",\"description\":\"Created on Plnkr: Helping developers build the web.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://embed.plnkr.co/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://shot.plnkr.co/yIm5sYQEXdJ8ThIxg0gM.png?d=2017-03-31T15%3A17%3A58.602Z\",\"width\":400,\"height\":300,\"aspectRatio\":0.75},\"embed\":{\"type\":\"reader\",\"url\":\"https://embed.plnkr.co/plunk/yIm5sYQEXdJ8ThIxg0gM?autoCloseSidebar&deferRun&show=preview\",\"html\":\"<div style=\\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6667%;\\"><iframe src=\\"https://embed.plnkr.co/plunk/yIm5sYQEXdJ8ThIxg0gM?autoCloseSidebar&amp;deferRun&amp;show=preview\\" style=\\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\\" allowfullscreen scrolling=\\"no\\"></iframe></div>\",\"aspectRatio\":1.5}}" %}



## Inputs

| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| view | number\[\] |  | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| scheme | object |  | the color scheme of the chart |
| customColors | function or object |  | custom colors for the chart. Used to override a color for a specific value |
| animations | boolean | true | enable animations |
| min | number | 0 | starting point of the scale |
| max | number | 100 | ending point of the scale |
| value | number | 0 | the value represented on the gauge |
| previousValue | number |  | the value represented by the vertical line on the gauge. Use this if you want to compare the current value to a previous one |
| units | string |  | text to display under the value |
| valueFormatting | function |  | function that formats the value in the middle of the chart |

## Outputs

| Property | Description |
| --- | --- |
| select | click event |

