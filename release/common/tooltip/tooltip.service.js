"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var injection_service_1 = require('./injection.service');
var injection_registery_service_1 = require('./injection-registery.service');
var tooltip_component_1 = require('./tooltip.component');
var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        _super.call(this, injectionService);
        this.injectionService = injectionService;
        this.type = tooltip_component_1.TooltipContentComponent;
    }
    TooltipService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TooltipService.ctorParameters = function () { return [
        { type: injection_service_1.InjectionService, },
    ]; };
    return TooltipService;
}(injection_registery_service_1.InjectionRegistery));
exports.TooltipService = TooltipService;
//# sourceMappingURL=tooltip.service.js.map