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
var tooltip_1 = require("../tooltip");
var ChartComponent = (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.legendTitle = 'Legend';
        this.legendLabelClick = new core_1.EventEmitter();
        this.legendLabelActivate = new core_1.EventEmitter();
        this.legendLabelDeactivate = new core_1.EventEmitter();
        this.tooltipService.injectionService.setRootViewContainer(vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                legendColumns = 1;
            }
            else {
                legendColumns = 2;
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = this.view[0] * chartColumns / 12.0;
        this.legendWidth = this.view[0] * legendColumns / 12.0;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    return ChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "view", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "showLegend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "legendTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ChartComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ChartComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChartComponent.prototype, "legendLabelClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChartComponent.prototype, "legendLabelActivate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ChartComponent.prototype, "legendLabelDeactivate", void 0);
ChartComponent = __decorate([
    core_1.Component({
        providers: [tooltip_1.TooltipService],
        selector: 'ngx-charts-chart',
        template: "\n    <div\n      class=\"ngx-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendTitle\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        animations: [
            core_1.trigger('animationState', [
                core_1.transition('void => *', [
                    core_1.style({ opacity: 0 }),
                    core_1.animate('500ms 100ms', core_1.style({ opacity: 1 }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        tooltip_1.TooltipService])
], ChartComponent);
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map