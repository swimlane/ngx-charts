import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { scaleBand, scaleLinear } from 'd3-scale';

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { Series } from '../models/chart-data.model';
import { BaseChartComponent } from '../common/base-chart.component';
import { BarChartType } from './types/bar-chart-type.enum';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';

@Component({
  selector: 'ngx-charts-bar-horizontal-stacked',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelActivate)="onActivate($event, undefined, true)"
      (legendLabelDeactivate)="onDeactivate($event, undefined, true)"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          [yAxisOffset]="dataLabelMaxWidth.negative"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g
          *ngFor="let group of series; let index = index; trackBy: trackBy"
          [@animationState]="'active'"
          [attr.transform]="groupTransform(group)"
        >
          <svg:g
            ngx-charts-series-horizontal
            [type]="barChartType.Stacked"
            [xScale]="xScale"
            [yScale]="yScale"
            [colors]="colors"
            [series]="group.series"
            [activeEntries]="activeEntries"
            [dims]="dims"
            [gradient]="gradient"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [seriesName]="group.name"
            [animations]="animations"
            [showDataLabel]="showDataLabel"
            [dataLabelFormatting]="dataLabelFormatting"
            [noBarWhenZero]="noBarWhenZero"
            (select)="onClick($event, group)"
            (activate)="onActivate($event, group)"
            (deactivate)="onDeactivate($event, group)"
            (dataLabelWidthChanged)="onDataLabelMaxWidthChanged($event, index)"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1,
          transform: '*'
        }),
        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class BarHorizontalStackedComponent extends BaseChartComponent {
  @Input() legend: boolean = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel: boolean;
  @Input() showYAxisLabel: boolean;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: ScaleType;
  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() barPadding: number = 8;
  @Input() roundDomains: boolean = false;
  @Input() xScaleMax: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;
  @Input() roundEdges: boolean = false;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: string[];
  innerDomain: string[];
  valueDomain: [number, number];
  xScale: any;
  yScale: any;
  transform: string;
  colors: ColorHelper;
  margin = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;
  dataLabelMaxWidth: any = { negative: 0, positive: 0 };
  series: any[];

  barChartType = BarChartType;

  update(): void {
    super.update();

    if (!this.showDataLabel) {
      this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }

    this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];

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
      legendType: this.schemeType,
      legendPosition: this.legendPosition
    });

    this.formatDates();

    this.groupDomain = this.getGroupDomain();
    this.innerDomain = this.getInnerDomain();
    this.valueDomain = this.getValueDomain();

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();
    this.series =  this.getRoundedEdgeBar(this.roundEdges);
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getGroupDomain(): string[] {
    const domain = [];

    for (const group of this.results) {
      if (!domain.includes(group.label)) {
        domain.push(group.label);
      }
    }

    return domain;
  }

  getInnerDomain(): string[] {
    const domain = [];

    for (const group of this.results) {
      for (const d of group.series) {
        if (!domain.includes(d.label)) {
          domain.push(d.label);
        }
      }
    }

    return domain;
  }

  getValueDomain(): [number, number] {
    const domain = [];
    let smallest = 0;
    let biggest = 0;
    for (const group of this.results) {
      let smallestSum = 0;
      let biggestSum = 0;
      for (const d of group.series) {
        if (d.value < 0) {
          smallestSum += d.value;
        } else {
          biggestSum += d.value;
        }
        smallest = d.value < smallest ? d.value : smallest;
        biggest = d.value > biggest ? d.value : biggest;
      }
      domain.push(smallestSum);
      domain.push(biggestSum);
    }
    domain.push(smallest);
    domain.push(biggest);

    const min = Math.min(0, ...domain);
    const max = this.xScaleMax ? Math.max(this.xScaleMax, ...domain) : Math.max(...domain);
    return [min, max];
  }

  getYScale(): any {
    const spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);

    return scaleBand().rangeRound([0, this.dims.height]).paddingInner(spacing).domain(this.groupDomain);
  }

  getXScale(): any {
    const scale = scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  groupTransform(group: Series): string {
    return `translate(0, ${this.yScale(group.name)})`;
  }

  onClick(data, group?: Series): void {
    if (group) {
      data.series = group.name;
    }

    this.select.emit(data);
  }

  trackBy: TrackByFunction<Series> = (index: number, item: Series) => {
    return item.name;
  };

  setColors(): void {
    let domain;
    if (this.schemeType === ScaleType.Ordinal) {
      domain = this.innerDomain;
    } else {
      domain = this.valueDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    const opts = {
      scaleType: this.schemeType as any,
      colors: undefined,
      domain: [],
      title: undefined,
      position: this.legendPosition
    };
    if (opts.scaleType === ScaleType.Ordinal) {
      opts.domain = this.innerDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.valueDomain;
      opts.colors = this.colors.scale;
    }

    return opts;
  }

  getRoundedEdgeBar(roundEdges: boolean = false): any {
    const results = [];
    for (const group of this.results) {
      const series = [];
      for (const d of group.series) {
        series.push({
          ...d,
          roundEdges: false
        });
      }
      if (roundEdges) series[group.series.length - 1].roundEdges = true;
      group.series = series;
      results.push(group);
    }
   return results;
  }

  updateYAxisWidth({ width }: { width: number }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onDataLabelMaxWidthChanged(event, groupIndex: number) {
    if (event.size.negative) {
      this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
    } else {
      this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
    }
    if (groupIndex === this.results.length - 1) {
      setTimeout(() => this.update());
    }
  }

  onActivate(event, group: Series, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    const items = this.results
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
  }

  onDeactivate(event, group: Series, fromLegend: boolean = false) {
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
