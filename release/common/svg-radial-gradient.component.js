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
var SvgRadialGradient = (function () {
    function SvgRadialGradient() {
        this.endOpacity = 1;
    }
    SvgRadialGradient.prototype.ngOnChanges = function () {
        this.cx = 0;
        this.cy = 0;
        this.r = "30%";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "endOpacity", void 0);
    SvgRadialGradient = __decorate([
        core_1.Component({
            selector: 'g[svgRadialGradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradient-units=\"userSpaceOnUse\">\n      <svg:stop\n        offset=\"0%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        offset=\"100%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:radialGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgRadialGradient);
    return SvgRadialGradient;
}());
exports.SvgRadialGradient = SvgRadialGradient;
//# sourceMappingURL=svg-radial-gradient.component.js.map