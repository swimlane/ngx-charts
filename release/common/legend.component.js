"use strict";
var core_1 = require('@angular/core');
var LegendComponent = (function () {
    function LegendComponent() {
        this.labelClick = new core_1.EventEmitter();
    }
    LegendComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.legendItems = this.getLegendItems();
    };
    LegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        var items = [];
        this.data.map(function (label, index) {
            var formattedLabel = label;
            if (formattedLabel.constructor.name === 'Date') {
                formattedLabel = formattedLabel.toLocaleDateString();
            }
            else {
                formattedLabel = formattedLabel.toLocaleString();
            }
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    className: 'legend-label',
                    label: formattedLabel,
                    trimmedLabel: formattedLabel || '(empty)',
                    backgroundColor: _this.colors(label)
                });
            }
            ;
        });
        return items;
    };
    LegendComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'legend',
                    template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            tabindex=\"-1\"\n            *ngFor=\"let legendItem of legendItems\"\n            (click)=\"labelClick.emit(legendItem)\"\n            [class]=\"legendItem.className\">\n            <span\n              [title]=\"legendItem.label\"\n              class=\"legend-label-color\"\n              [style.background-color]=\"legendItem.backgroundColor\">\n            </span>\n            <span [title]=\"legendItem.label\" class=\"legend-label-text\">\n              {{legendItem.trimmedLabel}}\n            </span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
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
    };
    return LegendComponent;
}());
exports.LegendComponent = LegendComponent;
//# sourceMappingURL=legend.component.js.map