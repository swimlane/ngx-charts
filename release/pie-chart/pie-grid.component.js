"use strict";
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var trim_label_helper_1 = require('../common/trim-label.helper');
var grid_layout_helper_1 = require('../common/grid-layout.helper');
var d3_1 = require('../d3');
var PieGrid = (function (_super) {
    __extends(PieGrid, _super);
    function PieGrid() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new core_1.EventEmitter();
    }
    PieGrid.prototype.ngOnInit = function () {
        this.update();
    };
    PieGrid.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGrid.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = grid_layout_helper_1.gridLayout(this.dims, this.results, 150);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
    };
    PieGrid.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGrid.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var label = d.data.name;
            var value = d.data.value;
            var radius = d3_1.default.min([d.width, d.height]) / 2.1;
            var innerRadius = radius * 0.75;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale(label);
                }
            };
            return {
                transform: "translate(" + (d.x + d.width / 2) + " , " + (d.y + d.height / 2) + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                label: trim_label_helper_1.trimLabel(label),
                total: "Total: " + d3_1.default.format(".2f")(value),
                percent: d3_1.default.format(".1p")(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: 'other'
                        }
                    }]
            };
        });
    };
    PieGrid.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    PieGrid.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieGrid.prototype.setColors = function () {
        this.colorScale = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "clickHandler", void 0);
    PieGrid = __decorate([
        core_1.Component({
            selector: 'pie-grid',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\" >\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid-chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n\n          <svg:g pieGridSeries\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (clickHandler)=\"click($event)\"\n          />\n\n          <svg:text\n            class=\"label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.percent}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\">\n            {{series.total}}\n          </svg:text>\n\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieGrid);
    return PieGrid;
}(base_chart_component_1.BaseChart));
exports.PieGrid = PieGrid;
//# sourceMappingURL=pie-grid.component.js.map