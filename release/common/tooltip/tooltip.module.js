import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { InjectionService } from './injection.service';
var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
export { TooltipModule };
TooltipModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TooltipContentComponent, TooltipDirective],
                providers: [InjectionService, TooltipService],
                exports: [TooltipContentComponent, TooltipDirective],
                imports: [CommonModule],
                entryComponents: [TooltipContentComponent]
            },] },
];
/** @nocollapse */
TooltipModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tooltip.module.js.map