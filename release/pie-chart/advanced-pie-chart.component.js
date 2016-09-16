"use strict";
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var trim_label_helper_1 = require('../common/trim-label.helper');
var AdvancedPieChart = (function (_super) {
    __extends(AdvancedPieChart, _super);
    function AdvancedPieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new core_1.EventEmitter();
    }
    AdvancedPieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AdvancedPieChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions([this.view[0] * 4 / 12.0, this.view[1]], this.margin, false, false, false);
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        this.total = this.getTotal();
        this.roundedTotal = Math.round(this.total);
        this.totalLabel = 'total';
        this.legendItems = this.getLegendItems();
    };
    AdvancedPieChart.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    AdvancedPieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChart.prototype.getLegendItems = function () {
        var _this = this;
        return this.results.map(function (d, index) {
            var label = d.name;
            var value = d.value;
            var percentage = Math.round(value / _this.total * 100);
            return {
                value: Math.round(value),
                label: trim_label_helper_1.trimLabel(label, 20),
                percentage: percentage
            };
        });
    };
    AdvancedPieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    AdvancedPieChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AdvancedPieChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "clickHandler", void 0);
    AdvancedPieChart = __decorate([
        core_1.Component({
            selector: 'advanced-pie-chart',
            template: "\n    <div class=\"advanced-pie\"\n      [style.width]=\"dims.width\"\n      [style.height]=\"view[1]\">\n\n      <chart\n        [colors]=\"colors\"\n        [view]=\"[dims.width, dims.height]\">\n\n        <svg:g\n          [attr.transform]=\"transform\"\n          class=\"pie chart\">\n          <svg:g pieSeries\n            [colors]=\"colors\"\n            [showLabels]=\"labels\"\n            [series]=\"results\"\n            [innerRadius]=\"innerRadius\"\n            [outerRadius]=\"outerRadius\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event)\">\n          </svg:g>\n        </svg:g>\n      </chart>\n    </div>\n\n    <div [style.width]=\"view[0] - dims.width\">\n      <div class=\"advanced-pie-legend\"\n        [style.margin-top]=\"(view[1] - 215)/2\">\n\n        <div class=\"total-value\">\n          {{roundedTotal}}\n        </div>\n        <div class=\"total-label\">\n          {{totalLabel}}\n        </div>\n\n        <div class=\"legend-items-container\">\n          <div class=\"legend-items\">\n            <div *ngFor=\"let legendItem of legendItems\" class=\"legend-item\">\n              <div class=\"item-color\"\n                [style.background]=\"colors(legendItem.label)\">\n              </div>\n              <div class=\"item-value\">{{legendItem.value}}</div>\n              <div class=\"item-label\">{{legendItem.label}}</div>\n              <div class=\"item-percent\">{{legendItem.percentage}}%</div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AdvancedPieChart);
    return AdvancedPieChart;
}(base_chart_component_1.BaseChart));
exports.AdvancedPieChart = AdvancedPieChart;
//# sourceMappingURL=advanced-pie-chart.component.js.map