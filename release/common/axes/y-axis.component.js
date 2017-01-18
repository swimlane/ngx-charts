"use strict";
var core_1 = require('@angular/core');
var y_axis_ticks_component_1 = require('./y-axis-ticks.component');
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
    YAxisComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-y-axis]',
                    template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-y-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YAxisComponent.ctorParameters = function () { return []; };
    YAxisComponent.propDecorators = {
        'yScale': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'tickFormatting': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'showLabel': [{ type: core_1.Input },],
        'labelText': [{ type: core_1.Input },],
        'yAxisTickInterval': [{ type: core_1.Input },],
        'yAxisTickCount': [{ type: core_1.Input },],
        'dimensionsChanged': [{ type: core_1.Output },],
        'ticksComponent': [{ type: core_1.ViewChild, args: [y_axis_ticks_component_1.YAxisTicksComponent,] },],
    };
    return YAxisComponent;
}());
exports.YAxisComponent = YAxisComponent;
//# sourceMappingURL=y-axis.component.js.map