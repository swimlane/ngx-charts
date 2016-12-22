"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var tooltip_directive_1 = require('./tooltip.directive');
var tooltip_component_1 = require('./tooltip.component');
var tooltip_service_1 = require('./tooltip.service');
var services_1 = require('../../services');
var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
                    providers: [services_1.InjectionService, tooltip_service_1.TooltipService],
                    exports: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
                    imports: [common_1.CommonModule],
                    entryComponents: [tooltip_component_1.TooltipContentComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());
exports.TooltipModule = TooltipModule;
//# sourceMappingURL=tooltip.module.js.map