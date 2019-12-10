# Number Card Chart

## Number Card Chart

{% embed data="{\"url\":\"https://stackblitz.com/edit/swimlane-number-card-chart?embed=1&file=app/app.component.ts\",\"type\":\"link\",\"title\":\"number-card-chart - StackBlitz\",\"description\":\"Number Card Chart demo for ngx-charts\",\"icon\":{\"type\":\"icon\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0},\"thumbnail\":{\"type\":\"thumbnail\",\"url\":\"https://c.staticblitz.com/assets/icon-664493542621427cc8adae5e8f50d632f87aaa6ea1ce5b01e9a3d05b57940a9f.png\",\"aspectRatio\":0}}" %}

## Inputs

| Property        | Type               | Default Value        | Description                                                                                                       |
| --------------- | ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| view            | number\[\]         |                      | the dimensions of the chart \[width, height\]. If left undefined, the chart will fit to the parent container size |
| results         | object\[\]         |                      | the chart data                                                                                                    |
| scheme          | object             |                      | the color scheme of the chart                                                                                     |
| customColors    | function or object |                      | custom colors for the chart. Used to override a color for a specific value                                        |
| animations      | boolean            | true                 | enable animations                                                                                                 |
| cardColor       | string             |                      | color of the card background, defaults to color based on value and scheme                                         |
| bandColor       | string             |                      | color of the card color-bar, defaults to color based on value and scheme                                          |
| textColor       | string             |                      | color of the card text, defaults to the inverse of the card color                                                 |
| emptyColor      | string             | 'rgba\(0, 0, 0, 0\)' | color of empty card slots                                                                                         |
| innerPadding    | number number\[\]  | 15                   | padding around each card in px                                                                                    |
| valueFormatting | function           |                      | function that formats the card value                                                                              |
| labelFormatting | function           |                      | function that formats the card label                                                                              |

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
