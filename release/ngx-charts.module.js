var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './polyfills';
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
var NgxChartsModule = /** @class */ (function () {
    function NgxChartsModule() {
    }
    NgxChartsModule = __decorate([
        NgModule({
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
        })
    ], NgxChartsModule);
    return NgxChartsModule;
}());
export { NgxChartsModule };
//# sourceMappingURL=ngx-charts.module.js.map