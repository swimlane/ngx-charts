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

      <bar-vertical
        [view]="[700,200]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
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

      <hr />

      <!--<h4>Vertical 2D</h4>-->

      <!--<bar-vertical-2-d-->
        <!--[view]="[700,200]"-->
        <!--[scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"-->
        <!--[labels]="true"-->
        <!--[results]="barData"-->
        <!--[xAxis]="true"-->
        <!--[yAxis]="true"-->
        <!--[showXAxisLabel]="true"-->
        <!--[xAxisLabel]="'hello x'"-->
        <!--[yAxisLabel]="'hello y'"-->
        <!--[showYAxisLabel]="true">-->
      <!--</bar-vertical-2-d>-->


      <h4>Horizontal</h4>
      <bar-horizontal
        [view]="[700,200]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
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

      <hr />
      <h3>Pie Charts</h3>
      <h4>Pie</h4>
      <pie-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [results]="single"
        [legend]="showLegend"
        [explodeSlices]="explodeSlices"
        [labels]="showLabels"
        [doughnut]="doughnut"
        [gradient]="gradient">
      </pie-chart>

      <!--

      <hr />
      <h3>Line Charts</h3>
      <h4>Line Chart</h4>

      <line-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [xAxis]="true"
        [yAxis]="true"
        [results]="single"
        [gradient]="true">
      </line-chart>

      <hr />
      <h3>Area Charts</h3>
      <h4>Area Chart</h4>

      <area-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [xAxis]="true"
        [yAxis]="true"
        [results]="single"
        [legend]="false">
      </area-chart>

      <hr />
      <h3>Number Card</h3>

      <number-card
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [results]="single">
      </number-card>
      -->
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

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;


  constructor() {
    Object.assign(this, {single, multi});
  }
}
