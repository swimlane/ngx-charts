import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { scaleBand } from 'd3-scale';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { getScaleType } from '../common/domain.helper';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';

interface RectItem {
  fill: string;
  height: number;
  rx: number;
  width: number;
  x: number;
  y: number;
}

@Component({
  selector: 'ngx-charts-calendar-pie',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [animations]="animations"
      [legendOptions]="legendOptions"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="transform" class="calendar-pie chart">
        <svg:g
          ngx-charts-calendar-pie-cell-series
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [data]="formattedResult"
          [gradient]="gradient"
          [animations]="animations"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipText]="tooltipText"
          [headerTemplateRef]="header"
          (select)="onClick($event)"
          (deactivate)="onDeactivate($event, undefined)"
        >
          <ng-template #header>
            <svg:g
              ngx-charts-pie-chart
              class="chart-container pie-chart-calendar"
              [view]="[100, 100]"
              [results]="pieResults"
              [animations]="animations"
              [legend]="false"
              [explodeSlices]="false"
              [labels]="false"
              [doughnut]="false"
              [tooltipDisabled]="true"
              [calendar]="true">
            </svg:g>
          </ng-template>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
    <svg>
    </svg>
    
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarPieComponent extends BaseChartComponent {
  @Input() legend: boolean;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() xAxis: boolean;
  @Input() yAxis: boolean;
  @Input() showXAxisLabel: boolean;
  @Input() showYAxisLabel: boolean;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() gradient: boolean;
  @Input() innerPadding: number | number[] | string | string[] = 8;
  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: any;
  @Input() min: number;
  @Input() max: number;
  @Input() activeEntries: any[] = [];
  @Input() wrapTicks = false;
  @Input() month: number = 10;
  @Input() year: number = 2023;
  @Input() calendarData: number[];
  @Input() pieResults: any[];

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xDomain: string[];
  yDomain: string[];
  valueDomain: any[];
  xScale: any;
  yScale: any;
  colors: ColorHelper;
  colorScale: any;
  transform: string;
  rects: RectItem[];
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;
  scaleType: ScaleType = ScaleType.Linear;
  startDayOfWeek: number;
  formattedResult: any[];

  update(): void {
    super.update();

    this.formatDates();

    this.formatData();

    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();
    this.valueDomain = this.getValueDomain();

    this.scaleType = getScaleType(this.valueDomain, false);

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
      legendType: this.scaleType as any,
      legendPosition: this.legendPosition
    });

    if (this.scaleType === ScaleType.Linear) {
      let min = this.min;
      let max = this.max;
      if (!this.min) {
        min = Math.min(0, ...this.valueDomain);
      }
      if (!this.max) {
        max = Math.max(...this.valueDomain);
      }
      this.valueDomain = [min, max];
    }

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    this.rects = this.getRects();

  }

  formatData(): any[] {
    const d = new Date(this.year, this.month, 1);
    this.startDayOfWeek = d.getDay();

    this.formattedResult = [
      {
        'name': 'Sunday',
        'series': []
      },
      {
        'name': 'Monday',
        'series': []
      },
      {
        'name': 'Tuesday',
        'series': []
      },
      {
        'name': 'Wednesday',
        'series': []
      },
      {
        'name': 'Thursday',
        'series': []
      },
      {
        'name': 'Friday',
        'series': []
      },
      {
        'name': 'Saturday',
        'series': []
      }
    ];

    for (let i = 0; i < this.calendarData.length; i++) {
      this.formattedResult[(i + this.startDayOfWeek) % 7].series.push({
        'name': Math.floor((i + this.startDayOfWeek) / 7),
        'value': this.calendarData[i]
      });
    }

    return this.formattedResult;
  }

  getXDomain(): string[] {
    const domain = [];
    for (const group of this.formattedResult) {
      if (!domain.includes(group.name)) {
        domain.push(group.name);
      }
    }
    return domain;
  }

  getYDomain(): string[] {
    const domain = [];

    let weeks = 0;
    for (const group of this.formattedResult) {
      weeks = Math.max(weeks, group.series.length);
    }

    for (let i = weeks - 1; i > -1; i--) {
      domain.push(i);
    }

    return domain;
  }

  getValueDomain(): any[] {
    const domain = [];

    for (const group of this.formattedResult) {
      for (const d of group.series) {
        if (!domain.includes(d.value)) {
          domain.push(d.value);
        }
      }
    }

    return domain;
  }

  /**
   * Converts the input to gap paddingInner in fraction
   * Supports the following inputs:
   *    Numbers: 8
   *    Strings: "8", "8px", "8%"
   *    Arrays: [8,2], "8,2", "[8,2]"
   *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
   *
   * @memberOf CalendarPieComponent
   */
  getDimension(value: string | number | Array<string | number>, index: number = 0, N: number, L: number): number {
    if (typeof value === 'string') {
      value = value
        .replace('[', '')
        .replace(']', '')
        .replace('px', '')
        // tslint:disable-next-line: quotemark
        .replace("'", '');

      if (value.includes(',')) {
        value = value.split(',');
      }
    }
    if (Array.isArray(value) && typeof index === 'number') {
      return this.getDimension(value[index], null, N, L);
    }
    if (typeof value === 'string' && value.includes('%')) {
      return +value.replace('%', '') / 100;
    }
    return N / (L / +value + 1);
  }

  getXScale(): any {
    const f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
    return scaleBand().rangeRound([0, this.dims.width]).domain(this.xDomain).paddingInner(f);
  }

  getYScale(): any {
    const f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
    return scaleBand().rangeRound([this.dims.height, 0]).domain(this.yDomain).paddingInner(f);
  }

  getRects(): RectItem[] {
    const rects = [];

    this.xDomain.map(xVal => {
      this.yDomain.map(yVal => {
        rects.push({
          x: this.xScale(xVal),
          y: this.yScale(yVal),
          rx: 3,
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: 'rgba(200,200,200,0.03)'
        });
      });
    });

    return rects;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
  }

  getLegendOptions(): LegendOptions {
    return {
      scaleType: this.scaleType,
      domain: this.valueDomain,
      colors: this.scaleType === ScaleType.Ordinal ? this.colors : this.colors.scale,
      title: this.scaleType === ScaleType.Ordinal ? this.legendTitle : undefined,
      position: this.legendPosition
    };
  }

  updateYAxisWidth({ width }: { width: number }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  /*onActivate(event, group, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    const items = this.formattedResult
      .map(g => g.series)
      .flat()
      .filter(i => {
        if (fromLegend) {
          return i.label === item.name;
        } else {
          return i.name === item.name && i.series === item.series;
        }
      });

    this.activeEntries = [...items];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }*/

  onDeactivate(event, group, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) {
        return i.label !== item.name;
      } else {
        return !(i.name === item.name && i.series === item.series);
      }
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}
