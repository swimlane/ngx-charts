"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    PieChartModule = __decorate([
        core_1.NgModule({
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
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartModule);
    return PieChartModule;
}());
exports.PieChartModule = PieChartModule;
//# sourceMappingURL=pie-chart.module.js.map