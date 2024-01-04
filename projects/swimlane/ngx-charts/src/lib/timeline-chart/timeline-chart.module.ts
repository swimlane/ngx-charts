import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TimelineChartComponent } from './timeline-chart.component';
import { TimelineSeriesComponent } from './timeline-series.component';
import { TimelineBarComponent } from './timeline-bar.component';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import { TimelineStackedComponent } from './timeline-stacked-chart.component';

@NgModule({
  imports: [ChartCommonModule, BarChartModule],
  declarations: [
    TimelineChartComponent,
    TimelineStackedComponent,
    TimelineSeriesComponent,
    TimelineBarComponent
  ],
  exports: [
    TimelineChartComponent,
    TimelineStackedComponent,
    TimelineSeriesComponent,
    TimelineBarComponent
  ]
})
export class TimelineChartModule {}
