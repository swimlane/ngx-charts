import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export var GridPanelComponent = (function () {
    function GridPanelComponent() {
    }
    GridPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-grid-panel]',
                    template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    GridPanelComponent.ctorParameters = function () { return []; };
    GridPanelComponent.propDecorators = {
        'path': [{ type: Input },],
        'width': [{ type: Input },],
        'height': [{ type: Input },],
        'x': [{ type: Input },],
        'y': [{ type: Input },],
    };
    return GridPanelComponent;
}());
//# sourceMappingURL=grid-panel.component.js.map