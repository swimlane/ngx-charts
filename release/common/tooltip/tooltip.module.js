"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tooltip_directive_1 = require("./tooltip.directive");
var tooltip_component_1 = require("./tooltip.component");
var tooltip_service_1 = require("./tooltip.service");
var services_1 = require("../../services");
var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
TooltipModule = __decorate([
    core_1.NgModule({
        declarations: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
        providers: [services_1.InjectionService, tooltip_service_1.TooltipService],
        exports: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
        imports: [common_1.CommonModule],
        entryComponents: [tooltip_component_1.TooltipContentComponent]
    })
], TooltipModule);
exports.TooltipModule = TooltipModule;
//# sourceMappingURL=tooltip.module.js.map