import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart',
  template: `
    <svg
      class="a2d3"
      [attr.width]="view[0] * chartWidth / 12.0"
      [attr.height]="view[1]">

      <ng-content></ng-content>
    </svg>

    <scale-legend
      *ngIf="legend && legendType === 'scaleLegend'"
      class="legend"
      [valueRange]="data"
      [colors]="legendData"
      [height]="view[1]">
    </scale-legend>

    <legend
      *ngIf="legend && legendType === 'legend'"
      class="legend"
      [data]="legendData"
      [title]="title"
      [colors]="colors"
      [height]="view[1]">
    </legend>
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
  }

  getLegendType() {
    if (typeof this.legendData === 'function') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }
}
