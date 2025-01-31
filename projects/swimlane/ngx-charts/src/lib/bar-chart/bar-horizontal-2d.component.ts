import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

import { scaleBand, scaleLinear } from 'd3-scale';

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';

import { BaseChartComponent } from '../common/base-chart.component';
import { ScaleType } from '../common/types/scale-type.enum';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';

@Component({
    selector: 'ngx-charts-bar-horizontal-2d',
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
          ngx-charts-grid-panel-series
          [xScale]="valueScale"
          [yScale]="groupScale"
          [data]="results"
          [dims]="dims"
          [orient]="barOrientation.Horizontal"
        ></svg:g>
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="valueScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          [wrapTicks]="wrapTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="groupScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          [yAxisOffset]="dataLabelMaxWidth.negative"
          [wrapTicks]="wrapTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>

        <svg:g *ngIf="!isSSR">
          <svg:g
            *ngFor="let group of results; let index = index; trackBy: trackBy"
            [@animationState]="'active'"
            [attr.transform]="groupTransform(group)"
          >
            <svg:g
              ngx-charts-series-horizontal
              [xScale]="valueScale"
              [activeEntries]="activeEntries"
              [yScale]="innerScale"
              [colors]="colors"
              [series]="group.series"
              [dims]="dims"
              [gradient]="gradient"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              [seriesName]="group.name"
              [roundEdges]="roundEdges"
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
        <svg:g *ngIf="isSSR">
          <svg:g
            *ngFor="let group of results; let index = index; trackBy: trackBy"
            [attr.transform]="groupTransform(group)"
          >
            <svg:g
              ngx-charts-series-horizontal
              [xScale]="valueScale"
              [activeEntries]="activeEntries"
              [yScale]="innerScale"
              [colors]="colors"
              [series]="group.series"
              [dims]="dims"
              [gradient]="gradient"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              [seriesName]="group.name"
              [roundEdges]="roundEdges"
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
    ],
    standalone: false
})
export class BarHorizontal2DComponent extends BaseChartComponent {
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
  @Input() declare schemeType: ScaleType;
  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() groupPadding: number = 16;
  @Input() barPadding: number = 8;
  @Input() roundDomains: boolean = false;
  @Input() roundEdges: boolean = true;
  @Input() xScaleMax: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;
  @Input() wrapTicks = false;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: string[];
  innerDomain: string[];
  valueDomain: [number, number];
  groupScale: any;
  innerScale: any;
  valueScale: any;
  transform: string;
  colors: ColorHelper;
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;
  dataLabelMaxWidth: any = { negative: 0, positive: 0 };
  isSSR = false;

  barOrientation = BarOrientation;

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.isSSR = true;
    }
  }

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

    this.groupScale = this.getGroupScale();
    this.innerScale = this.getInnerScale();
    this.valueScale = this.getValueScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getGroupScale(): any {
    const spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);

    return scaleBand()
      .rangeRound([0, this.dims.height])
      .paddingInner(spacing)
      .paddingOuter(spacing / 2)
      .domain(this.groupDomain);
  }

  getInnerScale(): any {
    const height = this.groupScale.bandwidth();
    const spacing = this.innerDomain.length / (height / this.barPadding + 1);

    return scaleBand().rangeRound([0, height]).paddingInner(spacing).domain(this.innerDomain);
  }

  getValueScale(): any {
    const scale = scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);

    return this.roundDomains ? scale.nice() : scale;
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

    for (const group of this.results) {
      for (const d of group.series) {
        if (!domain.includes(d.value)) {
          domain.push(d.value);
        }
      }
    }

    const min = Math.min(0, ...domain);
    const max = this.xScaleMax ? Math.max(this.xScaleMax, ...domain) : Math.max(0, ...domain);
    return [min, max];
  }

  groupTransform(group: DataItem): string {
    return `translate(0, ${this.groupScale(group.label)})`;
  }

  onClick(data, group?: DataItem): void {
    if (group) {
      data.series = group.name;
    }

    this.select.emit(data);
  }

  trackBy: TrackByFunction<DataItem> = (index: number, item: DataItem) => {
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

  updateYAxisWidth({ width }: { width: number }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onDataLabelMaxWidthChanged(event, groupIndex: number): void {
    if (event.size.negative) {
      this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event.size.width);
    } else {
      this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event.size.width);
    }
    if (groupIndex === this.results.length - 1) {
      setTimeout(() => this.update());
    }
  }

  onActivate(event, group: DataItem, fromLegend: boolean = false): void {
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

  onDeactivate(event, group: DataItem, fromLegend: boolean = false): void {
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
