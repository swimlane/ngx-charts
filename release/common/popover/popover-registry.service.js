"use strict";
var PopoverRegistry = (function () {
    function PopoverRegistry() {
        "ngInject";
        if (PopoverRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use PopoverRegistry.getInstance() instead of new.");
        }
        PopoverRegistry._instance = this;
        this.popovers = {};
        setInterval(this.cleanUp.bind(this), 1000);
    }
    PopoverRegistry.getInstance = function () {
        return PopoverRegistry._instance;
    };
    PopoverRegistry.prototype.add = function (id, object) {
        this.popovers[id] = object;
    };
    PopoverRegistry.prototype.find = function (id) {
        return this.popovers[id];
    };
    PopoverRegistry.prototype.remove = function (id) {
        if (!this.popovers[id]) {
            return;
        }
        if (this.popovers[id].popoverScope) {
            this.popovers[id].popoverScope.$destroy();
        }
        if (this.popovers[id].popover) {
            this.popovers[id].popover.remove();
        }
        delete this.popovers[id];
    };
    PopoverRegistry.prototype.removeGroup = function (group, currentId) {
        var _this = this;
        var ids = Object.keys(this.popovers);
        var _loop_1 = function(id) {
            var popoverOb = this_1.popovers[id];
            if (!popoverOb) {
                return "continue";
            }
            if (id === currentId) {
                return { value: void 0 };
            }
            if (popoverOb.group && popoverOb.group === group) {
                popoverOb.popover.removeClass('sw-popover-animation');
                setTimeout(function () {
                    popoverOb.popover.remove();
                    if (popoverOb.popoverScope) {
                        popoverOb.popoverScope.$destroy();
                    }
                    delete _this.popovers[id];
                }, 50);
            }
        };
        var this_1 = this;
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            var state_1 = _loop_1(id);
            if (typeof state_1 === "object") return state_1.value;
        }
    };
    PopoverRegistry.prototype.cleanUp = function () {
        var ids = Object.keys(this.popovers);
        for (var _i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
            var id = ids_2[_i];
            var element = this.popovers[id].element;
            if (element && element[0]) {
                element = element[0];
            }
            if (element && !document.contains(element)) {
                this.remove(id);
            }
        }
    };
    PopoverRegistry._instance = new PopoverRegistry();
    return PopoverRegistry;
}());
exports.PopoverRegistry = PopoverRegistry;
//# sourceMappingURL=popover-registry.service.js.map