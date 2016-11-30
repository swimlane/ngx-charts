"use strict";
var core_1 = require('@angular/core');
var SvgRadialGradientComponent = (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
    }
    SvgRadialGradientComponent.prototype.ngOnChanges = function () {
        this.cx = 0;
        this.cy = 0;
        this.r = "30%";
    };
    SvgRadialGradientComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[svgRadialGradient]',
                    template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradient-units=\"userSpaceOnUse\">\n      <svg:stop\n        offset=\"0%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        offset=\"100%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:radialGradient>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SvgRadialGradientComponent.ctorParameters = [];
    SvgRadialGradientComponent.propDecorators = {
        'color': [{ type: core_1.Input },],
        'name': [{ type: core_1.Input },],
        'startOpacity': [{ type: core_1.Input },],
        'endOpacity': [{ type: core_1.Input },],
    };
    return SvgRadialGradientComponent;
}());
exports.SvgRadialGradientComponent = SvgRadialGradientComponent;
//# sourceMappingURL=svg-radial-gradient.component.js.map