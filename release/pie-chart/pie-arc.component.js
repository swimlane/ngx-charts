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
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var object_id_1 = require("../utils/object-id");
var PieArc = (function () {
    function PieArc(element) {
        this.initialized = false;
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieArc.prototype.ngOnChanges = function () {
        this.update();
    };
    PieArc.prototype.update = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.3;
        var pageUrl = window.location.href;
        this.radialGradientId = 'linearGrad' + object_id_1.default().toString();
        this.linearGradientId = 'radialGrad' + object_id_1.default().toString();
        if (this.innerRadius !== 0) {
            this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        }
        else {
            this.gradientFill = "url(" + pageUrl + "#" + this.linearGradientId + ")";
        }
        if (this.initialized) {
            this.updateAnimation();
        }
        else {
            this.loadAnimation();
            this.initialized = true;
        }
    };
    PieArc.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return d3_1.default.arc()
            .innerRadius(this.innerRadius).outerRadius(outerRadius);
    };
    PieArc.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArc.prototype.updateAnimation = function () {
        var node = d3_1.default.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArc.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "endAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "total", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArc.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "clickHandler", void 0);
    PieArc = __decorate([
        core_1.Component({
            selector: 'g[pieArc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"linearGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n        <svg:g svgRadialGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [style.cursor]=\"'pointer'\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"click()\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieArc);
    return PieArc;
}());
exports.PieArc = PieArc;
//# sourceMappingURL=pie-arc.component.js.map