# Gauge

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/MylIDCFIpzg1oH5tatDs?show=preview"></iframe>

# Inputs
| Property      | Type     | Default Value | Description                                                                                                     |
|---------------|----------|---------------|-----------------------------------------------------------------------------------------------------------------|
| view          | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size |
| results       | object[] |               | the chart data                                                                                                  |
| scheme        | object   |               | the color scheme of the chart                                                                                   |
| customColors  | object   |               | custom colors for the chart. Used to override a color for a specific value                                      |
| min           | number   | 0             | starting point of the scale                                                                                     |
| max           | number   | 100           | ending point of the scale                                                                                       |
| units         | string   |               | text to display under the value                                                                                 |
| bigSegments   | number   | 10            | number of big segments on the axis                                                                              |
| smallSegments | number   | 5             | number of small segments between every big segment                                                              |
| showAxis      | boolean  | true          | show or hide the axis                                                                                           |
| angleSpan     | number   | 240           | the angle that the chart spans (in degrees)                                                                     |
| startAngle    | number   | -120          | the angle that the chart is rotated by. Use negative half of the spanning angle to centralize                   |

# Outputs
| Property     | Description                              |
|--------------|------------------------------------------|
| select       | click event                              |

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
