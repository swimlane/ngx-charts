import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { PieSeries } from './PieSeries';
import { trimLabel } from '../common/trimLabel';
import { gridLayout } from '../common/gridLayout';
import { truncate } from 'common/utils/truncate';

@Component({
  selector: 'advanced-pie-chart',
  directives: [Chart, PieSeries],
  template: `
    <div class="row"
      [style.height]="view[1]">

      <div class="col-md-4"
        [style.height]="view[1]">

        <chart
          [colors]="colors"
          [view]="view">

          <svg:g
            [attr.transform]="transform"
            class="viz pie chart">
            <svg:g pie-series
              [colors]="colors"
              [showLabels]="labels"
              [data]="data"
              [innerRadius]="innerRadius"
              [outerRadius]="outerRadius"
              (clickHandler)="click($event)">
            </svg:g>
          </svg:g>
        </chart>
      </div>

      <div class="col-md-8">
        <div class="advanced-pie-legend"
          [style.margin-top]="(view[1] - 215)/2">

          <div class="total-value">
            {{roundedTotal}}
          </div>
          <div class="total-label">
            {{totalLabel}}
          </div>

          <div class="legend-items-container">
            <div class="legend-items">
              <div *ngFor="let legendItem of legendItems" class="legend-item">
                <div class="item-color"
                  [style.background]="colors(legendItem.label)">
                </div>
                <div class="item-value">{{legendItem.value}}</div>
                <div class="item-label">{{legendItem.label}}</div>
                <div class="item-percent">{{legendItem.percentage}}%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  `
})
export class AdvancedPieChart extends BaseChart {
  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions([this.view[0]*4/12.0, this.view[1]], this.margin, false, false, false);

    this.setColors();

    // sort data according to domain
    this.data = this.results.series[0];
    this.data.array = this.data.array.sort((a, b) => {
      return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1])
    })

    let xOffset = this.margin[3] + this.dims.width / 2;
    let yOffset = this.margin[0] + this.dims.height / 2;

    this.outerRadius = Math.min(this.dims.width, this.dims.height)/2.5;
    this.innerRadius = this.outerRadius * 0.75;

    this.transform = `translate(${xOffset} , ${yOffset})`;

    this.total = this.data.array
      .map(series => {return series.vals[0].value})
      .reduce((a, b) => { return a + b });
    this.roundedTotal = Math.round(this.total);

    this.totalLabel = 'total';

    this.legendItems = this.getLegendItems();
  }

  getLegendItems(){
    let legendItemsWidth = Math.floor(this.view[0]*8/12) - 10;
    return this.data.array.map((series, index) => {
      let label = series.vals[0].label[1];
      let value = series.vals[0].value;
      let percentage = Math.round(value/this.total*100);
      return {
        value: Math.round(value),
        label: truncate(label, 20),
        percentage: percentage
      }
    });
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
  }

}
