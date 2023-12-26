import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TimelineChartComponent } from './timeline-chart.component';
import { TimelineSeriesComponent } from './timeline-series.component';
import { TimelineBarComponent } from './timeline-bar.component';
import { BarChartModule } from '../bar-chart/bar-chart.module';

@NgModule({
  imports: [ChartCommonModule, BarChartModule],
  declarations: [
    TimelineChartComponent,
    TimelineSeriesComponent,
    TimelineBarComponent
  ],
  exports: [
    TimelineChartComponent,
    TimelineSeriesComponent,
    TimelineBarComponent
  ]
})
export class TimelineChartModule {}
