"use strict";
var core_1 = require('@angular/core');
var CardSeriesComponent = (function () {
    function CardSeriesComponent(zone) {
        this.zone = zone;
        this.clickHandler = new core_1.EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function () {
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
                color: _this.colors(label),
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
        this.clickHandler.emit(data);
    };
    CardSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[cardSeries]',
                    template: "\n    <svg:g card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (clickHandler)=\"onClick($event)\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CardSeriesComponent.ctorParameters = [
        { type: core_1.NgZone, },
    ];
    CardSeriesComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'dims': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return CardSeriesComponent;
}());
exports.CardSeriesComponent = CardSeriesComponent;
//# sourceMappingURL=card-series.component.js.map