import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export var HeatCellSeriesComponent = (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
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
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: label,
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + series + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (value, label, series) {
        this.select.emit({
            name: label,
            value: value,
            series: series
        });
    };
    HeatCellSeriesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-heat-map-cell-series]',
                    template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"getTooltipText(c)\"\n    />\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    HeatCellSeriesComponent.ctorParameters = function () { return []; };
    HeatCellSeriesComponent.propDecorators = {
        'data': [{ type: Input },],
        'colors': [{ type: Input },],
        'xScale': [{ type: Input },],
        'yScale': [{ type: Input },],
        'gradient': [{ type: Input },],
        'tooltipDisabled': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return HeatCellSeriesComponent;
}());
//# sourceMappingURL=heat-map-cell-series.component.js.map