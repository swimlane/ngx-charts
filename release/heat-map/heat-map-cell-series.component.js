var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
var HeatCellSeriesComponent = /** @class */ (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnInit = function () {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    };
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
                cell.series = row.name;
                cells.push({
                    row: row,
                    cell: cell,
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(series) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], HeatCellSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], HeatCellSeriesComponent.prototype, "deactivate", void 0);
    HeatCellSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-heat-map-cell-series]',
            template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick(c.cell)\"\n      (activate)=\"activate.emit(c.cell)\"\n      (deactivate)=\"deactivate.emit(c.cell)\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{ series: c.series, name: c.label, value: c.data }\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HeatCellSeriesComponent);
    return HeatCellSeriesComponent;
}());
export { HeatCellSeriesComponent };
//# sourceMappingURL=heat-map-cell-series.component.js.map