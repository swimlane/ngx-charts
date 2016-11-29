"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var heat_map_cell_component_1 = require("./heat-map-cell.component");
exports.HeatMapCell = heat_map_cell_component_1.HeatMapCell;
var heat_map_cell_series_component_1 = require("./heat-map-cell-series.component");
exports.HeatCellSeries = heat_map_cell_series_component_1.HeatCellSeries;
var heat_map_component_1 = require("./heat-map.component");
exports.HeatMap = heat_map_component_1.HeatMap;
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    HeatMapModule.ctorParameters = [];
    return HeatMapModule;
}());
exports.HeatMapModule = HeatMapModule;
//# sourceMappingURL=heat-map.module.js.map