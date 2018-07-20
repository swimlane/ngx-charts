var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { HeatMapCellComponent } from './heat-map-cell.component';
import { HeatCellSeriesComponent } from './heat-map-cell-series.component';
import { HeatMapComponent } from './heat-map.component';
var HeatMapModule = /** @class */ (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        NgModule({
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
        })
    ], HeatMapModule);
    return HeatMapModule;
}());
export { HeatMapModule };
//# sourceMappingURL=heat-map.module.js.map