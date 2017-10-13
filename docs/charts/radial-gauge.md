# Radial Gauge

# Inputs

| Property        | Type     | Default Value | Description                                                                                                                  |
|:----------------|:---------|:--------------|:-----------------------------------------------------------------------------------------------------------------------------|
| view            | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size              |
| scheme          | object   |               | the color scheme of the chart                                                                                                |
| minValue        | number   | 0             | starting point of the scale                                                                                                  |
| maxValue        | number   | 100           | ending point of the scale                                                                                                    |
| value           | number   | 0             | the value represented on the gauge                                                                                           |
| displayValue    | string   |               | the value displayed on the gauge, if no specified then a normal value is displayed |
| showValue       | number   | true          | set to show or hide a value                                                                                              |
| minAngle        | number   | -90           | start angle of the gauge                                                                                             |
| maxAngle        | number   | 90            | end angle of the gauge                                                                                             |
| innerArcRadius  | number   |               | inner radius of arc on the gauge                                                                                              |
| outerArcRadius  | number   |               | outer radius of arc on the gauge                                                                                              |
| majorTicks      | number   | true          | the amount of segments on the gauge                                                                                              |
| axisRadius      | number   |               | radius of the axis on the gauge                                                                                              |
| pointerWidth    | number   |               | set to show or hide a value                                                                                              |
| pointerHeadLength          | number        |           | length of the pointer's head part                                                                                              |
| pointerTailLength          | number        |           | length of the pointer's tail part                                                                                              |
| pointerColor    | string   |               | color of the pointer                                                                                              |
| segments        | number   |               | custom settings of segments                                                                                             |

# Outputs

| Property | Description |
|:---------|:------------|
| select   | click event |
