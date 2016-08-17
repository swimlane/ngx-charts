import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {Line} from "./Line";
import {LineChart} from "./LineChart";
import {LineChart2D} from "./LineChart2D";
import {LineSeries} from "./LineSeries";

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
