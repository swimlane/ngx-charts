import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';
export { BubbleChartComponent, BubbleSeriesComponent };
export var BubbleChartModule = (function () {
    function BubbleChartModule() {
    }
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
    return BubbleChartModule;
}());
//# sourceMappingURL=bubble-chart.module.js.map