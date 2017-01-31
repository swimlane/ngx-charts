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
var CircleComponent = (function () {
    function CircleComponent() {
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    return CircleComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cx", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "cy", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "r", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "stroke", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "classNames", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "circleOpacity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "pointerEvents", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CircleComponent.prototype, "deactivate", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onClick", null);
__decorate([
    core_1.HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircleComponent.prototype, "onMouseLeave", null);
CircleComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-circle]',
        template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], CircleComponent);
exports.CircleComponent = CircleComponent;
//# sourceMappingURL=circle.component.js.map