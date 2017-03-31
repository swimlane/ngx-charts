import { NgModule } from '@angular/core';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';
import { ChartCommonModule } from '../common/chart-common.module';

export { ForceDirectedGraphComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    ForceDirectedGraphComponent,
  ],
  exports: [
    ForceDirectedGraphComponent,
  ]
})
export class ForceDirectedGraphModule {}
