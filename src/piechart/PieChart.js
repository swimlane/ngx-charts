import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions.js';
import { colorHelper } from 'common/services/stats/colorSets.js';
import { Chart } from '../common/charts/Chart.js';
import { BaseChart } from '../BaseChart.js';
import { PieSeries } from './PieSeries.js';

@Component({
  selector: 'pie-chart',
  directives: [Chart, PieSeries],
  template: `
    <chart
      [colors]="colors"
      [legend]="legend"
      [view]="view"
      [legendData]="data">
      <svg:g [attr.transform]="trans" class="viz pie chart">
        <svg:g pie-series
          [colors]="colors"
          [showLabels]="labels"
          [data]="data"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [explodeSlices]="explodeSlices"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class PieChart extends BaseChart {
  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;
  @Input() labels = false;
  @Input() legend = false;
  @Input() explodeSlices = false;
  @Input() doughnut = false;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    let dims = calculateViewDimensions(this.view, this.margin, false, false, this.legend, 9);
    let xOffset = this.margin[3] + dims.width / 2;
    let yOffset = this.margin[0] + dims.height / 2;
    this.trans = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(dims.width, dims.height);
    if (this.labels){
      // make room for labels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2
    }
    this.innerRadius = 0;
    if (this.doughnut){
      this.innerRadius = this.outerRadius * 0.75;
    }

    this.data = this.results.series[0];
    // sort data according to domain
    this.data.array = this.data.array.sort((a, b) => {
      return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1])
    })
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
  }

}
