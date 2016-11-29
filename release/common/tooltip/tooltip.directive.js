"use strict";
var core_1 = require('@angular/core');
var injection_service_1 = require('../../utils/injection.service');
var id_1 = require('../../utils/id');
var placement_type_1 = require('./placement.type');
var style_type_1 = require('./style.type');
var alignment_type_1 = require('./alignment.type');
var show_type_1 = require('./show.type');
var tooltip_component_1 = require('./tooltip.component');
var tooltip_options_1 = require('./tooltip-options');
var tooltip_service_1 = require('./tooltip.service');
require('./tooltip.scss');
var TooltipDirective = (function () {
    function TooltipDirective(tooltipService, viewContainerRef, injectionService, renderer, element, zone) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.injectionService = injectionService;
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
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
        this.show = new core_1.EventEmitter();
        this.hide = new core_1.EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === show_type_1.ShowTypes.all ||
                this.tooltipShowEvent === show_type_1.ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === show_type_1.ShowTypes.all ||
                this.tooltipShowEvent === show_type_1.ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            var tooltip = this.tooltipService.get(this.componentId);
            if (tooltip) {
                var contentDom = tooltip.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            clearTimeout(this.timeout);
            this.hideTooltip();
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        this.zone.run(function () {
            if (_this.componentId || _this.tooltipDisabled)
                return;
            var time = immediate ? 0 : _this.tooltipShowTimeout;
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
                _this.tooltipService.destroyAll();
                _this.componentId = id_1.id();
                var tooltip = _this.injectComponent();
                _this.tooltipService.register(_this.componentId, tooltip, _this.hideTooltip.bind(_this));
                // add a tiny timeout to avoid event re-triggers
                setTimeout(function () {
                    _this.addHideListeners(tooltip.instance.element.nativeElement);
                }, 10);
                _this.show.emit(true);
            }, time);
        });
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip();
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains)
                    _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.injectComponent = function () {
        var options = this.createBoundOptions();
        var location = this.tooltipAppendToBody ? undefined : this.element.nativeElement;
        return this.injectionService.appendComponent(tooltip_component_1.TooltipContentComponent, options, location);
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (!this.componentId)
            return;
        var time = immediate ? 0 : this.tooltipHideTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            // destroy component
            _this.tooltipService.destroy(_this.componentId);
            // remove events
            if (_this.mouseLeaveContentEvent)
                _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent)
                _this.mouseEnterContentEvent();
            if (_this.documentClickEvent)
                _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
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
    /** @nocollapse */
    TooltipDirective.ctorParameters = [
        { type: tooltip_service_1.TooltipService, },
        { type: core_1.ViewContainerRef, },
        { type: injection_service_1.InjectionService, },
        { type: core_1.Renderer, },
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
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
        'show': [{ type: core_1.Output },],
        'hide': [{ type: core_1.Output },],
        'onFocus': [{ type: core_1.HostListener, args: ['focusin',] },],
        'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter',] },],
        'onBlur': [{ type: core_1.HostListener, args: ['blur',] },],
        'onMouseLeave': [{ type: core_1.HostListener, args: ['mouseleave', ['$event.target'],] },],
    };
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map