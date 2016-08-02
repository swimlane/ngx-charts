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
    	<h3>Bar chart</h3>

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

    </div>
  `,
  directives: [VIZ_COMPONENTS]
})
export class App {

  barData: any;
  pieData: any;
  lineData: any;

  constructor() {
    console.log('Alles gut');
    Object.assign(this, {barData, pieData, lineData});
  }


}
