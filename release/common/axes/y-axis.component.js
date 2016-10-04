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
    YAxis.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[yAxis]',
                    template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g yAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [height]=\"dims.height\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
                },] },
    ];
    YAxis.ctorParameters = [];
    YAxis.propDecorators = {
        'yScale': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'tickFormatting': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'showLabel': [{ type: core_1.Input },],
        'labelText': [{ type: core_1.Input },],
        'yAxisTickInterval': [{ type: core_1.Input },],
    };
    return YAxis;
}());
exports.YAxis = YAxis;
//# sourceMappingURL=y-axis.component.js.map