"use strict";
var core_1 = require('@angular/core');
var y_axis_ticks_component_1 = require('./y-axis-ticks.component');
var YAxis = (function () {
    function YAxis() {
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.labelOffset = 80;
        Object.assign(this, {
            yAxisClassName: 'y axis',
            yOrient: 'left',
            fill: 'none',
            stroke: '#ccc',
            tickStroke: '#ccc',
            strokeWidth: '1',
            yAxisOffset: -5
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
    };
    YAxis.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    YAxis.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[yAxis]',
                    template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g yAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YAxis.ctorParameters = [];
    YAxis.propDecorators = {
        'yScale': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'tickFormatting': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'showLabel': [{ type: core_1.Input },],
        'labelText': [{ type: core_1.Input },],
        'yAxisTickInterval': [{ type: core_1.Input },],
        'dimensionsChanged': [{ type: core_1.Output },],
        'ticksComponent': [{ type: core_1.ViewChild, args: [y_axis_ticks_component_1.YAxisTicks,] },],
    };
    return YAxis;
}());
exports.YAxis = YAxis;
//# sourceMappingURL=y-axis.component.js.map