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
var core_1 = require("@angular/core");
var CardSeriesComponent = (function () {
    function CardSeriesComponent(zone) {
        this.zone = zone;
        this.select = new core_1.EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.cards = _this.getCards();
        });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            d.data.name = label;
            var value = d.data.value;
            return {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                color: _this.colors.getColor(label),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    return CardSeriesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "dims", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "colors", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CardSeriesComponent.prototype, "select", void 0);
CardSeriesComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-card-series]',
        template: "\n    <svg:g ngx-charts-card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event)\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], CardSeriesComponent);
exports.CardSeriesComponent = CardSeriesComponent;
//# sourceMappingURL=card-series.component.js.map