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
      [stroke]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
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
  @Input() strokeColor: string;
  @Input() strokeWidth: number;

  @Output() select: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() activate: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() deactivate: EventEmitter<IBoxModel> = new EventEmitter();

  box: IBoxModel;
  counts: BoxChartDataItem[];
  quartiles: [number, number, number];
  whiskers: number[];
  lineCoordinates: [number, number, number, number];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  onClick(data: IBoxModel): void {
    this.select.emit(data);
  }

  update(): void {
    const width = this.dataSerie && this.dataSerie.series.length ? Math.round(this.xScale.bandwidth()) : null;
    const seriesName = this.dataSerie.name;

    // Calculate Quantile and Whiskers for each box serie.
    this.counts = this.dataSerie.series;

    const mappedCounts = this.counts.map(serie => Number(serie.value));
    this.whiskers = [min(mappedCounts), max(mappedCounts)];

    // We get the group count and must sort it in order to retrieve quantiles.
    const groupCounts = this.counts.map(item => item.value).sort((a, b) => Number(a) - Number(b));
    // console.log('Sorted Group Counts: ', groupCounts);
    this.quartiles = this.getBoxQuantiles(groupCounts);
    this.lineCoordinates = this.getLineCoordinates(seriesName.toString(), this.whiskers, width);

    const value = this.quartiles[1];
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
      quartiles: this.quartiles,
      lineCoordinates: this.lineCoordinates
    };

    box.height = Math.abs(this.yScale(this.quartiles[0]) - this.yScale(this.quartiles[2]));
    box.x = this.xScale(seriesName.toString());
    box.y = this.yScale(this.quartiles[2]);
    box.ariaLabel = formattedLabel + ' - Quantile 50%: ' + value.toLocaleString();

    console.log(
      `Serie Name: ${seriesName}\n` +
        `- X value: ${box.x}\n- Y value: ${box.y}\n` +
        `- Quantile 25%: ${this.quartiles[0]}\n` +
        `- Quantile 50%: ${this.quartiles[1]}\n` +
        `- Quantile 75%: ${this.quartiles[2]}`
    );
    box.color = this.colors.getColor(seriesName);

    this.box = box;
  }

  getLineCoordinates(seriesName: string, whiskers: number[], width: number): [number, number, number, number] {
    const x1 = this.xScale(seriesName);
    const x2 = this.xScale(seriesName);
    const y1 = this.yScale(whiskers[0]);
    const y2 = this.yScale(whiskers[1]);
    return [x1 + width / 2, y1, x2 + width / 2, y2];
  }

  getBoxQuantiles(inputData: Array<number | Date>): [number, number, number] {
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
