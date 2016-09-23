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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatCellSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "clickHandler", void 0);
    HeatCellSeries = __decorate([
        core_1.Component({
            selector: 'g[heatMapCellSeries]',
            template: "\n    <svg:g heatMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n\n      swui-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"c.tooltipText\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeatCellSeries);
    return HeatCellSeries;
}());
exports.HeatCellSeries = HeatCellSeries;
//# sourceMappingURL=heat-map-cell-series.component.js.map