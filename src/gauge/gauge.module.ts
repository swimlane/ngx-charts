import { NgModule } from "@angular/core";
import { ChartCommonModule } from "../common/chart-common.module";
import { GaugeComponent } from "./gauge.component";
import { PieChartModule } from "../pie-chart/pie-chart.module";

export { GaugeComponent };

@NgModule({
  imports: [ChartCommonModule, PieChartModule],
  declarations: [
    GaugeComponent
  ],
  exports: [
    GaugeComponent
  ]
})
export class GaugeModule {}
