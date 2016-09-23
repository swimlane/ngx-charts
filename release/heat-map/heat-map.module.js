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
var heat_map_cell_component_1 = require("./heat-map-cell.component");
var heat_map_cell_series_component_1 = require("./heat-map-cell-series.component");
var heat_map_component_1 = require("./heat-map.component");
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                heat_map_cell_component_1.HeatMapCell,
                heat_map_cell_series_component_1.HeatCellSeries,
                heat_map_component_1.HeatMap
            ],
            exports: [
                heat_map_cell_component_1.HeatMapCell,
                heat_map_cell_series_component_1.HeatCellSeries,
                heat_map_component_1.HeatMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMapModule);
    return HeatMapModule;
}());
exports.HeatMapModule = HeatMapModule;
//# sourceMappingURL=heat-map.module.js.map