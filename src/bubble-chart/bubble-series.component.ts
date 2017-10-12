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
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[ngx-charts-bubble-series]',
  template: `
    <svg:g *ngFor="let circle of circles; trackBy: trackBy">
      <svg:g [attr.transform]="circle.transform">
        <svg:g ngx-charts-circle
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
          (select)="onClick($event, circle.label)"
          (activate)="activateCircle(circle)"
          (deactivate)="deactivateCircle(circle)"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipPlacement]="'top'"
          [tooltipType]="'tooltip'"
          [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(circle)"
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
        animate(250, style({opacity: 1, transform: 'scale(1)'}))
      ])
    ])
  ]
})
export class BubbleSeriesComponent implements OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() rScale;
  @Input() xScaleType;
  @Input() yScaleType;
  @Input() colors;
  @Input() visibleValue;
  @Input() activeEntries: any[];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

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

    return this.data.series.map((d, i) => {
      if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
        const y = d.y;
        const x = d.x;
        const r = d.r;

        const radius = this.rScale(r || 1);
        const tooltipLabel = formatLabel(d.name);

        const cx = (this.xScaleType === 'linear') ? this.xScale(Number(x)) : this.xScale(x);
        const cy = (this.yScaleType === 'linear') ? this.yScale(Number(y)) : this.yScale(y);

        const color = (this.colors.scaleType === 'linear') ?
          this.colors.getColor(r) :
          this.colors.getColor(seriesName);

        const isActive = !this.activeEntries.length ? true : this.isActive({name: seriesName});
        const opacity = isActive ? 1 : 0.3;

        const data = {
          series: seriesName,
          name: d.name,
          value: d.y,
          x: d.x,
          radius: d.r
        };

        return {
          data,
          x,
          y,
          r,
          classNames: [`circle-data-${i}`],
          value: y,
          label: x,
          cx,
          cy,
          radius,
          tooltipLabel,
          color,
          opacity,
          seriesName,
          isActive,
          transform: `translate(${cx},${cy})`
        };
      }
    }).filter((circle) => circle !== undefined);
  }

  getTooltipText(circle): string {
    const hasRadius = typeof circle.r !== 'undefined';
    const hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
    const hasSeriesName = circle.seriesName && circle.seriesName.length;

    const radiusValue = hasRadius ? formatLabel(circle.r) : '';
    const xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? `${this.xAxisLabel}:` : '';
    const yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? `${this.yAxisLabel}:` : '';
    const x = formatLabel(circle.x);
    const y = formatLabel(circle.y);
    const name = (hasSeriesName && hasTooltipLabel) ?
      `${circle.seriesName} • ${circle.tooltipLabel}` :
      circle.seriesName + circle.tooltipLabel;
    const tooltipTitle = (hasSeriesName || hasTooltipLabel) ?
      `<span class="tooltip-label">${name}</span>` :
      '';

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

  trackBy(index, circle): string {
    return `${circle.data.series} ${circle.data.name}`;
  }
}
