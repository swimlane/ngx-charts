import {
  Component, Input, Output, SimpleChanges, EventEmitter,
  OnChanges, ChangeDetectionStrategy
} from '@angular/core';
import * as moment from 'moment';
import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[circleSeries]',
  template: `
    <svg:g *ngFor="let circle of circles">
      <svg:rect
        *ngIf="barVisible"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="color"
        class="tooltip-bar"
      />
      <svg:g circle
        *ngIf="isVisible(circle)"
        [attr.class]="className"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="color"
        [class.active]="isActive(circle.label)"
        [stroke]="strokeColor"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick($event, circle.label)"
        [style.cursor]="'pointer'"
        swui-tooltip
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="getTooltipText(circle)"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleSeriesComponent implements OnChanges {

  @Input() data;
  @Input() type = 'standard';
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() strokeColor;
  @Input() scaleType;
  @Input() visibleValue;
  @Input() activeEntries: any[];

  @Output() select = new EventEmitter();

  areaPath: any;
  circles: any[];
  barVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.circles = this.getCircles();
  }

  getCircles(): any[] {
    const seriesName = this.data.name;

    return this.data.series.map((d, i) => {
      const value = d.value;
      const label = d.name;
      const tooltipLabel = formatLabel(label);

      if (value) {
        let cx;
        if (this.scaleType === 'time') {
          cx = this.xScale(moment(label).toDate());
        } else if (this.scaleType === 'linear') {
          cx = this.xScale(Number(label));
        } else {
          cx = this.xScale(label);
        }

        const cy = this.yScale(this.type === 'standard' ? value : d.d1);
        const radius = 5;
        const height = this.yScale.range()[0] - cy;

        let opacity = 0;
        if (label && this.visibleValue && label.toString() === this.visibleValue.toString()) {
          opacity = 1;
        }

        return {
          classNames: [`circle-data-${i}`],
          value,
          label,
          cx,
          cy,
          radius,
          height,
          tooltipLabel,
          opacity,
          seriesName
        };
      }
    }).filter((circle) => circle !== undefined);
  }

  getTooltipText({ tooltipLabel, value, seriesName }): string {
    return `
      <span class="tooltip-label">${seriesName} • ${tooltipLabel}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
  }

  onClick(value, label): void {
    this.select.emit({
      name: label,
      value: value
    });
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    return this.activeEntries.indexOf(entry) > -1;
  }

  isVisible(circle): boolean {
    return circle.opacity || this.isActive(circle.seriesName);
  }

}
