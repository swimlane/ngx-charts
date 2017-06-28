import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
var LineComponent = (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.animateToCurrentForm();
        }
    };
    LineComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element.nativeElement).select('.line');
        node
            .transition().duration(750)
            .attr('d', this.path);
    };
    return LineComponent;
}());
export { LineComponent };
LineComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-line]',
                template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('animationState', [
                        transition(':enter', [
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