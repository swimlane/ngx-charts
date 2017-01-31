"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var advanced_pie_chart_component_1 = require("./advanced-pie-chart.component");
exports.AdvancedPieChartComponent = advanced_pie_chart_component_1.AdvancedPieChartComponent;
var pie_label_component_1 = require("./pie-label.component");
exports.PieLabelComponent = pie_label_component_1.PieLabelComponent;
var pie_arc_component_1 = require("./pie-arc.component");
exports.PieArcComponent = pie_arc_component_1.PieArcComponent;
var pie_chart_component_1 = require("./pie-chart.component");
exports.PieChartComponent = pie_chart_component_1.PieChartComponent;
var pie_grid_component_1 = require("./pie-grid.component");
exports.PieGridComponent = pie_grid_component_1.PieGridComponent;
var pie_grid_series_component_1 = require("./pie-grid-series.component");
exports.PieGridSeriesComponent = pie_grid_series_component_1.PieGridSeriesComponent;
var pie_series_component_1 = require("./pie-series.component");
exports.PieSeriesComponent = pie_series_component_1.PieSeriesComponent;
var PieChartModule = (function () {
    function PieChartModule() {
    }
    return PieChartModule;
}());
PieChartModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            advanced_pie_chart_component_1.AdvancedPieChartComponent,
            pie_label_component_1.PieLabelComponent,
            pie_arc_component_1.PieArcComponent,
            pie_chart_component_1.PieChartComponent,
            pie_grid_component_1.PieGridComponent,
            pie_grid_series_component_1.PieGridSeriesComponent,
            pie_series_component_1.PieSeriesComponent
        ],
        exports: [
            advanced_pie_chart_component_1.AdvancedPieChartComponent,
            pie_label_component_1.PieLabelComponent,
            pie_arc_component_1.PieArcComponent,
            pie_chart_component_1.PieChartComponent,
            pie_grid_component_1.PieGridComponent,
            pie_grid_series_component_1.PieGridSeriesComponent,
            pie_series_component_1.PieSeriesComponent
        ]
    })
], PieChartModule);
exports.PieChartModule = PieChartModule;
//# sourceMappingURL=pie-chart.module.js.map