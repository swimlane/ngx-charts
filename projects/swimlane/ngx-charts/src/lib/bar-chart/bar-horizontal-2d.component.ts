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

import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';

import { BaseChartComponent } from '../common/base-chart.component';
import { ScaleType } from '../common/types/scale-type.enum';
import { LegendOptions } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { BarHorizontal2DConfig } from './bar-horizontal-2d.config';
import { getGroupScale, getInnerScale, getValueScale, getGroupDomain, getInnerDomain, getValueDomain } from './bar-chart.helper';

@Component({
  selector: 'ngx-charts-bar-horizontal-2d',
  templateUrl: './bar-horizontal-2d.component.html',
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
  @Input() config: Partial<BarHorizontal2DConfig>;
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
  dataLabelMaxWidth: any = { negative: 0, positive: 0 };
  isSSR = false;

  barOrientation = BarOrientation;

  get configValues(): BarHorizontal2DConfig {
    const defaultConfig: BarHorizontal2DConfig = {
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
      groupPadding: 16,
      barPadding: 8,
      roundDomains: false,
      roundEdges: true,
      xScaleMax: null,
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

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    super.update();

    const config = this.configValues;

    if (!config.showDataLabel) {
      this.dataLabelMaxWidth = { negative: 0, positive: 0 };
    }

    this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];

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
    this.valueDomain = getValueDomain(this.results, config.xScaleMax);

    this.groupScale = getGroupScale(this.groupDomain, this.dims.height, config.groupPadding);
    this.innerScale = getInnerScale(this.innerDomain, this.groupScale.bandwidth(), config.barPadding);
    this.valueScale = getValueScale(this.valueDomain, this.dims.width, config.roundDomains);

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset}, ${this.margin[0]})`;
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