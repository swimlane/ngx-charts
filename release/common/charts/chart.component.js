"use strict";
var core_1 = require('@angular/core');
var Chart = (function () {
    function Chart() {
        this.legend = false;
        this.legendTitle = 'Legend';
    }
    Chart.prototype.ngOnChanges = function () {
        this.update();
    };
    Chart.prototype.update = function () {
        this.legendWidth = 0;
        if (this.legend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                this.legendWidth = 1;
            }
            else {
                this.legendWidth = 3;
            }
        }
        this.chartWidth = 12 - this.legendWidth;
    };
    Chart.prototype.getLegendType = function () {
        if (typeof this.legendData === 'function') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "colors", void 0);
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            template: "\n    <svg\n      class=\"ng2d3\"\n      [attr.width]=\"view[0] * chartWidth / 12.0\"\n      [attr.height]=\"view[1]\">\n\n      <ng-content></ng-content>\n    </svg>\n\n    <scale-legend\n      *ngIf=\"legend && legendType === 'scaleLegend'\"\n      class=\"legend\"\n      [valueRange]=\"data\"\n      [colors]=\"legendData\"\n      [height]=\"view[1]\">\n    </scale-legend>\n\n    <legend\n      *ngIf=\"legend && legendType === 'legend'\"\n      class=\"legend\"\n      [data]=\"legendData\"\n      [title]=\"legendTitle\"\n      [colors]=\"colors\"\n      [height]=\"view[1]\">\n    </legend>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=chart.component.js.map