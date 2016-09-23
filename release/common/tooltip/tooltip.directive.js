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
var tooltip_component_1 = require('./tooltip.component');
var placement_type_1 = require('./placement.type');
var style_type_1 = require('./style.type');
var alignment_type_1 = require('./alignment.type');
var tooltip_options_1 = require('./tooltip-options');
var TooltipDirective = (function () {
    function TooltipDirective(viewContainerRef, injectionService) {
        this.viewContainerRef = viewContainerRef;
        this.injectionService = injectionService;
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
        this.visible = false;
    }
    TooltipDirective.prototype.show = function () {
        var _this = this;
        if (this.visible || this.tooltipDisabled)
            return;
        this.visible = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            return _this.injectComponent();
        }, this.tooltipShowTimeout);
    };
    TooltipDirective.prototype.injectComponent = function () {
        var options = this.createBoundOptions();
        if (this.tooltipAppendToBody) {
            this.tooltip = this.injectionService.appendNextToRoot(tooltip_component_1.TooltipContentComponent, tooltip_options_1.TooltipOptions, options);
        }
        else {
            var binding = core_1.ReflectiveInjector.resolve([
                { provide: tooltip_options_1.TooltipOptions, useValue: options }
            ]);
            this.tooltip = this.injectionService.appendNextToLocation(tooltip_component_1.TooltipContentComponent, this.viewContainerRef, binding);
        }
    };
    TooltipDirective.prototype.hide = function () {
        var _this = this;
        if (!this.visible)
            return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.visible = false;
            if (_this.tooltip)
                _this.tooltip.destroy();
        }, this.tooltipHideTimeout);
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return new tooltip_options_1.TooltipOptions({
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
        core_1.HostListener('focusin'),
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "show", null);
    __decorate([
        core_1.HostListener('focusout'),
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "hide", null);
    TooltipDirective = __decorate([
        core_1.Directive({
            selector: '[swui-tooltip]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, injection_service_1.InjectionService])
    ], TooltipDirective);
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map