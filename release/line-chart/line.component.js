import { Component, Input, Output, EventEmitter, ElementRef, trigger, style, transition, animate, ChangeDetectionStrategy } from '@angular/core';
export var LineComponent = (function () {
    function LineComponent(element) {
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    LineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-line]',
                    template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
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
        'select': [{ type: Output },],
    };
    return LineComponent;
}());
//# sourceMappingURL=line.component.js.map