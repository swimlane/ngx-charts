import { Component } from '@angular/core';
import {
  VIZ_COMPONENTS,
} from '../viz';

import { barData, pieData, lineData } from './data';

import '../viz.scss';

@Component({
  selector: 'app',
  template: `
    <div>
    	<h3>Bar charts</h3>
      <h4>Vertical</h4>
      <bar-vertical
        [view]="[700,200]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [labels]="true"
        [results]="barData"
        [xaxis]="true"
        [yaxis]="true"
        [show-x-axis-label]="true"
        [xaxis-label]="'hello x'"
        [yaxis-label]="'hello y'"
        [show-y-axis-label]="true">
      </bar-vertical>

      <h4>Horizontal</h4>
      <bar-horizontal
        [view]="[700,200]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [labels]="true"
        [results]="barData"
        [xaxis]="true"
        [yaxis]="true"
        [show-x-axis-label]="true"
        [xaxis-label]="'hello x'"
        [yaxis-label]="'hello y'"
        [show-y-axis-label]="true">
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
        [labels]="true"
        [results]="lineData"
        [legend]="false">
      </line-chart>

      <hr />
      <h3>Area Charts</h3>
      <h4>Area Chart</h4>

      <area-chart
        [view]="[700,300]"
        [scheme]="{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}"
        [labels]="true"
        [results]="lineData"
        [legend]="false">
      </area-chart>

    </div>
  `,
  directives: [VIZ_COMPONENTS]
})
export class App {

  barData: any;
  pieData: any;
  lineData: any;

  constructor() {
    Object.assign(this, {barData, pieData, lineData});
  }
}
