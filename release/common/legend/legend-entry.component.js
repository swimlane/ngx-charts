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
var LegendEntryComponent = (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.toggle = new core_1.EventEmitter();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    return LegendEntryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendEntryComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], LegendEntryComponent.prototype, "formattedLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LegendEntryComponent.prototype, "isActive", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendEntryComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendEntryComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendEntryComponent.prototype, "deactivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendEntryComponent.prototype, "toggle", void 0);
__decorate([
    core_1.HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LegendEntryComponent.prototype, "onMouseLeave", null);
LegendEntryComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-legend-entry',
        template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], LegendEntryComponent);
exports.LegendEntryComponent = LegendEntryComponent;
//# sourceMappingURL=legend-entry.component.js.map