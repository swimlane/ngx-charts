import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BoxChartComponent } from './box-chart.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [BoxChartComponent],
  exports: [BoxChartComponent]
})
export class BoxChartModule {}
