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
var XAxis = (function () {
    function XAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            xAxisClassName: 'x axis',
            xOrient: 'bottom',
            fill: 'none',
            stroke: 'none',
            tickStroke: '#ccc',
            strokeWidth: 'none',
            xAxisOffset: 5,
        });
    }
    XAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    XAxis.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
        if (typeof this.xAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xAxisTickInterval", void 0);
    XAxis = __decorate([
        core_1.Component({
            selector: 'g[xAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g xAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], XAxis);
    return XAxis;
}());
exports.XAxis = XAxis;
//# sourceMappingURL=x-axis.component.js.map