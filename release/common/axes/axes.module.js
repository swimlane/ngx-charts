"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var axis_label_component_1 = require("./axis-label.component");
var x_axis_component_1 = require("./x-axis.component");
var x_axis_ticks_component_1 = require("./x-axis-ticks.component");
var y_axis_component_1 = require("./y-axis.component");
var y_axis_ticks_component_1 = require("./y-axis-ticks.component");
var platform_browser_1 = require("@angular/platform-browser");
var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [axis_label_component_1.AxisLabel, x_axis_component_1.XAxis, x_axis_ticks_component_1.XAxisTicks, y_axis_component_1.YAxis, y_axis_ticks_component_1.YAxisTicks],
            exports: [axis_label_component_1.AxisLabel, x_axis_component_1.XAxis, x_axis_ticks_component_1.XAxisTicks, y_axis_component_1.YAxis, y_axis_ticks_component_1.YAxisTicks]
        }), 
        __metadata('design:paramtypes', [])
    ], AxesModule);
    return AxesModule;
}());
exports.AxesModule = AxesModule;
//# sourceMappingURL=axes.module.js.map