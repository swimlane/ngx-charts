var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineChartWithIconsComponent } from './line-chart-with-icons.component';
import { LineSeriesComponent } from './line-series.component';
var LineChartModule = /** @class */ (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                LineComponent,
                LineChartComponent,
                LineChartWithIconsComponent,
                LineSeriesComponent
            ],
            exports: [
                LineComponent,
                LineChartComponent,
                LineChartWithIconsComponent,
                LineSeriesComponent
            ]
        })
    ], LineChartModule);
    return LineChartModule;
}());
export { LineChartModule };
//# sourceMappingURL=line-chart.module.js.map