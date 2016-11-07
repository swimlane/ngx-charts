"use strict";
var core_1 = require('@angular/core');
var GridPanelSeries = (function () {
    function GridPanelSeries() {
    }
    GridPanelSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    GridPanelSeries.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeries.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d, i) {
            var color = 'rgba(255,255,255,0.02)';
            var offset, width, height, x, y;
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = _this.xScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.xScale.range()[0] / 2;
                width = _this.xScale.bandwidth() + 2 * offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = _this.yScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.yScale.range()[0] / 2;
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + 2 * offset;
                x = 0;
                y = _this.yScale(d.name) - offset;
            }
            return {
                name: d.name,
                color: color,
                offset: offset,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    GridPanelSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[gridPanelSeries]',
                    template: "\n    <svg:g gridPanel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [fill]=\"gridPanel.color\">\n    </svg:g>\n  "
                },] },
    ];
    GridPanelSeries.ctorParameters = [];
    GridPanelSeries.propDecorators = {
        'data': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'orient': [{ type: core_1.Input },],
    };
    return GridPanelSeries;
}());
exports.GridPanelSeries = GridPanelSeries;
//# sourceMappingURL=grid-panel-series.component.js.map