import { Component, Input, OnInit } from '@angular/core';
import { Legend } from '../Legend';
import { ScaleLegend } from '../ScaleLegend';
@Component({
  selector: 'chart',
  directives: [Legend, ScaleLegend],
  template: `
  <div class="row">
    <div [class]="className">
      <svg
        class="viz"
        [attr.width]="view[0] * chartWidth / 12.0"
        [attr.height]="view[1]">

        <ng-content></ng-content>
      </svg>

    </div>

    <scale-legend
      *ngIf="legend && legendType === 'scaleLegend'"
      class="col-sm-1 col-md-1 col-lg-1 viz legend"
      [valueRange]="data"
      [colors]="legendData"
      [height]="view[1]">
    </scale-legend>

    <legend
      *ngIf="legend && legendType === 'legend'"
      class="col-sm-3 col-md-3 col-lg-3 viz legend"
      [data]="legendData"
      [title]="title"
      [colors]="colors"
      [height]="view[1]">
    </legend>
  </div>
`
})
export class Chart implements OnInit {
  @Input() view;
  @Input() legend = false;
  @Input() data;
  @Input() legendData;
  @Input() colors;

  chartWidth: any;
  title: any;
  legendWidth: any;
  legendType: any;
  className: any;

  ngOnInit() {
    this.legendWidth = 0;
    if (this.legend) {
      this.legendType = this.getLegendType();

      if (this.legendData.label) {
        this.title = this.legendData.label();
      } else if (this.legendData[0] && this.legendData[0].label) {
        this.title = this.legendData[0].label();
      } else {
        this.title = 'Color Scale';
      }

      if (this.legendType === 'scaleLegend') {
        this.legendWidth = 1;
      } else {
        this.legendWidth = 3;
      }
    }

    this.chartWidth = 12 - this.legendWidth;
    this.className = `col-sm-${this.chartWidth} col-md-${this.chartWidth} col-lg-${this.chartWidth}`;
  }

  getLegendType() {
    if (typeof this.legendData === 'function') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }
}
