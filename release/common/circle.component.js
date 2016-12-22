"use strict";
var core_1 = require('@angular/core');
var CircleComponent = (function () {
    function CircleComponent() {
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    CircleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-circle]',
                    template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CircleComponent.ctorParameters = function () { return []; };
    CircleComponent.propDecorators = {
        'cx': [{ type: core_1.Input },],
        'cy': [{ type: core_1.Input },],
        'r': [{ type: core_1.Input },],
        'fill': [{ type: core_1.Input },],
        'stroke': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'classNames': [{ type: core_1.Input },],
        'circleOpacity': [{ type: core_1.Input },],
        'pointerEvents': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: core_1.HostListener, args: ['mouseleave',] },],
    };
    return CircleComponent;
}());
exports.CircleComponent = CircleComponent;
//# sourceMappingURL=circle.component.js.map