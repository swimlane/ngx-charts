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
var Circle = (function () {
    function Circle() {
        this.clickHandler = new core_1.EventEmitter();
    }
    Circle.prototype.ngOnChanges = function () {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    Circle.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "r", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "classNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "circleOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "pointerEvents", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "clickHandler", void 0);
    Circle = __decorate([
        core_1.Component({
            selector: 'g[circle]',
            template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Circle);
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=circle.component.js.map