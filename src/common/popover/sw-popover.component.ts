import { Directive, Input, ElementRef, Renderer, OnInit, OnDestroy } from '@angular/core';
import { PositionHelper } from './position.helper';
import { PopoverRegistry } from './popover-registry.service';
import './popover.scss';

@Directive({
  selector: '[swPopover]'
})
export class Popover implements OnInit, OnDestroy {
  @Input() popoverText;
  @Input() popoverTemplate;
  @Input() popoverPlacement = 'top';
  @Input() popoverAlignment = 'center';
  @Input() popoverGroup;
  @Input() popoverSpacing = '0';
  @Input() showCaret = true;

  element: ElementRef;
  renderer: Renderer;
  popover: any;
  mouseLeaveListener: any;
  mouseEnterListener: any;
  options: any;
  placement: any;
  popoverId: any;
  popoverRegistry: PopoverRegistry;
  exitTimeout: any;
  popoverPlain: any;
  popoverCssClass: any;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;

    // attach exit and enter events to element
    if (this.mouseEnterListener) {
      this.mouseEnterListener();
    }
    this.mouseEnterListener = this.renderer.listen(this.element, 'mouseenter', this.display.bind(this));

    if (this.mouseLeaveListener) {
      this.mouseLeaveListener();
    }
    this.mouseLeaveListener = this.renderer.listen(this.element, 'mouseleave', this.mouseOut.bind(this));
  }

  ngOnInit() {
    this.popoverRegistry = PopoverRegistry.getInstance();
  }

  mouseOut() {
    this.exitTimeout = setTimeout(this.remove.bind(this), 200);
  };

  /**
   * Displays the popover on the page
   */
  display() {
    // this.options = {
    //   text: this.popoverText,
    //   cssClass: this.popoverCssClass,
    //   template: this.popoverTemplate,
    //   plain: this.toBoolean(this.popoverPlain || false),
    //   placement: this.popoverPlacement || 'right',
    //   alignment: this.popoverAlignment  || 'center',
    //   group: this.popoverGroup,
    //   spacing: parseInt(this.popoverSpacing) || 0,
    //   showCaret: this.toBoolean(this.popoverPlain || true)
    // };
    //
    // // Cancel exit timeout
    // clearTimeout(this.exitTimeout);
    // if (this.popoverId){
    //   var elm = angular.element(`#sw-${this.popoverId}`);
    //   if (this.popover && elm.length) return;
    // }
    //
    // // remove other popovers from the same group
    // if (this.options.group){
    //   this.popoverRegistry.removeGroup(this.options.group, this.popoverId);
    // }
    //
    // if (this.options.text && !this.options.template){
    //   this.popoverId = Date.now();
    //   this.popover = angular.element(`
    //     <div
    //       class="sw-popover sw-popover-text sw-popover-${this.options.placement} ${this.options.cssClass}"
    //       id="sw-${this.popoverId}">
    //     </div>
    //   `);
    //
    //   this.popover.html(this.options.text);
    //   angular.element(document.body).append(this.popover);
    //   this.checkFlip(this.element, this.popover, this.options);
    //   this.positionPopover(this.element, this.popover, this.options);
    //   this.popoverRegistry.add(this.popoverId, {element: this.element, popover: this.popover, group: this.options.group});
    // }
  };

  /**
   * Removes the popover from the registry and page
   */
  remove() {
    if (this.popover) {
      this.popover.remove();
    }

    this.popoverRegistry.remove(this.popoverId);
    this.popover = undefined;
  };

  /**
   * Checks if the popover's position should be flipped on the other side of
   * the element and flips it
   */
  checkFlip(triggerElement, popover, options) {
    var elDimensions = triggerElement.getBoundingClientRect(),
      popoverDimensions = popover[0].getBoundingClientRect();

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

  /**
   * Positions the popover
   * @param  {object} triggerElement
   * @param  {object} popover
   * @param  {object} options
   */
  positionPopover(triggerElement, popover, options) {
    var elDimensions = triggerElement.getBoundingClientRect(),
      popoverDimensions = popover[0].getBoundingClientRect(),
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

    popover.css({
      top: top + 'px',
      left: left + 'px'
    });

    if (this.options.showCaret) {
      this.addCaret(this.popover, elDimensions, popoverDimensions);
    }

    this.popover.addClass('sw-popover-animation');
  };

  /**
   * Adds a caret and positions it relatively to the popover
   * @param {object} popoverEl
   * @param {object} elDimensions
   * @param {object} popoverDimensions
   */
  addCaret(popoverEl, elDimensions, popoverDimensions) {
    // if (!popoverEl){
    //   return;
    // }
    // var caret = angular.element(`<span class="popover-caret caret-${this.options.placement}"></span>`);
    // popoverEl.append(caret);
    // var caretDimensions = caret[0].getBoundingClientRect();
    //
    // var left, top;
    // if (this.options.placement === 'right'){
    //   left = -6;
    //   top =PositionHelper.calculateVerticalCaret(elDimensions,
    //     popoverDimensions, caretDimensions, this.options.alignment);
    // }
    // if (this.options.placement === 'left'){
    //   left = popoverDimensions.width - 2;
    //   top = PositionHelper.calculateVerticalCaret(elDimensions,
    //     popoverDimensions, caretDimensions, this.options.alignment);
    // }
    // if (this.options.placement === 'top'){
    //   top = popoverDimensions.height - 5;
    //   left = PositionHelper.calculateHorizontalCaret(elDimensions,
    //     popoverDimensions, caretDimensions, this.options.alignment);
    // }
    //
    // if (this.placement === 'bottom'){
    //   top = -8;
    //   left = PositionHelper.calculateHorizontalCaret(elDimensions,
    //     popoverDimensions, caretDimensions, this.options.alignment);
    // }
    //
    // caret.css({
    //   top: top + 'px',
    //   left: left + 'px'
    // });
  };

  /**
   * Determines a boolean given a value
   * @param  {object} value
   * @return {boolean}
   */
  toBoolean(value) {
    if (value && value.length !== 0) {
      var v = ("" + value).toLowerCase();
      value = (v === 'true');
    } else {
      value = false;
    }
    return value;
  };

  ngOnDestroy() {
    if (this.mouseEnterListener) {
      this.mouseEnterListener();
    }

    if (this.mouseLeaveListener) {
      this.mouseLeaveListener();
    }

    this.remove();
  }
}
