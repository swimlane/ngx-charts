"use strict";
var core_1 = require('@angular/core');
var SvgRadialGradient = (function () {
    function SvgRadialGradient() {
        this.endOpacity = 1;
    }
    SvgRadialGradient.prototype.ngOnInit = function () {
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