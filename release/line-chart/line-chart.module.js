"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var line_component_1 = require("./line.component");
exports.LineComponent = line_component_1.LineComponent;
var line_chart_component_1 = require("./line-chart.component");
exports.LineChartComponent = line_chart_component_1.LineChartComponent;
var line_series_component_1 = require("./line-series.component");
exports.LineSeriesComponent = line_series_component_1.LineSeriesComponent;
var LineChartModule = (function () {
    function LineChartModule() {
    }
    return LineChartModule;
}());
LineChartModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            line_component_1.LineComponent,
            line_chart_component_1.LineChartComponent,
            line_series_component_1.LineSeriesComponent
        ],
        exports: [
            line_component_1.LineComponent,
            line_chart_component_1.LineChartComponent,
            line_series_component_1.LineSeriesComponent
        ]
    })
], LineChartModule);
exports.LineChartModule = LineChartModule;
//# sourceMappingURL=line-chart.module.js.map