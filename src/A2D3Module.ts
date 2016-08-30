import {NgModule} from "@angular/core";
import {CommonModule} from "./common/common.module";
import {AreaChartModule} from "./area-chart/area-chart.module";
import {BarChartModule} from "./bar-chart/bar-chart.module";
import {HeatMapModule} from "./heat-map/heat-map.module";
import {LineChartModule} from "./line-chart/line-chart.module";
import {NumberCardModule} from "./number-card/number-card.module";
import {PieChartModule} from "./pie-chart/pie-chart.module";
import {TreeMapModule} from "./tree-map/tree-map.module";

@NgModule({
  exports: [
    CommonModule,
    AreaChartModule,
    BarChartModule,
    HeatMapModule,
    LineChartModule,
    NumberCardModule,
    PieChartModule,
    TreeMapModule
  ]
})
export class A2D3Module {}
