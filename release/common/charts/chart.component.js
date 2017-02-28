import { Component, Input, trigger, style, transition, animate, ViewContainerRef, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { TooltipService } from '../tooltip';
export var ChartComponent = (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.legendTitle = 'Legend';
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
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
        { type: Component, args: [{
                    providers: [TooltipService],
                    selector: 'ngx-charts-chart',
                    template: "\n    <div\n      class=\"ngx-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendTitle\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition('void => *', [
                                style({ opacity: 0 }),
                                animate('500ms 100ms', style({ opacity: 1 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    ChartComponent.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: TooltipService, },
    ]; };
    ChartComponent.propDecorators = {
        'view': [{ type: Input },],
        'showLegend': [{ type: Input },],
        'legendOptions': [{ type: Input },],
        'data': [{ type: Input },],
        'legendData': [{ type: Input },],
        'legendType': [{ type: Input },],
        'legendTitle': [{ type: Input },],
        'colors': [{ type: Input },],
        'activeEntries': [{ type: Input },],
        'legendLabelClick': [{ type: Output },],
        'legendLabelActivate': [{ type: Output },],
        'legendLabelDeactivate': [{ type: Output },],
    };
    return ChartComponent;
}());
//# sourceMappingURL=chart.component.js.map