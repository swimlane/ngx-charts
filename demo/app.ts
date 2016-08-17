import { Component } from '@angular/core';
import { barData, pieData, lineData } from './data';
import '../src/viz.scss';

@Component({
  selector: 'app',
  template: `
    <div>
      <h3>Bar chart</h3>
      <h4>Vertical</h4>

      <bar-vertical
        [view]="[700,200]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [results]="barData"
        [xAxis]="true"
        [yAxis]="true"
        [showXAxisLabel]="true"
        [xAxisLabel]="'hello x'"
        [yAxisLabel]="'hello y'"
        [showYAxisLabel]="true">
      </bar-vertical>

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
        [results]="barData"
        [xAxis]="true"
        [xAxisLabel]="'hello x'"
        [showXAxisLabel]="true"
        [yAxis]="true"
        [yAxisLabel]="'hello y'"
        [showYAxisLabel]="true">
      </bar-horizontal>

      <hr />
      <h3>Pie Charts</h3>
      <h4>Pie</h4>
      <pie-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [labels]="true"
        [results]="pieData"
        [legend]="false">
      </pie-chart>

      <hr />
      <h3>Line Charts</h3>
      <h4>Line Chart</h4>

      <line-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [xAxis]="true"
        [yAxis]="true"
        [results]="lineData">
      </line-chart>

      <hr />
      <h3>Area Charts</h3>
      <h4>Area Chart</h4>

      <area-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [xAxis]="true"
        [yAxis]="true"
        [results]="lineData"
        [legend]="false">
      </area-chart>

      <hr />
      <h3>Number Card</h3>

      <number-card
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [results]="pieData">
      </number-card>

    </div>
  `
})
export class App {
  constructor() {
    Object.assign(this, {barData, pieData, lineData});
  }
}
