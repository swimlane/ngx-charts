"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var advanced_pie_chart_component_1 = require("./advanced-pie-chart.component");
exports.AdvancedPieChart = advanced_pie_chart_component_1.AdvancedPieChart;
var pie_label_component_1 = require("./pie-label.component");
exports.PieLabel = pie_label_component_1.PieLabel;
var pie_arc_component_1 = require("./pie-arc.component");
exports.PieArc = pie_arc_component_1.PieArc;
var pie_chart_component_1 = require("./pie-chart.component");
exports.PieChart = pie_chart_component_1.PieChart;
var pie_grid_component_1 = require("./pie-grid.component");
exports.PieGrid = pie_grid_component_1.PieGrid;
var pie_grid_series_component_1 = require("./pie-grid-series.component");
exports.PieGridSeries = pie_grid_series_component_1.PieGridSeries;
var pie_series_component_1 = require("./pie-series.component");
exports.PieSeries = pie_series_component_1.PieSeries;
var PieChartModule = (function () {
    function PieChartModule() {
    }
    PieChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
                    declarations: [
                        advanced_pie_chart_component_1.AdvancedPieChart,
                        pie_label_component_1.PieLabel,
                        pie_arc_component_1.PieArc,
                        pie_chart_component_1.PieChart,
                        pie_grid_component_1.PieGrid,
                        pie_grid_series_component_1.PieGridSeries,
                        pie_series_component_1.PieSeries
                    ],
                    exports: [
                        advanced_pie_chart_component_1.AdvancedPieChart,
                        pie_label_component_1.PieLabel,
                        pie_arc_component_1.PieArc,
                        pie_chart_component_1.PieChart,
                        pie_grid_component_1.PieGrid,
                        pie_grid_series_component_1.PieGridSeries,
                        pie_series_component_1.PieSeries
                    ]
                },] },
    ];
    PieChartModule.ctorParameters = [];
    return PieChartModule;
}());
exports.PieChartModule = PieChartModule;
//# sourceMappingURL=pie-chart.module.js.map