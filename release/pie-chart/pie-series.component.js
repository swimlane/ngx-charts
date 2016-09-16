"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var PieSeries = (function () {
    function PieSeries() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new core_1.EventEmitter();
    }
    PieSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieSeries.prototype.update = function () {
        var pie = d3_1.default.pie()
            .value(function (d) { return d.value; })
            .sort(null);
        this.total = this.getTotal();
        var arcData = pie(this.series);
        this.max = d3_1.default.max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
    };
    PieSeries.prototype.getTotal = function () {
        return this.series
            .map(function (d) { return d.value; })
            .reduce(function (sum, val) { return sum + val; });
    };
    PieSeries.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeries.prototype.outerArc = function () {
        var factor = 1.5;
        return d3_1.default.arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeries.prototype.calculateLabelPositions = function (pieData) {
        var minDistance = 10;
        var chart = this;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = chart.outerArc().centroid(d);
            d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (b.pos[0] * a.pos[0] > 0) {
                    if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
                        labelPositions[j].pos[1] = b.pos[1] + minDistance;
                        j--;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeries.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeries.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieSeries.prototype.tooltipText = function (arc) {
        return this.label(arc) + ": " + arc.data.value;
    };
    PieSeries.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    PieSeries.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "showLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "clickHandler", void 0);
    PieSeries = __decorate([
        core_1.Component({
            selector: 'g[pieSeries]',
            template: "\n    <svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n      <svg:g pieLabel\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"label(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n\n      <svg:g pieArc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [total]=\"total\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        (clickHandler)=\"click($event)\"\n        sw-popover\n        [popoverSpacing]=\"15\"\n        [popoverText]=\"tooltipText(arc)\"\n        [popoverGroup]=\"'charts'\"\n        [gradient]=\"gradient\"\n      ></svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieSeries);
    return PieSeries;
}());
exports.PieSeries = PieSeries;
//# sourceMappingURL=pie-series.component.js.map