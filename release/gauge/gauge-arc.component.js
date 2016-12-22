"use strict";
var core_1 = require('@angular/core');
var GaugeArcComponent = (function () {
    function GaugeArcComponent() {
        this.select = new core_1.EventEmitter();
    }
    GaugeArcComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-gauge-arc]',
                    template: "\n    <svg:g ngx-charts-pie-arc\n        class=\"background-arc\"\n        [startAngle]=\"0\"\n        [endAngle]=\"backgroundArc.endAngle\"\n        [innerRadius]=\"backgroundArc.innerRadius\"\n        [outerRadius]=\"backgroundArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [data]=\"backgroundArc.data\"\n        [animate]=\"false\"\n        [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"0\"\n        [endAngle]=\"valueArc.endAngle\"\n        [innerRadius]=\"valueArc.innerRadius\"\n        [outerRadius]=\"valueArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"colors.getColor(valueArc.data.value)\"\n        [data]=\"valueArc.data\"\n        [animate]=\"true\"\n        (select)=\"select.emit($event)\">\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    GaugeArcComponent.ctorParameters = function () { return []; };
    GaugeArcComponent.propDecorators = {
        'backgroundArc': [{ type: core_1.Input },],
        'valueArc': [{ type: core_1.Input },],
        'cornerRadius': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
    };
    return GaugeArcComponent;
}());
exports.GaugeArcComponent = GaugeArcComponent;
//# sourceMappingURL=gauge-arc.component.js.map