"use strict";
var core_1 = require('@angular/core');
var CardSeries = (function () {
    function CardSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    CardSeries.prototype.ngOnInit = function () {
        this.update();
    };
    CardSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CardSeries.prototype.update = function () {
        this.cards = this.getCards();
    };
    CardSeries.prototype.getCards = function () {
        var _this = this;
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            var value = d.data.value;
            return {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                color: _this.colors(label),
                label: d.data.label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "clickHandler", void 0);
    CardSeries = __decorate([
        core_1.Component({
            selector: 'g[cardSeries]',
            template: "\n    <svg:g card *ngFor=\"let c of cards\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event)\"\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"c.tooltipText\"\n      [popoverGroup]=\"'charts'\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CardSeries);
    return CardSeries;
}());
exports.CardSeries = CardSeries;
//# sourceMappingURL=card-series.component.js.map