# Number Card Chart

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/c9Kb4DhRuj2MP1Cjgzl7?show=preview">
</iframe>

# Inputs

| Property        | Type              | Default Value      | Description                                                                                                     |
|:----------------|:------------------|:-------------------|:----------------------------------------------------------------------------------------------------------------|
| view            | number[]          |                    | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size |
| results         | object[]          |                    | the chart data                                                                                                  |
| scheme          | object            |                    | the color scheme of the chart                                                                                   |
| customColors    | object            |                    | custom colors for the chart. Used to override a color for a specific value                                      |
| animations      | boolean           | true               | enable animations                                                                                               |
| cardColor       | string            |                    | color of the card background, defaults to color based on value and scheme                                       |
| bandColor       | string            |                    | color of the card color-bar, defaults to color based on value and scheme                                        |
| textColor       | string            |                    | color of the card text, defaults to the inverse of the card color                                               |
| emptyColor      | string            | 'rgba(0, 0, 0, 0)' | color of empty card slots                                                                                       |
| innerPadding    | number \ number[] | 15                 | padding around each card in px                                                                                  |
| valueFormatting | function          |                    | function that formats the card value                                                                            |
| labelFormatting | function          |                    | function that formats the card label                                                                            |

# Outputs

| Property | Description |
|:---------|:------------|
| select   | click event |

# Data Format

The data format is single series:

```
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
