"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var d3_1 = require("../d3");
var id_1 = require("../utils/id");
var sort_1 = require("../utils/sort");
var LineSeriesComponent = (function () {
    function LineSeriesComponent(location) {
        this.location = location;
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var line = this.getLineGenerator();
        var area = this.getAreaGenerator();
        var range = this.getRangeGenerator();
        var data = this.sortData(this.data.series);
        this.path = line(data) || '';
        this.outerPath = range(data) || '';
        this.areaPath = area(data) || '';
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return d3_1.default.line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
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
    LineSeriesComponent.prototype.getRangeGenerator = function () {
        var _this = this;
        return d3_1.default.area()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y0(function (d) { return _this.yScale(d.min ? d.min : d.value); })
            .y1(function (d) { return _this.yScale(d.max ? d.max : d.value); })
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
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            var pageUrl = this.location.path();
            this.gradientId = 'grad' + id_1.id().toString();
            this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    return LineSeriesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "xScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "yScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LineSeriesComponent.prototype, "curve", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], LineSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
LineSeriesComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-line-series]',
        template: "\n    <svg:g>\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient ng-if=\"hasGradient\"\n          [color]=\"colors.getColor(data.name)\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n      <svg:g ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n     <svg:g ngx-charts-area\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n      />\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [common_1.Location])
], LineSeriesComponent);
exports.LineSeriesComponent = LineSeriesComponent;
//# sourceMappingURL=line-series.component.js.map