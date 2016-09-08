"use strict";
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var d3_1 = require('../d3');
var BarVerticalStacked = (function (_super) {
    __extends(BarVerticalStacked, _super);
    function BarVerticalStacked() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVerticalStacked.prototype.ngOnInit = function () {
        this.update();
    };
    BarVerticalStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVerticalStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalStacked.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalStacked.prototype.getInnerDomain = function () {
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
    BarVerticalStacked.prototype.getValueDomain = function () {
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
    BarVerticalStacked.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStacked.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalStacked.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalStacked.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVerticalStacked.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalStacked.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "clickHandler", void 0);
    BarVerticalStacked = __decorate([
        core_1.Component({
            selector: 'bar-vertical-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalStacked);
    return BarVerticalStacked;
}(base_chart_component_1.BaseChart));
exports.BarVerticalStacked = BarVerticalStacked;
//# sourceMappingURL=bar-vertical-stacked.component.js.map