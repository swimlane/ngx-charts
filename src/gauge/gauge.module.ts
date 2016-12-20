import { NgModule } from "@angular/core";
import { ChartCommonModule } from "../common/chart-common.module";
import { GaugeComponent } from "./gauge.component";
import { GaugeArcComponent } from "./gauge-arc.component";
import { GaugeAxisComponent } from "./gauge-axis.component";
import { PieChartModule } from "../pie-chart/pie-chart.module";

export { GaugeComponent, GaugeArcComponent, GaugeAxisComponent };

@NgModule({
  imports: [ChartCommonModule, PieChartModule],
  declarations: [
    GaugeComponent,
    GaugeArcComponent,
    GaugeAxisComponent
  ],
  exports: [
    GaugeComponent,
    GaugeArcComponent,
    GaugeAxisComponent
  ]
})
export class GaugeModule {}
