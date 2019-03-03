import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartComponent } from './line-chart.component';
import { LineChartWithIconsComponent } from './line-chart-with-icons.component';
import { LineSeriesComponent } from './line-series.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    LineComponent,
    LineChartComponent,
    LineChartWithIconsComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineChartComponent,
    LineChartWithIconsComponent,
    LineSeriesComponent
  ]
})
export class LineChartModule {}
