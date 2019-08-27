import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineSeriesComponent } from './line-series.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    LineComponent,
    LineChartComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineChartComponent,
    LineSeriesComponent
  ]
})
export class LineChartModule {}
