import {NgModule} from "@angular/core";
import {CommonModule} from "./common/CommonModule";
import {AreaChartModule} from "./areachart/AreaChartModule";
import {BarChartModule} from "./barchart/BarChartModule";
import {HeatMapModule} from "./heatmap/HeatMapModule";
import {LineChartModule} from "./linechart/LineChartModule";
import {NumberCardModule} from "./numbercard/NumberCardModule";
import {PieChartModule} from "./piechart/PieChartModule";
import {TreeMapModule} from "./treemap/TreeMapModule";

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
