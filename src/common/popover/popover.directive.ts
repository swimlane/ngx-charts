import {
  Directive,
  Input,
  HostListener,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  OnInit,
  OnDestroy } from '@angular/core';

import { PopoverRegistry } from './popover-registry.service';
import { PopoverComponent } from './popover.component';
// import './popover.scss';

@Directive({
  selector: '[sw-popover]'
})
export class Popover implements OnInit, OnDestroy {
  mouseEnterListener: Function;
  mouseLeaveListener: Function;
  exitTimeout: any;
  options: any;
  popoverCssClass: any;
  popoverPlain: any;
  popoverId: any;
  popover: any;
  popoverRegistry: PopoverRegistry;

  @Input() popoverText;
  @Input() popoverTemplate;
  @Input() popoverPlacement = 'top';
  @Input() popoverAlignment = 'center';
  @Input() popoverGroup;
  @Input() popoverSpacing = 0;
  @Input() showCaret = true;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver) {

    // this.element = element.nativeElement;
    // this.renderer = renderer;
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.display();
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.exitTimeout = setTimeout(this.remove.bind(this), 200);
  }

  ngOnInit() {
    this.popoverRegistry = PopoverRegistry.getInstance();
  }

  /**
   * Displays the popover on the page
   */
  display() {
    console.log('POPOVER!!! Display');
    // TODO: Do not use angular.element

    this.options = {
      text: this.popoverText,
      cssClass: this.popoverCssClass,
      template: this.popoverTemplate,
      plain: this.toBoolean(this.popoverPlain || false),
      placement: this.popoverPlacement || 'right',
      alignment: this.popoverAlignment  || 'center',
      group: this.popoverGroup,
      spacing: parseInt(this.popoverSpacing.toString()) || 0,
      showCaret: this.toBoolean(this.popoverPlain || true)
    };

    // Cancel exit timeout
    clearTimeout(this.exitTimeout);

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
    this.popoverId = Date.now();
    this.options.popoverId = this.popoverId;
    if (this.options.text && !this.options.template){

      const factory = this.resolver.resolveComponentFactory(PopoverComponent);
      this.popover = this.viewContainerRef.createComponent(factory);
      const popover = this.popover.instance as PopoverComponent;
      popover.popover = this;
      popover.triggerElement = this.viewContainerRef.element.nativeElement;
      console.log('TRIGGER ELEMENT', popover.triggerElement);
      popover.content = this.options.text as string;
      popover.options = this.options;




      // this.popover = angular.element(`
      //   <div
      //     class="sw-popover sw-popover-text sw-popover-${this.options.placement} ${this.options.cssClass}"
      //     id="sw-${this.popoverId}">
      //   </div>
      // `);

      // this.popover.html(this.options.text);
      // angular.element(document.body).append(this.popover);

      // this.popoverRegistry.add(this.popoverId, {element: this.element, popover: this.popover, group: this.options.group});

    }
  };

  /**
   * Removes the popover from the registry and page
   */
  remove() {
  //   if (this.popover) {
  //     this.popover.remove();
  //   }
  //
  //   this.popoverRegistry.remove(this.popoverId);
  //   this.popover = undefined;
  };





  /**
   * Adds a caret and positions it relatively to the popover
   * @param {object} popoverEl
   * @param {object} elDimensions
   * @param {object} popoverDimensions
   */
  addCaret(popoverEl, elDimensions, popoverDimensions) {
    // TODO: do not use angular.element
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
    // if (this.options.placement === 'bottom'){
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
    // this.remove();
  }
}
