"use strict";
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