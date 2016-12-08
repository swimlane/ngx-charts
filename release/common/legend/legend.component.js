"use strict";
var core_1 = require('@angular/core');
var label_helper_1 = require('../label.helper');
var LegendComponent = (function () {
    function LegendComponent() {
        this.labelClick = new core_1.EventEmitter();
        this.labelActivate = new core_1.EventEmitter();
        this.labelDeactivate = new core_1.EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var items = [];
        var _loop_1 = function(label) {
            var formattedLabel = label_helper_1.formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors(label)
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
    LegendComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'legend',
                    template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: entry?.formattedLabel\"\n            class=\"legend-label\">\n            <legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"labelActivate.emit($event)\"\n              (deactivate)=\"labelDeactivate.emit($event)\">\n            </legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = [];
    LegendComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'labelClick': [{ type: core_1.Output },],
        'labelActivate': [{ type: core_1.Output },],
        'labelDeactivate': [{ type: core_1.Output },],
    };
    return LegendComponent;
}());
exports.LegendComponent = LegendComponent;
//# sourceMappingURL=legend.component.js.map