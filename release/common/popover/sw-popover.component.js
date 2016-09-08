"use strict";
var core_1 = require('@angular/core');
var position_helper_1 = require('./position.helper');
var popover_registry_service_1 = require('./popover-registry.service');
var Popover = (function () {
    function Popover(element, renderer) {
        this.popoverPlacement = 'top';
        this.popoverAlignment = 'center';
        this.popoverSpacing = 0;
        this.showCaret = true;
        this.element = element.nativeElement;
        this.renderer = renderer;
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
        }
        this.mouseEnterListener = this.renderer.listen(this.element, 'mouseenter', this.display.bind(this));
        if (this.mouseLeaveListener) {
            this.mouseLeaveListener();
        }
        this.mouseLeaveListener = this.renderer.listen(this.element, 'mouseleave', this.mouseOut.bind(this));
    }
    Popover.prototype.ngOnInit = function () {
        this.popoverRegistry = popover_registry_service_1.PopoverRegistry.getInstance();
    };
    Popover.prototype.mouseOut = function () {
        this.exitTimeout = setTimeout(this.remove.bind(this), 200);
    };
    ;
    Popover.prototype.display = function () {
    };
    ;
    Popover.prototype.remove = function () {
        if (this.popover) {
            this.popover.remove();
        }
        this.popoverRegistry.remove(this.popoverId);
        this.popover = undefined;
    };
    ;
    Popover.prototype.checkFlip = function (triggerElement, popover, options) {
        var elDimensions = triggerElement.getBoundingClientRect(), popoverDimensions = popover[0].getBoundingClientRect();
        if (position_helper_1.PositionHelper.shouldFlip(elDimensions, popoverDimensions, options.placement, options.alignment, options.spacing)) {
            if (options.placement === 'right') {
                options.placement = 'left';
            }
            else if (options.placement === 'left') {
                options.placement = 'right';
            }
            else if (options.placement === 'top') {
                options.placement = 'bottom';
            }
            else if (options.placement === 'bottom') {
                options.placement = 'top';
            }
        }
    };
    ;
    Popover.prototype.positionPopover = function (triggerElement, popover, options) {
        var elDimensions = triggerElement.getBoundingClientRect(), popoverDimensions = popover[0].getBoundingClientRect(), top, left;
        if (options.placement === 'right') {
            left = elDimensions.left + elDimensions.width + options.spacing;
            top = position_helper_1.PositionHelper.calculateVerticalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'left') {
            left = elDimensions.left - popoverDimensions.width - options.spacing;
            top = position_helper_1.PositionHelper.calculateVerticalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'top') {
            top = elDimensions.top - popoverDimensions.height - options.spacing;
            left = position_helper_1.PositionHelper.calculateHorizontalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'bottom') {
            top = elDimensions.top + elDimensions.height + options.spacing;
            left = position_helper_1.PositionHelper.calculateHorizontalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        popover.css({
            top: top + 'px',
            left: left + 'px'
        });
        if (this.options.showCaret) {
            this.addCaret(this.popover, elDimensions, popoverDimensions);
        }
        this.popover.addClass('sw-popover-animation');
    };
    ;
    Popover.prototype.addCaret = function (popoverEl, elDimensions, popoverDimensions) {
    };
    ;
    Popover.prototype.toBoolean = function (value) {
        if (value && value.length !== 0) {
            var v = ("" + value).toLowerCase();
            value = (v === 'true');
        }
        else {
            value = false;
        }
        return value;
    };
    ;
    Popover.prototype.ngOnDestroy = function () {
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
        }
        if (this.mouseLeaveListener) {
            this.mouseLeaveListener();
        }
        this.remove();
    };
    __decorate([
        core_1.ViewChild('parent', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], Popover.prototype, "parent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverGroup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverSpacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "showCaret", void 0);
    Popover = __decorate([
        core_1.Directive({
            selector: '[sw-popover]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], Popover);
    return Popover;
}());
exports.Popover = Popover;
//# sourceMappingURL=sw-popover.component.js.map