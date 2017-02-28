import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
export var YAxisComponent = (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'g[ngx-charts-y-axis]',
                    template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-y-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    YAxisComponent.ctorParameters = function () { return []; };
    YAxisComponent.propDecorators = {
        'yScale': [{ type: Input },],
        'dims': [{ type: Input },],
        'tickFormatting': [{ type: Input },],
        'showGridLines': [{ type: Input },],
        'showLabel': [{ type: Input },],
        'labelText': [{ type: Input },],
        'yAxisTickInterval': [{ type: Input },],
        'yAxisTickCount': [{ type: Input },],
        'dimensionsChanged': [{ type: Output },],
        'ticksComponent': [{ type: ViewChild, args: [YAxisTicksComponent,] },],
    };
    return YAxisComponent;
}());
//# sourceMappingURL=y-axis.component.js.map