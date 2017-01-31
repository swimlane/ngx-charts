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
var trim_label_helper_1 = require("../trim-label.helper");
var ticks_helper_1 = require("./ticks.helper");
var YAxisTicksComponent = (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.trimLabel = trim_label_helper_1.trimLabel;
    }
    YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width: width });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    YAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function () {
        var tickHeight = 20;
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    return YAxisTicksComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    core_1.ViewChild('ticksel'),
    __metadata("design:type", core_1.ElementRef)
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-y-axis-ticks]',
        template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], YAxisTicksComponent);
exports.YAxisTicksComponent = YAxisTicksComponent;
//# sourceMappingURL=y-axis-ticks.component.js.map