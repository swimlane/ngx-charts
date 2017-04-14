import { NgModule } from '@angular/core';
import { ForceDirectedGraphComponent } from './force-directed-graph.component';
import { ChartCommonModule } from '../common/chart-common.module';
export { ForceDirectedGraphComponent };
var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    return ForceDirectedGraphModule;
}());
export { ForceDirectedGraphModule };
ForceDirectedGraphModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    ForceDirectedGraphComponent,
                ],
                exports: [
                    ForceDirectedGraphComponent,
                ]
            },] },
];
/** @nocollapse */
ForceDirectedGraphModule.ctorParameters = function () { return []; };
//# sourceMappingURL=force-directed-graph.module.js.map