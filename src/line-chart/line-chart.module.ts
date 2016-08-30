import {NgModule} from "@angular/core";
import {CommonModule} from "../common/common.module";
import {Line} from "./line.component";
import {LineChart} from "./line-chart.component";
import {LineChart2D} from "./line-chart-2d.component";
import {LineSeries} from "./line-series.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    Line,
    LineChart,
    LineChart2D,
    LineSeries
  ],
  exports: [
    Line,
    LineChart,
    LineChart2D,
    LineSeries
  ]
})
export class LineChartModule {}
