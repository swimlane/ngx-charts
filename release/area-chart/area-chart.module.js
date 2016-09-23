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
var area_chart_component_1 = require("./area-chart.component");
var area_chart_normalized_component_1 = require("./area-chart-normalized.component");
var area_chart_stacked_component_1 = require("./area-chart-stacked.component");
var area_series_component_1 = require("./area-series.component");
var common_module_1 = require("../common/common.module");
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        core_1.NgModule({
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
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartModule);
    return AreaChartModule;
}());
exports.AreaChartModule = AreaChartModule;
//# sourceMappingURL=area-chart.module.js.map