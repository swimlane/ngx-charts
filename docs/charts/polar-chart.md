# Polar/radar Chart

# Inputs

| Property            | Type        | Default Value | Description                                                                                                                                                                                                                               |
|:--------------------|:------------|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| view                | number[]    |               | the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size                                                                                                                           |
| results             | object[]    |               | the chart data                                                                                                                                                                                                                            |
| scheme              | object      |               | the color scheme of the chart                                                                                                                                                                                                             |
| schemeType          | string      | 'ordinal'     | the color scale type. Can be either 'ordinal' or 'linear'                                                                                                                                                                                 |
| customColors        | object      |               | custom colors for the chart. Used to override a color for a specific value                                                                                                                                                                |
| animations          | boolean     | true          | enable animations                                                                                                                                                                                                                         |
| rangeFillOpacity    | number      | 0.15          | opacity of the shadow around the line indication the (optional) min and max values. The range shadow is only displayed if min and max values are provided with the data. The color of the shadow is always the color of the central line. |
| legend              | boolean     | false         | show or hide the legend                                                                                                                                                                                                                   |
| legendTitle         | string      | 'Legend'      | the legend title                                                                                                                                                                                                                          |
| xAxis               | boolean     | false         | show or hide the x axis                                                                                                                                                                                                                   |
| yAxis               | boolean     | false         | show or hide the y axis                                                                                                                                                                                                                   |
| showGridLines       | boolean     | true          | show or hide the grid lines                                                                                                                                                                                                               |
| roundDomains        | boolean     | false         | round domains for aligned gridlines                                                                                                                                                                                                       |
| showXAxisLabel      | boolean     | false         | show or hide the x axis label                                                                                                                                                                                                             |
| showYAxisLabel      | boolean     | false         | show or hide the y axis label                                                                                                                                                                                                             |
| xAxisLabel          | string      |               | the x axis label text                                                                                                                                                                                                                     |
| yAxisLabel          | string      |               | the y axis label text                                                                                                                                                                                                                     |
| xAxisTickFormatting | function    |               | the x axis tick formatting                                                                                                                                                                                                                |
| yAxisTickFormatting | function    |               | the y axis tick formatting                                                                                                                                                                                                                |
| autoScale           | boolean     | false         | set the minimum value of the y axis to the minimum value in the data, instead of 0                                                                                                                                                        |
| curve               | function    |               | the interpolation function used to generate the curve. It accepts any [d3.curve](https://github.com/d3/d3-shape#curves) function                                                                                                          |
| activeEntries       | object[]    | []            | elements to highlight                                                                                                                                                                                                                     |
| tooltipDisabled     | boolean     | false         | show or hide the tooltip                                                                                                                                                                                                                  |
| showSeriesOnHover   | boolean     | true          | show or hide all points on the line on hover                                                                                                                                                                                              |
| tooltipTemplate     | TemplateRef |               | a custom ng-template to be displayed inside the tooltip                                                                                                                                                                                   |
| yAxisMinScale       | number      |               | force y axis scaling to the provided value (ignored if chart data contains a higher value)                                                                                                                                                |

# Outputs

| Property   | Description                              |
|:-----------|:-----------------------------------------|
| select     | click event                              |
| activate   | element activation event (mouse enter)   |
| deactivate | element deactivation event (mouse leave) |

# Data Format

## Regular polar charts

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
