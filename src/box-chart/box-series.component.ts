import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  EventEmitter
} from '@angular/core';
import { ColorHelper, ViewDimensions, formatLabel } from '../common';
import { min, max, quantile } from 'd3-array';
import { ScaleLinear, ScaleBand } from 'd3-scale';
import { IBoxModel, BoxChartSeries, BoxChartDataItem } from '../models/chart-data.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'g[ngx-charts-box-series]',
  template: `
    <svg:g
      ngx-charts-box
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [fill]="box.color"
      [data]="box.data"
      [orientation]="'vertical'"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BoxSeriesComponent implements OnChanges {
  @Input() dims: ViewDimensions;
  @Input() dataSerie: BoxChartSeries;
  @Input() xScale: ScaleBand<string>;
  @Input() yScale: ScaleLinear<number, number>;
  @Input() colors: ColorHelper;
  @Input() animations: boolean = true;

  @Output() select: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() activate: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() deactivate: EventEmitter<IBoxModel> = new EventEmitter();

  box: IBoxModel;
  counts: BoxChartDataItem[];
  quantile: number[];
  whiskers: number[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  onClick(data: IBoxModel): void {
    this.select.emit(data);
  }

  update(): void {
    const width = this.dataSerie && this.dataSerie.series.length ? Math.round(this.xScale.bandwidth()) : null;
    const yScaleMin = Math.max(this.yScale.domain()[0], 0);

    const seriesName = this.dataSerie.name;

    // Calculate Quantile and Whiskers for each box serie.
    this.counts = this.dataSerie.series;

    const mappedCounts = this.counts.map(serie => Number(serie.value));
    this.whiskers = [min(mappedCounts), max(mappedCounts)];

    // We get the group count and must sort it in order to retrieve quantiles.
    const groupCounts = this.counts.map(item => item.value).sort((a, b) => Number(a) - Number(b));
    // console.log('Sorted Group Counts: ', groupCounts);
    this.quantile = this.getBoxQuantiles(groupCounts);

    const value = this.quantile[1];
    const formattedLabel = formatLabel(seriesName);
    const box: IBoxModel = {
      value,
      data: this.counts,
      label: seriesName,
      formattedLabel,
      width,
      height: 0,
      x: 0,
      y: 0,
      quantile: this.quantile
    };

    box.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
    box.x = this.xScale(seriesName.toString());
    box.ariaLabel = formattedLabel + ' - Quantile 50%: ' + value.toLocaleString();

    if (value < 0) {
      box.y = this.yScale(0);
    } else {
      box.y = this.yScale(value);
    }
    console.log(`- X value: ${box.x} \n- Y value: ${box.y} \n- Quantile 50%: ${value}`);
    box.color = this.colors.getColor(seriesName);

    this.box = box;
    // this.boxes = this.dataSerie.series.map((serie, idx) => {
    //   const value = serie.value;
    //   const label = serie.label ? serie.label : serie.name;
    //   const formattedLabel = formatLabel(label);

    //   const box: IBoxModel = {
    //     value,
    //     label,
    //     data: serie,
    //     formattedLabel,
    //     width,
    //     height: 0,
    //     x: 0,
    //     y: 0
    //   };

    //   box.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
    //   box.x = this.xScale(label.toString());
    //   box.ariaLabel = formattedLabel + ' ' + value.toLocaleString();

    //   if (value < 0) {
    //     box.y = this.yScale(0);
    //   } else {
    //     box.y = this.yScale(value);
    //   }
    //   box.color = this.colors.getColor(label);

    //   return box;
    // });
  }

  getBoxQuantiles(inputData: Array<number | Date>): number[] {
    return [quantile(inputData, 0.25), quantile(inputData, 0.5), quantile(inputData, 0.75)];
  }

  getWhiskers(barWidth: number) {
    return [
      // Top whisker
      {
        x1: datum => this.xScale(datum.key) - barWidth / 2,
        y1: datum => this.yScale(datum.whiskers[0]),
        x2: datum => this.xScale(datum.key) + barWidth / 2,
        y2: datum => this.yScale(datum.whiskers[0])
      },
      // Median line
      {
        x1: datum => this.xScale(datum.key) - barWidth / 2,
        y1: datum => this.yScale(datum.quartile[1]),
        x2: datum => this.xScale(datum.key) + barWidth / 2,
        y2: datum => this.yScale(datum.quartile[1])
      },
      // Bottom whisker
      {
        x1: datum => this.xScale(datum.key) - barWidth / 2,
        y1: datum => this.yScale(datum.whiskers[1]),
        x2: datum => this.xScale(datum.key) + barWidth / 2,
        y2: datum => this.yScale(datum.whiskers[1])
      }
    ];
  }
}
