import {
  Component, Inject, ElementRef, AfterViewInit,
  HostListener, ViewChild, HostBinding, Renderer,
  trigger, state, transition, style, animate
} from '@angular/core';

import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position.helper';
import { TooltipOptions } from './tooltip-options';

import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';

@Component({
  selector: 'swui-tooltip-content',
  template: `
    <div>
      <span
        #caretElm
        [hidden]="!showCaret"
        class="tooltip-caret position-{{this.placement}}">
      </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <template
            [ngTemplateOutlet]="template"
            [ngOutletContext]="{ model: context }">
          </template>
        </span>
        <span
          *ngIf="title"
          [innerHTML]="title">
        </span>
      </div>
    </div>
  `,
  animations: [
    trigger('visibilityChanged', [
      state('active', style({ opacity: 1, 'pointer-events': 'auto' })),
      transition('void => *', [
        style({
          opacity: 0,
          'pointer-events': 'none', // disable pointer events so there is no interference during animation
          // transform: 'translate3d(0, 0, 0) perspective(10px) rotateX(10deg)'
          transform: 'translate3d(0, 0, 0)'
        }),
        animate('0.3s ease-out')
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class TooltipContentComponent implements AfterViewInit {

  @ViewChild('caretElm') caretElm;

  @HostBinding('class')
  get cssClasses() {
    let clz = 'swui-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    return clz;
  }

  @HostBinding('@visibilityChanged')
  get visibilityChanged() {
    return 'active';
  }

  private host: any;
  private showCaret: boolean;
  private type: StyleTypes;
  private placement: PlacementTypes;
  private alignment: AlignmentTypes;
  private spacing: number;
  private cssClass: string;

  constructor(
    public element: ElementRef,
    private renderer: Renderer,
    @Inject(TooltipOptions) options: TooltipOptions) {

    Object.assign(this, options);
  }

  ngAfterViewInit() {
    this.position();
  }

  position() {
    let nativeElm = this.element.nativeElement;
    const hostDim = this.host.nativeElement.getBoundingClientRect();
    const elmDim = nativeElm.getBoundingClientRect();

    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if(this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }
  }

  positionContent(nativeElm, hostDim, elmDim) {
    let top = 0;
    let left = 0;

    if (this.placement === PlacementTypes.right) {
      left = hostDim.left + hostDim.width + this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.left) {
      left = hostDim.left - elmDim.width - this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.top) {
      top = hostDim.top - elmDim.height - this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.bottom) {
      top = hostDim.top + hostDim.height + this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    }

    this.renderer.setElementStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setElementStyle(nativeElm, 'left', `${left}px`);
  }

  positionCaret(hostDim, elmDim) {
    let caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (this.placement === PlacementTypes.right) {
      left = -7;
      top = PositionHelper.calculateVerticalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.left) {
      left = elmDim.width;
      top = PositionHelper.calculateVerticalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.top) {
      top = elmDim.height;
      left = PositionHelper.calculateHorizontalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.bottom) {
      top = -7;
      left = PositionHelper.calculateHorizontalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    }

    this.renderer.setElementStyle(caretElm, 'top', `${top}px`);
    this.renderer.setElementStyle(caretElm, 'left', `${left}px`);
  }

  checkFlip(hostDim, elmDim) {
    const shouldFlip = PositionHelper.shouldFlip(
      hostDim,
      elmDim,
      this.placement,
      this.alignment,
      this.spacing);

    if(shouldFlip) {
      if (this.placement === PlacementTypes.right) {
        this.placement = PlacementTypes.left;
      } else if (this.placement === PlacementTypes.left) {
        this.placement = PlacementTypes.right;
      } else if (this.placement === PlacementTypes.top) {
        this.placement = PlacementTypes.bottom;
      } else if (this.placement === PlacementTypes.bottom) {
        this.placement = PlacementTypes.top;
      }
    }
  }

  @HostListener('window:resize')
  @throttleable(100)
  onWindowResize() {
    this.position();
  }

}
