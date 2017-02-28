var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { InjectionRegistery } from './injection-registery.service';
import { TooltipContentComponent } from './tooltip.component';
export var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        _super.call(this, injectionService);
        this.injectionService = injectionService;
        this.type = TooltipContentComponent;
    }
    TooltipService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TooltipService.ctorParameters = function () { return [
        { type: InjectionService, },
    ]; };
    return TooltipService;
}(InjectionRegistery));
//# sourceMappingURL=tooltip.service.js.map