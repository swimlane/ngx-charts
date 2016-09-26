"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltipCssClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltipTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipSpacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipDisabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "tooltipContext", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "onHide", void 0);
    __decorate([
        core_1.HostListener('focusin'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    TooltipDirective = __decorate([
        core_1.Directive({ selector: '[swui-tooltip]' }), 
        __metadata('design:paramtypes', [tooltip_service_1.TooltipService, core_1.ViewContainerRef, injection_service_1.InjectionService, core_1.ElementRef, core_1.Renderer])
    ], TooltipDirective);
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map