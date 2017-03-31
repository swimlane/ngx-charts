var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { InjectionRegistery } from './injection-registery.service';
import { TooltipContentComponent } from './tooltip.component';
var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.injectionService = injectionService;
        _this.type = TooltipContentComponent;
        return _this;
    }
    return TooltipService;
}(InjectionRegistery));
export { TooltipService };
TooltipService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TooltipService.ctorParameters = function () { return [
    { type: InjectionService, },
]; };
//# sourceMappingURL=tooltip.service.js.map