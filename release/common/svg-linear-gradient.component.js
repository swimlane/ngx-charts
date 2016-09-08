"use strict";
var core_1 = require('@angular/core');
var SvgLinearGradient = (function () {
    function SvgLinearGradient() {
        this.orientation = 'vertical';
        this.endOpacity = 1;
    }
    SvgLinearGradient.prototype.ngOnInit = function () {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "endOpacity", void 0);
    SvgLinearGradient = __decorate([
        core_1.Component({
            selector: 'g[svgLinearGradient]',
            template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop\n        [attr.offset]=\"'0%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        [attr.offset]=\"'100%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:linearGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgLinearGradient);
    return SvgLinearGradient;
}());
exports.SvgLinearGradient = SvgLinearGradient;
//# sourceMappingURL=svg-linear-gradient.component.js.map