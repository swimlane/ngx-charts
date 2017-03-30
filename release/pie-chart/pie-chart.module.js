import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { AdvancedPieChartComponent } from './advanced-pie-chart.component';
import { PieLabelComponent } from './pie-label.component';
import { PieArcComponent } from './pie-arc.component';
import { PieChartComponent } from './pie-chart.component';
import { PieGridComponent } from './pie-grid.component';
import { PieGridSeriesComponent } from './pie-grid-series.component';
import { PieSeriesComponent } from './pie-series.component';
export { AdvancedPieChartComponent, PieLabelComponent, PieArcComponent, PieChartComponent, PieGridComponent, PieGridSeriesComponent, PieSeriesComponent };
var PieChartModule = (function () {
    function PieChartModule() {
    }
    return PieChartModule;
}());
export { PieChartModule };
PieChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    AdvancedPieChartComponent,
                    PieLabelComponent,
                    PieArcComponent,
                    PieChartComponent,
                    PieGridComponent,
                    PieGridSeriesComponent,
                    PieSeriesComponent
                ],
                exports: [
                    AdvancedPieChartComponent,
                    PieLabelComponent,
                    PieArcComponent,
                    PieChartComponent,
                    PieGridComponent,
                    PieGridSeriesComponent,
                    PieSeriesComponent
                ]
            },] },
];
/** @nocollapse */
PieChartModule.ctorParameters = function () { return []; };
//# sourceMappingURL=pie-chart.module.js.map