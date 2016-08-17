import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {AdvancedPieChart} from "./AdvancedPieChart";
import {PieLabel} from "./PieLabel";
import {PieArc} from "./PieArc";
import {PieChart} from "./PieChart";
import {PieGrid} from "./PieGrid";
import {PieGridSeries} from "./PieGridSeries";
import {PieSeries} from "./PieSeries";

@NgModule({
  imports: [CommonModule],
  declarations: [
    AdvancedPieChart,
    PieLabel,
    PieArc,
    PieChart,
    PieGrid,
    PieGridSeries,
    PieSeries
  ],
  exports: [
    AdvancedPieChart,
    PieLabel,
    PieArc,
    PieChart,
    PieGrid,
    PieGridSeries,
    PieSeries
  ]
})
export class PieChartModule {}
