import {Component, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, OnInit, ViewChild, EventEmitter} from "@angular/core";
import {Popover} from "./popover.directive";
import {PositionHelper} from './position.helper';

@Component({
  selector: "popover-content",
  template: `
    <div
      [attr.class]="classes"
      [attr.id]="id">
      {{content}}
    </div>
  `,
})
export class PopoverComponent implements AfterViewInit, OnInit {
  popover: Popover;
  classes: string;
  id: string;
  triggerElement: any;
  top: any;
  left: any;

  @Input() content;
  @Input() options;

  @ViewChild("popoverDiv")
    popoverDiv: ElementRef;

  constructor(private element: ElementRef,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.classes = `sw-popover sw-popover-text sw-popover-${this.options.placement} ${this.options.cssClass}`;
    this.id = `sw-${this.options.popoverId}`;
  }

  ngAfterViewInit() {
    this.checkFlip(this.triggerElement, this.element.nativeElement, this.options);
    this.positionPopover(this.triggerElement, this.element.nativeElement, this.options);
  }

  /**
   * Positions the popover
   * @param  {object} triggerElement
   * @param  {object} popover
   * @param  {object} options
   */
  positionPopover(triggerElement, popover, options) {
    var elDimensions = triggerElement.getBoundingClientRect(),
        popoverDimensions = popover.getBoundingClientRect(),
        top, left;

    if (options.placement === 'right') {
      left = elDimensions.left + elDimensions.width + options.spacing;
      top = PositionHelper.calculateVerticalAlignment(elDimensions,
        popoverDimensions, options.alignment);
    }
    if (options.placement === 'left') {
      left = elDimensions.left - popoverDimensions.width - options.spacing;
      top = PositionHelper.calculateVerticalAlignment(elDimensions,
        popoverDimensions, options.alignment);
    }
    if (options.placement === 'top') {
      top = elDimensions.top - popoverDimensions.height - options.spacing;
      left = PositionHelper.calculateHorizontalAlignment(elDimensions,
        popoverDimensions, options.alignment);
    }
    if (options.placement === 'bottom') {
      top = elDimensions.top + elDimensions.height + options.spacing;
      left = PositionHelper.calculateHorizontalAlignment(elDimensions,
        popoverDimensions, options.alignment);
    }

    this.top = top;
    this.left = left;
    
    // if(this.options.showCaret) {
    //   this.addCaret(this.popover, elDimensions, popoverDimensions);
    // }

    // this.popover.addClass('sw-popover-animation');
  };

  /**
   * Checks if the popover's position should be flipped on the other side of
   * the element and flips it
   */
  checkFlip(triggerElement, popover, options) {
    var elDimensions = triggerElement.getBoundingClientRect(),
        popoverDimensions = popover.getBoundingClientRect();

    if (PositionHelper.shouldFlip(elDimensions, popoverDimensions, options.placement, options.alignment, options.spacing)) {
      if (options.placement === 'right') {
        options.placement = 'left';
      } else if (options.placement === 'left') {
        options.placement = 'right';
      } else if (options.placement === 'top') {
        options.placement = 'bottom';
      } else if (options.placement === 'bottom') {
        options.placement = 'top';
      }
    }
  };

}
