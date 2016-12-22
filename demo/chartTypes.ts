let chartGroups = [
  {
    name: "Bar Charts",
    charts: [
      {
        name: "Vertical Bar Chart",
        selector: 'bar-vertical',
        inputFormat: 'singleSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Horizontal Bar Chart",
        selector: 'bar-horizontal',
        inputFormat: 'singleSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Grouped Vertical Bar Chart",
        selector: 'bar-vertical-2d',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Grouped Horizontal Bar Chart",
        selector: 'bar-horizontal-2d',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Stacked Vertical Bar Chart",
        selector: 'bar-vertical-stacked',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Stacked Horizontal Bar Chart",
        selector: 'bar-horizontal-stacked',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Normalized Vertical Bar Chart",
        selector: 'bar-vertical-normalized',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      },
      {
        name: "Normalized Horizontal Bar Chart",
        selector: 'bar-horizontal-normalized',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'showGridLines']
      }
    ]
  },
  {
    name: "Pie Charts",
    charts: [
      {
        name: "Pie Chart",
        selector: 'pie-chart',
        inputFormat: 'singleSeries',
        options: ['colorScheme', 'gradient', 'showLegend', 'doughnut', 'explodeSlices', 'showLabels']
      },
      {
        name: "Advanced Pie Chart",
        selector: 'advanced-pie-chart',
        inputFormat: 'singleSeries',
        options: ['colorScheme', 'gradient', 'showLegend', 'doughnut', 'showLabels']
      },
      {
        name: "Pie Grid",
        selector: 'pie-grid',
        inputFormat: 'singleSeries',
        options: ['colorScheme']
      }
    ]
  },
  {
    name: "Line/Area Charts",
    charts: [
      {
        name: "Line Chart",
        selector: 'line-chart',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve']
      },
      {
        name: "Area Chart",
        selector: 'area-chart',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve']
      },
      {
        name: "Stacked Area Chart",
        selector: 'area-chart-stacked',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve']
      },
      {
        name: "Normalized Area Chart",
        selector: 'area-chart-normalized',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve']
      },
    ]
  },
  {
    name: "Other Charts",
    charts: [
      {
        name: "Force Directed Graph",
        selector: 'force-directed-graph',
        inputFormat: 'graph',
        options: ['colorScheme', 'showLegend']
      },
      {
        name: "Heat Map",
        selector: 'heat-map',
        inputFormat: 'multiSeries',
        options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
      },
      {
        name: "Tree Map",
        selector: 'tree-map',
        inputFormat: 'singleSeries',
        options: ['colorScheme']
      },
      {
        name: "Number Cards",
        selector: 'number-card',
        inputFormat: 'singleSeries',
        options: ['colorScheme']
      },
      {
        name: "Gauge",
        selector: 'gauge',
        inputFormat: 'singleSeries',
        options: ['colorScheme', 'min', 'max', 'largeSegments', 'smallSegments', 'units', 'angleSpan', 'startAngle', 'showAxis']
      },
      {
        name: "Linear Gauge",
        selector: 'linear-gauge',
        inputFormat: 'single',
        options: ['colorScheme', 'value', 'previousValue', 'min', 'max', 'units']
      }
    ]
  }
];

export default chartGroups;
