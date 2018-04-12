var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
var LineComponent = /** @class */ (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node
                .transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "stroke", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "select", void 0);
    LineComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-line]',
            template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                        }),
                        animate(1000, style({
                            strokeDashoffset: 0
                        }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], LineComponent);
    return LineComponent;
}());
export { LineComponent };
//# sourceMappingURL=line.component.js.map