"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var sort_1 = require('../utils/sort');
var AreaSeries = (function () {
    function AreaSeries() {
        this.stacked = false;
        this.normalized = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaSeries.prototype.update = function () {
        var _this = this;
        var area;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        area.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = 1;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sort_1.sortByTime(data, 'name');
        }
        else {
            data = sort_1.sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = area(data);
        this.startingPath = startingArea(data);
    };
    AreaSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[areaSeries]',
                    template: "\n    <svg:g area\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"color\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AreaSeries.ctorParameters = [];
    AreaSeries.propDecorators = {
        'data': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'scaleType': [{ type: core_1.Input },],
        'stacked': [{ type: core_1.Input },],
        'normalized': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'curve': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return AreaSeries;
}());
exports.AreaSeries = AreaSeries;
//# sourceMappingURL=area-series.component.js.map