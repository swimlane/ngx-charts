import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  NgZone,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import { tickFormat } from '../common/tick-format.helper';
import d3 from '../d3';

@Component({
  selector: 'bar-horizontal',
  template: `
    <chart
      [legend]="legend"
      [view]="[width, height]"
      [colors]="colors"
      [legendData]="yDomain">
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [tickFormatting]="yAxisTickFormatting()"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g seriesHorizontal
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class BarHorizontal extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  dims: ViewDimensions;
  yScale: any;
  xScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: Function;
  margin = [10, 20, 70, 100];

  @Input() view;
  @Input() results;
  @Input() scheme;
  @Input() customColors;
  @Input() legend = false;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;

  @Output() clickHandler = new EventEmitter();

  constructor(private element: ElementRef, zone: NgZone) {
    super(element, zone);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnDestroy() {
    this.unbindEvents();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      columns: 10
    });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  getXScale() {
    this.xDomain = this.getXDomain();
    return d3.scaleLinear()
      .range([0, this.dims.width])
      .domain(this.xDomain);
  }

  getYScale() {
    const spacing = 0.2;
    this.yDomain = this.getYDomain();
    return d3.scaleBand()
      .rangeRound([this.dims.height, 0])
      .paddingInner(spacing)
      .domain(this.yDomain);
  }

  getXDomain() {
    let values = this.results.map(d => d.value);
    let min = Math.min(0, ...values);
    let max = Math.max(...values);
    return [min, max];
  }

  getYDomain() {
    return this.results.map(d => d.name);
  }

  yAxisTickFormatting() {
    let tickFormatting;
    if (this.results.query && this.results.query.dimensions.length) {
      tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
    }
    return tickFormatting;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.yDomain, this.customColors);
  }
}
