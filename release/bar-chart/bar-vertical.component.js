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
var tick_format_helper_1 = require('../common/tick-format.helper');
var d3_1 = require('../d3');
var BarVertical = (function (_super) {
    __extends(BarVertical, _super);
    function BarVertical() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVertical.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVertical.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical.prototype.getXScale = function () {
        var spacing = 0.2;
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVertical.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    BarVertical.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVertical.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVertical.prototype.xAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tick_format_helper_1.tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarVertical.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarVertical.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "clickHandler", void 0);
    BarVertical = __decorate([
        core_1.Component({
            selector: 'bar-vertical',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"xDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"xAxisTickFormatting()\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\">\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical);
    return BarVertical;
}(base_chart_component_1.BaseChart));
exports.BarVertical = BarVertical;
//# sourceMappingURL=bar-vertical.component.js.map