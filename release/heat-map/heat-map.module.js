"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var heat_map_cell_component_1 = require("./heat-map-cell.component");
exports.HeatMapCellComponent = heat_map_cell_component_1.HeatMapCellComponent;
var heat_map_cell_series_component_1 = require("./heat-map-cell-series.component");
exports.HeatCellSeriesComponent = heat_map_cell_series_component_1.HeatCellSeriesComponent;
var heat_map_component_1 = require("./heat-map.component");
exports.HeatMapComponent = heat_map_component_1.HeatMapComponent;
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    return HeatMapModule;
}());
HeatMapModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            heat_map_cell_component_1.HeatMapCellComponent,
            heat_map_cell_series_component_1.HeatCellSeriesComponent,
            heat_map_component_1.HeatMapComponent
        ],
        exports: [
            heat_map_cell_component_1.HeatMapCellComponent,
            heat_map_cell_series_component_1.HeatCellSeriesComponent,
            heat_map_component_1.HeatMapComponent
        ]
    })
], HeatMapModule);
exports.HeatMapModule = HeatMapModule;
//# sourceMappingURL=heat-map.module.js.map