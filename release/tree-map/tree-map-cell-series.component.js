"use strict";
var core_1 = require('@angular/core');
var TreeMapCellSeries = (function () {
    function TreeMapCellSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    TreeMapCellSeries.prototype.ngOnChanges = function () {
        this.cells = this.getCells();
    };
    TreeMapCellSeries.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            return {
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors(label),
                label: label,
                value: d.value,
                valueType: d.valueType,
                tooltipText: label + ": " + d.value.toLocaleString()
            };
        });
    };
    TreeMapCellSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    TreeMapCellSeries.prototype.trackBy = function (index, item) {
        return item.label;
    };
    TreeMapCellSeries.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[treeMapCellSeries]',
                    template: "\n    <svg:g treeMapCell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (clickHandler)=\"click($event)\"\n\n      swui-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"c.tooltipText\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TreeMapCellSeries.ctorParameters = [];
    TreeMapCellSeries.propDecorators = {
        'data': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return TreeMapCellSeries;
}());
exports.TreeMapCellSeries = TreeMapCellSeries;
//# sourceMappingURL=tree-map-cell-series.component.js.map