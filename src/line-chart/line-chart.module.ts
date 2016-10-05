import {NgModule} from "@angular/core";
import {CommonModule} from "../common/common.module";
import {Line} from "./line.component";
import {LineChart} from "./line-chart.component";
import {LineSeries} from "./line-series.component";

export { Line, LineChart, LineSeries };

@NgModule({
  imports: [CommonModule],
  declarations: [
    Line,
    LineChart,
    LineSeries
  ],
  exports: [
    Line,
    LineChart,
    LineSeries
  ]
})
export class LineChartModule {}
