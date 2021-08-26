import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { min, max, quantile } from 'd3-array';
import { ScaleLinear, ScaleBand } from 'd3-scale';
import { IBoxModel, BoxChartSeries, DataItem } from '../models/chart-data.model';
import { IVector2D } from '../models/coordinates.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { ColorHelper } from '../common/color.helper';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { StyleTypes } from '../common/tooltip/style.type';
import { PlacementTypes } from '../common/tooltip/position';
import { ScaleType } from '../common/types/scale-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';

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
      [roundEdges]="box.roundEdges"
      [fill]="box.color"
      [gradientStops]="box.gradientStops"
      [strokeColor]="strokeColor"
      [strokeWidth]="strokeWidth"
      [data]="box.data"
      [lineCoordinates]="box.lineCoordinates"
      [gradient]="gradient"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipType]="tooltipType"
      [tooltipTitle]="tooltipTitle"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="box.data"
      [animations]="animations"
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
  @Input() series: BoxChartSeries;
  @Input() xScale: ScaleBand<string>;
  @Input() yScale: ScaleLinear<number, number>;
  @Input() colors: ColorHelper;
  @Input() animations: boolean = true;
  @Input() strokeColor: string;
  @Input() strokeWidth: number;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() tooltipPlacement: PlacementTypes;
  @Input() tooltipType: StyleTypes;
  @Input() roundEdges: boolean;
  @Input() gradient: boolean = false;

  @Output() select: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() activate: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() deactivate: EventEmitter<IBoxModel> = new EventEmitter();

  box: IBoxModel;
  counts: DataItem[];
  quartiles: [number, number, number];
  whiskers: [number, number];
  lineCoordinates: [IVector2D, IVector2D, IVector2D, IVector2D];
  tooltipTitle: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  onClick(data: IBoxModel): void {
    this.select.emit(data);
  }

  update(): void {
    this.updateTooltipSettings();
    const width = this.series && this.series.series.length ? Math.round(this.xScale.bandwidth()) : null;
    const seriesName = this.series.name;

    // Calculate Quantile and Whiskers for each box serie.
    this.counts = this.series.series;

    const mappedCounts = this.counts.map(serie => Number(serie.value));
    this.whiskers = [min(mappedCounts), max(mappedCounts)];

    // We get the group count and must sort it in order to retrieve quantiles.
    const groupCounts = this.counts.map(item => item.value).sort((a, b) => Number(a) - Number(b));
    this.quartiles = this.getBoxQuantiles(groupCounts);
    this.lineCoordinates = this.getLinesCoordinates(seriesName.toString(), this.whiskers, this.quartiles, width);

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
      roundEdges: this.roundEdges,
      quartiles: this.quartiles,
      lineCoordinates: this.lineCoordinates
    };

    box.height = Math.abs(this.yScale(this.quartiles[0]) - this.yScale(this.quartiles[2]));
    box.x = this.xScale(seriesName.toString());
    box.y = this.yScale(this.quartiles[2]);
    box.ariaLabel = formattedLabel + ' - Median: ' + value.toLocaleString();

    if (this.colors.scaleType === ScaleType.Ordinal) {
      box.color = this.colors.getColor(seriesName);
    } else {
      box.color = this.colors.getColor(this.quartiles[1]);
      box.gradientStops = this.colors.getLinearGradientStops(this.quartiles[0], this.quartiles[2]);
    }

    const tooltipLabel = formattedLabel;
    const formattedTooltipLabel = `
    <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
    <span class="tooltip-val">
      • Q1: ${this.quartiles[0]} • Q2: ${this.quartiles[1]} • Q3: ${this.quartiles[2]}<br>
      • Min: ${this.whiskers[0]} • Max: ${this.whiskers[1]}
    </span>`;

    box.tooltipText = this.tooltipDisabled ? undefined : formattedTooltipLabel;
    this.tooltipTitle = this.tooltipDisabled ? undefined : box.tooltipText;

    this.box = box;
  }

  getBoxQuantiles(inputData: Array<number | Date>): [number, number, number] {
    return [quantile(inputData, 0.25), quantile(inputData, 0.5), quantile(inputData, 0.75)];
  }

  getLinesCoordinates(
    seriesName: string,
    whiskers: [number, number],
    quartiles: [number, number, number],
    barWidth: number
  ): [IVector2D, IVector2D, IVector2D, IVector2D] {
    // The X value is not being centered, so had to sum half the width to align it.
    const commonX = this.xScale(seriesName);
    const offsetX = commonX + barWidth / 2;

    const medianLineWidth = Math.max(barWidth + 4 * this.strokeWidth, 1);
    const whiskerLineWidth = Math.max(barWidth / 3, 1);

    const whiskerZero = this.yScale(whiskers[0]);
    const whiskerOne = this.yScale(whiskers[1]);
    const median = this.yScale(quartiles[1]);

    const topLine: IVector2D = {
      v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerZero },
      v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerZero }
    };
    const medianLine: IVector2D = {
      v1: { x: offsetX + medianLineWidth / 2, y: median },
      v2: { x: offsetX - medianLineWidth / 2, y: median }
    };
    const bottomLine: IVector2D = {
      v1: { x: offsetX + whiskerLineWidth / 2, y: whiskerOne },
      v2: { x: offsetX - whiskerLineWidth / 2, y: whiskerOne }
    };
    const verticalLine: IVector2D = {
      v1: { x: offsetX, y: whiskerZero },
      v2: { x: offsetX, y: whiskerOne }
    };
    return [verticalLine, topLine, medianLine, bottomLine];
  }

  updateTooltipSettings() {
    if (this.tooltipDisabled) {
      this.tooltipPlacement = undefined;
      this.tooltipType = undefined;
    } else {
      if (!this.tooltipPlacement) {
        this.tooltipPlacement = PlacementTypes.Top;
      }
      if (!this.tooltipType) {
        this.tooltipType = StyleTypes.tooltip;
      }
    }
  }
}
