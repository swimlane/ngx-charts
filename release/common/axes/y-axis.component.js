"use strict";
var core_1 = require('@angular/core');
var YAxis = (function () {
    function YAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            yAxisClassName: 'y axis',
            yOrient: 'left',
            fill: 'none',
            stroke: '#ccc',
            tickStroke: '#ccc',
            strokeWidth: '1',
            yAxisOffset: -5,
        });
    }
    YAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxis.prototype.update = function () {
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
        if (typeof this.yAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yAxisTickInterval", void 0);
    YAxis = __decorate([
        core_1.Component({
            selector: 'g[yAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g yAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [height]=\"dims.height\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YAxis);
    return YAxis;
}());
exports.YAxis = YAxis;
//# sourceMappingURL=y-axis.component.js.map