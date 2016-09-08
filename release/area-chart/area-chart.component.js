"use strict";
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var moment = require("moment");
var object_id_1 = require("../utils/object-id");
var d3_1 = require('../d3');
var AreaChart = (function (_super) {
    __extends(AreaChart, _super);
    function AreaChart() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaChart.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChart.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChart.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    AreaChart.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChart.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChart.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChart.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChart.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChart.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "clickHandler", void 0);
    AreaChart = __decorate([
        core_1.Component({
            selector: 'area-chart',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChart);
    return AreaChart;
}(base_chart_component_1.BaseChart));
exports.AreaChart = AreaChart;
//# sourceMappingURL=area-chart.component.js.map