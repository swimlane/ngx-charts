import {NgModule} from "@angular/core";
import {CommonModule} from "../common/common.module";
import {AdvancedPieChart} from "./advanced-pie-chart.component";
import {PieLabel} from "./pie-label.component";
import {PieArc} from "./pie-arc.component";
import {PieChart} from "./pie-chart.component";
import {PieGrid} from "./pie-grid.component";
import {PieGridSeries} from "./pie-crid-series.component";
import {PieSeries} from "./pie-series.component";

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
