"use strict";
var core_1 = require('@angular/core');
var TreeMapCellSeries = (function () {
    function TreeMapCellSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    TreeMapCellSeries.prototype.ngOnInit = function () {
        this.cells = this.getCells();
    };
    TreeMapCellSeries.prototype.getCells = function () {
        var _this = this;
        return this.data
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            return {
                x: d.x,
                y: d.y,
                width: d.dx,
                height: d.dy,
                fill: _this.colors(d.label),
                label: d.label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "clickHandler", void 0);
    TreeMapCellSeries = __decorate([
        core_1.Component({
            selector: 'g[treeMapCellSeries]',
            template: "\n    <svg:g treeMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (clickHandler)=\"click($event)\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapCellSeries);
    return TreeMapCellSeries;
}());
exports.TreeMapCellSeries = TreeMapCellSeries;
//# sourceMappingURL=tree-map-cell-series.component.js.map