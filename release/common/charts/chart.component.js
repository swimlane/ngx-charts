"use strict";
var core_1 = require('@angular/core');
var tooltip_1 = require('../tooltip');
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
    ChartComponent.decorators = [
        { type: core_1.Component, args: [{
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
                },] },
    ];
    /** @nocollapse */
    ChartComponent.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: tooltip_1.TooltipService, },
    ]; };
    ChartComponent.propDecorators = {
        'view': [{ type: core_1.Input },],
        'showLegend': [{ type: core_1.Input },],
        'legendOptions': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'legendData': [{ type: core_1.Input },],
        'legendType': [{ type: core_1.Input },],
        'legendTitle': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'activeEntries': [{ type: core_1.Input },],
        'legendLabelClick': [{ type: core_1.Output },],
        'legendLabelActivate': [{ type: core_1.Output },],
        'legendLabelDeactivate': [{ type: core_1.Output },],
    };
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map