var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
var AreaChartModule = /** @class */ (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                AreaChartComponent,
                AreaChartNormalizedComponent,
                AreaChartStackedComponent,
                AreaSeriesComponent
            ],
            exports: [
                AreaChartComponent,
                AreaChartNormalizedComponent,
                AreaChartStackedComponent,
                AreaSeriesComponent
            ]
        })
    ], AreaChartModule);
    return AreaChartModule;
}());
export { AreaChartModule };
//# sourceMappingURL=area-chart.module.js.map