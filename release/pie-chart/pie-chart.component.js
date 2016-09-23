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
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.labels = false;
        this.legend = false;
        this.explodeSlices = false;
        this.doughnut = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    PieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    PieChart.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        var dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, this.legend, 9);
        var xOffset = this.margin[3] + dims.width / 2;
        var yOffset = this.margin[0] + dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(dims.width, dims.height);
        if (this.labels) {
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * 0.75;
        }
        this.domain = this.getDomain();
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
    };
    PieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "labels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "doughnut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "clickHandler", void 0);
    PieChart = __decorate([
        core_1.Component({
            selector: 'pie-chart',
            template: "\n    <chart\n      [colors]=\"colors\"\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [legendData]=\"domain\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie chart\">\n        <svg:g pieSeries\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"data\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieChart);
    return PieChart;
}(base_chart_component_1.BaseChart));
exports.PieChart = PieChart;
//# sourceMappingURL=pie-chart.component.js.map