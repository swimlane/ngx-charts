"use strict";
var core_1 = require('@angular/core');
var SvgLinearGradientComponent = (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
        this.endOpacity = 1;
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
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
    SvgLinearGradientComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[svgLinearGradient]',
                    template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop\n        [attr.offset]=\"'0%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        [attr.offset]=\"'100%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:linearGradient>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SvgLinearGradientComponent.ctorParameters = [];
    SvgLinearGradientComponent.propDecorators = {
        'orientation': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'name': [{ type: core_1.Input },],
        'startOpacity': [{ type: core_1.Input },],
        'endOpacity': [{ type: core_1.Input },],
    };
    return SvgLinearGradientComponent;
}());
exports.SvgLinearGradientComponent = SvgLinearGradientComponent;
//# sourceMappingURL=svg-linear-gradient.component.js.map