"use strict";
var core_1 = require('@angular/core');
var x_axis_ticks_component_1 = require('./x-axis-ticks.component');
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
    XAxisComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-x-axis]',
                    template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    XAxisComponent.ctorParameters = function () { return []; };
    XAxisComponent.propDecorators = {
        'xScale': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'tickFormatting': [{ type: core_1.Input },],
        'showGridLines': [{ type: core_1.Input },],
        'showLabel': [{ type: core_1.Input },],
        'labelText': [{ type: core_1.Input },],
        'xAxisTickInterval': [{ type: core_1.Input },],
        'xAxisTickCount': [{ type: core_1.Input },],
        'dimensionsChanged': [{ type: core_1.Output },],
        'ticksComponent': [{ type: core_1.ViewChild, args: [x_axis_ticks_component_1.XAxisTicksComponent,] },],
    };
    return XAxisComponent;
}());
exports.XAxisComponent = XAxisComponent;
//# sourceMappingURL=x-axis.component.js.map