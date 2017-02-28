import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';
export { LineComponent, LineChartComponent, LineSeriesComponent };
export var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [ChartCommonModule],
                    declarations: [
                        LineComponent,
                        LineChartComponent,
                        LineSeriesComponent
                    ],
                    exports: [
                        LineComponent,
                        LineChartComponent,
                        LineSeriesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    LineChartModule.ctorParameters = function () { return []; };
    return LineChartModule;
}());
//# sourceMappingURL=line-chart.module.js.map