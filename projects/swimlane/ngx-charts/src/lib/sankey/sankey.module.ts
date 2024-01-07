import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { SankeyComponent } from './sankey.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [SankeyComponent],
  exports: [SankeyComponent]
})
export class SankeyModule {}
