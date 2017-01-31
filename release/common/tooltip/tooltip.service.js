"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var services_1 = require('../../services');
var _1 = require('.');
var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        _super.call(this, injectionService);
        this.injectionService = injectionService;
        this.type = _1.TooltipContentComponent;
    }
    TooltipService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TooltipService.ctorParameters = function () { return [
        { type: services_1.InjectionService, },
    ]; };
    return TooltipService;
}(services_1.InjectionRegistery));
exports.TooltipService = TooltipService;
//# sourceMappingURL=tooltip.service.js.map