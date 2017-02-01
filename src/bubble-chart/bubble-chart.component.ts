import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { BaseChartComponent } from '../common/base-chart.component';

import d3 from '../d3';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';

@Component({
  selector: 'ngx-charts-bubble-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [activeEntries]="activeEntries"
      [legendOptions]="legendOptions"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">

      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"/>
        </svg:clipPath>
      </svg:defs>

      <svg:g [attr.transform]="transform" class="bubble-chart chart">
      
        <svg:g ngx-charts-x-axis
          *ngIf="xAxis"
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          (dimensionsChanged)="updateXAxisHeight($event)"/>
          
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [showGridLines]="showGridLines"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)"/>
 
        <svg:rect
          class="bubble-chart-area"
          x="0"
          y="0"
          [attr.width]="dims.width"
          [attr.height]="dims.height"
          style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
          (mouseenter)="deactivateAll()"
        />

        <svg:g *ngFor="let series of data">
          <svg:g ngx-charts-bubble-series
            [xScale]="xScale"
            [yScale]="yScale"
            [rScale]="rScale"
            [xScaleType]="xScaleType"
            [yScaleType]="yScaleType"
            [colors]="colors"
            [data]="series"
            [activeEntries]="activeEntries"
            (select)="onClick($event, series)"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)" />
        </svg:g>
        
      </svg:g>
    </ngx-charts-chart>`
})
export class BubbleChartComponent extends BaseChartComponent {
  @Input() view: number[] = [400, 400];

  @Input() results;
  @Input() showGridLines: boolean = true;
  @Input() legend = false;
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() showXAxisLabel: boolean;
  @Input() showYAxisLabel: boolean;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() roundDomains: boolean = false;
  @Input() maxRadius = 10;
  @Input() minRadius = 3;
  @Input() autoScale: boolean;
  @Input() schemeType = 'ordinal';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  dims: ViewDimensions;
  colors: ColorHelper;
  scaleType = 'linear';
  margin = [10, 20, 10, 20];
  data: any;
  
  legendOptions: any;
  transform: string;
  
  seriesDomain: any[];
  xDomain: any[];
  yDomain: any[];
  rDomain: number[];

  xScaleType: string;
  yScaleType: string;
  
  yScale: any;
  xScale: any;
  rScale: any;

  xAxisHeight: number = 0;
  yAxisWidth: number = 0;

  activeEntries: any[] = [];
  
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
        legendType: this.schemeType
      });

      this.seriesDomain = this.results.map(d => d.name);
      this.rDomain = this.getRDomain();
      this.xDomain = this.getXDomain();
      this.yDomain = this.getYDomain();

      this.transform = `translate(${ this.dims.xOffset },${ this.margin[0] })`;

      const colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
      this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);

      this.data = this.results;

      this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
      this.xScale = this.getXScale(this.xDomain, this.dims.width);
      this.yScale = this.getYScale(this.yDomain, this.dims.height);
      
      this.legendOptions = this.getLegendOptions();
    });
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.deactivateAll();
  }
  
  onClick(data, series): void {
    if (series) {
      data.series = series.name;
    }
    this.select.emit(data);
  }
  
  getYScale(domain, height): any {
    const padding = (domain[1] - domain[0]) / height * this.maxRadius;  // padding to keep bubbles inside range
    return getScale(domain, [height, 0], this.yScaleType, padding, this.roundDomains);
  }
  
  getXScale(domain, width): any {
    const padding = (domain[1] - domain[0]) / width * this.maxRadius;  // padding to keep bubbles inside range
    return getScale(domain, [0, width], this.xScaleType, padding, this.roundDomains);
  }

  getRScale(domain, range): any {
    const scale = d3.scaleLinear()
      .range(range)
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }
  
  getLegendOptions(): any {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: []
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors;
    } else {
      opts.domain = this.rDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }
  
  getXDomain(): any[] {
    const values = [];

    for (const results of this.results) {
      for (const d of results.series){
        if (!values.includes(d.x)) {
          values.push(d.x);
        }
      }
    }

    this.xScaleType = getScaleType(values);
    return getDomain(values, this.xScaleType, this.autoScale);
  }
  
  getYDomain(): any[] {
    const values = [];

    for (const results of this.results) {
      for (const d of results.series){
        if (!values.includes(d.y)) {
          values.push(d.y);
        }
      }
    }

    this.yScaleType = getScaleType(values);
    return getDomain(values, this.yScaleType, this.autoScale);
  }

  getRDomain(): number[] {
    let min = Infinity;
    let max = -Infinity;

    for (const results of this.results) {
      for (const d of results.series){
        const value = Number(d.r) || 1;
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    return [min, max];
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  deactivateAll() {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }
}

// TODO: move to utilities?
function getScaleType(values): string {
  let date = true;
  let num = true;

  for (const value of values) {
    if (!isDate(value)) {
      date = false;
    }

    if (typeof value !== 'number') {
      num = false;
    }
  }

  if (date) return 'time';
  if (num) return 'linear';
  return 'ordinal';
}

function isDate(value: any): boolean {
  if (value instanceof Date) {
    return true;
  }

  return false;
}

function getDomain(values, scaleType, autoScale): number[] {
    let domain: number[] = [];

    if (scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (scaleType === 'linear') {
      values = values.map(v => Number(v));
      let min = Math.min(...values);
      const max = Math.max(...values);
      if (!autoScale) {
        min = Math.min(0, min);
      }
      domain = [min, max];
    } else {
      domain = values;
    }

    return domain;
}

function getScale(domain, range: number[], scaleType, padding, roundDomains): any {
    let scale: any;

    if (scaleType === 'time') {
      scale = d3.scaleTime()
        .range(range)
        .domain(domain);
    } else if (scaleType === 'linear') {
     scale = d3.scaleLinear()
        .range(range)
        .domain([domain[0] - padding, domain[1] + padding]);
    } else if (scaleType === 'ordinal') {
      scale = d3.scalePoint()
        .range(range)
        .padding(0.1)
        .domain(domain);
    }

    return roundDomains ? scale.nice() : scale;
  }
