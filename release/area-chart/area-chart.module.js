import { NgModule } from '@angular/core';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaSeriesComponent } from './area-series.component';
import { ChartCommonModule } from '../common/chart-common.module';
export { AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent };
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    return AreaChartModule;
}());
export { AreaChartModule };
AreaChartModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/** @nocollapse */
AreaChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=area-chart.module.js.map