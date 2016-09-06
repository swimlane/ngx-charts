import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { single, multi } from './data';
import '../src/a2d3.scss';
import './demo.scss';

@Component({
  selector: 'app',
  directives: [FORM_DIRECTIVES],
  template: `
    <div class="content">
      <h3>Bar chart</h3>

      <h4>Vertical</h4>
      <!-- -->
      <bar-vertical
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="single"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-vertical>

      <h4>Horizontal</h4>
      <bar-horizontal
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="single"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-horizontal>

      <h4>Vertical 2D</h4>
      <bar-vertical-2d
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-vertical-2d>

      <h4>Horizontal 2D</h4>
      <bar-horizontal-2d
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-horizontal-2d>

      <h4>Vertical Stacked</h4>
      <bar-vertical-stacked
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-vertical-stacked>

      <h4>Horizontal Stacked</h4>
      <bar-horizontal-stacked
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-horizontal-stacked>

      <h4>Vertical Normalized</h4>
      <bar-vertical-normalized
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-vertical-normalized>

      <h4>Horizontal Normalized</h4>
      <bar-horizontal-normalized
        [view]="[700,200]"
        [scheme]="colorScheme"
        [results]="multi"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [legend]="showLegend"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel">
      </bar-horizontal-normalized>

      <hr />

      <h3>Pie Charts</h3>

      <h4>Pie</h4>
      <pie-chart
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="single"
        [legend]="showLegend"
        [explodeSlices]="explodeSlices"
        [labels]="showLabels"
        [doughnut]="doughnut"
        [gradient]="gradient">
      </pie-chart>

      <h4>Advanced Pie Chart</h4>
      <advanced-pie-chart
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="single"
        [gradient]="gradient">
      </advanced-pie-chart>

      <h4>Pie Grid</h4>
      <pie-grid
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="single">
      </pie-grid>

      <hr />

      <h3>Line Charts</h3>

      <h4>Line Chart</h4>
      <line-chart
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="multi"
        [legend]="showLegend"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel"
        [autoScale]="autoScale">
      </line-chart>

      <hr />

      <h3>Area Charts</h3>

      <h4>Area Chart</h4>
      <area-chart
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="multi"
        [legend]="showLegend"
        [gradient]="gradient"
        [xAxis]="showXAxis"
        [yAxis]="showYAxis"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel"
        [autoScale]="autoScale">
      </area-chart>

      <hr />

      <h3>Number Card</h3>
      <number-card
        [view]="[700,300]"
        [scheme]="colorScheme"
        [results]="single">
      </number-card>
      <!-- -->
    </div>

    <div class="sidebar">
      <h3>Options</h3>

      <label>
        <input type="checkbox" [checked]="showXAxis" (change)="showXAxis = $event.target.checked">
        Show X Axis
      </label> <br />

      <label>
        <input type="checkbox" [checked]="showYAxis" (change)="showYAxis = $event.target.checked">
        Show Y Axis
      </label> <br />

      <label>
        <input type="checkbox" [checked]="gradient" (change)="gradient = $event.target.checked">
        Use gradients
      </label> <br />

      <label>
        <input type="checkbox" [checked]="showLegend" (change)="showLegend = $event.target.checked">
        Show Legend
      </label> <br />

      <label>
        <input type="checkbox" [checked]="showXAxisLabel" (change)="showXAxisLabel = $event.target.checked">
        Show X Axis Label
      </label> <br />

      <label>X Axis Label:</label><br />
      <input type="text" [(ngModel)]="xAxisLabel"><br />

      <label>
        <input type="checkbox" [checked]="showYAxisLabel" (change)="showYAxisLabel = $event.target.checked">
        Show Y Axis Label
      </label> <br />

      <label>Y Axis Label:</label><br />
      <input type="text" [(ngModel)]="yAxisLabel"><br />

      <label>
        <input type="checkbox" [checked]="showLabels" (change)="showLabels = $event.target.checked">
        Show Pie/Doughnut labels
      </label> <br />

      <label>
        <input type="checkbox" [checked]="explodeSlices" (change)="explodeSlices = $event.target.checked">
        Explode Slices
      </label> <br />

      <label>
        <input type="checkbox" [checked]="doughnut" (change)="doughnut = $event.target.checked">
        Doughnut
      </label> <br />

      <label>
        <input type="checkbox" [checked]="autoScale" (change)="autoScale = $event.target.checked">
        Auto Scale
      </label> <br />
    </div>
  `
})
export class App {
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {single, multi});
  }
}
