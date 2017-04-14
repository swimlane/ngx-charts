import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
export { BubbleChartComponent, BubbleSeriesComponent };
var BubbleChartModule = (function () {
    function BubbleChartModule() {
    }
    return BubbleChartModule;
}());
export { BubbleChartModule };
BubbleChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    BubbleChartComponent,
                    BubbleSeriesComponent
                ],
                exports: [
                    BubbleChartComponent,
                    BubbleSeriesComponent
                ]
            },] },
];
/** @nocollapse */
BubbleChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=bubble-chart.module.js.map