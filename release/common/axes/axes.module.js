import { NgModule } from '@angular/core';
import { AxisLabelComponent } from './axis-label.component';
import { XAxisComponent } from './x-axis.component';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { YAxisComponent } from './y-axis.component';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import { CommonModule } from '@angular/common';
export var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent],
                    exports: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent]
                },] },
    ];
    /** @nocollapse */
    AxesModule.ctorParameters = function () { return []; };
    return AxesModule;
}());
//# sourceMappingURL=axes.module.js.map