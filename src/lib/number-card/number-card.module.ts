import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { CardComponent } from './card.component';
import { CardSeriesComponent } from './card-series.component';
import { NumberCardComponent } from './number-card.component';

export { CardComponent, CardSeriesComponent, NumberCardComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    CardComponent,
    CardSeriesComponent,
    NumberCardComponent
  ],
  exports: [
    CardComponent,
    CardSeriesComponent,
    NumberCardComponent
  ]
})
export class NumberCardModule {}
