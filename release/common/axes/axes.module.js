"use strict";
var core_1 = require('@angular/core');
var axis_label_component_1 = require('./axis-label.component');
var x_axis_component_1 = require('./x-axis.component');
var x_axis_ticks_component_1 = require('./x-axis-ticks.component');
var y_axis_component_1 = require('./y-axis.component');
var y_axis_ticks_component_1 = require('./y-axis-ticks.component');
var common_1 = require('@angular/common');
var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent],
                    exports: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent]
                },] },
    ];
    /** @nocollapse */
    AxesModule.ctorParameters = function () { return []; };
    return AxesModule;
}());
exports.AxesModule = AxesModule;
//# sourceMappingURL=axes.module.js.map