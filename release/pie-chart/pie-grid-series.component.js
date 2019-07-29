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
import { pie } from 'd3-shape';
var PieGridSeriesComponent = /** @class */ (function () {
    function PieGridSeriesComponent(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieGridSeriesComponent.prototype.update = function () {
        this.layout = pie()
            .value(function (d) { return d.data.value; })
            .sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeriesComponent.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: _this.animations && !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(this.data[0].data);
    };
    PieGridSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeriesComponent.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieGridSeriesComponent.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieGridSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "deactivate", void 0);
    PieGridSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-grid-series]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g\n        ngx-charts-pie-arc\n        *ngFor=\"let arc of arcs; trackBy: trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], PieGridSeriesComponent);
    return PieGridSeriesComponent;
}());
export { PieGridSeriesComponent };
//# sourceMappingURL=pie-grid-series.component.js.map