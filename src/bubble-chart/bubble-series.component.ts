import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  trigger,
  style,
  transition,
  animate
} from '@angular/core';
import { Location } from '@angular/common';
import { formatLabel } from '../common/label.helper';
import { id } from '../utils/id';

@Component({
  selector: 'g[ngx-charts-bubble-series]',
  template: `
    <svg:g *ngFor="let circle of circles">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(250, style({opacity: 1}))
      ])
    ])
  ]
})
export class BubbleSeriesComponent implements OnChanges {

  @Input() data;
  @Input() type = 'standard';
  @Input() xScale;
  @Input() yScale;
  @Input() rScale;
  @Input() colors;
  @Input() visibleValue;
  @Input() activeEntries: any[];

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  areaPath: any;
  circles: any[];

  constructor(private location: Location) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.circles = this.getCircles();
  }

  getCircles(): any[] {
    const seriesName = this.data.name;
    const pageUrl = this.location.path();

    return this.data.series.map((d, i) => {
      const y = d.y;
      const x = d.x;
      const r = d.r || 1;

      const radius = this.rScale(r);
      const tooltipLabel = formatLabel(d.name);

      if (y) {
        const cx = this.xScale(x);
        const cy = this.yScale(this.type === 'standard' ? y : d.d1);
        const height = this.yScale.range()[0] - cy;

        const gradientId = 'grad' + id().toString();
        const gradientFill = `url(${pageUrl}#${gradientId})`;

        let color;
        if (this.colors.scaleType === 'linear') {
          if (this.type === 'standard') {
            color = this.colors.getColor(r);
          } else {
            color = this.colors.getColor(d.d1);
          }
        } else {
          color = this.colors.getColor(seriesName);
        }

        return {
          x,
          y,
          r,
          classNames: [`circle-data-${i}`],
          value: y,
          label: x,
          cx,
          cy,
          radius,
          height,
          tooltipLabel,
          color,
          opacity: 1,
          seriesName
        };
      }
    }).filter((circle) => circle !== undefined);
  }

  getTooltipText(circle): string {
    return `
      <span class="tooltip-label">
        ${circle.seriesName} • ${circle.tooltipLabel}
      </span>
      <span class="tooltip-label">
        ${circle.x.toLocaleString()} ${circle.y.toLocaleString()}
      </span>
      <span class="tooltip-val">
        ${circle.r.toLocaleString()}
      </span>
    `;
  }

  onClick(value, label): void {
    this.select.emit({
      name: label,
      value
    });
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
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
