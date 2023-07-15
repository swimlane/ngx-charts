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
import { isPlatformServer } from '@angular/common';
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
  selector: 'ngx-charts-bar-vertical-stacked',
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
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          [xAxisOffset]="dataLabelMaxHeight.negative"
          [wrapTicks]="wrapTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          [wrapTicks]="wrapTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g *ngIf="!isSSR">
          <svg:g
            *ngFor="let group of filteredResults; let index = index; trackBy: trackBy"
            [@animationState]="'active'"
            [attr.transform]="groupTransform(group)"
          >
            <svg:g
              ngx-charts-series-vertical
              [type]="barChartType.Stacked"
              [xScale]="xScale"
              [yScale]="yScale"
              [activeEntries]="activeEntries"
              [colors]="colors"
              [series]="group.series"
              [dims]="dims"
              [gradient]="gradient"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="tooltipTemplate"
              [showDataLabel]="showDataLabel"
              [dataLabelFormatting]="dataLabelFormatting"
              [seriesName]="group.name"
              [animations]="animations"
              [noBarWhenZero]="noBarWhenZero"
              (select)="onClick($event, group)"
              (activate)="onActivate($event, group)"
              (deactivate)="onDeactivate($event, group)"
              (dataLabelHeightChanged)="onDataLabelMaxHeightChanged($event, index)"
            />
          </svg:g>
        </svg:g>
      </svg:g>
      <svg:g *ngIf="isSSR">
        <svg:g
          *ngFor="let group of filteredResults; let index = index; trackBy: trackBy"
          [attr.transform]="groupTransform(group)"
        >
          <svg:g
            ngx-charts-series-vertical
            [type]="barChartType.Stacked"
            [xScale]="xScale"
            [yScale]="yScale"
            [activeEntries]="activeEntries"
            [colors]="colors"
            [series]="group.series"
            [dims]="dims"
            [gradient]="gradient"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [showDataLabel]="showDataLabel"
            [dataLabelFormatting]="dataLabelFormatting"
            [seriesName]="group.name"
            [animations]="animations"
            [noBarWhenZero]="noBarWhenZero"
            (select)="onClick($event, group)"
            (activate)="onActivate($event, group)"
            (deactivate)="onDeactivate($event, group)"
            (dataLabelHeightChanged)="onDataLabelMaxHeightChanged($event, index)"
          />
        </svg:g>
      </svg:g>
      <svg:g
        ngx-charts-timeline
        *ngIf="timeline"
        [attr.transform]="timelineTransform"
        [results]="results"
        [view]="[timelineWidth, height]"
        [height]="timelineHeight"
        [scheme]="scheme"
        [customColors]="customColors"
        [legend]="legend"
        [isBar]="true"
        [barPadding]="barPadding"
        (onDomainChange)="updateDomain($event)"
      >
      <svg:g
        *ngFor="let group of results; let index = index; trackBy: trackBy"
        [attr.transform]="timelineGroupTransform(group)"
      >
        <svg:g
          ngx-charts-series-vertical
          [type]="barChartType.Stacked"
          [xScale]="timelineXScale"
          [yScale]="timelineYScale"
          [colors]="colors"
          [series]="group.series"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="true"
          [showDataLabel]="false"
          [seriesName]="group.name"
          [noBarWhenZero]="noBarWhenZero"
        />
      </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class BarVerticalStackedComponent extends BaseChartComponent {
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
  @Input() yScaleMax: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;
  @Input() noBarWhenZero: boolean = true;
  @Input() wrapTicks = false;
  @Input() timeline: boolean;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: string[];
  innerDomain: string[];
  valueDomain: [number, number];
  originalGroupDomain: any;
  xScale: any;
  yScale: any;
  transform: string;
  tickFormatting: (label: string) => string;
  colors: ColorHelper;
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;
  dataLabelMaxHeight: any = { negative: 0, positive: 0 };
  isSSR = false;
  timelineWidth: any;
  timelineHeight: number = 50;
  timelineXScale: any;
  timelineYScale: any;
  timelineXDomain: any;
  timelineTransform: any;
  timelinePadding: number = 10;
  filteredDomain: any;
  filteredResults: any = this.results;

  barChartType = BarChartType;

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.isSSR = true;
    }
  }

  update(): void {
    super.update();

    if (!this.showDataLabel) {
      this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];

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

    if (this.timeline) {
      this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
    }

    if (this.showDataLabel) {
      this.dims.height -= this.dataLabelMaxHeight.negative;
    }

    this.formatDates();

    this.innerDomain = this.getInnerDomain();
    this.valueDomain = this.getValueDomain();
    
    this.originalGroupDomain = this.getGroupDomain();
    this.groupDomain = this.originalGroupDomain;
    if (this.filteredDomain) {
      this.groupDomain = this.filteredDomain;
    }

    this.xScale = this.getXScale(this.groupDomain, this.dims.width);
    this.yScale = this.getYScale(this.valueDomain, this.dims.height);

    this.updateTimeline();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0] + this.dataLabelMaxHeight.negative})`;

    this.updateResult();
  }

  updateTimeline(): void {
    if (this.timeline) {
      this.timelineWidth = this.dims.width;
      this.timelineXDomain = this.originalGroupDomain;
      this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
      this.timelineYScale = this.getYScale(this.valueDomain, this.timelineHeight);
      this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
    }
  }

  updateResult(): void {
    if (this.timeline) {
      this.filteredResults = this.groupDomain.map(a => {
        for (const d of this.results) {
          if (d.name == a) {
            return d;
          }
        }
      });
    }
    else {
      this.filteredResults = this.results;
    }
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
    const max = this.yScaleMax ? Math.max(this.yScaleMax, ...domain) : Math.max(...domain);
    return [min, max];
  }

  getXScale(domain, width): any {
    const spacing = domain.length / (width / this.barPadding + 1);
    return scaleBand().rangeRound([0, width]).paddingInner(spacing).domain(domain);
  }

  getYScale(domain, height): any {
    const scale = scaleLinear().range([height, 0]).domain(domain);
    return this.roundDomains ? scale.nice() : scale;
  }

  updateDomain(domain): void {
    this.filteredDomain = domain;
    this.groupDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.groupDomain, this.dims.width);
    this.update();
  }

  onDataLabelMaxHeightChanged(event, groupIndex: number) {
    if (event.size.negative) {
      this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
    } else {
      this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
    }
    if (groupIndex === this.filteredResults.length - 1) {
      setTimeout(() => this.update());
    }
  }

  groupTransform(group: Series): string {
    return `translate(${this.xScale(group.name) || 0}, 0)`;
  }

  timelineGroupTransform(group: Series): string {
    return `translate(${this.timelineXScale(group.name) || 0}, 0)`;
  }

  onClick(data, group?: Series) {
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

  updateYAxisWidth({ width }: { width: number }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event, group, fromLegend: boolean = false): void {
    const item = Object.assign({}, event);
    if (group) {
      item.series = group.name;
    }

    const items = this.filteredResults
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
