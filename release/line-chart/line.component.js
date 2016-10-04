"use strict";
var core_1 = require('@angular/core');
var Line = (function () {
    function Line(element) {
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Line.prototype.ngOnChanges = function () {
    };
    Line.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[line]',
                    template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
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
    Line.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    Line.propDecorators = {
        'path': [{ type: core_1.Input },],
        'stroke': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.component.js.map