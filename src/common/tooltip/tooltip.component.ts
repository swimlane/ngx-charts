import {
  Input, Component, ElementRef, AfterViewInit, ViewEncapsulation,
  HostListener, ViewChild, HostBinding, Renderer
} from '@angular/core';

import { throttleable } from '../../utils/throttle';
import { PositionHelper, PlacementTypes } from './position';

import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';

@Component({
  selector: 'ngx-tooltip-content',
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
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipContentComponent implements AfterViewInit {

  @Input() host: any;
  @Input() showCaret: boolean;
  @Input() type: StyleTypes;
  @Input() placement: PlacementTypes;
  @Input() alignment: AlignmentTypes;
  @Input() spacing: number;
  @Input() cssClass: string;
  @Input() title: string;

  @ViewChild('caretElm') caretElm;

  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    return clz;
  }

  constructor(
    public element: ElementRef,
    private renderer: Renderer) {
  }

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  position(): void {
    const nativeElm = this.element.nativeElement;
    const hostDim = this.host.nativeElement.getBoundingClientRect();

    // if no dims were found, never show
    if(!hostDim.height && !hostDim.width) return;

    const elmDim = nativeElm.getBoundingClientRect();
    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if(this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }

    // animate its entry
    setTimeout(() => this.renderer.setElementClass(nativeElm, 'animate', true), 1);
  }

  positionContent(nativeElm, hostDim, elmDim): void {
    const { top, left } = PositionHelper.positionContent(
      this.placement, elmDim, hostDim, this.spacing, this.alignment);

    this.renderer.setElementStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setElementStyle(nativeElm, 'left', `${left}px`);
  }

  positionCaret(hostDim, elmDim): void {
    const caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();
    const { top, left } = PositionHelper.positionCaret(
      this.placement, elmDim, hostDim, caretDimensions, this.alignment);

    this.renderer.setElementStyle(caretElm, 'top', `${top}px`);
    this.renderer.setElementStyle(caretElm, 'left', `${left}px`);
  }

  checkFlip(hostDim, elmDim): void {
    this.placement = PositionHelper.determinePlacement(
      this.placement, elmDim, hostDim, this.spacing, this.alignment);
  }

  @HostListener('window:resize')
  @throttleable(100)
  onWindowResize(): void {
    this.position();
  }

}
