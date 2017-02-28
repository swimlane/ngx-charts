import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
export var LegendEntryComponent = (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
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
    LegendEntryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-legend-entry',
                    template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    LegendEntryComponent.ctorParameters = function () { return []; };
    LegendEntryComponent.propDecorators = {
        'color': [{ type: Input },],
        'label': [{ type: Input },],
        'formattedLabel': [{ type: Input },],
        'isActive': [{ type: Input },],
        'select': [{ type: Output },],
        'activate': [{ type: Output },],
        'deactivate': [{ type: Output },],
        'toggle': [{ type: Output },],
        'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return LegendEntryComponent;
}());
//# sourceMappingURL=legend-entry.component.js.map