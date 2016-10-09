"use strict";
var core_1 = require('@angular/core');
var injection_service_1 = require('../../utils/injection.service');
var object_id_1 = require('../../utils/object-id');
var placement_type_1 = require('./placement.type');
var style_type_1 = require('./style.type');
var alignment_type_1 = require('./alignment.type');
var show_type_1 = require('./show.type');
var tooltip_component_1 = require('./tooltip.component');
var tooltip_options_1 = require('./tooltip-options');
var tooltip_service_1 = require('./tooltip.service');
var TooltipDirective = (function () {
    function TooltipDirective(tooltipService, viewContainerRef, injectionService, elementRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.injectionService = injectionService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 0;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = placement_type_1.PlacementTypes.top;
        this.tooltipAlignment = alignment_type_1.AlignmentTypes.center;
        this.tooltipType = style_type_1.StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = show_type_1.ShowTypes.all;
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
    }
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hide(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.tooltipShowEvent === show_type_1.ShowTypes.all ||
            this.tooltipShowEvent === show_type_1.ShowTypes.focus) {
            this.show();
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.tooltipShowEvent === show_type_1.ShowTypes.all ||
            this.tooltipShowEvent === show_type_1.ShowTypes.mouseover) {
            this.show();
        }
    };
    TooltipDirective.prototype.show = function (immediate) {
        var _this = this;
        if (this.componentId || this.tooltipDisabled) {
            return;
        }
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            _this.componentId = object_id_1.default();
            var tooltip = _this.injectComponent();
            _this.tooltipService.register(_this.componentId, tooltip, _this.hide.bind(_this));
            setTimeout(function () {
                _this.addHideListeners(tooltip.instance.element.nativeElement);
            }, 10);
            _this.onShow.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        var entered = false;
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            entered = true;
            clearTimeout(_this.timeout);
        });
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                entered = false;
                _this.hide();
            });
        }
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains) {
                    _this.hide();
                }
            });
        }
        var element = this.elementRef.nativeElement;
        var addLeaveListener = this.tooltipShowEvent === show_type_1.ShowTypes.all ||
            this.tooltipShowEvent === show_type_1.ShowTypes.mouseover;
        if (addLeaveListener) {
            this.mouseLeaveEvent = this.renderer.listen(element, 'mouseleave', function () {
                if (!entered) {
                    _this.hide();
                }
            });
        }
        var addFocusListener = this.tooltipShowEvent === show_type_1.ShowTypes.all ||
            this.tooltipShowEvent === show_type_1.ShowTypes.focus;
        if (addFocusListener) {
            this.focusOutEvent = this.renderer.listen(element, 'blur', function () {
                if (!entered) {
                    _this.hide();
                }
            });
        }
    };
    TooltipDirective.prototype.injectComponent = function () {
        var options = this.createBoundOptions();
        if (this.tooltipAppendToBody) {
            return this.injectionService.appendNextToRoot(tooltip_component_1.TooltipContentComponent, tooltip_options_1.TooltipOptions, options);
        }
        else {
            var binding = core_1.ReflectiveInjector.resolve([
                { provide: tooltip_options_1.TooltipOptions, useValue: options }
            ]);
            return this.injectionService.appendNextToLocation(tooltip_component_1.TooltipContentComponent, this.viewContainerRef, binding);
        }
    };
    TooltipDirective.prototype.hide = function (immediate) {
        var _this = this;
        if (!this.componentId) {
            return;
        }
        var time = immediate ? 0 : this.tooltipHideTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroy(_this.componentId);
            if (_this.mouseLeaveEvent) {
                _this.mouseLeaveEvent();
            }
            if (_this.focusOutEvent) {
                _this.focusOutEvent();
            }
            if (_this.mouseLeaveContentEvent) {
                _this.mouseLeaveContentEvent();
            }
            if (_this.mouseEnterContentEvent) {
                _this.mouseEnterContentEvent();
            }
            if (_this.documentClickEvent) {
                _this.documentClickEvent();
            }
            _this.onHide.emit(true);
            _this.componentId = undefined;
        }, time);
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return new tooltip_options_1.TooltipOptions({
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
    };
    TooltipDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[swui-tooltip]' },] },
    ];
    TooltipDirective.ctorParameters = [
        { type: tooltip_service_1.TooltipService, },
        { type: core_1.ViewContainerRef, },
        { type: injection_service_1.InjectionService, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    TooltipDirective.propDecorators = {
        'tooltipCssClass': [{ type: core_1.Input },],
        'tooltipTitle': [{ type: core_1.Input },],
        'tooltipAppendToBody': [{ type: core_1.Input },],
        'tooltipSpacing': [{ type: core_1.Input },],
        'tooltipDisabled': [{ type: core_1.Input },],
        'tooltipShowCaret': [{ type: core_1.Input },],
        'tooltipPlacement': [{ type: core_1.Input },],
        'tooltipAlignment': [{ type: core_1.Input },],
        'tooltipType': [{ type: core_1.Input },],
        'tooltipCloseOnClickOutside': [{ type: core_1.Input },],
        'tooltipCloseOnMouseLeave': [{ type: core_1.Input },],
        'tooltipHideTimeout': [{ type: core_1.Input },],
        'tooltipShowTimeout': [{ type: core_1.Input },],
        'tooltipTemplate': [{ type: core_1.Input },],
        'tooltipShowEvent': [{ type: core_1.Input },],
        'tooltipContext': [{ type: core_1.Input },],
        'onShow': [{ type: core_1.Output },],
        'onHide': [{ type: core_1.Output },],
        'onFocus': [{ type: core_1.HostListener, args: ['focusin',] },],
        'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter',] },],
    };
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map