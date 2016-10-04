"use strict";
var core_1 = require('@angular/core');
var TooltipService = (function () {
    function TooltipService() {
        this.components = new Map();
    }
    TooltipService.prototype.register = function (id, component, callback) {
        this.components.set(id, { component: component, callback: callback });
    };
    TooltipService.prototype.destroy = function (id) {
        var obj = this.components.get(id);
        if (obj && obj.component) {
            if (obj.callback) {
                obj.callback(true);
            }
            obj.component.destroy();
            this.components.delete(id);
        }
    };
    TooltipService.prototype.destroyAll = function () {
        var _this = this;
        this.components.forEach(function (v, k) { return _this.destroy(k); });
    };
    TooltipService.decorators = [
        { type: core_1.Injectable },
    ];
    TooltipService.ctorParameters = [];
    return TooltipService;
}());
exports.TooltipService = TooltipService;
//# sourceMappingURL=tooltip.service.js.map