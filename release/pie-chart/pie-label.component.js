import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';
import { trimLabel } from '../common/trim-label.helper';
var PieLabelComponent = (function () {
    function PieLabelComponent() {
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
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
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function () {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function () {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function () {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function () {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function () {
            return this.isIE ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    return PieLabelComponent;
}());
export { PieLabelComponent };
PieLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-pie-label]',
                template: "\n    <title>{{label}}</title>\n    <svg:g\n      [attr.transform]=\"attrTransform\"\n      [style.transform]=\"styleTransform\"\n      [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\"\n        [style.textTransform]=\"'uppercase'\">\n        {{trimLabel(label, 10)}}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\">\n    </svg:path>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PieLabelComponent.ctorParameters = function () { return []; };
PieLabelComponent.propDecorators = {
    'data': [{ type: Input },],
    'radius': [{ type: Input },],
    'label': [{ type: Input },],
    'color': [{ type: Input },],
    'max': [{ type: Input },],
    'value': [{ type: Input },],
    'explodeSlices': [{ type: Input },],
};
//# sourceMappingURL=pie-label.component.js.map