var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { formatLabel } from '../label.helper';
var AdvancedLegendComponent = /** @class */ (function () {
    function AdvancedLegendComponent() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = function (label) { return label; };
        this.percentageFormatting = function (percentage) { return percentage; };
        this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
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
            var color = _this.colors.getColor(label);
            var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
            return {
                _value: value,
                value: value,
                color: color,
                label: trimLabel(_this.labelFormatting ? _this.labelFormatting(label) : label, 20),
                originalLabel: d.name,
                percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AdvancedLegendComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdvancedLegendComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedLegendComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AdvancedLegendComponent.prototype, "deactivate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
    AdvancedLegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-advanced-legend',
            template: "\n    <div class=\"advanced-pie-legend\"\n      [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\">\n      </div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal)}}\n      </div>\n      <div class=\"total-label\">\n        {{label}}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy:trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div\n              class=\"item-color\"\n              [style.border-left-color]=\"legendItem.color\">\n            </div>\n            <div *ngIf=\"animations\"\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\">\n            </div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n            {{valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value)}}\n            </div>\n            <div class=\"item-label\">{{legendItem.label}}</div>\n            <div *ngIf=\"animations\"\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n            <div *ngIf=\"!animations\"\n              class=\"item-percent\">\n              {{legendItem.percentage.toLocaleString()}}%\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            styleUrls: ['./advanced-legend.component.css'],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AdvancedLegendComponent);
    return AdvancedLegendComponent;
}());
export { AdvancedLegendComponent };
//# sourceMappingURL=advanced-legend.component.js.map