"use strict";
var core_1 = require('@angular/core');
var Circle = (function () {
    function Circle() {
        this.clickHandler = new core_1.EventEmitter();
    }
    Circle.prototype.ngOnChanges = function () {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    Circle.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    Circle.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[circle]',
                    template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n      (click)=\"click()\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    Circle.ctorParameters = [];
    Circle.propDecorators = {
        'cx': [{ type: core_1.Input },],
        'cy': [{ type: core_1.Input },],
        'r': [{ type: core_1.Input },],
        'fill': [{ type: core_1.Input },],
        'stroke': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'classNames': [{ type: core_1.Input },],
        'circleOpacity': [{ type: core_1.Input },],
        'pointerEvents': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=circle.component.js.map