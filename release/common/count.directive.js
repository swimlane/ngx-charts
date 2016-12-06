"use strict";
var core_1 = require('@angular/core');
// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
}
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
        this.countDecimals = 0;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new core_1.EventEmitter();
        this.countFinish = new core_1.EventEmitter();
        this.value = '';
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
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
        var startVal = Number(this._countFrom);
        var endVal = Number(this._countTo);
        var countDown = (startVal > endVal);
        var decimals = Math.max(0, this.countDecimals);
        var dec = Math.pow(10, decimals);
        var duration = Number(this.countDuration) * 1000;
        cancelAnimationFrame(this.animationReq);
        requestAnimationFrame(function (val) {
            return _this.count(startVal, endVal, dec, duration, countDown, val);
        });
    };
    CountUpDirective.prototype.count = function (startVal, endVal, dec, duration, countDown, timestamp) {
        var _this = this;
        if (!this.startTime)
            this.startTime = timestamp;
        var frameVal;
        var progress = timestamp - this.startTime;
        if (countDown) {
            frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
        }
        else {
            frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
        }
        if (countDown) {
            frameVal = (frameVal < endVal) ? endVal : frameVal;
        }
        else {
            frameVal = (frameVal > endVal) ? endVal : frameVal;
        }
        frameVal = Math.round(frameVal * dec) / dec;
        this.zone.run(function () {
            _this.value = "" + _this.countPrefix + frameVal.toLocaleString() + _this.countSuffix;
            _this.cd.markForCheck();
            _this.countChange.emit({ value: frameVal, progress: progress });
        });
        if (progress < duration) {
            this.animationReq = requestAnimationFrame(function (val) {
                return _this.count(startVal, endVal, dec, duration, countDown, val);
            });
        }
        else {
            this.startTime = undefined;
            this.countFinish.emit(true);
        }
    };
    CountUpDirective.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[count-up]',
                    template: "{{value}}"
                },] },
    ];
    /** @nocollapse */
    CountUpDirective.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
        { type: core_1.ElementRef, },
    ];
    CountUpDirective.propDecorators = {
        'countDecimals': [{ type: core_1.Input },],
        'countDuration': [{ type: core_1.Input },],
        'countPrefix': [{ type: core_1.Input },],
        'countSuffix': [{ type: core_1.Input },],
        'countTo': [{ type: core_1.Input },],
        'countFrom': [{ type: core_1.Input },],
        'countChange': [{ type: core_1.Output },],
        'countFinish': [{ type: core_1.Output },],
    };
    return CountUpDirective;
}());
exports.CountUpDirective = CountUpDirective;
//# sourceMappingURL=count.directive.js.map