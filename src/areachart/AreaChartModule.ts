import {NgModule} from "@angular/core";
import {AreaChart} from "./AreaChart";
import {AreaChartNormalized} from "./AreaChartNormalized";
import {AreaChartStacked} from "./AreaChartStacked";
import {AreaSeries} from "./AreaSeries";
import {CommonModule} from "../common/CommonModule";

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
