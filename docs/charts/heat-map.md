# Heat Map

<iframe width="100%" height="550" frameborder="0" src="https://embed.plnkr.co/iyvvzBrEIayRWG5BcQ7e?show=preview">
</iframe>

# Inputs

Property            | Type     | Default Value | Description
:------------------ | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------
view                | number[] |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
results             | object[] |               | the chart data
scheme              | object   |               | the color scheme of the chart
legend              | boolean  | false         | show or hide the legend
xAxis               | boolean  | false         | show or hide the x axis
yAxis               | boolean  | false         | show or hide the y axis
showXAxisLabel      | boolean  | false         | show or hide the x axis label
showYAxisLabel      | boolean  | false         | show or hide the y axis label
xAxisLabel          | string   |               | the x axis label text
yAxisLabel          | string   |               | the y axis label text
xAxisTickFormatting | function |               | the x axis tick formatting
yAxisTickFormatting | function |               | the y axis tick formatting
gradient            | boolean  | false         | fill elements with a gradient instead of a solid color
innerPadding        | number \ | number[]      | 8                                                                                                               | the inner padding in px
tooltipDisabled     | boolean  | false         | show or hide the tooltip

# Outputs

Property | Description
:------- | :----------
select   | click event

# Data Format

The data format is multi series:

```
[
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  }
]
```
