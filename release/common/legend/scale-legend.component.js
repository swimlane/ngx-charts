var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var ScaleLegendComponent = /** @class */ (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "valueRange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "width", void 0);
    ScaleLegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-scale-legend',
            template: "\n    <div\n      class=\"scale-legend\"\n      [style.height.px]=\"height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
            styleUrls: ['./scale-legend.component.css'],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], ScaleLegendComponent);
    return ScaleLegendComponent;
}());
export { ScaleLegendComponent };
//# sourceMappingURL=scale-legend.component.js.map