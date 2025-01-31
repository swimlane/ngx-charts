import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear } from 'd3-shape';

import { getUniqueXDomainValues, getXDomainArray } from '@swimlane/ngx-charts/common/domain.helper';
import {
  BaseChartComponent,
  ViewDimensions,
  ColorHelper,
  calculateViewDimensions,
  ScaleType
} from 'projects/swimlane/ngx-charts/src/public-api';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngx-charts-sparkline',
    template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="line-chart chart">
        <svg:g>
          <svg:g *ngFor="let series of results; trackBy: trackBy">
            <svg:g
              ngx-charts-line-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [scaleType]="scaleType"
              [curve]="curve"
              [animations]="animations"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
    styleUrls: ['../../../../projects/swimlane/ngx-charts/src/lib/common/base-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SparklineComponent extends BaseChartComponent {
  @Input() autoScale = false;
  @Input() curve: any = curveLinear;
  @Input() schemeType: ScaleType = ScaleType.Ordinal;
  @Input() valueDomain: number[];
  @Input() animations: boolean = true;

  dims: ViewDimensions;
  xSet: any;
  xDomain: any;
  yDomain: any;
  seriesDomain: any;
  yScale: any;
  xScale: any;
  colors: ColorHelper;
  scaleType: ScaleType;
  transform: string;
  margin = [0, 0, 0, 0];

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: false,
      showYAxis: false,
      xAxisHeight: 0,
      yAxisWidth: 0,
      showXLabel: false,
      showYLabel: false,
      showLegend: false,
      legendType: this.schemeType
    });

    this.xDomain = this.getXDomain();

    this.yDomain = this.getYDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.setColors();
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getXDomain(): any[] {
    const values = getUniqueXDomainValues(this.results);

    const { domain, xSet, scaleType } = getXDomainArray(values);
    this.scaleType = scaleType as ScaleType;
    this.xSet = xSet;
    return domain;
  }

  getYDomain(): any[] {
    if (this.valueDomain) {
      return this.valueDomain;
    }

    const domain = [];

    for (const results of this.results) {
      for (const d of results.series) {
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
        if (d.min !== undefined) {
          if (domain.indexOf(d.min) < 0) {
            domain.push(d.min);
          }
        }
        if (d.max !== undefined) {
          if (domain.indexOf(d.max) < 0) {
            domain.push(d.max);
          }
        }
      }
    }

    let min = Math.min(...domain);
    const max = Math.max(...domain);
    if (!this.autoScale) {
      min = Math.min(0, min);
    }

    return [min, max];
  }

  getSeriesDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getXScale(domain, width): any {
    let scale;

    if (this.scaleType === 'time') {
      scale = scaleTime().range([0, width]).domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear().range([0, width]).domain(domain);
    } else if (this.scaleType === 'ordinal') {
      scale = scalePoint().range([0, width]).padding(0.1).domain(domain);
    }

    return scale;
  }

  getYScale(domain, height): any {
    const scale = scaleLinear().range([height, 0]).domain(domain);

    return scale;
  }

  getScaleType(values): ScaleType {
    let date = true;
    let num = true;

    for (const value of values) {
      if (!this.isDate(value)) {
        date = false;
      }

      if (typeof value !== 'number') {
        num = false;
      }
    }

    if (date) {
      return ScaleType.Time;
    }

    if (num) {
      return ScaleType.Linear;
    }

    return ScaleType.Ordinal;
  }

  isDate(value): boolean {
    if (value instanceof Date) {
      return true;
    }

    return false;
  }

  trackBy(index, item): string {
    return `${item.name}`;
  }

  setColors(): void {
    let domain;
    if (this.schemeType === ScaleType.Ordinal) {
      domain = this.seriesDomain;
    } else {
      domain = this.yDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }
}
