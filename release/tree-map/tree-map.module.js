"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var tree_map_cell_component_1 = require("./tree-map-cell.component");
exports.TreeMapCellComponent = tree_map_cell_component_1.TreeMapCellComponent;
var tree_map_cell_series_component_1 = require("./tree-map-cell-series.component");
exports.TreeMapCellSeriesComponent = tree_map_cell_series_component_1.TreeMapCellSeriesComponent;
var tree_map_component_1 = require("./tree-map.component");
exports.TreeMapComponent = tree_map_component_1.TreeMapComponent;
var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    TreeMapModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
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
                },] },
    ];
    /** @nocollapse */
    TreeMapModule.ctorParameters = [];
    return TreeMapModule;
}());
exports.TreeMapModule = TreeMapModule;
//# sourceMappingURL=tree-map.module.js.map