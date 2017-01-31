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
var label_helper_1 = require("../common/label.helper");
var color_helper_1 = require("../common/color.helper");
var GaugeArcComponent = (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = label_helper_1.formatLabel(arc.data.name);
        var val = label_helper_1.formatLabel(arc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    return GaugeArcComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "backgroundArc", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "valueArc", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", color_helper_1.ColorHelper)
], GaugeArcComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GaugeArcComponent.prototype, "isActive", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GaugeArcComponent.prototype, "deactivate", void 0);
GaugeArcComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-gauge-arc]',
        template: "\n    <svg:g ngx-charts-pie-arc\n        class=\"background-arc\"\n        [startAngle]=\"0\"\n        [endAngle]=\"backgroundArc.endAngle\"\n        [innerRadius]=\"backgroundArc.innerRadius\"\n        [outerRadius]=\"backgroundArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [data]=\"backgroundArc.data\"\n        [animate]=\"false\"\n        [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"0\"\n        [endAngle]=\"valueArc.endAngle\"\n        [innerRadius]=\"valueArc.innerRadius\"\n        [outerRadius]=\"valueArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"colors.getColor(valueArc.data.name)\"\n        [data]=\"valueArc.data\"\n        [animate]=\"true\"\n        [isActive]=\"isActive\"\n        (select)=\"select.emit($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        ngx-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipText(valueArc)\">\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    })
], GaugeArcComponent);
exports.GaugeArcComponent = GaugeArcComponent;
//# sourceMappingURL=gauge-arc.component.js.map