var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
var GaugeArcComponent = /** @class */ (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "backgroundArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "valueArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ColorHelper)
    ], GaugeArcComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "isActive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], GaugeArcComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "deactivate", void 0);
    GaugeArcComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-gauge-arc]',
            template: "\n    <svg:g ngx-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"animations\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());
export { GaugeArcComponent };
//# sourceMappingURL=gauge-arc.component.js.map