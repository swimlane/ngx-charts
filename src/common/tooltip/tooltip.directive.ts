import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewContainerRef,
  ComponentRef,
  ElementRef,
  Renderer,
  OnDestroy
} from '@angular/core';

import { InjectionService } from '../../utils/injection.service';
import { id } from '../../utils/id';
import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { ShowTypes } from './show.type';

import { TooltipContentComponent } from './tooltip.component';
import { TooltipOptions } from './tooltip-options';
import { TooltipService } from './tooltip.service';
import './tooltip.scss';

@Directive({ selector: '[swui-tooltip]' })
export class TooltipDirective implements OnDestroy {

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
  @Input() tooltipShowEvent: ShowTypes = ShowTypes.all;
  @Input() tooltipContext: any;

  @Output() show = new EventEmitter();
  @Output() hide = new EventEmitter();

  private get listensForFocus(): boolean {
    return this.tooltipShowEvent === ShowTypes.all ||
           this.tooltipShowEvent === ShowTypes.focus;
  }

  private get listensForHover(): boolean {
    return this.tooltipShowEvent === ShowTypes.all ||
           this.tooltipShowEvent === ShowTypes.mouseover;
  }

  private componentId: string;
  private timeout: any;
  private mouseLeaveContentEvent: any;
  private mouseEnterContentEvent: any;
  private documentClickEvent: any;

  constructor(
    private tooltipService: TooltipService,
    private viewContainerRef: ViewContainerRef,
    private injectionService: InjectionService,
    private renderer: Renderer,
    private element: ElementRef) {
  }

  ngOnDestroy(): void {
    this.hideTooltip(true);
  }

  @HostListener('focusin')
  onFocus(): void {
    if(this.listensForFocus) {
       this.showTooltip();
     }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if(this.listensForHover) {
       this.showTooltip();
     }
  }

  @HostListener('blur')
  onBlur(): void {
    if(this.listensForFocus) {
      this.hideTooltip();
    }
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target): void {
    if(this.listensForHover && this.tooltipCloseOnMouseLeave) {

      const tooltip = this.tooltipService.get(this.componentId);
      if(tooltip) {
        const contentDom = tooltip.instance.element.nativeElement;
        const contains = contentDom.contains(target);
        if(contains) return;
      }

      clearTimeout(this.timeout);
      this.hideTooltip();
    }
  }

  showTooltip(immediate?: boolean): void {
    if (this.componentId || this.tooltipDisabled) return;

    const time = immediate ? 0 : this.tooltipShowTimeout;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tooltipService.destroyAll();

      this.componentId = id();

      let tooltip = this.injectComponent();
      this.tooltipService.register(
        this.componentId, tooltip, this.hideTooltip.bind(this));

      // add a tiny timeout to avoid event re-triggers
      setTimeout(() => {
        this.addHideListeners(tooltip.instance.element.nativeElement);
      }, 10);

      this.show.emit(true);
    }, time);
  }

  addHideListeners(tooltip): void {
    // on mouse enter, cancel the hide triggered by the leave
    this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
      clearTimeout(this.timeout);
    });

    // content mouse leave listener
    if(this.tooltipCloseOnMouseLeave) {
      this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
        this.hideTooltip();
      });
    }

    // content close on click outside
    if(this.tooltipCloseOnClickOutside) {
      this.documentClickEvent = this.renderer.listen(document, 'click', (event) => {
        const contains = tooltip.contains(event.target);
        if(!contains) this.hideTooltip();
      });
    }
  }

  injectComponent(): ComponentRef<TooltipContentComponent> {
    const options = this.createBoundOptions();
    const location = this.tooltipAppendToBody ? undefined : this.element.nativeElement;

    return this.injectionService.appendComponent(
      TooltipContentComponent,
      options,
      location
    );
  }

  hideTooltip(immediate?: boolean): void {
    if(!this.componentId) return;

    const time = immediate ? 0 : this.tooltipHideTimeout;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // destroy component
      this.tooltipService.destroy(this.componentId);

      // remove events
      if(this.mouseLeaveContentEvent) this.mouseLeaveContentEvent();
      if(this.mouseEnterContentEvent) this.mouseEnterContentEvent();
      if(this.documentClickEvent) this.documentClickEvent();

      // emit events
      this.hide.emit(true);
      this.componentId = undefined;
    }, time);
  }

  private createBoundOptions(): TooltipOptions {
    return new TooltipOptions({
      id: this.componentId,
      title: this.tooltipTitle,
      template: this.tooltipTemplate,
      host: this.viewContainerRef.element,
      placement: this.tooltipPlacement,
      alignment: this.tooltipAlignment,
      type: this.tooltipType,
      showCaret: this.tooltipShowCaret,
      cssClass: this.tooltipCssClass,
      spacing: this.tooltipSpacing,
      context: this.tooltipContext
    });
  }

}
