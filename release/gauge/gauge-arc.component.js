import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel } from '../common/label.helper';
export var GaugeArcComponent = (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val = formatLabel(arc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    GaugeArcComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-gauge-arc]',
                    template: "\n    <svg:g ngx-charts-pie-arc\n        class=\"background-arc\"\n        [startAngle]=\"0\"\n        [endAngle]=\"backgroundArc.endAngle\"\n        [innerRadius]=\"backgroundArc.innerRadius\"\n        [outerRadius]=\"backgroundArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [data]=\"backgroundArc.data\"\n        [animate]=\"false\"\n        [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"0\"\n        [endAngle]=\"valueArc.endAngle\"\n        [innerRadius]=\"valueArc.innerRadius\"\n        [outerRadius]=\"valueArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"colors.getColor(valueArc.data.name)\"\n        [data]=\"valueArc.data\"\n        [animate]=\"true\"\n        [isActive]=\"isActive\"\n        (select)=\"select.emit($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipText(valueArc)\">\n    </svg:g>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    GaugeArcComponent.ctorParameters = function () { return []; };
    GaugeArcComponent.propDecorators = {
        'backgroundArc': [{ type: Input },],
        'valueArc': [{ type: Input },],
        'cornerRadius': [{ type: Input },],
        'colors': [{ type: Input },],
        'isActive': [{ type: Input },],
        'tooltipDisabled': [{ type: Input },],
        'select': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
    };
    return GaugeArcComponent;
}());
//# sourceMappingURL=gauge-arc.component.js.map