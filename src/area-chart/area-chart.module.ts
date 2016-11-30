import { NgModule } from "@angular/core";
import { AreaChartComponent } from "./area-chart.component";
import { AreaChartNormalizedComponent } from "./area-chart-normalized.component";
import { AreaChartStackedComponent } from "./area-chart-stacked.component";
import { AreaSeriesComponent } from "./area-series.component";
import { CommonModule } from "../common/common.module";

export { AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent }

@NgModule({
  imports: [CommonModule],
  declarations: [
    AreaChartComponent,
    AreaChartNormalizedComponent,
    AreaChartStackedComponent,
    AreaSeriesComponent
  ],
  exports: [
    AreaChartComponent,
    AreaChartNormalizedComponent,
    AreaChartStackedComponent,
    AreaSeriesComponent
  ]
})
export class AreaChartModule {}
