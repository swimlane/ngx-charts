import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
var LineComponent = /** @class */ (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node
                .transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
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
        'animations': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=line.component.js.map