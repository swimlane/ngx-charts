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
        this.opacity = 1;
        var data = this.data.series;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        this.path = area(data);
        this.startingPath = startingArea(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "normalized", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "clickHandler", void 0);
    AreaSeries = __decorate([
        core_1.Component({
            selector: 'g[areaSeries]',
            template: "\n    <svg:g area\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"color\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaSeries);
    return AreaSeries;
}());
exports.AreaSeries = AreaSeries;
//# sourceMappingURL=area-series.component.js.map