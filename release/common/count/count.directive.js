import { Component, Input, Output, EventEmitter, ChangeDetectorRef, NgZone, ElementRef } from '@angular/core';
import { count, decimalChecker } from './count.helper';
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
export var CountUpDirective = (function () {
    function CountUpDirective(cd, zone, element) {
        this.cd = cd;
        this.zone = zone;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return decimalChecker(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.zone.run(function () {
                _this.value = "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix;
                _this.cd.markForCheck();
                if (!finished)
                    _this.countChange.emit({ value: value, progress: progress });
                if (finished)
                    _this.countFinish.emit({ value: value, progress: progress });
            });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    CountUpDirective.decorators = [
        { type: Component, args: [{
                    selector: '[ngx-charts-count-up]',
                    template: "{{value}}"
                },] },
    ];
    /** @nocollapse */
    CountUpDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: NgZone, },
        { type: ElementRef, },
    ]; };
    CountUpDirective.propDecorators = {
        'countDuration': [{ type: Input },],
        'countPrefix': [{ type: Input },],
        'countSuffix': [{ type: Input },],
        'countDecimals': [{ type: Input },],
        'countTo': [{ type: Input },],
        'countFrom': [{ type: Input },],
        'countChange': [{ type: Output },],
        'countFinish': [{ type: Output },],
    };
    return CountUpDirective;
}());
//# sourceMappingURL=count.directive.js.map