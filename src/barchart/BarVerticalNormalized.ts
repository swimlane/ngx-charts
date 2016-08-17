import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { BaseChart } from '../common/BaseChart';
import d3 from '../d3';

@Component({
  selector: 'bar-vertical-normalized',
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results.legend">
      <svg:g [attr.transform]="transform" class="viz bar chart">

        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [tickFormatting]="tickFormatting"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          showGridLines="true"
          [tickFormatting]="yAxisTickFormatting"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let series of results.series"
          [attr.transform]="seriesTransform(series)">
          <svg:g seriesVertical
            type="stacked"
            [xScale]="xScale"
            [yScale]="yScale"
            [colors]="colors"
            [series]="series"
            [dims]="dims"
            (clickHandler)="click($event)"
          />
        </svg:g>

      </svg:g>
    </chart>
  `
})
export class BarVerticalNormalized extends BaseChart implements OnInit {
  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  transform: string;
  yAxisTickFormatting: Function;
  colors: Function;

  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 100];
  @Input() scheme;
  @Input() customColors;
  @Input() legend = false;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    this.xScale = d3.scaleBand()
      .rangeRound([0, this.dims.width], 0.1)
      .domain(this.results.d0Domain);

    this.yScale = d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain([0, 1]);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;

    this.yAxisTickFormatting = d3.format('.0%');
  }

  seriesTransform(series) {
    return `translate(${this.xScale(series.name)}, 0)`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d1Domain, this.customColors);
  }

  update() {
  }

}
