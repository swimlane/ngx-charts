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
var moment = require('moment');
var sort_1 = require('../utils/sort');
var LineSeries = (function () {
    function LineSeries() {
    }
    LineSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    LineSeries.prototype.update = function () {
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
            .y(function (d) { return _this.yScale(d.value); });
        var data = this.data.series;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        this.path = line(data) || '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "scaleType", void 0);
    LineSeries = __decorate([
        core_1.Component({
            selector: 'g[lineSeries]',
            template: "\n    <svg:g line\n      [data]=\"data\"\n      [path]=\"path\"\n      [stroke]=\"color\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LineSeries);
    return LineSeries;
}());
exports.LineSeries = LineSeries;
//# sourceMappingURL=line-series.component.js.map