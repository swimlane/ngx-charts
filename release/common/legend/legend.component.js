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
var label_helper_1 = require("../label.helper");
var LegendComponent = (function () {
    function LegendComponent(cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.labelClick = new core_1.EventEmitter();
        this.labelActivate = new core_1.EventEmitter();
        this.labelDeactivate = new core_1.EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.cd.markForCheck();
            _this.legendEntries = _this.getLegendEntries();
        });
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = label_helper_1.formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var label = _a[_i];
            _loop_1(label);
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        var _this = this;
        this.zone.run(function () {
            _this.labelActivate.emit(item);
        });
    };
    LegendComponent.prototype.deactivate = function (item) {
        var _this = this;
        this.zone.run(function () {
            _this.labelDeactivate.emit(item);
        });
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    return LegendComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegendComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendComponent.prototype, "labelClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendComponent.prototype, "labelActivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LegendComponent.prototype, "labelDeactivate", void 0);
LegendComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-legend',
        template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
        styleUrls: ['./legend.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.NgZone])
], LegendComponent);
exports.LegendComponent = LegendComponent;
//# sourceMappingURL=legend.component.js.map