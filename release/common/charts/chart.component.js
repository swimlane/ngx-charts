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
    Chart.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'chart',
                    template: "\n    <div [style.width]=\"view[0] + 'px'\">\n      <svg\n        class=\"ng2d3\"\n        [attr.width]=\"view[0] * chartWidth / 12.0\"\n        [attr.height]=\"view[1]\">\n\n        <ng-content></ng-content>\n      </svg>\n\n      <scale-legend\n        *ngIf=\"legend && legendType === 'scaleLegend'\"\n        class=\"legend\"\n        [valueRange]=\"data\"\n        [colors]=\"legendData\"\n        [height]=\"view[1]\"\n        [width]=\"view[0] * legendWidth / 12.0\">\n      </scale-legend>\n\n      <legend\n        *ngIf=\"legend && legendType === 'legend'\"\n        class=\"legend\"\n        [data]=\"legendData\"\n        [title]=\"legendTitle\"\n        [colors]=\"colors\"\n        [height]=\"view[1]\"\n        [width]=\"view[0] * legendWidth / 12.0\">\n      </legend>\n    </div>\n"
                },] },
    ];
    Chart.ctorParameters = [];
    Chart.propDecorators = {
        'view': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'legendData': [{ type: core_1.Input },],
        'legendTitle': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
    };
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=chart.component.js.map