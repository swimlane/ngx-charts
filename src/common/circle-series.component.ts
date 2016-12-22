import {
  Component, Input, Output, SimpleChanges, EventEmitter,
  OnChanges, ChangeDetectionStrategy
} from '@angular/core';
import * as moment from 'moment';
import { formatLabel } from '../common/label.helper';
import { id } from "../utils/id";

@Component({
  selector: 'g[ngx-charts-circle-ceries]',
  template: `
    <svg:g *ngFor="let circle of circles">
      <defs>
        <svg:g ngx-charts-svg-linear-gradient
          [color]="color"
          orientation="vertical"
          [name]="circle.gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="circle.barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="circle.gradientFill"
        class="tooltip-bar"
      />
      <svg:g ngx-charts-circle
        *ngIf="isVisible(circle)"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({name: circle.seriesName})"
        [pointerEvents]="circle.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick($event, circle.label)"
        (activate)="activateCircle(circle)"
        (deactivate)="deactivateCircle(circle)"
        ngx-tooltip
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
  @Input() colors;
  @Input() scaleType;
  @Input() visibleValue;
  @Input() activeEntries: any[];

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  areaPath: any;
  circles: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.circles = this.getCircles();
  }

  getCircles(): any[] {
    const seriesName = this.data.name;
    const pageUrl = window.location.href;

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

        const gradientId = 'grad' + id().toString();
        const gradientFill = `url(${pageUrl}#${gradientId})`;
        
        
        let color;
        if (this.colors.scaleType === 'linear') {
          if (this.type === 'standard') {
            color = this.colors.getColor(value);
          } else {
            color = this.colors.getColor(d.d1);
          }
        } else {
          color = this.colors.getColor(seriesName);
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
          color,
          opacity,
          seriesName,
          barVisible: false,          
          gradientId,
          gradientFill,          
          gradientStops: this.getGradientStops(color)
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

  getGradientStops(color) {
    return [
      {
        offset: 0,
        color: color,
        opacity: 0.2
      },
      {
        offset: 100,
        color: color,
        opacity: 1
    }];
  }

  onClick(value, label): void {
    this.select.emit({
      name: label,
      value
    });
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    let item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }
  
  isVisible(circle): boolean {
    if (this.activeEntries.length > 0) {
      return this.isActive({name: circle.seriesName});
    }

    return circle.opacity !== 0;
  }

  activateCircle(circle): void {
    circle.barVisible = true;
    this.activate.emit({name: this.data.name});
  }

  deactivateCircle(circle): void {
    circle.barVisible = false;
    this.deactivate.emit({name: this.data.name});
  }

}
