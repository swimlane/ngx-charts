import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { Gauge } from "./gauge.component";
import { PieChartModule } from "../pie-chart/pie-chart.module";

export { Gauge };

@NgModule({
  imports: [CommonModule, PieChartModule],
  declarations: [
    Gauge
  ],
  exports: [
    Gauge
  ]
})
export class GaugeModule {}
