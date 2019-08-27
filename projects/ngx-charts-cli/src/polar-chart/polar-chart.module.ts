import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';

@NgModule({
  imports: [ChartCommonModule, PieChartModule, LineChartModule],
  declarations: [
    PolarChartComponent,
    PolarSeriesComponent
  ],
  exports: [
    PolarChartComponent,
    PolarSeriesComponent
  ]
})
export class PolarChartModule {}
