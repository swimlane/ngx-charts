"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var d3_1 = require('../d3');
var moment = require('moment');
var object_id_1 = require("../utils/object-id");
var AreaChartNormalized = (function (_super) {
    __extends(AreaChartNormalized, _super);
    function AreaChartNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaChartNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChartNormalized.prototype.update = function () {
        var _this = this;
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
        var _loop_1 = function(i) {
            var val = this_1.xSet[i];
            var d0 = 0;
            var total = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    total += d.value;
                }
            }
            for (var _b = 0, _c = this_1.results; _b < _c.length; _b++) {
                var group = _c[_b];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0: d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartNormalized.prototype.getXDomain = function () {
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
            domain = [new Date(min), new Date(max)];
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
        this.xSet = values;
        return domain;
    };
    AreaChartNormalized.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalized.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalized.prototype.getXScale = function () {
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
    AreaChartNormalized.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChartNormalized.prototype.getScaleType = function (values) {
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
    AreaChartNormalized.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartNormalized.prototype.updateDomain = function (domain) {
        this.xDomain = domain;
        this.xScale = this.getXScale();
    };
    AreaChartNormalized.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChartNormalized.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartNormalized.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "clickHandler", void 0);
    AreaChartNormalized = __decorate([
        core_1.Component({
            selector: 'area-chart-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              chartType=\"area\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartNormalized);
    return AreaChartNormalized;
}(base_chart_component_1.BaseChart));
exports.AreaChartNormalized = AreaChartNormalized;
//# sourceMappingURL=area-chart-normalized.component.js.map