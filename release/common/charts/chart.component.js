"use strict";
var core_1 = require('@angular/core');
var injection_service_1 = require('../../utils/injection.service');
var Chart = (function () {
    function Chart(vcr, injectionService) {
        this.vcr = vcr;
        this.injectionService = injectionService;
        this.legend = false;
        this.legendTitle = 'Legend';
        this.injectionService.setRootViewContainer(vcr);
    }
    Chart.prototype.ngOnChanges = function () {
        this.update();
    };
    Chart.prototype.update = function () {
        this.legendWidth = 0;
        if (this.legend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                this.legendWidth = 1;
            }
            else {
                this.legendWidth = 2;
            }
        }
        this.chartWidth = 12 - this.legendWidth;
    };
    Chart.prototype.getLegendType = function () {
        if (typeof this.legendData === 'function') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    Chart.decorators = [
        { type: core_1.Component, args: [{
                    providers: [injection_service_1.InjectionService],
                    selector: 'chart',
                    template: "\n    <div [style.width]=\"view[0] + 'px'\"\n      [@animationState]=\"'active'\">\n      <svg\n        class=\"ng2d3\"\n        [attr.width]=\"view[0] * chartWidth / 12.0\"\n        [attr.height]=\"view[1]\">\n\n        <ng-content></ng-content>\n      </svg>\n\n      <scale-legend\n        *ngIf=\"legend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [valueRange]=\"data\"\n        [colors]=\"legendData\"\n        [height]=\"view[1]\"\n        [width]=\"view[0] * legendWidth / 12.0\">\n      </scale-legend>\n\n      <legend\n        *ngIf=\"legend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [data]=\"legendData\"\n        [title]=\"legendTitle\"\n        [colors]=\"colors\"\n        [height]=\"view[1]\"\n        [width]=\"view[0] * legendWidth / 12.0\">\n      </legend>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('void => *', [
                                core_1.style({
                                    opacity: 0,
                                }),
                                core_1.animate('500ms 100ms', core_1.style({ opacity: 1 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    Chart.ctorParameters = [
        { type: core_1.ViewContainerRef, },
        { type: injection_service_1.InjectionService, },
    ];
    Chart.propDecorators = {
        'view': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'legendData': [{ type: core_1.Input },],
        'legendTitle': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
    };
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=chart.component.js.map