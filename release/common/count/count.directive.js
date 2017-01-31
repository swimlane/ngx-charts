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
var count_helper_1 = require("./count.helper");
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
    return CountUpDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CountUpDirective.prototype, "countDuration", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CountUpDirective.prototype, "countPrefix", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CountUpDirective.prototype, "countSuffix", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], CountUpDirective.prototype, "countDecimals", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countTo", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CountUpDirective.prototype, "countFrom", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CountUpDirective.prototype, "countFinish", void 0);
CountUpDirective = __decorate([
    core_1.Component({
        selector: '[ngx-charts-count-up]',
        template: "{{value}}"
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.NgZone, core_1.ElementRef])
], CountUpDirective);
exports.CountUpDirective = CountUpDirective;
//# sourceMappingURL=count.directive.js.map