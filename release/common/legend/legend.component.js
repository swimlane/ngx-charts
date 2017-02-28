import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, NgZone, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
export var LegendComponent = (function () {
    function LegendComponent(cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
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
        var _loop_1 = function(label) {
            var formattedLabel = formatLabel(label);
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
    LegendComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-legend',
                    template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    styleUrls: ['./legend.component.css'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: NgZone, },
    ]; };
    LegendComponent.propDecorators = {
        'data': [{ type: Input },],
        'title': [{ type: Input },],
        'colors': [{ type: Input },],
        'height': [{ type: Input },],
        'width': [{ type: Input },],
        'activeEntries': [{ type: Input },],
        'labelClick': [{ type: Output },],
        'labelActivate': [{ type: Output },],
        'labelDeactivate': [{ type: Output },],
    };
    return LegendComponent;
}());
//# sourceMappingURL=legend.component.js.map