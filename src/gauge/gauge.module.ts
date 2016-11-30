import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { GaugeComponent } from "./gauge.component";
import { PieChartModule } from "../pie-chart/pie-chart.module";

export { GaugeComponent };

@NgModule({
  imports: [CommonModule, PieChartModule],
  declarations: [
    GaugeComponent
  ],
  exports: [
    GaugeComponent
  ]
})
export class GaugeModule {}
