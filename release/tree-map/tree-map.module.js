"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var tree_map_cell_component_1 = require("./tree-map-cell.component");
exports.TreeMapCellComponent = tree_map_cell_component_1.TreeMapCellComponent;
var tree_map_cell_series_component_1 = require("./tree-map-cell-series.component");
exports.TreeMapCellSeriesComponent = tree_map_cell_series_component_1.TreeMapCellSeriesComponent;
var tree_map_component_1 = require("./tree-map.component");
exports.TreeMapComponent = tree_map_component_1.TreeMapComponent;
var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    return TreeMapModule;
}());
TreeMapModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            tree_map_cell_component_1.TreeMapCellComponent,
            tree_map_cell_series_component_1.TreeMapCellSeriesComponent,
            tree_map_component_1.TreeMapComponent
        ],
        exports: [
            tree_map_cell_component_1.TreeMapCellComponent,
            tree_map_cell_series_component_1.TreeMapCellSeriesComponent,
            tree_map_component_1.TreeMapComponent
        ]
    })
], TreeMapModule);
exports.TreeMapModule = TreeMapModule;
//# sourceMappingURL=tree-map.module.js.map