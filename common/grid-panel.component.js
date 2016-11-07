"use strict";
var core_1 = require('@angular/core');
var GridPanel = (function () {
    function GridPanel() {
    }
    GridPanel.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[gridPanel]',
                    template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      [attr.fill]=\"fill\"\n      class=\"gridpanel\"\n    />\n  "
                },] },
    ];
    GridPanel.ctorParameters = [];
    GridPanel.propDecorators = {
        'path': [{ type: core_1.Input },],
        'fill': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
    };
    return GridPanel;
}());
exports.GridPanel = GridPanel;
//# sourceMappingURL=grid-panel.component.js.map