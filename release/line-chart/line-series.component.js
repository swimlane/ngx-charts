"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var moment = require('moment');
var sort_1 = require('../utils/sort');
var LineSeriesComponent = (function () {
    function LineSeriesComponent() {
    }
    LineSeriesComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        var _this = this;
        var line = d3_1.default.line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(moment(label).toDate());
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
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
        this.path = line(data) || '';
    };
    LineSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[lineSeries]',
                    template: "\n    <svg:g line\n      [data]=\"data\"\n      [path]=\"path\"\n      [stroke]=\"color\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    LineSeriesComponent.ctorParameters = [];
    LineSeriesComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'scaleType': [{ type: core_1.Input },],
        'curve': [{ type: core_1.Input },],
    };
    return LineSeriesComponent;
}());
exports.LineSeriesComponent = LineSeriesComponent;
//# sourceMappingURL=line-series.component.js.map