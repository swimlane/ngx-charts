# Radial Gauge

# Inputs

| Property        | Type     | Default Value | Description                                                                                                                  |
|:----------------|:---------|:--------------|:-----------------------------------------------------------------------------------------------------------------------------|
| view            | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size              |
| scheme          | object   |               | the color scheme of the chart                                                                                                |
| minValue             | number   | 0             | starting point of the scale                                                                                                  |
| maxValue             | number   | 100           | ending point of the scale                                                                                                    |
| value           | number   | 0             | the value represented on the gauge                                                                                           |
| displayValue   | string   |               | the value displayed on the gauge, if no specified then a normal value is displayed |
| showValue           | number   | true          | set to show or hide a value                                                                                              |
| minAngle           | number   | true          | set to show or hide a value                                                                                              |
| innerArcRadius           | number   | true          | set to show or hide a value                                                                                              |
| outerArcRadius           | number   | true          | set to show or hide a value                                                                                              |
| majorTicks           | number   | true          | set to show or hide a value                                                                                              |
| axisRadius           | number   | true          | set to show or hide a value                                                                                              |
| pointerWidth           | number   | true          | set to show or hide a value                                                                                              |
| pointerHeadLength           | number   | true          | set to show or hide a value                                                                                              |
| pointerTailLength           | number   | true          | set to show or hide a value                                                                                              |

# Outputs

| Property | Description |
|:---------|:------------|
| select   | click event |
