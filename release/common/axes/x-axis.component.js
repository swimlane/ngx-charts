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
var x_axis_ticks_component_1 = require("./x-axis-ticks.component");
var XAxisComponent = (function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.xAxisClassName = 'x axis';
        this.xOrient = 'bottom';
        this.labelOffset = 80;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.xAxisOffset = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    return XAxisComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dims", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "showLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "labelText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickInterval", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "xAxisTickCount", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], XAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    core_1.ViewChild(x_axis_ticks_component_1.XAxisTicksComponent),
    __metadata("design:type", x_axis_ticks_component_1.XAxisTicksComponent)
], XAxisComponent.prototype, "ticksComponent", void 0);
XAxisComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-x-axis]',
        template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], XAxisComponent);
exports.XAxisComponent = XAxisComponent;
//# sourceMappingURL=x-axis.component.js.map