import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
export var XAxisComponent = (function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'g[ngx-charts-x-axis]',
                    template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    XAxisComponent.ctorParameters = function () { return []; };
    XAxisComponent.propDecorators = {
        'xScale': [{ type: Input },],
        'dims': [{ type: Input },],
        'tickFormatting': [{ type: Input },],
        'showGridLines': [{ type: Input },],
        'showLabel': [{ type: Input },],
        'labelText': [{ type: Input },],
        'xAxisTickInterval': [{ type: Input },],
        'xAxisTickCount': [{ type: Input },],
        'dimensionsChanged': [{ type: Output },],
        'ticksComponent': [{ type: ViewChild, args: [XAxisTicksComponent,] },],
    };
    return XAxisComponent;
}());
//# sourceMappingURL=x-axis.component.js.map