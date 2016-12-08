"use strict";
var core_1 = require('@angular/core');
var LegendEntryComponent = (function () {
    function LegendEntryComponent() {
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
    LegendEntryComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'legend-entry',
                    template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      (mouseenter)=\"activate.emit(formattedLabel)\"\n      (mouseleave)=\"deactivate.emit(formattedLabel)\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    LegendEntryComponent.ctorParameters = [];
    LegendEntryComponent.propDecorators = {
        'color': [{ type: core_1.Input },],
        'label': [{ type: core_1.Input },],
        'formattedLabel': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
        'toggle': [{ type: core_1.Output },],
    };
    return LegendEntryComponent;
}());
exports.LegendEntryComponent = LegendEntryComponent;
//# sourceMappingURL=legend-entry.component.js.map