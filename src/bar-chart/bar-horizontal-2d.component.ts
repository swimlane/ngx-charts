import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  trigger,
  style,
  transition,
  animate, ElementRef, NgZone, AfterViewInit
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import d3 from '../d3';

@Component({
  selector: 'bar-horizontal-2d',
  template: `
    <chart
      [legend]="legend"
      [view]="[width, height]"
      [colors]="colors"
      [legendData]="innerDomain">
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g gridPanelSeries
          [xScale]="valueScale"
          [yScale]="groupScale"
          [data]="results"
          [dims]="dims"
          orient="horizontal">
        </svg:g>

        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="valueScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="groupScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let group of results; trackBy:trackBy"
          [@animationState]="'active'"
          [attr.transform]="groupTransform(group)">
          <svg:g seriesHorizontal
            [xScale]="valueScale"
            [yScale]="innerScale"
            [colors]="colors"
            [series]="group.series"
            [dims]="dims"
            [gradient]="gradient"
            (clickHandler)="click($event, group)"
          />
        </svg:g>

      </svg:g>
    </chart>
  `,
  animations: [
    trigger('animationState', [
      transition('* => void', [
        style({
          opacity: 1,
          transform: '*',
        }),
        animate(500, style({opacity: 0, transform: 'scale(0)'}))
      ])
    ])
  ]
})
export class BarHorizontal2D extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  dims: ViewDimensions;
  groupDomain: any[];
  innerDomain: any[];
  valuesDomain: any[];
  groupScale: any;
  innerScale: any;
  valueScale: any;
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

    this.groupDomain = this.getGroupDomain();
    this.innerDomain = this.getInnerDomain();
    this.valuesDomain = this.getValueDomain();

    this.groupScale = this.getGroupScale();
    this.innerScale = this.getInnerScale();
    this.valueScale = this.getValueScale();

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  getGroupScale() {
    let spacing = 0.2;
    return d3.scaleBand()
      .rangeRound([this.dims.height, 0])
      .paddingInner(spacing)
      .domain(this.groupDomain);
  }

  getInnerScale() {
    let spacing = 0.2;
    return d3.scaleBand()
      .rangeRound([0, this.groupScale.bandwidth()])
      .paddingInner(spacing)
      .domain(this.innerDomain);
  }

  getValueScale() {
    return d3.scaleLinear()
      .range([0, this.dims.width])
      .domain(this.valuesDomain);
  }

  getGroupDomain() {
    let domain = [];
    for (let group of this.results) {
      if (!domain.includes(group.name)) {
        domain.push(group.name);
      }
    }

    return domain;
  }

  getInnerDomain() {
    let domain = [];
    for (let group of this.results) {
      for (let d of group.series) {
        if (!domain.includes(d.name)) {
          domain.push(d.name);
        }
      }
    }

    return domain;
  }

  getValueDomain() {
    let domain = [];
    for (let group of this.results) {
      for (let d of group.series) {
        if (!domain.includes(d.value)) {
          domain.push(d.value);
        }
      }
    }

    let min = Math.min(0, ...domain);
    let max = Math.max(...domain);
    return [min, max];
  }


  groupTransform(group) {
    return `translate(0, ${this.groupScale(group.name)})`;
  }

  click(data, group) {
    data.series = group.name;
    this.clickHandler.emit(data);
  }

  trackBy(index, item) {
    return item.name;
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
  }
}
