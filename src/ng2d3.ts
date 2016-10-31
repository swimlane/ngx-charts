import { NgModule } from "@angular/core";
import { CommonModule } from "./common/common.module";
import { AreaChartModule } from "./area-chart/area-chart.module";
import { BarChartModule } from "./bar-chart/bar-chart.module";
import { ForceDirectedGraphModule } from "./force-directed-graph/force-directed-graph.module";
import { HeatMapModule } from "./heat-map/heat-map.module";
import { LineChartModule } from "./line-chart/line-chart.module";
import { NumberCardModule } from "./number-card/number-card.module";
import { PieChartModule } from "./pie-chart/pie-chart.module";
import { TreeMapModule } from "./tree-map/tree-map.module";

export * from "./area-chart/area-chart.module";
export * from "./bar-chart/bar-chart.module";
export * from "./force-directed-graph/force-directed-graph.module";
export * from "./common/common.module";
export * from "./heat-map/heat-map.module";
export * from "./line-chart/line-chart.module";
export * from "./number-card/number-card.module";
export * from "./pie-chart/pie-chart.module";
export * from "./tree-map/tree-map.module";

@NgModule({
  exports: [
    CommonModule,
    AreaChartModule,
    BarChartModule,
    ForceDirectedGraphModule,
    HeatMapModule,
    LineChartModule,
    NumberCardModule,
    PieChartModule,
    TreeMapModule
  ]
})
export class NG2D3Module {}
