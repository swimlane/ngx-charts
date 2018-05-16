# Number Card Chart

## Number Card Chart

{% embed data="{\"url\":\"https://embed.plnkr.co/c9Kb4DhRuj2MP1Cjgzl7?show=preview\",\"type\":\"rich\",\"title\":\"Number Card Chart\",\"description\":\"Created on Plnkr: Helping developers build the web.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://embed.plnkr.co/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://shot.plnkr.co/c9Kb4DhRuj2MP1Cjgzl7.png?d=2017-03-31T15:13:23.907Z\",\"width\":400,\"height\":300,\"aspectRatio\":0.75},\"embed\":{\"type\":\"reader\",\"url\":\"https://embed.plnkr.co/plunk/c9Kb4DhRuj2MP1Cjgzl7?autoCloseSidebar&deferRun&show=preview\",\"html\":\"<div style=\\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6667%;\\"><iframe src=\\"https://embed.plnkr.co/plunk/c9Kb4DhRuj2MP1Cjgzl7?autoCloseSidebar&amp;deferRun&amp;show=preview\\" style=\\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\\" allowfullscreen scrolling=\\"no\\"></iframe></div>\",\"aspectRatio\":1.5}}" %}



## Inputs

| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| view | number\[\] |  | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results | object\[\] |  | the chart data |
| scheme | object |  | the color scheme of the chart |
| customColors | function or object |  | custom colors for the chart. Used to override a color for a specific value |
| animations | boolean | true | enable animations |
| cardColor | string |  | color of the card background, defaults to color based on value and scheme |
| bandColor | string |  | color of the card color-bar, defaults to color based on value and scheme |
| textColor | string |  | color of the card text, defaults to the inverse of the card color |
| emptyColor | string | 'rgba\(0, 0, 0, 0\)' | color of empty card slots |
| innerPadding | number  number\[\] | 15 | padding around each card in px |
| valueFormatting | function |  | function that formats the card value |
| labelFormatting | function |  | function that formats the card label |

## Outputs

| Property | Description |
| --- | --- |
| select | click event |

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

