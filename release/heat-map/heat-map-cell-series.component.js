"use strict";
var core_1 = require('@angular/core');
var HeatCellSeriesComponent = (function () {
    function HeatCellSeriesComponent() {
        this.clickHandler = new core_1.EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                var label = cell.name;
                var tooltipLabel = label;
                if (tooltipLabel.constructor.name === 'Date') {
                    tooltipLabel = tooltipLabel.toLocaleDateString();
                }
                cells.push({
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors(value),
                    data: value,
                    label: label,
                    series: row.name,
                    tooltipText: tooltipLabel + ": " + value.toLocaleString()
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (value, label, series) {
        this.clickHandler.emit({
            name: label,
            value: value,
            series: series
        });
    };
    HeatCellSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[heatMapCellSeries]',
                    template: "\n    <svg:g heatMapCell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (clickHandler)=\"onClick($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n      swui-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"c.tooltipText\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    HeatCellSeriesComponent.ctorParameters = [];
    HeatCellSeriesComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return HeatCellSeriesComponent;
}());
exports.HeatCellSeriesComponent = HeatCellSeriesComponent;
//# sourceMappingURL=heat-map-cell-series.component.js.map