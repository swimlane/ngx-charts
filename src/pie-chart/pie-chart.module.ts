import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { AdvancedPieChartComponent } from "./advanced-pie-chart.component";
import { PieLabelComponent } from "./pie-label.component";
import { PieArcComponent } from "./pie-arc.component";
import { PieChartComponent } from "./pie-chart.component";
import { PieGridComponent } from "./pie-grid.component";
import { PieGridSeriesComponent } from "./pie-grid-series.component";
import { PieSeriesComponent } from "./pie-series.component";

export { AdvancedPieChartComponent, PieLabelComponent, PieArcComponent, PieChartComponent, PieGridComponent, PieGridSeriesComponent, PieSeriesComponent };

@NgModule({
  imports: [CommonModule],
  declarations: [
    AdvancedPieChartComponent,
    PieLabelComponent,
    PieArcComponent,
    PieChartComponent,
    PieGridComponent,
    PieGridSeriesComponent,
    PieSeriesComponent
  ],
  exports: [
    AdvancedPieChartComponent,
    PieLabelComponent,
    PieArcComponent,
    PieChartComponent,
    PieGridComponent,
    PieGridSeriesComponent,
    PieSeriesComponent
  ]
})
export class PieChartModule {}
