import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { invertColor } from '../utils/color-utils';
var CardSeriesComponent = (function () {
    function CardSeriesComponent(zone) {
        this.zone = zone;
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.select = new EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        if (this.data.length > 2) {
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var sortedLengths = this.data
                .map(function (d) {
                var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue ? valueFormatting_1({
                    data: d.data,
                    label: d ? d.data.name : '',
                    value: (d && d.data) ? d.data.value : ''
                }).length : 0;
            })
                .sort(function (a, b) { return b - a; });
            var idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        var cards = this.getCards();
        this.cards = cards.filter(function (d) { return d.data.value !== null; });
        this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        var yPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[0] + this.innerPadding[2];
        var xPadding = typeof this.innerPadding === 'number' ?
            this.innerPadding :
            this.innerPadding[1] + this.innerPadding[3];
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            d.data.name = label;
            var value = d.data.value;
            var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
            var color = _this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color: color,
                bandColor: _this.bandColor || valueColor,
                textColor: _this.textColor || invertColor(color),
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
export { CardSeriesComponent };
CardSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-card-series]',
                template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy:trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g ngx-charts-card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      (select)=\"onClick($event)\"\n    />\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CardSeriesComponent.ctorParameters = function () { return [
    { type: NgZone, },
]; };
CardSeriesComponent.propDecorators = {
    'data': [{ type: Input },],
    'slots': [{ type: Input },],
    'dims': [{ type: Input },],
    'colors': [{ type: Input },],
    'innerPadding': [{ type: Input },],
    'cardColor': [{ type: Input },],
    'bandColor': [{ type: Input },],
    'emptyColor': [{ type: Input },],
    'textColor': [{ type: Input },],
    'valueFormatting': [{ type: Input },],
    'labelFormatting': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=card-series.component.js.map