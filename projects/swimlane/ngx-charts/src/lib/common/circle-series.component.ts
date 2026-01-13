import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { id } from '../utils/id';
import { ColorHelper } from './color.helper';
import { DataItem, Series, StringOrNumberOrDate } from '../models/chart-data.model';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { BarOrientation } from './types/bar-orientation.enum';
import { ScaleType } from './types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import { getActiveCircle, getCircleTooltipText, Circle, SeriesType } from './circle-series.helper';

@Component({
  selector: 'g[ngx-charts-circle-series]',
  template: `
    <svg:g *ngIf="circle">
      <defs>
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="circle.gradientStops"
        />
      </defs>
      <svg:rect
        *ngIf="barVisible && type === 'standard'"
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="gradientFill"
        class="tooltip-bar"
      />
      <svg:g
        ngx-charts-circle
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="circle.color"
        [class.active]="isActive({ name: circle.seriesName })"
        [pointerEvents]="circle.value === 0 ? 'none' : 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (select)="onClick(circle.data)"
        (activate)="activateCircle()"
        (deactivate)="deactivateCircle()"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [transition(':enter', [style({ opacity: 0 }), animate(250, style({ opacity: 1 }))])])
  ],
  standalone: false
})
export class CircleSeriesComponent implements OnChanges, OnInit {
  @Input() data: Series;
  @Input() type: SeriesType = SeriesType.Standard;
  @Input() xScale;
  @Input() yScale;
  @Input() colors: ColorHelper;
  @Input() scaleType: ScaleType;
  @Input() visibleValue: boolean;
  @Input() activeEntries: any[];
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate = new EventEmitter<{ name: StringOrNumberOrDate }>();
  @Output() deactivate = new EventEmitter<{ name: StringOrNumberOrDate }>();

  circle: Circle;
  barVisible: boolean = false;
  gradientId: string;
  gradientFill: string;
  barOrientation = BarOrientation;
  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;
  isSSR = false;

  tooltipText = getCircleTooltipText;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(#${this.gradientId})`;
    if (isPlatformServer(this.platformId)) this.isSSR = true;
  }

  ngOnChanges(): void {
    this.update();
  }
  update(): void {
    this.circle = getActiveCircle(
      this.data,
      this.visibleValue,
      this.xScale,
      this.yScale,
      this.scaleType,
      this.type,
      this.colors
    );
  }

  onClick(data: DataItem): void {
    this.select.emit(data);
  }
  isActive(entry): boolean {
    return this.activeEntries ? this.activeEntries.some(d => entry.name === d.name) : false;
  }
  activateCircle(): void {
    this.barVisible = true;
    this.activate.emit({ name: this.data.name });
  }
  deactivateCircle(): void {
    this.barVisible = false;
    this.circle.opacity = 0;
    this.deactivate.emit({ name: this.data.name });
  }
}
