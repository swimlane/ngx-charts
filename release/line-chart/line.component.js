import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
var LineComponent = (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.select = new EventEmitter();
    }
    return LineComponent;
}());
export { LineComponent };
LineComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-line]',
                template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('animationState', [
                        transition('void => *', [
                            style({
                                strokeDasharray: 2000,
                                strokeDashoffset: 2000,
                            }),
                            animate(1000, style({
                                strokeDashoffset: 0
                            }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
LineComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
LineComponent.propDecorators = {
    'path': [{ type: Input },],
    'stroke': [{ type: Input },],
    'data': [{ type: Input },],
    'fill': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=line.component.js.map