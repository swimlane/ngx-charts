# Pie Chart

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/BooZfKJz0nLATpTe1SwH?show=preview">
</iframe>

# Inputs

Property      | Type     | Default Value | Description
:------------ | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------
view          | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
results       | object[] |               | the chart data
scheme        | object   |               | the color scheme of the chart
customColors  | object   |               | custom colors for the chart. Used to override a color for a specific value
labels        | boolean  | false         | show or hide the labels
legend        | boolean  | false         | show or hide the legend
explodeSlices | boolean  | false         | make the radius of each slice proportional to it's value
doughnut      | boolean  | false         | should doughnut instead of pie slices
arcWidth      | number   | 0.25          | arc width, expressed as a fraction of outer radius
gradient      | boolean  | false         | fill elements with a gradient instead of a solid color
activeEntries | object[] | []            | elements to highlight
tooltipDisabled     | boolean  | false         | show or hide the tooltip

# Outputs

Property   | Description
:--------- | :---------------------------------------
select     | click event
activate   | element activation event (mouse enter)
deactivate | element deactivation event (mouse leave)

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
