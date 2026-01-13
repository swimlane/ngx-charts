import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { ScaleType } from '../common/types/scale-type.enum';
import { LegendOptions } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarHorizontalNormalizedConfig } from './bar-horizontal-normalized.config';
import { getGroupScale, getGroupDomain, getInnerDomain, updateBarNormalizedSeries, getValueScale } from './bar-chart.helper';

@Component({
  selector: 'ngx-charts-bar-horizontal-normalized',
  templateUrl: './bar-horizontal-normalized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class BarHorizontalNormalizedComponent extends BaseChartComponent {
  @Input() config: Partial<BarHorizontalNormalizedConfig>;
  @Input() activeEntries: any[] = [];

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  groupDomain: any[];
  innerDomain: any[];
  valueDomain: [number, number] = [0, 100];
  groupScale: any;
  valueScale: any;
  transform: string;
  colors: ColorHelper;
  margin: number[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: LegendOptions;

  get configValues(): BarHorizontalNormalizedConfig {
    const defaultConfig: BarHorizontalNormalizedConfig = {
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

    this.groupScale = getGroupScale(this.groupDomain, this.dims.height, config.barPadding);
    this.valueScale = getValueScale(this.valueDomain, this.dims.width, config.roundDomains);

    updateBarNormalizedSeries(this.results, this.innerDomain);

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
  }

  onClick(data, group?): void {
    if (group) {
      data.series = group.name;
    }
    this.select.emit(data);
  }

  trackBy(index: number, item: any): string {
    return item.name;
  }

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

  updateYAxisWidth({ width }: { width: number }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }: { height: number }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event, group?, fromLegend: boolean = false): void {
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

  onDeactivate(event, group?, fromLegend: boolean = false): void {
    const item = Object.assign({}, event);
    if (group) item.series = group.name;

    this.activeEntries = this.activeEntries.filter(i => {
      if (fromLegend) return i.label !== item.name;
      return !(i.name === item.name && i.series === item.series);
    });

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }
}
