"use strict";
var core_1 = require('@angular/core');
var LineComponent = (function () {
    function LineComponent(element) {
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    LineComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-line]',
                    template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('void => *', [
                                core_1.style({
                                    strokeDasharray: 2000,
                                    strokeDashoffset: 2000,
                                }),
                                core_1.animate(1000, core_1.style({
                                    strokeDashoffset: 0
                                }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    LineComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    LineComponent.propDecorators = {
        'path': [{ type: core_1.Input },],
        'stroke': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
    };
    return LineComponent;
}());
exports.LineComponent = LineComponent;
//# sourceMappingURL=line.component.js.map