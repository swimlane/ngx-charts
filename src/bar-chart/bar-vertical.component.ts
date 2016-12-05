import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  SimpleChanges,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChartComponent } from '../common/base-chart.component';
import { tickFormat } from '../common/tick-format.helper';
import d3 from '../d3';

@Component({
  selector: 'bar-vertical',
  template: `
    <chart
      [legend]="legend"
      [view]="[width, height]"
      [colors]="colors"
      (legendLabelClick)="onClick($event)"
      [legendData]="xDomain">
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [tickFormatting]="xAxisTickFormatting()"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g seriesVertical
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          (clickHandler)="onClick($event)">
        </svg:g>
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarVerticalComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {

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

  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: Function;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;

  constructor(private element: ElementRef, private cd: ChangeDetectorRef, zone: NgZone) {
    super(element, zone, cd);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnDestroy(): void {
    this.unbindEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    super.update();

    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin,
        showXAxis: this.xAxis,
        showYAxis: this.yAxis,
        xAxisHeight: this.xAxisHeight,
        yAxisWidth: this.yAxisWidth,
        showXLabel: this.showXAxisLabel,
        showYLabel: this.showYAxisLabel,
        showLegend: this.legend,
        columns: 10
      });

      this.xScale = this.getXScale();
      this.yScale = this.getYScale();

      this.setColors();

      this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    });
  }

  getXScale() {
    const spacing = 0.2;
    this.xDomain = this.getXDomain();
    return d3.scaleBand()
      .rangeRound([0, this.dims.width])
      .paddingInner(spacing)
      .domain(this.xDomain);
  }

  getYScale() {
    this.yDomain = this.getYDomain();
    return d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
  }

  getXDomain() {
    return this.results.map(d => d.name);
  }

  getYDomain() {
    let values = this.results.map(d => d.value);
    let min = Math.min(0, ...values);
    let max = Math.max(...values);
    return [min, max];
  }

  xAxisTickFormatting() {
    let tickFormatting;

    if (this.results.query && this.results.query.dimensions.length) {
      tickFormatting = tickFormat(
        this.results.query.dimensions[0].field.fieldType, 
        this.results.query.dimensions[0].groupByType.value);
    }
    
    return tickFormatting;
  }

  onClick(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
  }

  updateYAxisWidth({width}) {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({height}) {
    this.xAxisHeight = height;
    this.update();
  }
}
