"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var tree_map_cell_component_1 = require("./tree-map-cell.component");
exports.TreeMapCell = tree_map_cell_component_1.TreeMapCell;
var tree_map_cell_series_component_1 = require("./tree-map-cell-series.component");
exports.TreeMapCellSeries = tree_map_cell_series_component_1.TreeMapCellSeries;
var tree_map_component_1 = require("./tree-map.component");
exports.TreeMap = tree_map_component_1.TreeMap;
var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    TreeMapModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
                    declarations: [
                        tree_map_cell_component_1.TreeMapCell,
                        tree_map_cell_series_component_1.TreeMapCellSeries,
                        tree_map_component_1.TreeMap
                    ],
                    exports: [
                        tree_map_cell_component_1.TreeMapCell,
                        tree_map_cell_series_component_1.TreeMapCellSeries,
                        tree_map_component_1.TreeMap
                    ]
                },] },
    ];
    TreeMapModule.ctorParameters = [];
    return TreeMapModule;
}());
exports.TreeMapModule = TreeMapModule;
//# sourceMappingURL=tree-map.module.js.map