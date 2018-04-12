var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Output, EventEmitter } from '@angular/core';
/**
 * Visibility Observer
 */
var VisibilityObserver = /** @class */ (function () {
    function VisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    VisibilityObserver.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            if (!_this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 100);
                });
            }
        };
        this.zone.runOutsideAngular(function () {
            _this.timeout = setTimeout(function () { return check(); });
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], VisibilityObserver.prototype, "visible", void 0);
    return VisibilityObserver;
}());
export { VisibilityObserver };
//# sourceMappingURL=visibility-observer.js.map