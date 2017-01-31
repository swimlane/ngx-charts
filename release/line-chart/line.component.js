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
var LineComponent = (function () {
    function LineComponent(element) {
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    return LineComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "path", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "stroke", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LineComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LineComponent.prototype, "select", void 0);
LineComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-line]',
        template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        animations: [
            core_1.trigger('animationState', [
                core_1.transition('void => *', [
                    core_1.style({
                        strokeDasharray: 2000,
                        strokeDashoffset: 2000,
                    }),
                    core_1.animate(1000, core_1.style({
                        strokeDashoffset: 0
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], LineComponent);
exports.LineComponent = LineComponent;
//# sourceMappingURL=line.component.js.map