# Tree Map Chart

## Tree Map Chart

<iframe src="https://embed.plnkr.co/plunk/VvVTLXOOsMGfYtT9c1CX?autoCloseSidebar&deferRun&show=preview" style="border: 0; top: 0; left: 0; width: 100%; height: 400px;" allowfullscreen scrolling="no"></iframe>

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

