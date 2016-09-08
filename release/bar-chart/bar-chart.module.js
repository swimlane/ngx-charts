"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var bar_component_1 = require("./bar.component");
var bar_horizontal_component_1 = require("./bar-horizontal.component");
var bar_horizontal_2d_component_1 = require("./bar-horizontal-2d.component");
var bar_horizontal_normalized_component_1 = require("./bar-horizontal-normalized.component");
var bar_horizontal_stacked_component_1 = require("./bar-horizontal-stacked.component");
var bar_vertical_component_1 = require("./bar-vertical.component");
var bar_vertical_2d_component_1 = require("./bar-vertical-2d.component");
var bar_vertical_normalized_component_1 = require("./bar-vertical-normalized.component");
var bar_vertical_stacked_component_1 = require("./bar-vertical-stacked.component");
var date_bar_component_1 = require("./date-bar.component");
var series_horizontal_component_1 = require("./series-horizontal.component");
var series_vertical_component_1 = require("./series-vertical.component");
var BarChartModule = (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                bar_component_1.Bar,
                bar_horizontal_component_1.BarHorizontal,
                bar_horizontal_2d_component_1.BarHorizontal2D,
                bar_horizontal_normalized_component_1.BarHorizontalNormalized,
                bar_horizontal_stacked_component_1.BarHorizontalStacked,
                bar_vertical_component_1.BarVertical,
                bar_vertical_2d_component_1.BarVertical2D,
                bar_vertical_normalized_component_1.BarVerticalNormalized,
                bar_vertical_stacked_component_1.BarVerticalStacked,
                date_bar_component_1.DateBar,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVertical
            ],
            exports: [
                bar_component_1.Bar,
                bar_horizontal_component_1.BarHorizontal,
                bar_horizontal_2d_component_1.BarHorizontal2D,
                bar_horizontal_normalized_component_1.BarHorizontalNormalized,
                bar_horizontal_stacked_component_1.BarHorizontalStacked,
                bar_vertical_component_1.BarVertical,
                bar_vertical_2d_component_1.BarVertical2D,
                bar_vertical_normalized_component_1.BarVerticalNormalized,
                bar_vertical_stacked_component_1.BarVerticalStacked,
                date_bar_component_1.DateBar,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVertical
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartModule);
    return BarChartModule;
}());
exports.BarChartModule = BarChartModule;
//# sourceMappingURL=bar-chart.module.js.map