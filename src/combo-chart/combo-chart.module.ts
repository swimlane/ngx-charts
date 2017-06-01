import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { ComboChartComponent } from './combo-chart.component';
import { ComboSeriesVerticalComponent } from './combo-series-vertical.component';
import { RightYAxisComponent } from './axes/right-y-axis.component';
import { RightYAxisTicksComponent } from './axes/right-y-ticks.component';

import { LineChartModule } from '../line-chart/';
import { BarChartModule } from '../bar-chart/';

export { ComboChartComponent,
        ComboSeriesVerticalComponent,
        RightYAxisComponent,
        RightYAxisTicksComponent };

@NgModule({
  imports: [ChartCommonModule,
    LineChartModule,
    BarChartModule,
    ],
  declarations: [
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    RightYAxisComponent,
    RightYAxisTicksComponent
  ],
  exports: [
    ComboChartComponent
  ]
})
export class ComboChartModule {}
