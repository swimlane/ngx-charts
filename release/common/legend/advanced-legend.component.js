import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
export var AdvancedLegendComponent = (function () {
    function AdvancedLegendComponent() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.totalLabel = 'total';
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d, index) {
            var label = formatLabel(d.name);
            var value = d.value;
            var percentage = value / _this.total * 100;
            var color = _this.colors.getColor(label);
            return {
                value: value,
                color: color,
                label: trimLabel(label, 20),
                originalLabel: d.name,
                percentage: percentage
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    AdvancedLegendComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-advanced-legend',
                    template: "\n    <div class=\"advanced-pie-legend\"\n      [style.width.px]=\"width\">\n      <div\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\">\n      </div>\n      <div class=\"total-label\">\n        {{totalLabel}}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy:trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div\n              class=\"item-color\"\n              [style.background]=\"legendItem.color\">\n            </div>\n            <div\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.value\">\n            </div>\n            <div class=\"item-label\">{{legendItem.label}}</div>\n            <div\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    styleUrls: ['./advanced-legend.component.css'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AdvancedLegendComponent.ctorParameters = function () { return []; };
    AdvancedLegendComponent.propDecorators = {
        'width': [{ type: Input },],
        'data': [{ type: Input },],
        'colors': [{ type: Input },],
        'select': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
    };
    return AdvancedLegendComponent;
}());
//# sourceMappingURL=advanced-legend.component.js.map