"use strict";
var core_1 = require("@angular/core");
var force_directed_graph_component_1 = require("./force-directed-graph.component");
exports.ForceDirectedGraph = force_directed_graph_component_1.ForceDirectedGraph;
var common_module_1 = require("../common/common.module");
var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    ForceDirectedGraphModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
                    declarations: [
                        force_directed_graph_component_1.ForceDirectedGraph,
                    ],
                    exports: [
                        force_directed_graph_component_1.ForceDirectedGraph,
                    ]
                },] },
    ];
    /** @nocollapse */
    ForceDirectedGraphModule.ctorParameters = [];
    return ForceDirectedGraphModule;
}());
exports.ForceDirectedGraphModule = ForceDirectedGraphModule;
//# sourceMappingURL=force-directed-graph.module.js.map