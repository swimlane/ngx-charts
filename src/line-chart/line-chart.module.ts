import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { LineComponent } from "./line.component";
import { LineChartComponent } from "./line-chart.component";
import { LineSeriesComponent } from "./line-series.component";

export { LineComponent, LineChartComponent, LineSeriesComponent };

@NgModule({
  imports: [CommonModule],
  declarations: [
    LineComponent,
    LineChartComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineChartComponent,
    LineSeriesComponent
  ]
})
export class LineChartModule {}
