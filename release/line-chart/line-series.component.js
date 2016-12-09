"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var moment = require('moment');
var sort_1 = require('../utils/sort');
var LineSeriesComponent = (function () {
    function LineSeriesComponent() {
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        var line = this.getLineGenerator();
        var area = this.getAreaGenerator();
        var data = this.sortData(this.data.series);
        this.path = line(data) || '';
        this.areaPath = area(data) || '';
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return d3_1.default.line()
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
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return d3_1.default.area()
            .x(xProperty)
            .y0(function () { return _this.yScale.range()[0]; })
            .y1(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sort_1.sortByTime(data, 'name');
        }
        else {
            data = sort_1.sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        return this.activeEntries.indexOf(entry.name) > -1;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        return this.activeEntries &&
            this.activeEntries.length !== 0 &&
            this.activeEntries.indexOf(entry.name) === -1;
    };
    LineSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[lineSeries]',
                    template: "\n    <svg:g area\n      class=\"line-highlight\"\n      [data]=\"data\"\n      [path]=\"areaPath\"\n      [fill]=\"color\"\n      [opacity]=\"0.25\"\n      [startOpacity]=\"0\"\n      [gradient]=\"true\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n    <svg:g line\n      class=\"line-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [stroke]=\"color\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
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
        'activeEntries': [{ type: core_1.Input },],
    };
    return LineSeriesComponent;
}());
exports.LineSeriesComponent = LineSeriesComponent;
//# sourceMappingURL=line-series.component.js.map