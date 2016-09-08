"use strict";
var core_1 = require('@angular/core');
var GridPanel = (function () {
    function GridPanel() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "y", void 0);
    GridPanel = __decorate([
        core_1.Component({
            selector: 'g[gridPanel]',
            template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      [attr.fill]=\"fill\"\n      class=\"gridpanel\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanel);
    return GridPanel;
}());
exports.GridPanel = GridPanel;
//# sourceMappingURL=grid-panel.component.js.map