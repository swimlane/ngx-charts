import {NgModule} from "@angular/core";
import {AreaChart} from "./area-chart.component";
import {AreaChartNormalized} from "./area-chart-normalized.component";
import {AreaChartStacked} from "./area-chart-stacked.component";
import {AreaSeries} from "./area-series.component";
import {CommonModule} from "../common/common.module";

export { AreaChart, AreaChartNormalized, AreaChartStacked, AreaSeries }

@NgModule({
  imports: [CommonModule],
  declarations: [
    AreaChart,
    AreaChartNormalized,
    AreaChartStacked,
    AreaSeries
  ],
  exports: [
    AreaChart,
    AreaChartNormalized,
    AreaChartStacked,
    AreaSeries
  ]
})
export class AreaChartModule {}
