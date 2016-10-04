"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var advanced_pie_chart_component_1 = require("./advanced-pie-chart.component");
var pie_label_component_1 = require("./pie-label.component");
var pie_arc_component_1 = require("./pie-arc.component");
var pie_chart_component_1 = require("./pie-chart.component");
var pie_grid_component_1 = require("./pie-grid.component");
var pie_grid_series_component_1 = require("./pie-grid-series.component");
var pie_series_component_1 = require("./pie-series.component");
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