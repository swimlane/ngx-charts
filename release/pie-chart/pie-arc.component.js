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
var common_1 = require("@angular/common");
var d3_1 = require("../d3");
var id_1 = require("../utils/id");
var PieArcComponent = (function () {
    function PieArcComponent(element, location) {
        this.location = location;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.update = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.5;
        var pageUrl = this.location.path();
        this.radialGradientId = 'linearGrad' + id_1.id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return d3_1.default.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
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
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = d3_1.default.select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    return PieArcComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "startAngle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "endAngle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "innerRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "outerRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PieArcComponent.prototype, "cornerRadius", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "explodeSlices", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "animate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "pointerEvents", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieArcComponent.prototype, "isActive", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PieArcComponent.prototype, "deactivate", void 0);
PieArcComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-pie-arc]',
        template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"onClick()\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"pointerEvents ? 'auto' : 'none'\"\n      />\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, common_1.Location])
], PieArcComponent);
exports.PieArcComponent = PieArcComponent;
//# sourceMappingURL=pie-arc.component.js.map