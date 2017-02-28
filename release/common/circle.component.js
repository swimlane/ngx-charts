import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
export var CircleComponent = (function () {
    function CircleComponent() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'g[ngx-charts-circle]',
                    template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CircleComponent.ctorParameters = function () { return []; };
    CircleComponent.propDecorators = {
        'cx': [{ type: Input },],
        'cy': [{ type: Input },],
        'r': [{ type: Input },],
        'fill': [{ type: Input },],
        'stroke': [{ type: Input },],
        'data': [{ type: Input },],
        'classNames': [{ type: Input },],
        'circleOpacity': [{ type: Input },],
        'pointerEvents': [{ type: Input },],
        'select': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'onClick': [{ type: HostListener, args: ['click',] },],
        'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return CircleComponent;
}());
//# sourceMappingURL=circle.component.js.map