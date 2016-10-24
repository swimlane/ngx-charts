import {NgModule} from "@angular/core";
import {ForceDirectedGraph} from "./force-directed-graph.component";
import {CommonModule} from "../common/common.module";

export {ForceDirectedGraph}

@NgModule({
  imports: [CommonModule],
  declarations: [
    ForceDirectedGraph,
  ],
  exports: [
    ForceDirectedGraph,
  ]
})
export class ForceDirectedGraphModule {}
