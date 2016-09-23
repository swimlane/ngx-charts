"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
            return {
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors(d.id),
                label: d.id,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    TreeMapCellSeries.prototype.trackBy = function (index, item) {
        return item.label;
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
            template: "\n    <svg:g treeMapCell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (clickHandler)=\"click($event)\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapCellSeries);
    return TreeMapCellSeries;
}());
exports.TreeMapCellSeries = TreeMapCellSeries;
//# sourceMappingURL=tree-map-cell-series.component.js.map