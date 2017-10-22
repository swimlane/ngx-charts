import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TreeMapCellComponent } from './tree-map-cell.component';
import { TreeMapCellSeriesComponent } from './tree-map-cell-series.component';
import { TreeMapComponent } from './tree-map.component';
export { TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent };
var TreeMapModule = /** @class */ (function () {
    function TreeMapModule() {
    }
    TreeMapModule.decorators = [
        { type: NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [
                        TreeMapCellComponent,
                        TreeMapCellSeriesComponent,
                        TreeMapComponent
                    ],
                    exports: [
                        TreeMapCellComponent,
                        TreeMapCellSeriesComponent,
                        TreeMapComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    TreeMapModule.ctorParameters = function () { return []; };
    return TreeMapModule;
}());
export { TreeMapModule };
//# sourceMappingURL=tree-map.module.js.map