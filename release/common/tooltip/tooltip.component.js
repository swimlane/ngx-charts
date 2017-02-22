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
var throttle_1 = require('../../utils/throttle');
var position_1 = require('./position');
var TooltipContentComponent = (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ngx-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () { return _this.renderer.setElementClass(nativeElm, 'animate', true); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = position_1.PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(nativeElm, 'top', top + "px");
        this.renderer.setElementStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = position_1.PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(caretElm, 'top', top + "px");
        this.renderer.setElementStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = position_1.PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    TooltipContentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-tooltip-content',
                    template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <template\n            [ngTemplateOutlet]=\"template\"\n            [ngOutletContext]=\"{ model: context }\">\n          </template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    styleUrls: ['./tooltip.component.css']
                },] },
    ];
    /** @nocollapse */
    TooltipContentComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    TooltipContentComponent.propDecorators = {
        'host': [{ type: core_1.Input },],
        'showCaret': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'placement': [{ type: core_1.Input },],
        'alignment': [{ type: core_1.Input },],
        'spacing': [{ type: core_1.Input },],
        'cssClass': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'caretElm': [{ type: core_1.ViewChild, args: ['caretElm',] },],
        'cssClasses': [{ type: core_1.HostBinding, args: ['class',] },],
        'onWindowResize': [{ type: core_1.HostListener, args: ['window:resize',] },],
    };
    __decorate([
        throttle_1.throttleable(100), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipContentComponent.prototype, "onWindowResize", null);
    return TooltipContentComponent;
}());
exports.TooltipContentComponent = TooltipContentComponent;
//# sourceMappingURL=tooltip.component.js.map