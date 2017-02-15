# Linear Gauge

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/yIm5sYQEXdJ8ThIxg0gM?show=preview">
</iframe>

# Inputs

Property      | Type     | Default Value | Description
:------------ | :------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------
view          | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
scheme        | object   |               | the color scheme of the chart
customColors  | object   |               | custom colors for the chart. Used to override a color for a specific value
min           | number   | 0             | starting point of the scale
max           | number   | 100           | ending point of the scale
value         | number   | 0             | the value represented on the gauge
previousValue | number   |               | the value represented by the vertical line on the gauge. Use this if you want to compare the current value to a previous one
units         | string   |               | text to display under the value

# Outputs

Property | Description
:------- | :----------
select   | click event
