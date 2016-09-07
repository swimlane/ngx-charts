import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import d3 from '../d3';

@Component({
  selector: 'bar-horizontal-2d',
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results">
      <svg:g [attr.transform]="transform" class="bar chart">
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
          showGridLines="true"
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
          *ngFor="let group of results"
          [attr.transform]="groupTransform(group)">
          <svg:g seriesHorizontal
            [xScale]="valueScale"
            [yScale]="innerScale"
            [colors]="colors"
            [series]="group.series"
            [dims]="dims"
            [gradient]="gradient"
            (clickHandler)="click($event)"
          />
        </svg:g>

      </svg:g>
    </chart>
  `
})
export class BarHorizontal2D extends BaseChart implements OnInit, OnChanges {
  dims: ViewDimensions;
  groupDomain: any[];
  innerDomain: any[];
  valuesDomain: any[];
  groupScale: any;
  innerScale: any;
  valueScale: any;
  transform: string;
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
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

    ngOnInit() {
      this.update();
    }

    ngOnChanges() {
      this.update();
    }

    update() {
      super.update();
      this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

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

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
  }
}
