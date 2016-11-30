import { NgModule } from '@angular/core';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';
import { CommonModule } from '../common/common.module';

export { ForceDirectedGraphComponent };

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForceDirectedGraphComponent,
  ],
  exports: [
    ForceDirectedGraphComponent,
  ]
})
export class ForceDirectedGraphModule {}
