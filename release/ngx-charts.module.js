import { NgModule } from '@angular/core';
import { ChartCommonModule } from './common/chart-common.module';
import { AreaChartModule } from './area-chart/area-chart.module';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';
import { ForceDirectedGraphModule } from './force-directed-graph/force-directed-graph.module';
import { HeatMapModule } from './heat-map/heat-map.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { PolarChartModule } from './polar-chart/polar-chart.module';
import { NumberCardModule } from './number-card/number-card.module';
import { PieChartModule } from './pie-chart/pie-chart.module';
import { TreeMapModule } from './tree-map/tree-map.module';
import { GaugeModule } from './gauge/gauge.module';
var NgxChartsModule = (function () {
    function NgxChartsModule() {
    }
    return NgxChartsModule;
}());
export { NgxChartsModule };
NgxChartsModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ChartCommonModule,
                    AreaChartModule,
                    BarChartModule,
                    BubbleChartModule,
                    ForceDirectedGraphModule,
                    HeatMapModule,
                    LineChartModule,
                    PolarChartModule,
                    NumberCardModule,
                    PieChartModule,
                    TreeMapModule,
                    GaugeModule
                ]
            },] },
];
/** @nocollapse */
NgxChartsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ngx-charts.module.js.map