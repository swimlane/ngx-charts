import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@soeren_balke/ngx-charts//common/chart-common.module';
import { BubbleChartInteractiveComponent } from './bubble-chart-interactive.component';
import { BubbleSeriesInteractiveComponent } from './bubble-series-interactive.component';

export { BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent],
  exports: [BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent]
})
export class BubbleChartInteractiveModule {}
