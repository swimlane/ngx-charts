"use strict";
var core_1 = require('@angular/core');
var count_helper_1 = require('./count.helper');
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
var CountUpDirective = (function () {
    function CountUpDirective(cd, zone, element) {
        this.cd = cd;
        this.zone = zone;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new core_1.EventEmitter();
        this.countFinish = new core_1.EventEmitter();
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
            return count_helper_1.decimalChecker(this.countTo);
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
        this.animationReq = count_helper_1.count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    CountUpDirective.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[ngx-charts-count-up]',
                    template: "{{value}}"
                },] },
    ];
    /** @nocollapse */
    CountUpDirective.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
        { type: core_1.ElementRef, },
    ]; };
    CountUpDirective.propDecorators = {
        'countDuration': [{ type: core_1.Input },],
        'countPrefix': [{ type: core_1.Input },],
        'countSuffix': [{ type: core_1.Input },],
        'countDecimals': [{ type: core_1.Input },],
        'countTo': [{ type: core_1.Input },],
        'countFrom': [{ type: core_1.Input },],
        'countChange': [{ type: core_1.Output },],
        'countFinish': [{ type: core_1.Output },],
    };
    return CountUpDirective;
}());
exports.CountUpDirective = CountUpDirective;
//# sourceMappingURL=count.directive.js.map