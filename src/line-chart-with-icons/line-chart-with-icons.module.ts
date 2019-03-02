import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LineComponent } from './line.component';
import { LineChartWithIconsComponent } from './line-chart-with-icons.component';
import { LineSeriesComponent } from './line-series.component';


@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    LineComponent,
    LineChartWithIconsComponent,
    LineSeriesComponent
  ],
  exports: [
    LineComponent,
    LineChartWithIconsComponent,
    LineSeriesComponent
  ]
})
export class LineChartWithIconsModule {}
