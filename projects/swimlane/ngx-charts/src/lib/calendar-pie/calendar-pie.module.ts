import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { CalendarPieCellComponent } from './calendar-pie-cell.component';
import { CalendarPieCellSeriesComponent } from './calendar-pie-cell-series.component';
import { CalendarPieComponent } from './calendar-pie.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [CalendarPieCellComponent, CalendarPieCellSeriesComponent, CalendarPieComponent],
  exports: [CalendarPieCellComponent, CalendarPieCellSeriesComponent, CalendarPieComponent]
})
export class CalendarPieModule {}
