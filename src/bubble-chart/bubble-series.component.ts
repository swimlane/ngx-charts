import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common';
import { ScaleTime, ScaleLinear, ScalePoint } from 'd3-scale';
import { BubbleChartSeries, BubbleChartDataItem } from '../models/chart-data.model';
import { IShapeCircle, IShapeData } from '../models/shape.model';
import { ScaleType } from '../enums/scale.enum';

@Component({
  selector: 'g[ngx-charts-bubble-series]',
  template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g
          ngx-charts-circle
          [@animationState]="'active'"
          class="circle"
          [cx]="0"
          [cy]="0"
          [r]="circle.radius"
          [fill]="circle.color"
          [style.opacity]="circle.opacity"
          [class.active]="circle.isActive"
          [pointerEvents]="'all'"
          [data]="circle.value"
          [classNames]="circle.classNames"
          (select)="onClick(circle.data)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="'top'"
          [tooltipType]="'tooltip'"
          [tooltipTitle]="(tooltipTemplate ? undefined : getTooltipText(circle))"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="circle.data"
        />
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class BubbleSeriesComponent implements OnChanges {
  @Input() data: BubbleChartSeries;
  @Input() xScale: ScaleTime<number, number> | ScaleLinear<number, number> | ScalePoint<string>;
  @Input() yScale: ScaleTime<number, number> | ScaleLinear<number, number> | ScalePoint<string>;
  @Input() rScale: ScaleLinear<number, number>;
  @Input() xScaleType: string;
  @Input() yScaleType: string;
  @Input() colors: ColorHelper;
  @Input() activeEntries: IShapeData[];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() select: EventEmitter<IShapeData> = new EventEmitter();
  @Output() activate: EventEmitter<Partial<IShapeData>> = new EventEmitter();
  @Output() deactivate: EventEmitter<Partial<IShapeData>> = new EventEmitter();

  circles: IShapeCircle[];

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Bubble series:', changes);
    this.update();
  }

  update(): void {
    this.circles = this.getCircles();
  }

  getCircles(): IShapeCircle[] {
    const seriesName = this.data.name;

    return this.data.series
      .map((d, i) => {
        if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
          const x = d.x;
          const y = d.y;
          const r = d.r;

          const radius = this.rScale(r || 1);
          const tooltipLabel = formatLabel(d.name);

          const cx = this.xScale(x as any);
          const cy = this.yScale(y as any);

          const color =
            this.colors.scaleType === ScaleType.linear ? this.colors.getColor(r) : this.colors.getColor(seriesName);

          const isActive = !this.activeEntries.length ? true : this.isActive({ name: seriesName });
          const opacity = isActive ? 1 : 0.3;

          const data: IShapeData = {
            series: seriesName,
            name: d.name,
            value: d.y,
            x: d.x,
            radius: d.r
          };

          const circleData: IShapeCircle = {
            data,
            x,
            y,
            r,
            classNames: [`circle-data-${i}`],
            value: y,
            label: d.name,
            cx,
            cy,
            radius,
            tooltipLabel,
            color,
            opacity,
            seriesName,
            isActive,
            transform: `translate(${cx},${cy})`,
            barVisible: true
          };
          return circleData;
        }
      })
      .filter(circle => circle !== undefined);
  }

  getTooltipText(circle: IShapeCircle): string {
    const hasRadius = typeof circle.r !== 'undefined';
    const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
    const hasSeriesName = circle.seriesName && circle.seriesName.toString().length;

    const radiusValue = hasRadius ? formatLabel(circle.r) : '';
    const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
    const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
    const x = formatLabel(circle.x);
    const y = formatLabel(circle.y);
    const name =
      hasSeriesName && hasTooltipLabel
        ? `${circle.seriesName} • ${circle.tooltipLabel}`
        : circle.seriesName + circle.tooltipLabel;
    const tooltipTitle = hasSeriesName || hasTooltipLabel ? `<span class="tooltip-label">${name}</span>` : '';

    return `
      ${tooltipTitle}
      <span class="tooltip-label">
        <label>${xAxisLabel}</label> ${x}<br />
        <label>${yAxisLabel}</label> ${y}
      </span>
      <span class="tooltip-val">
        ${radiusValue}
      </span>
    `;
  }

  onClick(data: IShapeData): void {
    this.select.emit(data);
  }

  isActive(entry: Partial<BubbleChartDataItem>): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => entry.name === d.series);
    return item !== undefined;
  }

  isVisible(circle: IShapeCircle): boolean {
    if (this.activeEntries.length) {
      return this.isActive({ name: circle.seriesName });
    }

    return circle.opacity !== 0;
  }

  activateCircle(circle: IShapeCircle): void {
    circle.barVisible = true;
    this.activate.emit(circle.data);
  }

  deactivateCircle(circle: IShapeCircle): void {
    circle.barVisible = false;
    this.deactivate.emit(circle.data);
  }

  trackBy(index: number, circle: IShapeCircle): string {
    return `${circle.data.series} ${circle.data.name}`;
  }
}
