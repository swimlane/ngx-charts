import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { isPlatformServer } from '@angular/common';

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';

import { BaseChartComponent } from '../common/base-chart.component';
import { LegendOptions } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { BarVertical2DConfig } from './bar-vertical-2d.config';
import { getGroupScale, getInnerScale, getValueScale, getGroupDomain, getInnerDomain, getValueDomain } from './bar-vertical.helper';

@Component({
  selector: 'ngx-charts-bar-vertical-2d',
  templateUrl: './bar-vertical-2d.component.html',
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
  ],
  standalone: false
})
export class BarVertical2DComponent extends BaseChartComponent {
  @Input() config: Partial<BarVertical2DConfig>;
  @Input() activeEntries: any[] = [];

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
  dataLabelMaxHeight: any = { negative: 0, positive: 0 };
  isSSR = false;

  barOrientation = BarOrientation;

  get configValues(): BarVertical2DConfig {
    const defaultConfig: BarVertical2DConfig = {
      legend: false,
      legendTitle: 'Legend',
      legendPosition: null,
      xAxis: false,
      yAxis: false,
      showXAxisLabel: false,
      showYAxisLabel: false,
      xAxisLabel: '',
      yAxisLabel: '',
      tooltipDisabled: false,
      scaleType: ScaleType.Ordinal,
      gradient: false,
      showGridLines: true,
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
      groupPadding: 16,
      barPadding: 8,
      roundDomains: false,
      roundEdges: true,
      yScaleMax: null,
      showDataLabel: false,
      dataLabelFormatting: null,
      noBarWhenZero: true,
      wrapTicks: false
    };
    return { ...defaultConfig, ...this.config };
  }

  ngOnInit() {
    this.isSSR = isPlatformServer(this.platformId);
  }

  update(): void {
    super.update();

    const config = this.configValues;

    if (!config.showDataLabel) {
      this.dataLabelMaxHeight = { negative: 0, positive: 0 };
    }
    this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];

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

    if (config.showDataLabel) {
      this.dims.height -= this.dataLabelMaxHeight.negative;
    }

    this.formatDates();

    this.groupDomain = getGroupDomain(this.results);
    this.innerDomain = getInnerDomain(this.results);
    this.valueDomain = getValueDomain(this.results, config.yScaleMax);

    this.groupScale = getGroupScale(this.groupDomain, this.dims.width, config.groupPadding);
    this.innerScale = getInnerScale(this.innerDomain, this.groupScale.bandwidth(), config.barPadding);
    this.valueScale = getValueScale(this.valueDomain, this.dims.height, config.roundDomains);

    this.setColors();
    this.legendOptions = this.getLegendOptions();
    this.transform = `translate(${this.dims.xOffset}, ${this.margin[0] + this.dataLabelMaxHeight.negative})`;
  }

  onDataLabelMaxHeightChanged(event, groupIndex: number): void {
    if (event.size.negative) {
      this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
    } else {
      this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
    }
    if (groupIndex === this.results.length - 1) {
      setTimeout(() => this.update());
    }
  }

  groupTransform(group: DataItem): string {
    return `translate(${this.groupScale(group.label)}, 0)`;
  }

  onClick(data, group?: DataItem): void {
    if (group) {
      data.series = group.name;
    }
    this.select.emit(data);
  }

  trackBy: TrackByFunction<DataItem> = (index: number, item: DataItem) => item.name;

  setColors(): void {
    const domain = this.configValues.schemeType === ScaleType.Ordinal ? this.innerDomain : this.valueDomain;
    this.colors = new ColorHelper(this.scheme, this.configValues.schemeType, domain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    const config = this.configValues;
    const opts: LegendOptions = {
      scaleType: config.schemeType as any,
      colors: undefined,
      domain: [],
      title: undefined,
      position: config.legendPosition
    };
    if (opts.scaleType === ScaleType.Ordinal) {
      opts.domain = this.innerDomain;
      opts.colors = this.colors;
      opts.title = config.legendTitle;
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

  onActivate(event, group: DataItem, fromLegend: boolean = false): void {
    const item = Object.assign({}, event);
    if (group) item.series = group.name;

    const items = this.results
      .map(g => g.series)
      .flat()
      .filter(i => {
        if (fromLegend) return i.label === item.name;
        return i.name === item.name && i.series === item.series;
      });

    this.activeEntries = [...items];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(event, group: DataItem, fromLegend: boolean = false): void {
    const item = Object.assign({}, event);
    if (group) item.series = group.name;

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) return i.label !== item.name;
      return !(i.name === item.name && i.series === item.series);
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}