"use strict";
var core_1 = require("@angular/core");
var area_chart_component_1 = require("./area-chart.component");
exports.AreaChart = area_chart_component_1.AreaChart;
var area_chart_normalized_component_1 = require("./area-chart-normalized.component");
exports.AreaChartNormalized = area_chart_normalized_component_1.AreaChartNormalized;
var area_chart_stacked_component_1 = require("./area-chart-stacked.component");
exports.AreaChartStacked = area_chart_stacked_component_1.AreaChartStacked;
var area_series_component_1 = require("./area-series.component");
exports.AreaSeries = area_series_component_1.AreaSeries;
var common_module_1 = require("../common/common.module");
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
                    declarations: [
                        area_chart_component_1.AreaChart,
                        area_chart_normalized_component_1.AreaChartNormalized,
                        area_chart_stacked_component_1.AreaChartStacked,
                        area_series_component_1.AreaSeries
                    ],
                    exports: [
                        area_chart_component_1.AreaChart,
                        area_chart_normalized_component_1.AreaChartNormalized,
                        area_chart_stacked_component_1.AreaChartStacked,
                        area_series_component_1.AreaSeries
                    ]
                },] },
    ];
    AreaChartModule.ctorParameters = [];
    return AreaChartModule;
}());
exports.AreaChartModule = AreaChartModule;
//# sourceMappingURL=area-chart.module.js.map