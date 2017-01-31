"use strict";
var core_1 = require('@angular/core');
var SvgLinearGradientComponent = (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
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
                    selector: 'g[ngx-charts-svg-linear-gradient]',
                    template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />     \n    </svg:linearGradient>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SvgLinearGradientComponent.ctorParameters = function () { return []; };
    SvgLinearGradientComponent.propDecorators = {
        'orientation': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'name': [{ type: core_1.Input },],
        'stops': [{ type: core_1.Input },],
    };
    return SvgLinearGradientComponent;
}());
exports.SvgLinearGradientComponent = SvgLinearGradientComponent;
//# sourceMappingURL=svg-linear-gradient.component.js.map