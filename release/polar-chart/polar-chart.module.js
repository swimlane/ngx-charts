import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';
export { PolarChartComponent, PolarSeriesComponent };
var PolarChartModule = /** @class */ (function () {
    function PolarChartModule() {
    }
    PolarChartModule.decorators = [
        { type: NgModule, args: [{
                    imports: [ChartCommonModule, PieChartModule, LineChartModule],
                    declarations: [
                        PolarChartComponent,
                        PolarSeriesComponent
                    ],
                    exports: [
                        PolarChartComponent,
                        PolarSeriesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    PolarChartModule.ctorParameters = function () { return []; };
    return PolarChartModule;
}());
export { PolarChartModule };
//# sourceMappingURL=polar-chart.module.js.map