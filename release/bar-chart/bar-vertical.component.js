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
var d3_1 = require('../d3');
var BarVerticalComponent = (function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.clickHandler = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarVerticalComponent.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    BarVerticalComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    BarVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BarVerticalComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                columns: 10
            });
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVerticalComponent.prototype.getXScale = function () {
        var spacing = 0.2;
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.clickHandler.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    BarVerticalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'bar-vertical',
                    template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"[width, height]\"\n      [colors]=\"colors\"\n      [legendData]=\"xDomain\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [activeEntries]=\"activeEntries\"\n          (clickHandler)=\"onClick($event)\">\n        </svg:g>\n      </svg:g>\n    </chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    BarVerticalComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    BarVerticalComponent.propDecorators = {
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
        'activeEntries': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return BarVerticalComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarVerticalComponent = BarVerticalComponent;
//# sourceMappingURL=bar-vertical.component.js.map