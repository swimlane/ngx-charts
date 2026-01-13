import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
import { isPlatformBrowser } from '@angular/common';
import { ColorHelper } from '../common/color.helper';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { ViewDimensions } from './types/view-dimension.interface';
import {
  getTooltipValues,
  findClosestPointIndex,
  getTooltipAreaText,
  tooltipAreaMove,
  Tooltip
} from './tooltip.helper';

@Component({
  selector: 'g[ngx-charts-tooltip-area]',
  template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0
        }),
        animate(250, style({ opacity: 0.7 }))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7
        }),
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ],
  standalone: false
})
export class TooltipArea {
  anchorOpacity: number = 0;
  anchorPos: number = -1;
  anchorValues: Tooltip[] = [];
  lastAnchorPos: number;

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  @Input() dims: ViewDimensions;
  @Input() xSet: any[];
  @Input() xScale;
  @Input() yScale;
  @Input() declare results: any[];
  @Input() colors: ColorHelper;
  @Input() showPercentage: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() hover: EventEmitter<{ value: any }> = new EventEmitter();

  @ViewChild('tooltipAnchor', { static: false }) tooltipAnchor;

  getToolTipText = getTooltipAreaText;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  mouseMove(event) {
    if (!isPlatformBrowser(this.platformId)) return;
    const { anchorPos, anchorValues, closestPoint } = tooltipAreaMove(
      event,
      this.xSet,
      this.xScale,
      this.dims,
      this.results,
      this.colors,
      this.showPercentage
    );
    this.anchorPos = anchorPos;
    this.anchorValues = anchorValues;

    if (this.anchorPos !== this.lastAnchorPos) {
      this.tooltipAnchor.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      this.anchorOpacity = 0.7;
      this.hover.emit({ value: closestPoint });
      this.showTooltip();
      this.lastAnchorPos = this.anchorPos;
    }
  }

  showTooltip(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tooltipAnchor.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
    }
  }

  hideTooltip(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tooltipAnchor.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
    }
    this.anchorOpacity = 0;
    this.lastAnchorPos = -1;
  }
}
