"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var axis_label_component_1 = require("./axis-label.component");
var x_axis_component_1 = require("./x-axis.component");
var x_axis_ticks_component_1 = require("./x-axis-ticks.component");
var y_axis_component_1 = require("./y-axis.component");
var y_axis_ticks_component_1 = require("./y-axis-ticks.component");
var common_1 = require("@angular/common");
var AxesModule = (function () {
    function AxesModule() {
    }
    return AxesModule;
}());
AxesModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent],
        exports: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent]
    })
], AxesModule);
exports.AxesModule = AxesModule;
//# sourceMappingURL=axes.module.js.map