import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { curveLinear } from 'd3-shape';

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { id } from '../utils/id';
import { SeriesType } from '../common/circle-series.helper';
import { LegendOptions } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';
import { AreaChartStackedConfig } from './area-chart-stacked.config';
import { getXDomainAdvanced, getXScale, getYScale, getYStackedDomain, updateStackedSeries } from './area-chart.helper';
import { Series } from '../models/chart-data.model';
import { areActiveEntriesEqual } from '../common/legend/legend.helper';

@Component({
  selector: 'ngx-charts-area-chart-stacked',
  templateUrl: './area-chart-stacked.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class AreaChartStackedComponent extends BaseChartComponent {
  @Input() config: Partial<AreaChartStackedConfig>;
  @Input() activeEntries: any[] = [];

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  scaleType: ScaleType;
  xDomain: any[];
  xSet: any[];
  yDomain: [number, number];
  seriesDomain: any;
  xScale: any;
  yScale: any;
  transform: string;
  clipPathId: string;
  clipPath: string;
  colors: ColorHelper;
  margin: number[] = [10, 20, 10, 20];
  hoveredVertical: any;
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  filteredDomain: any;
  legendOptions: any;

  timelineWidth: number;
  timelineHeight: number = 50;
  timelineXScale: any;
  timelineYScale: any;
  timelineXDomain: any;
  timelineTransform: any;
  timelinePadding: number = 10;

  seriesType = SeriesType;

  get configValues(): AreaChartStackedConfig {
    const defaultConfig: AreaChartStackedConfig = {
      legend: false,
      legendTitle: 'Legend',
      legendPosition: null,
      xAxis: false,
      yAxis: false,
      showXAxisLabel: false,
      showYAxisLabel: false,
      xAxisLabel: '',
      yAxisLabel: '',
      timeline: false,
      gradient: false,
      showGridLines: true,
      curve: curveLinear,
      activeEntries: [],
      schemeType: ScaleType.Ordinal,
      trimXAxisTicks: true,
      trimYAxisTicks: true,
      rotateXAxisTicks: true,
      maxXAxisTickLength: 16,
      maxYAxisTickLength: 16,
      xAxisTickFormatting: null,
      yAxisTickFormatting: null,
      xAxisTicks: [],
      yAxisTicks: [],
      roundDomains: false,
      tooltipDisabled: false,
      xScaleMin: null,
      xScaleMax: null,
      yScaleMin: null,
      yScaleMax: null,
      wrapTicks: false
    };
    return { ...defaultConfig, ...this.config };
  }

  update(): void {
    super.update();

    const config = this.configValues;

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: config.xAxis,
      showYAxis: config.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: config.showXAxisLabel,
      showYLabel: config.showYAxisLabel,
      showLegend: config.legend,
      legendType: config.schemeType,
      legendPosition: config.legendPosition
    });

    if (config.timeline) {
      this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
    }

    const xDomainObj = getXDomainAdvanced(this.results, config.xScaleMin, config.xScaleMax);
    this.xDomain = this.filteredDomain || xDomainObj.domain;
    this.xSet = xDomainObj.xSet;
    this.scaleType = xDomainObj.scaleType;

    this.yDomain = getYStackedDomain(this.results, this.xSet, this.scaleType, config.yScaleMin, config.yScaleMax);
    this.seriesDomain = this.results.map(d => d.name);

    this.xScale = getXScale(this.xDomain, this.dims.width, this.scaleType, config.roundDomains);
    this.yScale = getYScale(this.yDomain, this.dims.height, config.roundDomains);

    updateStackedSeries(this.results, this.xSet, this.scaleType);

    this.updateTimeline();
    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  updateTimeline(): void {
    const config = this.configValues;
    if (config.timeline) {
      this.timelineWidth = this.dims.width;
      this.timelineXDomain = getXDomainAdvanced(this.results, config.xScaleMin, config.xScaleMax).domain;
      this.timelineXScale = getXScale(this.timelineXDomain, this.timelineWidth, this.scaleType, config.roundDomains);
      this.timelineYScale = getYScale(this.yDomain, this.timelineHeight, config.roundDomains);
      this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
    }
  }

  updateDomain(domain): void {
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = getXScale(this.xDomain, this.dims.width, this.scaleType, this.configValues.roundDomains);
  }

  updateHoveredVertical(item) {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  onClick(data, series?): void {
    if (series) {
      data.series = series.name;
    }
    this.select.emit(data);
  }

  trackBy: TrackByFunction<Series> = (index: number, item: Series) => item.name;

  setColors(): void {
    const domain = this.configValues.schemeType === ScaleType.Ordinal ? this.seriesDomain : this.yDomain;
    this.colors = new ColorHelper(this.scheme, this.configValues.schemeType, domain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    const config = this.configValues;
    const opts = {
      scaleType: config.schemeType as any,
      colors: undefined,
      domain: [],
      title: undefined,
      position: config.legendPosition
    };
    if (opts.scaleType === ScaleType.Ordinal) {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors;
      opts.title = config.legendTitle;
    } else {
      opts.domain = this.yDomain;
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

  onActivate(item): void {
    const idx = this.activeEntries.findIndex(d => d.name === item.name && d.value === item.value);
    if (idx > -1) return;
    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item): void {
    const idx = this.activeEntries.findIndex(d => d.name === item.name && d.value === item.value);
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
