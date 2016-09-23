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
var core_1 = require('@angular/core');
var ScaleLegend = (function () {
    function ScaleLegend() {
    }
    ScaleLegend.prototype.ngOnChanges = function () {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = "linear-gradient(to bottom, " + gradientValues + ")";
    };
    ScaleLegend.prototype.gradientString = function (colors, splits) {
        splits.push(1);
        var pairs = [];
        colors.forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "valueRange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "height", void 0);
    ScaleLegend = __decorate([
        core_1.Component({
            selector: 'scale-legend',
            template: "\n    <div>\n      <div\n        style=\"padding: 10px 0px; width: 30px; text-align: center;\"\n        [style.height]=\"(height - 40) + 'px'\">\n\n        <div>\n          <span>{{valueRange[0]}}</span>\n        </div>\n\n        <div class=\"legend-wrap\"\n          style=\"height: 100%; width: 100%; border-radius: 5px;\"\n          [style.background]=\"gradient\">\n        </div>\n\n        <div>\n          <span>{{valueRange[1].toFixed()}}</span>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ScaleLegend);
    return ScaleLegend;
}());
exports.ScaleLegend = ScaleLegend;
//# sourceMappingURL=scale-legend.component.js.map