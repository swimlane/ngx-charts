import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BubbleChartComponent } from './bubble-chart.component';
import { BubbleSeriesComponent } from './bubble-series.component';

export { BubbleChartComponent, BubbleSeriesComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    BubbleChartComponent,
    BubbleSeriesComponent
  ],
  exports: [
    BubbleChartComponent,
    BubbleSeriesComponent
  ]
})
export class BubbleChartModule {}
