# Tree Map Chart

## Tree Map Chart

{% embed data="{\"url\":\"https://embed.plnkr.co/VvVTLXOOsMGfYtT9c1CX?show=preview\",\"type\":\"rich\",\"title\":\"Tree Map Chart\",\"description\":\"Created on Plnkr: Helping developers build the web.\",\"icon\":{\"type\":\"icon\",\"url\":\"https://embed.plnkr.co/favicon.ico\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://shot.plnkr.co/VvVTLXOOsMGfYtT9c1CX.png?d=2017-03-31T15:13:45.966Z\",\"width\":400,\"height\":300,\"aspectRatio\":0.75},\"embed\":{\"type\":\"reader\",\"url\":\"https://embed.plnkr.co/plunk/VvVTLXOOsMGfYtT9c1CX?autoCloseSidebar&deferRun&show=preview\",\"html\":\"<div style=\\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 66.6667%;\\"><iframe src=\\"https://embed.plnkr.co/plunk/VvVTLXOOsMGfYtT9c1CX?autoCloseSidebar&amp;deferRun&amp;show=preview\\" style=\\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\\" allowfullscreen scrolling=\\"no\\"></iframe></div>\",\"aspectRatio\":1.5}}" %}



## Inputs

| Property | Type | Default Value | Description |
| --- | --- | --- | --- |
| view | number\[\] |  | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results | object\[\] |  | the chart data |
| scheme | object |  | the color scheme of the chart |
| customColors | function or object |  | custom colors for the chart. Used to override a color for a specific value |
| animations | boolean | true | enable animations |
| tooltipDisabled | boolean | false | show or hide the tooltip |
| valueFormatting | function |  | function that formats the cell value |
| labelFormatting | function |  | function that formats the cell label |
| gradient | boolean | false | fill elements with a gradient instead of a solid color |
| tooltipTemplate | TemplateRef |  | a custom ng-template to be displayed inside the tooltip |

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

