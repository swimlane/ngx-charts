var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
var AreaComponent = /** @class */ (function () {
    function AreaComponent(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.updatePathEl = function () {
        var node = select(this.element).select('.area');
        if (this.animations) {
            node.transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "startingPath", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "opacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "startOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "endOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "activeLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaComponent.prototype, "stops", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "select", void 0);
    AreaComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AreaComponent);
    return AreaComponent;
}());
export { AreaComponent };
//# sourceMappingURL=area.component.js.map