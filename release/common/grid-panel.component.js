"use strict";
var core_1 = require('@angular/core');
var GridPanelComponent = (function () {
    function GridPanelComponent() {
    }
    GridPanelComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-grid-panel]',
                    template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    GridPanelComponent.ctorParameters = function () { return []; };
    GridPanelComponent.propDecorators = {
        'path': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
    };
    return GridPanelComponent;
}());
exports.GridPanelComponent = GridPanelComponent;
//# sourceMappingURL=grid-panel.component.js.map