var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
export { BubbleChartComponent, BubbleSeriesComponent };
var BubbleChartModule = /** @class */ (function () {
    function BubbleChartModule() {
    }
    BubbleChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ],
            exports: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ]
        })
    ], BubbleChartModule);
    return BubbleChartModule;
}());
export { BubbleChartModule };
//# sourceMappingURL=bubble-chart.module.js.map