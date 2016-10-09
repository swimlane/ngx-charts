"use strict";
var core_1 = require('@angular/core');
var HeatCellSeries = (function () {
    function HeatCellSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    HeatCellSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatCellSeries.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeries.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                var label = cell.name;
                cells.push({
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors(value),
                    data: value,
                    label: label,
                    series: row.name,
                    tooltipText: label + ": " + value
                });
            });
        });
        return cells;
    };
    HeatCellSeries.prototype.click = function (value, label, series) {
        this.clickHandler.emit({
            name: label,
            value: value,
            series: series
        });
    };
    HeatCellSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[heatMapCellSeries]',
                    template: "\n    <svg:g heatMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n\n      swui-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"c.tooltipText\"\n    />\n  "
                },] },
    ];
    HeatCellSeries.ctorParameters = [];
    HeatCellSeries.propDecorators = {
        'data': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return HeatCellSeries;
}());
exports.HeatCellSeries = HeatCellSeries;
//# sourceMappingURL=heat-map-cell-series.component.js.map