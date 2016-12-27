"use strict";
var core_1 = require('@angular/core');
var trim_label_helper_1 = require('../common/trim-label.helper');
var color_utils_1 = require('../utils/color-utils');
var count_1 = require('../common/count');
var CardComponent = (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.select = new core_1.EventEmitter();
        this.value = '';
        this.resizeScale = 1;
        this.textFontSize = 35;
        this.textTransform = '';
        this.initialized = false;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width - 15);
            _this.cardWidth = Math.max(0, _this.width - 5);
            _this.cardHeight = Math.max(0, _this.height - 5);
            _this.label = _this.data.name;
            _this.trimmedLabel = trim_label_helper_1.trimLabel(_this.label, 55);
            _this.value = _this.data.value.toLocaleString();
            setTimeout(function () { return _this.scaleText(); });
            setTimeout(function () { return _this.startCount(); }, 20);
        });
    };
    CardComponent.prototype.getTextColor = function (color) {
        return color_utils_1.invertColor(color);
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var val = this.data.value;
            var decs = count_1.decimalChecker(val);
            var callback = function (_a) {
                var value = _a.value;
                _this.zone.run(function () {
                    _this.value = value.toLocaleString();
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count_1.count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var availableWidth = _this.cardWidth * 0.85;
            var availableHeight = _this.cardHeight * 0.60;
            if (!_this.originalWidthRatio) {
                _this.originalWidthRatio = availableWidth / width;
                _this.originalWidth = availableWidth;
            }
            if (!_this.originalHeightRatio) {
                _this.originalHeightRatio = availableHeight / height;
                _this.originalHeight = availableHeight;
            }
            var newWidthRatio = (availableWidth / _this.originalWidth) * _this.originalWidthRatio;
            var newHeightRatio = (availableHeight / _this.originalHeight) * _this.originalHeightRatio;
            _this.resizeScale = Math.min(newWidthRatio, newHeightRatio);
            _this.textFontSize = Number.parseInt((35 * _this.resizeScale).toString());
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    CardComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-card]',
                    template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        style=\"cursor: pointer;\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        x=\"5\"\n        [attr.y]=\"height * 0.7\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"height * 0.3\"\n        style=\"font-size: 12px;\n               pointer-events: none;\n               text-transform: uppercase;\n               overflow: hidden;\n               text-align: center;\n               line-height: 1em;\">\n        <xhtml:p\n          [style.color]=\"getTextColor(color)\"\n          style=\"overflow: hidden;\n                 white-space: nowrap;\n                 text-overflow: ellipsis;\n                 width: 100%;\">\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        [attr.x]=\"cardWidth / 2\"\n        [attr.y]=\"height * 0.30\"\n        dy=\".35em\"\n        class=\"value-text\"\n        [style.fill]=\"getTextColor(color)\"\n        text-anchor=\"middle\"\n        [style.font-size.pt]=\"textFontSize\"\n        style=\"pointer-events: none;\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ]; };
    CardComponent.propDecorators = {
        'color': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'label': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'textEl': [{ type: core_1.ViewChild, args: ['textEl',] },],
    };
    return CardComponent;
}());
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map