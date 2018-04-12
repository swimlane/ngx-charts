var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var SvgRadialGradientComponent = /** @class */ (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
        get: function () {
            return this.stopsInput || this.stopsDefault;
        },
        set: function (value) {
            this.stopsInput = value;
        },
        enumerable: true,
        configurable: true
    });
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        if (('color' in changes) ||
            ('startOpacity' in changes) ||
            ('endOpacity' in changes)) {
            this.stopsDefault = [{
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                }, {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }];
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "cx", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "cy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SvgRadialGradientComponent.prototype, "stops", null);
    SvgRadialGradientComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-svg-radial-gradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}());
export { SvgRadialGradientComponent };
//# sourceMappingURL=svg-radial-gradient.component.js.map