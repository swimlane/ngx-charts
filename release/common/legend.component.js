"use strict";
var core_1 = require('@angular/core');
var Legend = (function () {
    function Legend() {
        this.labelClick = new core_1.EventEmitter();
    }
    Legend.prototype.ngOnChanges = function () {
        this.update();
    };
    Legend.prototype.update = function () {
        this.legendItems = this.getLegendItems();
    };
    Legend.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (label, index) {
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return {
                className: 'legend-label',
                label: label,
                trimmedLabel: label || '(empty)',
                backgroundColor: _this.colors(label)
            };
        });
    };
    Legend.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'legend',
                    template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li \n            tabindex=\"-1\"\n            *ngFor=\"let legendItem of legendItems\" \n            (click)=\"labelClick.emit(legendItem)\"\n            [class]=\"legendItem.className\">\n            <span\n              [title]=\"legendItem.label\"\n              class=\"legend-label-color\"\n              [style.background-color]=\"colors(legendItem.label)\">\n            </span>\n            <span [title]=\"legendItem.label\" class=\"legend-label-text\">\n              {{legendItem.trimmedLabel}}\n            </span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    Legend.ctorParameters = [];
    Legend.propDecorators = {
        'data': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'labelClick': [{ type: core_1.Output },],
    };
    return Legend;
}());
exports.Legend = Legend;
//# sourceMappingURL=legend.component.js.map