"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var tick_format_helper_1 = require('../common/tick-format.helper');
var d3_1 = require('../d3');
var BarHorizontal = (function (_super) {
    __extends(BarHorizontal, _super);
    function BarHorizontal(element, zone) {
        _super.call(this, element, zone);
        this.element = element;
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.showGridLines = true;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontal.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    BarHorizontal.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    BarHorizontal.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.width, this.height, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
    };
    BarHorizontal.prototype.getYScale = function () {
        var spacing = 0.2;
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontal.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarHorizontal.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarHorizontal.prototype.yAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tick_format_helper_1.tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarHorizontal.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarHorizontal.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.yDomain, this.customColors);
    };
    BarHorizontal.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'bar-horizontal',
                    template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"[width, height]\"\n      [colors]=\"colors\"\n      [legendData]=\"yDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"yAxisTickFormatting()\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesHorizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
                },] },
    ];
    BarHorizontal.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ];
    BarHorizontal.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'xAxis': [{ type: core_1.Input },],
        'yAxis': [{ type: core_1.Input },],
        'showXAxisLabel': [{ type: core_1.Input },],
        'showYAxisLabel': [{ type: core_1.Input },],
        'xAxisLabel': [{ type: core_1.Input },],
        'yAxisLabel': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return BarHorizontal;
}(base_chart_component_1.BaseChart));
exports.BarHorizontal = BarHorizontal;
//# sourceMappingURL=bar-horizontal.component.js.map