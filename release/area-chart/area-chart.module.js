"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var area_chart_component_1 = require("./area-chart.component");
exports.AreaChartComponent = area_chart_component_1.AreaChartComponent;
var area_chart_normalized_component_1 = require("./area-chart-normalized.component");
exports.AreaChartNormalizedComponent = area_chart_normalized_component_1.AreaChartNormalizedComponent;
var area_chart_stacked_component_1 = require("./area-chart-stacked.component");
exports.AreaChartStackedComponent = area_chart_stacked_component_1.AreaChartStackedComponent;
var area_series_component_1 = require("./area-series.component");
exports.AreaSeriesComponent = area_series_component_1.AreaSeriesComponent;
var chart_common_module_1 = require("../common/chart-common.module");
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    return AreaChartModule;
}());
AreaChartModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            area_chart_component_1.AreaChartComponent,
            area_chart_normalized_component_1.AreaChartNormalizedComponent,
            area_chart_stacked_component_1.AreaChartStackedComponent,
            area_series_component_1.AreaSeriesComponent
        ],
        exports: [
            area_chart_component_1.AreaChartComponent,
            area_chart_normalized_component_1.AreaChartNormalizedComponent,
            area_chart_stacked_component_1.AreaChartStackedComponent,
            area_series_component_1.AreaSeriesComponent
        ]
    })
], AreaChartModule);
exports.AreaChartModule = AreaChartModule;
//# sourceMappingURL=area-chart.module.js.map