"use strict";
var core_1 = require('@angular/core');
var chart_common_module_1 = require('../common/chart-common.module');
var heat_map_cell_component_1 = require('./heat-map-cell.component');
exports.HeatMapCellComponent = heat_map_cell_component_1.HeatMapCellComponent;
var heat_map_cell_series_component_1 = require('./heat-map-cell-series.component');
exports.HeatCellSeriesComponent = heat_map_cell_series_component_1.HeatCellSeriesComponent;
var heat_map_component_1 = require('./heat-map.component');
exports.HeatMapComponent = heat_map_component_1.HeatMapComponent;
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    HeatMapModule.ctorParameters = function () { return []; };
    return HeatMapModule;
}());
exports.HeatMapModule = HeatMapModule;
//# sourceMappingURL=heat-map.module.js.map