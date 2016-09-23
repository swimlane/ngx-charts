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
var AxisLabel = (function () {
    function AxisLabel(element) {
        this.element = element.nativeElement;
    }
    AxisLabel.prototype.ngOnChanges = function () {
        this.update();
    };
    AxisLabel.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
            case 'right':
                this.y = this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "height", void 0);
    AxisLabel = __decorate([
        core_1.Component({
            selector: 'g[axisLabel]',
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AxisLabel);
    return AxisLabel;
}());
exports.AxisLabel = AxisLabel;
//# sourceMappingURL=axis-label.component.js.map