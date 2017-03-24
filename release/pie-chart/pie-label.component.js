import { Component, Input, ElementRef, ChangeDetectionStrategy, trigger, style, transition, animate } from '@angular/core';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
export var PieLabelComponent = (function () {
    function PieLabelComponent(element) {
        this.element = element.nativeElement;
        this.trimLabel = trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var factor = 1.5;
        var outerArc = arc()
            .innerRadius(this.radius * factor)
            .outerRadius(this.radius * factor);
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        this.labelXY = this.data.pos;
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.labelXY;
        this.transform = "translate(" + this.labelXY + ")";
        this.loadAnimation();
    };
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieLabelComponent.prototype.loadAnimation = function () {
        var label = select(this.element).select('.label');
        var line = select(this.element).select('.line');
        label
            .attr('opacity', 0)
            .transition().delay(750).duration(750)
            .attr('opacity', 1);
        line
            .style('stroke-dashoffset', 2000)
            .transition().delay(750).duration(750)
            .style('stroke-dashoffset', '0')
            .transition()
            .style('stroke-dasharray', 'none');
    };
    PieLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-pie-label]',
                    template: "\n    <title>{{label}}</title>\n    <svg:text\n      [@animationState]=\"'active'\"\n      class=\"pie-label\"\n      [attr.transform]=\"transform\"\n      dy=\".35em\"\n      [style.textAnchor]=\"textAnchor()\"\n      [style.shapeRendering]=\"'crispEdges'\"\n      [style.textTransform]=\"'uppercase'\">\n      {{trimLabel(label, 10)}}\n    </svg:text>\n    <svg:path\n      [@animationState]=\"'active'\"\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"line\"\n      [style.strokeDasharray]=\"2000\"\n      [style.strokeDashoffset]=\"0\">\n    </svg:path>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition('void => *', [
                                style({
                                    opacity: 0,
                                }),
                                animate('0.25s 1s', style({ opacity: 1 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    PieLabelComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    PieLabelComponent.propDecorators = {
        'data': [{ type: Input },],
        'radius': [{ type: Input },],
        'label': [{ type: Input },],
        'color': [{ type: Input },],
        'max': [{ type: Input },],
        'value': [{ type: Input },],
        'explodeSlices': [{ type: Input },],
    };
    return PieLabelComponent;
}());
//# sourceMappingURL=pie-label.component.js.map