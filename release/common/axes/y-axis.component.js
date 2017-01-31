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
var y_axis_ticks_component_1 = require("./y-axis-ticks.component");
var YAxisComponent = (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.yAxisClassName = 'y axis';
        this.yAxisOffset = -5;
        this.yOrient = 'left';
        this.labelOffset = 80;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = this.yAxisOffset;
        if (this.yOrient === 'right') {
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    return YAxisComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dims", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "tickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showGridLines", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "showLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "labelText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickInterval", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "yAxisTickCount", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], YAxisComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    core_1.ViewChild(y_axis_ticks_component_1.YAxisTicksComponent),
    __metadata("design:type", y_axis_ticks_component_1.YAxisTicksComponent)
], YAxisComponent.prototype, "ticksComponent", void 0);
YAxisComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-y-axis]',
        template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-y-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], YAxisComponent);
exports.YAxisComponent = YAxisComponent;
//# sourceMappingURL=y-axis.component.js.map