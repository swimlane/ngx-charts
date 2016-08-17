import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import d3 from '../d3';
import { BaseChart } from '../common/BaseChart';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { generateColorScale, colorHelper } from '../utils/colorSets';

@Component({
  selector: 'heat-map',
  template: `
    <chart
      [legend]="false"
      [legendData]="colorScale"
      [data]="results.m0Domain"
      [view]="view">
      <svg:g [attr.transform]="transform" class="viz numbercard">

        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:rect *ngFor="let rect of rects"
          [attr.x]="rect.x"
          [attr.y]="rect.y"
          [attr.rx]="rect.rx"
          [attr.width]="rect.width"
          [attr.height]="rect.height"
          [attr.fill]="rect.fill"
        />

        <svg:g heatMapCellSeries
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [data]="results.series"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class HeatMap extends BaseChart implements OnInit {
  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  color: any;
  colors: Function;
  colorScale: any;
  transform: string;
  rects: any[];

  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 100];
  @Input() scheme;
  @Input() customColors;
  @Input() legend;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 11);

    this.xScale = d3.scaleBand()
      .rangeRound([0, this.dims.width], 0.1)
      .domain(this.results.d0Domain);

    this.yScale = d3.scaleBand()
      .rangeRound([this.dims.height, 0], 0.1)
      .domain(this.results.d1Domain);

    this.color = d3.rgb(this.scheme.domain[0]);

    this.colors = colorHelper(this.scheme, 'linear', this.results.m0Domain);
    this.colorScale = generateColorScale(this.scheme, 'linear', this.results.m0Domain);

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;

    this.rects = this.getRects();
  }

  getRects() {
    let rects = [];

    this.results.d0Domain.map((d0, index0) => {
      this.results.d1Domain.map((d1, index1) => {
        rects.push({
          x: this.xScale(d0),
          y: this.yScale(d1),
          rx: 3,
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: 'rgba(200,200,200,0.03)'
        });
      });
    });

    return rects;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
  }

  update() {
  }
}
