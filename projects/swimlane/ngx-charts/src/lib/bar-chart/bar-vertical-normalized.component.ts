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

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { Series } from '../models/chart-data.model';
import { BaseChartComponent } from '../common/base-chart.component';
import { BarChartType } from './types/bar-chart-type.enum';
import { LegendOptions } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarVerticalNormalizedConfig } from './bar-vertical-normalized.config';
import { getGroupScale, getValueScale, getGroupDomain, getInnerDomain, updateVerticalNormalizedSeries } from './bar-vertical.helper';

@Component({
  selector: 'ngx-charts-bar-vertical-normalized',
  templateUrl: './bar-vertical-normalized.component.html',
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
export class BarVerticalNormalizedComponent extends BaseChartComponent {
  @Input() config: Partial<BarVerticalNormalizedConfig>;
  @Input() activeEntries: any[] = [];

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: string[];
  innerDomain: string[];
  valueDomain: [number, number] = [0, 100];
  xScale: any;
  yScale: any;
  transform: string;
  colors: ColorHelper;
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;
  isSSR = false;

  barChartType = BarChartType;

  get configValues(): BarVerticalNormalizedConfig {
    const defaultConfig: BarVerticalNormalizedConfig = {
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
      barPadding: 8,
      roundDomains: false,
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

    this.formatDates();

    this.groupDomain = getGroupDomain(this.results);
    this.innerDomain = getInnerDomain(this.results);

    this.xScale = getGroupScale(this.groupDomain, this.dims.width, config.barPadding);
    this.yScale = getValueScale(this.valueDomain, this.dims.height, config.roundDomains);

    updateVerticalNormalizedSeries(this.results, this.innerDomain);

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  groupTransform(group: Series): string {
    return `translate(${this.xScale(group.name)}, 0)`;
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
    const domain = this.configValues.schemeType === ScaleType.Ordinal ? this.innerDomain : this.valueDomain;
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
      opts.domain = this.innerDomain;
      opts.colors = this.colors;
      opts.title = config.legendTitle;
    } else {
      opts.domain = this.valueDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }

  updateYAxisWidth({ width }: { width: number }) {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }) {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event, group: Series, fromLegend: boolean = false) {
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

  onDeactivate(event, group: Series, fromLegend: boolean = false) {
    const item = Object.assign({}, event);
    if (group) item.series = group.name;

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) return i.label !== item.name;
      return !(i.name === item.name && i.series === item.series);
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}