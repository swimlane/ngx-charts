"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var PieGridSeries = (function () {
    function PieGridSeries(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGridSeries.prototype.update = function () {
        this.layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeries.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeries.prototype.click = function (data) {
        this.clickHandler.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    PieGridSeries.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeries.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieGridSeries.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    PieGridSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[pieGridSeries]',
                    template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g pieArc *ngFor=\"let arc of arcs; trackBy:trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (clickHandler)=\"click($event)\">\n      </svg:g>\n\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    PieGridSeries.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    PieGridSeries.propDecorators = {
        'colors': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'innerRadius': [{ type: core_1.Input },],
        'outerRadius': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return PieGridSeries;
}());
exports.PieGridSeries = PieGridSeries;
//# sourceMappingURL=pie-grid-series.component.js.map