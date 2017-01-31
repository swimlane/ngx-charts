"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var label_helper_1 = require('../common/label.helper');
var PieSeriesComponent = (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pie = d3_1.default.pie()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pie(this.series);
        this.max = d3_1.default.max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return d3_1.default.arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
                        // push the second one down
                        labelPositions[j].pos[1] = b.pos[1] + minDistance;
                        j--;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeriesComponent.prototype.label = function (arc) {
        return label_helper_1.formatLabel(arc.data.name);
    };
    PieSeriesComponent.prototype.tooltipText = function (arc) {
        var label = this.label(arc);
        var val = label_helper_1.formatLabel(arc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (arc) {
        return this.colors.getColor(this.label(arc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    PieSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-pie-series]',
                    template: "\n    <svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n      <svg:g ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"label(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n      <svg:g \n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\" \n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"        \n        ngx-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipText(arc)\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    PieSeriesComponent.ctorParameters = function () { return []; };
    PieSeriesComponent.propDecorators = {
        'colors': [{ type: core_1.Input },],
        'series': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'innerRadius': [{ type: core_1.Input },],
        'outerRadius': [{ type: core_1.Input },],
        'explodeSlices': [{ type: core_1.Input },],
        'showLabels': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'activeEntries': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return PieSeriesComponent;
}());
exports.PieSeriesComponent = PieSeriesComponent;
//# sourceMappingURL=pie-series.component.js.map