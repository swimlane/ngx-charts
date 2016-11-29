"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var registry_service_1 = require('../../utils/registry.service');
var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService() {
        _super.apply(this, arguments);
    }
    TooltipService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TooltipService.ctorParameters = [];
    return TooltipService;
}(registry_service_1.RegistryService));
exports.TooltipService = TooltipService;
//# sourceMappingURL=tooltip.service.js.map