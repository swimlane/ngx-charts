"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_helper_1 = require('../common/color.helper');
var base_chart_component_1 = require('../common/base-chart.component');
var d3_1 = require('../d3');
var BarHorizontalStackedComponent = (function (_super) {
    __extends(BarHorizontalStackedComponent, _super);
    function BarHorizontalStackedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.barPadding = 8;
        this.roundDomains = false;
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarHorizontalStackedComponent.prototype.update = function () {
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
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontalStackedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStackedComponent.prototype.getXScale = function () {
        var scale = d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-charts-bar-horizontal-stacked',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [seriesName]=\"group.name\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    styleUrls: ['../common/base-chart.component.css'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('* => void', [
                                core_1.style({
                                    opacity: 1,
                                    transform: '*',
                                }),
                                core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    BarHorizontalStackedComponent.ctorParameters = function () { return []; };
    BarHorizontalStackedComponent.propDecorators = {
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
        'schemeType': [{ type: core_1.Input },],
        'xAxisTickFormatting': [{ type: core_1.Input },],
        'yAxisTickFormatting': [{ type: core_1.Input },],
        'barPadding': [{ type: core_1.Input },],
        'roundDomains': [{ type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return BarHorizontalStackedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarHorizontalStackedComponent = BarHorizontalStackedComponent;
//# sourceMappingURL=bar-horizontal-stacked.component.js.map