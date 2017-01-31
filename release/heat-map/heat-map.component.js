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
var core_1 = require("@angular/core");
var d3_1 = require("../d3");
var base_chart_component_1 = require("../common/base-chart.component");
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var color_helper_1 = require("../common/color.helper");
var HeatMapComponent = (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.innerPadding = 8;
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    HeatMapComponent.prototype.update = function () {
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
                legendType: 'linear'
            });
            _this.formatDates();
            _this.xDomain = _this.getXDomain();
            _this.yDomain = _this.getYDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
            _this.rects = _this.getRects();
        });
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
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
    HeatMapComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    HeatMapComponent.prototype.getXScale = function () {
        var innerPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0];
        var f = this.xDomain.length / (this.dims.width / innerPadding + 1);
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .domain(this.xDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getYScale = function () {
        var innerPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1];
        var f = this.yDomain.length / (this.dims.height / innerPadding + 1);
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .domain(this.yDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'linear', this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'linear',
            domain: this.valueDomain,
            colors: this.colors.scale
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    return HeatMapComponent;
}(base_chart_component_1.BaseChartComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "legend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxis", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showXAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "showYAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HeatMapComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "innerPadding", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
HeatMapComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-heat-map',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styleUrls: ['../common/base-chart.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], HeatMapComponent);
exports.HeatMapComponent = HeatMapComponent;
//# sourceMappingURL=heat-map.component.js.map