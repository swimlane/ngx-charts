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
var core_1 = require("@angular/core");
var base_chart_component_1 = require("../common/base-chart.component");
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var color_helper_1 = require("../common/color.helper");
var grid_layout_helper_1 = require("../common/grid-layout.helper");
var NumberCardComponent = (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    NumberCardComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.data = grid_layout_helper_1.gridLayout(_this.dims, _this.results, 150);
            _this.setColors();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return NumberCardComponent;
}(base_chart_component_1.BaseChartComponent));
NumberCardComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-number-card',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\">\n        <svg:g ngx-charts-card-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: ['../common/base-chart.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], NumberCardComponent);
exports.NumberCardComponent = NumberCardComponent;
//# sourceMappingURL=number-card.component.js.map