import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
export { HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent };
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    return HeatMapModule;
}());
export { HeatMapModule };
HeatMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    HeatMapCellComponent,
                    HeatCellSeriesComponent,
                    HeatMapComponent
                ],
                exports: [
                    HeatMapCellComponent,
                    HeatCellSeriesComponent,
                    HeatMapComponent
                ]
            },] },
];
/** @nocollapse */
HeatMapModule.ctorParameters = function () { return []; };
//# sourceMappingURL=heat-map.module.js.map