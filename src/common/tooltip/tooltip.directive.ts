import {
  Directive,
  Input,
  HostListener,
  ViewContainerRef,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';

import { InjectionService } from '../../utils/injection.service';
import { TooltipContentComponent } from './tooltip.component';

import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { TooltipOptions } from './tooltip-options';

@Directive({
  selector: '[swui-tooltip]'
})
export class TooltipDirective {

  @Input() tooltipCssClass: string = '';
  @Input() tooltipTitle: string = '';
  @Input() tooltipAppendToBody: boolean = true;
  @Input() tooltipSpacing: number = 0;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipShowCaret: boolean = true;
  @Input() tooltipPlacement: PlacementTypes = PlacementTypes.top;
  @Input() tooltipAlignment: AlignmentTypes = AlignmentTypes.center;
  @Input() tooltipType: StyleTypes = StyleTypes.popover;
  @Input() tooltipCloseOnClickOutside: boolean = true;
  @Input() tooltipCloseOnMouseLeave: boolean = true;
  @Input() tooltipHideTimeout: number = 300;
  @Input() tooltipShowTimeout: number = 100;
  @Input() tooltipTemplate: any;

  private visible: boolean = false;
  private tooltip: ComponentRef<TooltipContentComponent>;
  private timeout: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injectionService: InjectionService) {
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  show() {
    if (this.visible || this.tooltipDisabled) return;
    this.visible = true;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>
      this.injectComponent(), this.tooltipShowTimeout);
  }

  injectComponent() {
    const options = this.createBoundOptions();

    if(this.tooltipAppendToBody) {
      // append to the body, different arguments
      // since we need to bind the options to the
      // root component instead of this one
      this.tooltip = this.injectionService.appendNextToRoot(
        TooltipContentComponent,
        TooltipOptions,
        options);
    } else {
      // bind our options to this component
      let binding = ReflectiveInjector.resolve([
        { provide: TooltipOptions, useValue: options }
      ]);

      // inject next to this component
      this.tooltip = this.injectionService.appendNextToLocation(
        TooltipContentComponent,
        this.viewContainerRef,
        binding);
    }
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  hide() {
    if (!this.visible) return;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.visible = false;
      if(this.tooltip) this.tooltip.destroy();
    }, this.tooltipHideTimeout);
  }

  private createBoundOptions(): TooltipOptions {
    return new TooltipOptions({
      title: this.tooltipTitle,
      template: this.tooltipTemplate,
      host: this.viewContainerRef.element,
      placement: this.tooltipPlacement,
      alignment: this.tooltipAlignment,
      type: this.tooltipType,
      showCaret: this.tooltipShowCaret,
      cssClass: this.tooltipCssClass,
      hide: this.hide,
      closeOnClickOutside: this.tooltipCloseOnClickOutside,
      closeOnMouseLeave: this.tooltipCloseOnMouseLeave,
      spacing: this.tooltipSpacing
    });
  }

}
