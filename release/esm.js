import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2, Directive, Output, EventEmitter, ViewContainerRef, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { rgb } from 'd3-color';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { range, min, max } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile, scaleTime, scalePoint } from 'd3-scale';
import { brushX } from 'd3-brush';
import { select, event } from 'd3-selection';
import { curveLinear, area, line, curveCardinalClosed, lineRadial, arc, pie } from 'd3-shape';
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force';
import { interpolate } from 'd3-interpolate';
import { format } from 'd3-format';
import { treemap, stratify } from 'd3-hierarchy';
import { timeFormat } from 'd3-time-format';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

// The export is needed here to generate a valid polyfills.metadata.json file
function ngxChartsPolyfills() {
    // IE11 fix
    // Ref: https://github.com/swimlane/ngx-charts/issues/386
    if (typeof (SVGElement) !== 'undefined' && typeof SVGElement.prototype.contains === 'undefined') {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }
}
ngxChartsPolyfills();

var PlacementTypes;
(function (PlacementTypes) {
    PlacementTypes[PlacementTypes["top"] = 'top'] = "top";
    PlacementTypes[PlacementTypes["bottom"] = 'bottom'] = "bottom";
    PlacementTypes[PlacementTypes["left"] = 'left'] = "left";
    PlacementTypes[PlacementTypes["right"] = 'right'] = "right";
})(PlacementTypes || (PlacementTypes = {}));

var caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'top') {
        return elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
var PositionHelper = /** @class */ (function () {
    function PositionHelper() {
    }
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, spacing) {
        var flip = false;
        if (placement === 'right') {
            if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            if (elDimensions.left - popoverDimensions.width - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
        var top = 0;
        var left = 0;
        if (placement === PlacementTypes.right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing) {
        var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.right) {
                return PlacementTypes.left;
            }
            else if (placement === PlacementTypes.left) {
                return PlacementTypes.right;
            }
            else if (placement === PlacementTypes.top) {
                return PlacementTypes.bottom;
            }
            else if (placement === PlacementTypes.bottom) {
                return PlacementTypes.top;
            }
        }
        return placement;
    };
    return PositionHelper;
}());

var StyleTypes;
(function (StyleTypes) {
    StyleTypes[StyleTypes["popover"] = 'popover'] = "popover";
    StyleTypes[StyleTypes["tooltip"] = 'tooltip'] = "tooltip";
})(StyleTypes || (StyleTypes = {}));

var AlignmentTypes;
(function (AlignmentTypes) {
    AlignmentTypes[AlignmentTypes["left"] = 'left'] = "left";
    AlignmentTypes[AlignmentTypes["center"] = 'center'] = "center";
    AlignmentTypes[AlignmentTypes["right"] = 'right'] = "right";
})(AlignmentTypes || (AlignmentTypes = {}));

var ShowTypes;
(function (ShowTypes) {
    ShowTypes[ShowTypes["all"] = 'all'] = "all";
    ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
    ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
})(ShowTypes || (ShowTypes = {}));

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
var InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService_1 = InjectionService;
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    InjectionService.setGlobalRootViewContainer = function (container) {
        InjectionService_1.globalRootViewContainer = container;
    };
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        var rootComponents = this.applicationRef.components;
        // fix cannot read length of undefined
        if (rootComponents) {
            if (rootComponents.length)
                return rootComponents[0];
        }
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        // the top most component root node has no `hostView`
        if (!componentRef.hostView)
            return componentRef.element.nativeElement;
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function () {
        return this.getComponentRootNode(this.getRootViewContainer());
    };
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (var _i = 0, bindingKeys_1 = bindingKeys; _i < bindingKeys_1.length; _i++) {
                    var bindingName = bindingKeys_1[_i];
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (var _a = 0, eventKeys_1 = eventKeys; _a < eventKeys_1.length; _a++) {
                    var eventName = eventKeys_1[_a];
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @template T
     * @param {Type<T>} componentClass
     * @param {*} [options={}]
     * @param {Element} [location=this.getRootViewContainerNode()]
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (location === void 0) { location = this.getRootViewContainerNode(); }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.injector);
        var appRef = this.applicationRef;
        var componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        // use the renderer to append the element for univseral support
        var renderer = componentRef.instance.renderer;
        renderer.appendChild(location, componentRootNode);
        return componentRef;
    };
    var InjectionService_1, _a, _b, _c;
    InjectionService.globalRootViewContainer = null;
    InjectionService = InjectionService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof ApplicationRef !== "undefined" && ApplicationRef) === "function" ? _a : Object, typeof (_b = typeof ComponentFactoryResolver !== "undefined" && ComponentFactoryResolver) === "function" ? _b : Object, typeof (_c = typeof Injector !== "undefined" && Injector) === "function" ? _c : Object])
    ], InjectionService);
    return InjectionService;
}());

var InjectionRegistery = /** @class */ (function () {
    function InjectionRegistery(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegistery.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegistery.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegistery.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegistery.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegistery.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegistery.prototype.destroyByType = function (type) {
        var comps = this.components.get(type);
        if (comps) {
            for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                var comp = comps_1[_i];
                this.destroy(comp);
            }
        }
    };
    InjectionRegistery.prototype.assignDefaults = function (bindings) {
        var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegistery.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegistery.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    return InjectionRegistery;
}());

/**
 * Throttle a function
 *
 * @export
 * @param {*}      func
 * @param {number} wait
 * @param {*}      [options]
 * @returns
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}

var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ngx-charts-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        if (!hostDim.height && !hostDim.width)
            return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        setTimeout(function () { return _this.renderer.addClass(nativeElm, 'animate'); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(nativeElm, 'top', top + "px");
        this.renderer.setStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setStyle(caretElm, 'top', top + "px");
        this.renderer.setStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipContentComponent.prototype, "host", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipContentComponent.prototype, "showCaret", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof StyleTypes !== "undefined" && StyleTypes) === "function" ? _a : Object)
    ], TooltipContentComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_b = typeof PlacementTypes !== "undefined" && PlacementTypes) === "function" ? _b : Object)
    ], TooltipContentComponent.prototype, "placement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_c = typeof AlignmentTypes !== "undefined" && AlignmentTypes) === "function" ? _c : Object)
    ], TooltipContentComponent.prototype, "alignment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipContentComponent.prototype, "spacing", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipContentComponent.prototype, "cssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipContentComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipContentComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipContentComponent.prototype, "context", void 0);
    __decorate([
        ViewChild('caretElm', { static: false }),
        __metadata("design:type", Object)
    ], TooltipContentComponent.prototype, "caretElm", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], TooltipContentComponent.prototype, "cssClasses", null);
    __decorate([
        HostListener('window:resize'),
        throttleable(100),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipContentComponent.prototype, "onWindowResize", null);
    TooltipContentComponent = __decorate([
        Component({
            selector: 'ngx-tooltip-content',
            template: "\n    <div>\n      <span #caretElm [hidden]=\"!showCaret\" class=\"tooltip-caret position-{{ this.placement }}\"> </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ model: context }\"> </ng-template>\n        </span>\n        <span *ngIf=\"title\" [innerHTML]=\"title\"> </span>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:400;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px 5px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{transform:translate3d(10px,0,0)}.ngx-charts-tooltip-content.position-left{transform:translate3d(-10px,0,0)}.ngx-charts-tooltip-content.position-top{transform:translate3d(0,-10px,0)}.ngx-charts-tooltip-content.position-bottom{transform:translate3d(0,10px,0)}.ngx-charts-tooltip-content.animate{opacity:1;transition:opacity .3s,transform .3s;transform:translate3d(0,0,0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}"]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _d : Object, typeof (_e = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _e : Object])
    ], TooltipContentComponent);
    return TooltipContentComponent;
}());

var TooltipService = /** @class */ (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        var _this = _super.call(this, injectionService) || this;
        _this.injectionService = injectionService;
        _this.type = TooltipContentComponent;
        return _this;
    }
    var _a;
    TooltipService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof InjectionService !== "undefined" && InjectionService) === "function" ? _a : Object])
    ], TooltipService);
    return TooltipService;
}(InjectionRegistery));

var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.top;
        this.tooltipAlignment = AlignmentTypes.center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all ||
                this.tooltipShowEvent === ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === ShowTypes.all ||
                this.tooltipShowEvent === ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled)
            return;
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                if (_this.component) {
                    _this.addHideListeners(_this.component.instance.element.nativeElement);
                }
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip(_this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event$$1) {
                var contains = tooltip.contains(event$$1.target);
                if (!contains)
                    _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (!this.component)
            return;
        var destroyFn = function () {
            // remove events
            if (_this.mouseLeaveContentEvent)
                _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent)
                _this.mouseEnterContentEvent();
            if (_this.documentClickEvent)
                _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipCssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TooltipDirective.prototype, "tooltipTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipSpacing", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof PlacementTypes !== "undefined" && PlacementTypes) === "function" ? _a : Object)
    ], TooltipDirective.prototype, "tooltipPlacement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_b = typeof AlignmentTypes !== "undefined" && AlignmentTypes) === "function" ? _b : Object)
    ], TooltipDirective.prototype, "tooltipAlignment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_c = typeof StyleTypes !== "undefined" && StyleTypes) === "function" ? _c : Object)
    ], TooltipDirective.prototype, "tooltipType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_d = typeof ShowTypes !== "undefined" && ShowTypes) === "function" ? _d : Object)
    ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltipContext", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipDirective.prototype, "tooltipImmediateExit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "show", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "hide", void 0);
    __decorate([
        HostListener('focusin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onFocus", null);
    __decorate([
        HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onBlur", null);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseLeave", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TooltipDirective.prototype, "onMouseClick", null);
    TooltipDirective = __decorate([
        Directive({ selector: '[ngx-tooltip]' }),
        __metadata("design:paramtypes", [typeof (_e = typeof TooltipService !== "undefined" && TooltipService) === "function" ? _e : Object, typeof (_f = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _f : Object, typeof (_g = typeof Renderer2 !== "undefined" && Renderer2) === "function" ? _g : Object])
    ], TooltipDirective);
    return TooltipDirective;
}());

var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            declarations: [TooltipContentComponent, TooltipDirective],
            providers: [InjectionService, TooltipService],
            exports: [TooltipContentComponent, TooltipDirective],
            imports: [CommonModule],
            entryComponents: [TooltipContentComponent]
        })
    ], TooltipModule);
    return TooltipModule;
}());

var ChartComponent = /** @class */ (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns / 12.0));
        this.legendWidth = (!this.legendOptions || this.legendOptions.position === 'right')
            ? Math.floor((this.view[0] * legendColumns / 12.0))
            : this.chartWidth;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "view", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "showLegend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "legendData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "legendType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ChartComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ChartComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([
        Component({
            providers: [TooltipService],
            selector: 'ngx-charts-chart',
            template: "\n    <div\n      class=\"ngx-charts-outer\"\n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({ opacity: 0 }),
                        animate('500ms 100ms', style({ opacity: 1 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof ViewContainerRef !== "undefined" && ViewContainerRef) === "function" ? _d : Object, typeof (_e = typeof TooltipService !== "undefined" && TooltipService) === "function" ? _e : Object])
    ], ChartComponent);
    return ChartComponent;
}());

/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
/**
 * Escapes a label.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
function escapeLabel(label) {
    return label.toLocaleString().replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            '\'': '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match];
    });
}

var LegendComponent = /** @class */ (function () {
    function LegendComponent(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var label = _a[_i];
            _loop_1(label);
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        this.labelActivate.emit(item);
    };
    LegendComponent.prototype.deactivate = function (item) {
        this.labelDeactivate.emit(item);
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendComponent.prototype, "horizontal", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], LegendComponent.prototype, "labelClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], LegendComponent.prototype, "labelActivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], LegendComponent.prototype, "labelDeactivate", void 0);
    LegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-legend',
            template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n            [class.horizontal-legend]=\"horizontal\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;-moz-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _d : Object])
    ], LegendComponent);
    return LegendComponent;
}());

var ScaleLegendComponent = /** @class */ (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.horizontal = false;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        var direction = (this.horizontal) ? 'right' : 'bottom';
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to " + direction + ", " + gradientValues + ")");
    };
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "valueRange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScaleLegendComponent.prototype, "horizontal", void 0);
    ScaleLegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-scale-legend',
            template: "\n    <div\n      class=\"scale-legend\"\n      [class.horizontal-legend]=\"horizontal\"\n      [style.height.px]=\"horizontal ? undefined : height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof DomSanitizer !== "undefined" && DomSanitizer) === "function" ? _a : Object])
    ], ScaleLegendComponent);
    return ScaleLegendComponent;
}());

var LegendEntryComponent = /** @class */ (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LegendEntryComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LegendEntryComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LegendEntryComponent.prototype, "formattedLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LegendEntryComponent.prototype, "isActive", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], LegendEntryComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], LegendEntryComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], LegendEntryComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_d = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _d : Object)
    ], LegendEntryComponent.prototype, "toggle", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LegendEntryComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LegendEntryComponent.prototype, "onMouseLeave", null);
    LegendEntryComponent = __decorate([
        Component({
            selector: 'ngx-charts-legend-entry',
            template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LegendEntryComponent);
    return LegendEntryComponent;
}());

function trimLabel(s, max$$1) {
    if (max$$1 === void 0) { max$$1 = 16; }
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    s = s.trim();
    if (s.length <= max$$1) {
        return s;
    }
    else {
        return s.slice(0, max$$1) + "...";
    }
}

var AdvancedLegendComponent = /** @class */ (function () {
    function AdvancedLegendComponent() {
        this.label = 'Total';
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.legendItems = [];
        this.labelFormatting = function (label) { return label; };
        this.percentageFormatting = function (percentage) { return percentage; };
        this.defaultValueFormatting = function (value) { return value.toLocaleString(); };
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d) {
            var label = formatLabel(d.name);
            var value = d.value;
            var color = _this.colors.getColor(label);
            var percentage = _this.total > 0 ? (value / _this.total) * 100 : 0;
            var formattedLabel = typeof _this.labelFormatting === 'function' ? _this.labelFormatting(label) : label;
            return {
                _value: value,
                data: d,
                value: value,
                color: color,
                label: formattedLabel,
                displayLabel: trimLabel(formattedLabel, 20),
                origialLabel: d.name,
                percentage: _this.percentageFormatting ? _this.percentageFormatting(percentage) : percentage.toLocaleString()
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AdvancedLegendComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedLegendComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdvancedLegendComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedLegendComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], AdvancedLegendComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], AdvancedLegendComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], AdvancedLegendComponent.prototype, "deactivate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedLegendComponent.prototype, "percentageFormatting", void 0);
    AdvancedLegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-advanced-legend',
            template: "\n    <div class=\"advanced-pie-legend\" [style.width.px]=\"width\">\n      <div\n        *ngIf=\"animations\"\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\"\n        [valueFormatting]=\"valueFormatting\"\n      ></div>\n      <div class=\"total-value\" *ngIf=\"!animations\">\n        {{ valueFormatting ? valueFormatting(roundedTotal) : defaultValueFormatting(roundedTotal) }}\n      </div>\n      <div class=\"total-label\">\n        {{ label }}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy: trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.data)\"\n            (mouseleave)=\"deactivate.emit(legendItem.data)\"\n            (click)=\"select.emit(legendItem.data)\"\n          >\n            <div class=\"item-color\" [style.border-left-color]=\"legendItem.color\"></div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem._value\"\n              [valueFormatting]=\"valueFormatting\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-value\">\n              {{ valueFormatting ? valueFormatting(legendItem.value) : defaultValueFormatting(legendItem.value) }}\n            </div>\n            <div class=\"item-label\">{{ legendItem.displayLabel }}</div>\n            <div\n              *ngIf=\"animations\"\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\"\n            ></div>\n            <div *ngIf=\"!animations\" class=\"item-percent\">{{ legendItem.percentage.toLocaleString() }}%</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            styles: [".advanced-pie-legend{float:left;position:relative;top:50%;transform:translate(0,-50%)}.advanced-pie-legend .total-value{font-size:36px}.advanced-pie-legend .total-label{font-size:24px;margin-bottom:19px}.advanced-pie-legend .legend-items-container{width:100%}.advanced-pie-legend .legend-items-container .legend-items{white-space:nowrap;overflow:auto}.advanced-pie-legend .legend-items-container .legend-items .legend-item{margin-right:20px;display:inline-block;cursor:pointer}.advanced-pie-legend .legend-items-container .legend-items .legend-item:focus{outline:0}.advanced-pie-legend .legend-items-container .legend-items .legend-item:hover{color:#000;-webkit-transition:.2s;-moz-transition:.2s;transition:.2s}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value{font-size:24px;margin-top:-6px;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label{font-size:14px;opacity:.7;margin-left:11px;margin-top:-6px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent{font-size:24px;opacity:.7;margin-left:11px}.advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color{border-left:4px solid;width:4px;height:42px;float:left;margin-right:7px}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AdvancedLegendComponent);
    return AdvancedLegendComponent;
}());

var cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
function id() {
    var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = "a" + newId;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}

var colorSets = [
    {
        name: 'vivid',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
        ]
    },
    {
        name: 'natural',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
        ]
    },
    {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
        ]
    },
    {
        name: 'fire',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
        ]
    },
    {
        name: 'solar',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
        ]
    },
    {
        name: 'air',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
        ]
    },
    {
        name: 'aqua',
        selectable: true,
        group: 'Continuous',
        domain: [
            '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
        ]
    },
    {
        name: 'flame',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
        ]
    },
    {
        name: 'ocean',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
        ]
    },
    {
        name: 'forest',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
        ]
    },
    {
        name: 'horizon',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
        ]
    },
    {
        name: 'neons',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
        ]
    },
    {
        name: 'picnic',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
        ]
    },
    {
        name: 'night',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
            '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
        ]
    },
    {
        name: 'nightLights',
        selectable: false,
        group: 'Ordinal',
        domain: [
            '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
            '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
        ]
    }
];

function sortLinear(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        if (direction === 'asc') {
            return a[property] - b[property];
        }
        else {
            return b[property] - a[property];
        }
    });
}
function sortByDomain(data, property, direction, domain) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aVal = a[property];
        var bVal = b[property];
        var aIdx = domain.indexOf(aVal);
        var bIdx = domain.indexOf(bVal);
        if (direction === 'asc') {
            return aIdx - bIdx;
        }
        else {
            return bIdx - aIdx;
        }
    });
}
function sortByTime(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aDate = a[property].getTime();
        var bDate = b[property].getTime();
        if (direction === 'asc') {
            if (aDate > bDate)
                return 1;
            if (bDate > aDate)
                return -1;
            return 0;
        }
        else {
            if (aDate > bDate)
                return -1;
            if (bDate > aDate)
                return 1;
            return 0;
        }
    });
}

/**
 * Accepts a color (string) and returns a inverted hex color (string)
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} value
 * @returns {string}
 */
function invertColor(value) {
    var color = rgb(value);
    var r = color.r, g = color.g, b = color.b, opacity = color.opacity;
    if (opacity === 0) {
        return color.toString();
    }
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    var depth = (yiq >= 128) ? -.8 : .8;
    return shadeRGBColor(color, depth);
}
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param {any} { r, g, b }
 * @param {any} percent
 * @returns
 */
function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

/**
 * Visibility Observer
 */
var VisibilityObserver = /** @class */ (function () {
    function VisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    VisibilityObserver.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            if (!_this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 100);
                });
            }
        };
        this.zone.runOutsideAngular(function () {
            _this.timeout = setTimeout(function () { return check(); });
        });
    };
    var _a;
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], VisibilityObserver.prototype, "visible", void 0);
    return VisibilityObserver;
}());

function isDate(value) {
    return toString.call(value) === '[object Date]';
}

var BaseChartComponent = /** @class */ (function () {
    function BaseChartComponent(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.animations = true;
        this.select = new EventEmitter();
    }
    BaseChartComponent.prototype.ngAfterViewInit = function () {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    };
    BaseChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    };
    BaseChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BaseChartComponent.prototype.update = function () {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        else {
            this.results = [];
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        if (this.cd) {
            this.cd.markForCheck();
        }
    };
    BaseChartComponent.prototype.getContainerDims = function () {
        var width;
        var height;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            var dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width: width, height: height };
        }
        return null;
    };
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    BaseChartComponent.prototype.formatDates = function () {
        for (var i = 0; i < this.results.length; i++) {
            var g = this.results[i];
            g.label = g.name;
            if (g.label instanceof Date) {
                g.label = g.label.toLocaleDateString();
            }
            if (g.series) {
                for (var j = 0; j < g.series.length; j++) {
                    var d = g.series[j];
                    d.label = d.name;
                    if (d.label instanceof Date) {
                        d.label = d.label.toLocaleDateString();
                    }
                }
            }
        }
    };
    BaseChartComponent.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChartComponent.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        var source = fromEvent(window, 'resize');
        var subscription = source.pipe(debounceTime(200)).subscribe(function (e) {
            _this.update();
            if (_this.cd) {
                _this.cd.markForCheck();
            }
        });
        this.resizeSubscription = subscription;
    };
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    BaseChartComponent.prototype.cloneData = function (data) {
        var results = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var copy = {
                name: item['name']
            };
            if (item['value'] !== undefined) {
                copy['value'] = item['value'];
            }
            if (item['series'] !== undefined) {
                copy['series'] = [];
                for (var _a = 0, _b = item['series']; _a < _b.length; _a++) {
                    var seriesItem = _b[_a];
                    var seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            if (item['extra'] !== undefined) {
                copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
            }
            results.push(copy);
        }
        return results;
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BaseChartComponent.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BaseChartComponent.prototype, "view", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BaseChartComponent.prototype, "scheme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BaseChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BaseChartComponent.prototype, "customColors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BaseChartComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BaseChartComponent.prototype, "select", void 0);
    BaseChartComponent = __decorate([
        Component({
            selector: 'base-chart',
            template: "\n    <div></div>\n  "
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof NgZone !== "undefined" && NgZone) === "function" ? _b : Object, typeof (_c = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _c : Object])
    ], BaseChartComponent);
    return BaseChartComponent;
}());

var AxisLabelComponent = /** @class */ (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AxisLabelComponent.prototype, "orient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AxisLabelComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AxisLabelComponent.prototype, "offset", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AxisLabelComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AxisLabelComponent.prototype, "height", void 0);
    AxisLabelComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-axis-label]',
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], AxisLabelComponent);
    return AxisLabelComponent;
}());

function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        var reduced = [];
        var modulus = Math.floor(ticks.length / maxTicks);
        for (var i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}

var XAxisTicksComponent = /** @class */ (function () {
    function XAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.rotateTicks = true;
        this.dimensionsChanged = new EventEmitter();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
    }
    XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height: height });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    XAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        var angle = this.rotateTicks ? this.getRotationAngle(this.ticks) : null;
        this.adjustedScale = this.scale.bandwidth
            ? function (d) {
                return this.scale(d) + this.scale.bandwidth() * 0.5;
            }
            : this.scale;
        this.textTransform = '';
        if (angle && angle !== 0) {
            this.textTransform = "rotate(" + angle + ")";
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        this.maxTicksLength = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = this.tickFormat(ticks[i]).toString();
            var tickLength = tick.length;
            if (this.trimTicks) {
                tickLength = this.tickTrim(tick).length;
            }
            if (tickLength > this.maxTicksLength) {
                this.maxTicksLength = tickLength;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8; // need to measure this
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(100);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicksComponent.prototype.getMaxTicks = function (tickWidth) {
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    XAxisTicksComponent.prototype.tickTrim = function (label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "tickArguments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], XAxisTicksComponent.prototype, "tickValues", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], XAxisTicksComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], XAxisTicksComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], XAxisTicksComponent.prototype, "rotateTicks", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild('ticksel', { static: false }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], XAxisTicksComponent.prototype, "ticksElement", void 0);
    XAxisTicksComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-x-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\" [attr.transform]=\"tickTransform(tick)\">\n        <title>{{ tickFormat(tick) }}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\"\n        >\n          {{ tickTrim(tickFormat(tick)) }}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\" [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\" [attr.transform]=\"gridLineTransform()\">\n        <svg:line class=\"gridline-path gridline-path-vertical\" [attr.y1]=\"-gridLineHeight\" y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], XAxisTicksComponent);
    return XAxisTicksComponent;
}());

var XAxisComponent = /** @class */ (function () {
    function XAxisComponent() {
        this.rotateTicks = true;
        this.showGridLines = false;
        this.xOrient = 'bottom';
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.padding + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], XAxisComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], XAxisComponent.prototype, "rotateTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], XAxisComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "showLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "labelText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], XAxisComponent.prototype, "ticks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "xAxisTickInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "xAxisTickCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], XAxisComponent.prototype, "xOrient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], XAxisComponent.prototype, "xAxisOffset", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], XAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild(XAxisTicksComponent, { static: false }),
        __metadata("design:type", typeof (_a = typeof XAxisTicksComponent !== "undefined" && XAxisTicksComponent) === "function" ? _a : Object)
    ], XAxisComponent.prototype, "ticksComponent", void 0);
    XAxisComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-x-axis]',
            template: "\n    <svg:g [attr.class]=\"xAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-x-axis-ticks\n        *ngIf=\"xScale\"\n        [trimTicks]=\"trimTicks\"\n        [rotateTicks]=\"rotateTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        [tickValues]=\"ticks\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], XAxisComponent);
    return XAxisComponent;
}());

/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param {*} x, y, w, h, r, tl, tr, bl, br
 * @returns {string}
 */
function roundedRect(x, y, w, h, r, _a) {
    var tl = _a[0], tr = _a[1], bl = _a[2], br = _a[3];
    var retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = "M" + [x + r, y];
    retval += "h" + (w - 2 * r);
    if (tr) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, r];
    }
    else {
        retval += "h" + r + "v" + r;
    }
    retval += "v" + (h - 2 * r);
    if (br) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, r];
    }
    else {
        retval += "v" + r + "h" + -r;
    }
    retval += "h" + (2 * r - w);
    if (bl) {
        retval += "a" + [r, r] + " 0 0 1 " + [-r, -r];
    }
    else {
        retval += "h" + -r + "v" + -r;
    }
    retval += "v" + (2 * r - h);
    if (tl) {
        retval += "a" + [r, r] + " 0 0 1 " + [r, -r];
    }
    else {
        retval += "v" + -r + "h" + r;
    }
    retval += "z";
    return retval;
}

var YAxisTicksComponent = /** @class */ (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width: width });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    YAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth
            ? function (d) {
                return scale(d) + scale.bandwidth() * 0.5;
            }
            : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.setReferencelines = function () {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
            false,
            false,
            false,
            false
        ]);
    };
    YAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    YAxisTicksComponent.prototype.tickTrim = function (label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickArguments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], YAxisTicksComponent.prototype, "tickValues", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], YAxisTicksComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], YAxisTicksComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], YAxisTicksComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], YAxisTicksComponent.prototype, "showRefLines", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild('ticksel', { static: false }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], YAxisTicksComponent.prototype, "ticksElement", void 0);
    YAxisTicksComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-y-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\" [attr.transform]=\"transform(tick)\">\n        <title>{{ tickFormat(tick) }}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\"\n        >\n          {{ tickTrim(tickFormat(tick)) }}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path\n      *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\" [attr.transform]=\"transform(tick)\">\n      <svg:g *ngIf=\"showGridLines\" [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          *ngIf=\"orient === 'left'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n        />\n        <svg:line\n          *ngIf=\"orient === 'right'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\"\n        />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line\n          class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"\n        />\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\"\n          >\n            {{ refLine.name }}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisTicksComponent);
    return YAxisTicksComponent;
}());

var YAxisComponent = /** @class */ (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.yOrient = 'left';
        this.yAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.yAxisClassName = 'y axis';
        this.labelOffset = 15;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
        this.padding = 5;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
        this.offset = -(this.yAxisOffset + this.padding);
        if (this.yOrient === 'right') {
            this.labelOffset = 65;
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.offset = this.offset;
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset && this.yOrient === 'right') {
            this.labelOffset = width + this.labelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
        else if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], YAxisComponent.prototype, "trimTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], YAxisComponent.prototype, "maxTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], YAxisComponent.prototype, "ticks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "labelText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "yAxisTickCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], YAxisComponent.prototype, "yOrient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], YAxisComponent.prototype, "yAxisOffset", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], YAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        ViewChild(YAxisTicksComponent, { static: false }),
        __metadata("design:type", typeof (_a = typeof YAxisTicksComponent !== "undefined" && YAxisTicksComponent) === "function" ? _a : Object)
    ], YAxisComponent.prototype, "ticksComponent", void 0);
    YAxisComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-y-axis]',
            template: "\n    <svg:g [attr.class]=\"yAxisClassName\" [attr.transform]=\"transform\">\n      <svg:g\n        ngx-charts-y-axis-ticks\n        *ngIf=\"yScale\"\n        [trimTicks]=\"trimTicks\"\n        [maxTickLength]=\"maxTickLength\"\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickValues]=\"ticks\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [referenceLines]=\"referenceLines\"\n        [showRefLines]=\"showRefLines\"\n        [showRefLabels]=\"showRefLabels\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g\n        ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], YAxisComponent);
    return YAxisComponent;
}());

var AxesModule = /** @class */ (function () {
    function AxesModule() {
    }
    AxesModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent],
            exports: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent]
        })
    ], AxesModule);
    return AxesModule;
}());

var ColorHelper = /** @class */ (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            var colorDomain = scheme.domain.slice();
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            var points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (value === undefined || value === null) {
            throw new Error('Value can not be null');
        }
        if (this.scaleType === 'linear') {
            var valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return this.scale(valueScale(value));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        var valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 1;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
                    var s = stops_1[_i];
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    };
    return ColorHelper;
}());

var CircleSeriesComponent = /** @class */ (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circle = this.getActiveCircle();
    };
    CircleSeriesComponent.prototype.getActiveCircle = function () {
        var _this = this;
        var indexActiveDataPoint = this.data.series.findIndex(function (d) {
            var label = d.name;
            return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
        });
        if (indexActiveDataPoint === -1) {
            // No valid point is 'active/hovered over' at this moment.
            return undefined;
        }
        return this.mapDataPointToCircle(this.data.series[indexActiveDataPoint], indexActiveDataPoint);
    };
    CircleSeriesComponent.prototype.mapDataPointToCircle = function (d, i) {
        var seriesName = this.data.name;
        var value = d.value;
        var label = d.name;
        var tooltipLabel = formatLabel(label);
        var cx;
        if (this.scaleType === 'time') {
            cx = this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            cx = this.xScale(Number(label));
        }
        else {
            cx = this.xScale(label);
        }
        var cy = this.yScale(this.type === 'standard' ? value : d.d1);
        var radius = 5;
        var height = this.yScale.range()[0] - cy;
        var opacity = 1;
        var color;
        if (this.colors.scaleType === 'linear') {
            if (this.type === 'standard') {
                color = this.colors.getColor(value);
            }
            else {
                color = this.colors.getColor(d.d1);
            }
        }
        else {
            color = this.colors.getColor(seriesName);
        }
        var data = Object.assign({}, d, {
            series: seriesName,
            value: value,
            name: label
        });
        return {
            classNames: ["circle-data-" + i],
            value: value,
            label: label,
            data: data,
            cx: cx,
            cy: cy,
            radius: radius,
            height: height,
            tooltipLabel: tooltipLabel,
            color: color,
            opacity: opacity,
            seriesName: seriesName,
            gradientStops: this.getGradientStops(color),
            min: d.min,
            max: d.max
        };
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min$$1 = _a.min, max$$1 = _a.max;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(seriesName) + " \u2022 " + escapeLabel(tooltipLabel) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min$$1, max$$1) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min$$1, max$$1) {
        if (min$$1 !== undefined || max$$1 !== undefined) {
            var result = ' (';
            if (min$$1 !== undefined) {
                if (max$$1 === undefined) {
                    result += '≥';
                }
                result += min$$1.toLocaleString();
                if (max$$1 !== undefined) {
                    result += ' - ';
                }
            }
            else if (max$$1 !== undefined) {
                result += '≤';
            }
            if (max$$1 !== undefined) {
                result += max$$1.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }
        ];
    };
    CircleSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof ColorHelper !== "undefined" && ColorHelper) === "function" ? _a : Object)
    ], CircleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CircleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_b = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _b : Object)
    ], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-circle-series]',
            template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g\n        ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({ name: circle.seriesName })\"\n        [pointerEvents]=\"circle.value === 0 ? 'none' : 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick(circle.data)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0
                        }),
                        animate(250, style({ opacity: 1 }))
                    ])
                ])
            ]
        })
    ], CircleSeriesComponent);
    return CircleSeriesComponent;
}());

var CircleComponent = /** @class */ (function () {
    function CircleComponent() {
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = Array.isArray(this.classNames) ?
            this.classNames.join(' ') :
            '';
        this.classNames += 'circle';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "cx", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "cy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "r", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "stroke", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "classNames", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "circleOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "pointerEvents", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CircleComponent.prototype, "deactivate", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CircleComponent.prototype, "onClick", null);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CircleComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CircleComponent.prototype, "onMouseLeave", null);
    CircleComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-circle]',
            template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CircleComponent);
    return CircleComponent;
}());

var GridPanelComponent = /** @class */ (function () {
    function GridPanelComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelComponent.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelComponent.prototype, "x", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelComponent.prototype, "y", void 0);
    GridPanelComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-grid-panel]',
            template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GridPanelComponent);
    return GridPanelComponent;
}());

var GridPanelSeriesComponent = /** @class */ (function () {
    function GridPanelSeriesComponent() {
    }
    GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GridPanelSeriesComponent.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeriesComponent.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d) {
            var offset;
            var width;
            var height;
            var x;
            var y;
            var className = 'odd';
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = Number.parseInt((position / _this.xScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                width = _this.xScale.bandwidth() + offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = Number.parseInt((position / _this.yScale.step()).toString(), 10);
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + offset;
                x = 0;
                y = _this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GridPanelSeriesComponent.prototype, "orient", void 0);
    GridPanelSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-grid-panel-series]',
            template: "\n    <svg:g ngx-charts-grid-panel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GridPanelSeriesComponent);
    return GridPanelSeriesComponent;
}());

var SvgLinearGradientComponent = /** @class */ (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgLinearGradientComponent.prototype, "orientation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgLinearGradientComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SvgLinearGradientComponent.prototype, "stops", void 0);
    SvgLinearGradientComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-svg-linear-gradient]',
            template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:linearGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgLinearGradientComponent);
    return SvgLinearGradientComponent;
}());

var SvgRadialGradientComponent = /** @class */ (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    Object.defineProperty(SvgRadialGradientComponent.prototype, "stops", {
        get: function () {
            return this.stopsInput || this.stopsDefault;
        },
        set: function (value) {
            this.stopsInput = value;
        },
        enumerable: true,
        configurable: true
    });
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = '30%';
        if (('color' in changes) ||
            ('startOpacity' in changes) ||
            ('endOpacity' in changes)) {
            this.stopsDefault = [{
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                }, {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }];
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SvgRadialGradientComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "cx", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SvgRadialGradientComponent.prototype, "cy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SvgRadialGradientComponent.prototype, "stops", null);
    SvgRadialGradientComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-svg-radial-gradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />\n    </svg:radialGradient>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}());

var Timeline = /** @class */ (function () {
    function Timeline(element, cd) {
        this.cd = cd;
        this.height = 50;
        this.select = new EventEmitter();
        this.onDomainChange = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        this.dims = this.getDims();
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        this.filterId = 'filter' + id().toString();
        this.filter = "url(#" + this.filterId + ")";
        this.cd.markForCheck();
    };
    Timeline.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        var domain = [];
        if (this.scaleType === 'time') {
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            domain = [min$$1, max$$1];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            domain = [min$$1, max$$1];
        }
        else {
            domain = values;
        }
        return domain;
    };
    Timeline.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush = brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', function () {
            var selection = event.selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
            _this.cd.markForCheck();
        });
        select(this.element)
            .select('.brush')
            .call(this.brush);
    };
    Timeline.prototype.updateBrush = function () {
        if (!this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        select(this.element)
            .select('.brush')
            .call(this.brush);
        select(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
        this.cd.markForCheck();
    };
    Timeline.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "view", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "state", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "scheme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "customColors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "miniChart", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "autoScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Timeline.prototype, "height", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], Timeline.prototype, "onDomainChange", void 0);
    Timeline = __decorate([
        Component({
            selector: 'g[ngx-charts-timeline]',
            template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
            styles: [".timeline .brush-background{fill:rgba(0,0,0,.05)}.timeline .brush .selection{fill:rgba(0,0,0,.1);stroke-width:1px;stroke:#888}.timeline .brush .handle{fill-opacity:0}.timeline .embedded-chart{opacity:.6}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object, typeof (_b = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _b : Object])
    ], Timeline);
    return Timeline;
}());

var AreaComponent = /** @class */ (function () {
    function AreaComponent(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.updatePathEl = function () {
        var node = select(this.element).select('.area');
        if (this.animations) {
            node.transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "startingPath", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "opacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "startOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "endOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "activeLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaComponent.prototype, "stops", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AreaComponent.prototype, "select", void 0);
    AreaComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], AreaComponent);
    return AreaComponent;
}());

// If we don't check whether 'window' and 'global' variables are defined,
// code will fail in browser/node with 'variable is undefined' error.
var root;
if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global;
}
// tslint:disable-next-line:variable-name
var MouseEvent = root.MouseEvent;
function createMouseEvent(name, bubbles, cancelable) {
    if (bubbles === void 0) { bubbles = false; }
    if (cancelable === void 0) { cancelable = true; }
    // Calling new of an event does not work correctly on IE. The following is a tested workaround
    // See https://stackoverflow.com/questions/27176983/dispatchevent-not-working-in-ie11
    if (typeof (MouseEvent) === 'function') {
        // Sane browsers
        return new MouseEvent(name, { bubbles: bubbles, cancelable: cancelable });
    }
    else {
        // IE
        var event$$1 = document.createEvent('MouseEvent');
        event$$1.initEvent(name, bubbles, cancelable);
        return event$$1;
    }
}

var TooltipArea = /** @class */ (function () {
    function TooltipArea() {
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    TooltipArea.prototype.getValues = function (xVal) {
        var results = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
            var groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                var label = item.name;
                var val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                var color = void 0;
                if (this.colors.scaleType === 'linear') {
                    var v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                var data = Object.assign({}, item, {
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color: color
                });
                results.push(data);
            }
        }
        return results;
    };
    TooltipArea.prototype.mouseMove = function (event$$1) {
        var xPos = event$$1.pageX - event$$1.target.getBoundingClientRect().left;
        var closestIndex = this.findClosestPointIndex(xPos);
        var closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            var ev = createMouseEvent('mouseleave');
            this.tooltipAnchor.nativeElement.dispatchEvent(ev);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    };
    TooltipArea.prototype.findClosestPointIndex = function (xPos) {
        var minIndex = 0;
        var maxIndex = this.xSet.length - 1;
        var minDiff = Number.MAX_VALUE;
        var closestIndex = 0;
        while (minIndex <= maxIndex) {
            var currentIndex = ((minIndex + maxIndex) / 2) | 0;
            var currentElement = this.xScale(this.xSet[currentIndex]);
            var curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    };
    TooltipArea.prototype.showTooltip = function () {
        var event$$1 = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event$$1);
    };
    TooltipArea.prototype.hideTooltip = function () {
        var event$$1 = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event$$1);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    };
    TooltipArea.prototype.getToolTipText = function (tooltipItem) {
        var result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "xSet", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipArea.prototype, "showPercentage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TooltipArea.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], TooltipArea.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "hover", void 0);
    __decorate([
        ViewChild('tooltipAnchor', { static: false }),
        __metadata("design:type", Object)
    ], TooltipArea.prototype, "tooltipAnchor", void 0);
    TooltipArea = __decorate([
        Component({
            selector: 'g[ngx-charts-tooltip-area]',
            template: "\n    <svg:g>\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"0\"\n        y=\"0\"\n        [attr.width]=\"dims.width\"\n        [attr.height]=\"dims.height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mousemove)=\"mouseMove($event)\"\n        (mouseleave)=\"hideTooltip()\"\n      />\n      <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div *ngFor=\"let tooltipItem of model\" class=\"tooltip-item\">\n            <span class=\"tooltip-item-color\" [style.background-color]=\"tooltipItem.color\"> </span>\n            {{ getToolTipText(tooltipItem) }}\n          </xhtml:div>\n        </xhtml:div>\n      </xhtml:ng-template>\n      <svg:rect\n        #tooltipAnchor\n        [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"anchorPos\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"dims.height\"\n        [style.opacity]=\"anchorOpacity\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate\"\n        [tooltipContext]=\"anchorValues\"\n        [tooltipImmediateExit]=\"true\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition('inactive => active', [
                        style({
                            opacity: 0
                        }),
                        animate(250, style({ opacity: 0.7 }))
                    ]),
                    transition('active => inactive', [
                        style({
                            opacity: 0.7
                        }),
                        animate(250, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], TooltipArea);
    return TooltipArea;
}());

// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}
/**
 * Counts from a number to the end incrementally.
 *
 * @export
 * @param {any} countFrom
 * @param {any} countTo
 * @param {any} countDecimals
 * @param {any} countDuration
 * @param {any} callback
 * @returns
 */
function count(countFrom, countTo, countDecimals, countDuration, callback) {
    var startVal = Number(countFrom);
    var endVal = Number(countTo);
    var countDown = startVal > endVal;
    var decimals = Math.max(0, countDecimals);
    var dec = Math.pow(10, decimals);
    var duration = Number(countDuration) * 1000;
    var startTime;
    function runCount(timestamp) {
        var frameVal;
        var progress = timestamp - startTime;
        if (countDown) {
            frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
        }
        else {
            frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
        }
        if (countDown) {
            frameVal = frameVal < endVal ? endVal : frameVal;
        }
        else {
            frameVal = frameVal > endVal ? endVal : frameVal;
        }
        frameVal = Math.round(frameVal * dec) / dec;
        var tick = progress < duration;
        callback({
            value: frameVal,
            progress: progress,
            timestamp: timestamp,
            finished: !tick
        });
        if (tick) {
            return requestAnimationFrame(function (val) { return runCount(val); });
        }
    }
    return requestAnimationFrame(function (timestamp) {
        startTime = timestamp;
        return runCount(timestamp);
    });
}
/**
 * Determine decimals places
 *
 * @export
 * @param {any} countTo
 * @returns
 */
function decimalChecker(countTo) {
    var endVal = Number(countTo);
    if (endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
        return 2;
    }
    return 0;
}

/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
var CountUpDirective = /** @class */ (function () {
    function CountUpDirective(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return decimalChecker(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var valueFormatting = this.valueFormatting || (function (value) { return "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix; });
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.value = valueFormatting(value);
            _this.cd.markForCheck();
            if (!finished)
                _this.countChange.emit({ value: _this.value, progress: progress });
            if (finished)
                _this.countFinish.emit({ value: _this.value, progress: progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CountUpDirective.prototype, "countDuration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CountUpDirective.prototype, "countPrefix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CountUpDirective.prototype, "countSuffix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CountUpDirective.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CountUpDirective.prototype, "countDecimals", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CountUpDirective.prototype, "countTo", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CountUpDirective.prototype, "countFrom", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CountUpDirective.prototype, "countChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CountUpDirective.prototype, "countFinish", void 0);
    CountUpDirective = __decorate([
        Component({
            selector: '[ngx-charts-count-up]',
            template: "{{value}}"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _a : Object, typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object])
    ], CountUpDirective);
    return CountUpDirective;
}());

var COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
var ChartCommonModule = /** @class */ (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                AxesModule,
                TooltipModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                CommonModule,
                AxesModule,
                TooltipModule
            ].concat(COMPONENTS)
        })
    ], ChartCommonModule);
    return ChartCommonModule;
}());

function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.legendPosition, legendPosition = _k === void 0 ? 'right' : _k, _l = _a.columns, columns = _l === void 0 ? 12 : _l;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
    if (showLegend && legendPosition === 'right') {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = chartWidth * columns / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        width: Math.floor(chartWidth),
        height: Math.floor(chartHeight),
        xOffset: Math.floor(xOffset)
    };
}

/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
function getUniqueXDomainValues(results) {
    var valueSet = new Set();
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        for (var _a = 0, _b = result.series; _a < _b.length; _a++) {
            var d = _b[_a];
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @param values
 * @returns {string} 'time', 'linear' or 'ordinal'
 */
function getScaleType(values, checkDateType) {
    if (checkDateType === void 0) { checkDateType = true; }
    if (checkDateType) {
        var allDates = values.every(function (value) { return value instanceof Date; });
        if (allDates) {
            return 'time';
        }
    }
    var allNumbers = values.every(function (value) { return typeof value === 'number'; });
    if (allNumbers) {
        return 'linear';
    }
    return 'ordinal';
}

var AreaChartComponent = /** @class */ (function (_super) {
    __extends(AreaChartComponent, _super);
    function AreaChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.baseValue = 'auto';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    AreaChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
        }
        var min$$1;
        var max$$1;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min$$1 = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, values);
            max$$1 = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min$$1), new Date(max$$1)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min$$1, max$$1];
            this.xSet = values.slice().sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var values = domain.slice();
        if (!this.autoScale) {
            values.push(0);
        }
        if (this.baseValue !== 'auto') {
            values.push(this.baseValue);
        }
        var min$$1 = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, values);
        var max$$1 = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, values);
        return [min$$1, max$$1];
    };
    AreaChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint().padding(0.1);
        }
        scale.range([0, width]).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartComponent.prototype.getScaleType = function (values) {
        var date = true;
        var num = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                num = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (num) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "state", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "baseValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "timeline", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], AreaChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], AreaChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], AreaChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_d = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _d : Object)
    ], AreaChartComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AreaChartComponent.prototype, "hideCircles", null);
    AreaChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-area-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [baseValue]=\"baseValue\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [baseValue]=\"baseValue\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], AreaChartComponent);
    return AreaChartComponent;
}(BaseChartComponent));

var AreaChartNormalizedComponent = /** @class */ (function (_super) {
    __extends(AreaChartNormalizedComponent, _super);
    function AreaChartNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        var _loop_1 = function (i) {
            var val = this_1.xSet[i];
            var d0 = 0;
            var total = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    total += d.value;
                }
            }
            for (var _b = 0, _c = this_1.results; _b < _c.length; _b++) {
                var group = _c[_b];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0: d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    AreaChartNormalizedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartNormalizedComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            domain = [new Date(min$$1), new Date(max$$1)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            domain = [min$$1, max$$1];
            this.xSet = values.slice().sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartNormalizedComponent.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint().padding(0.1);
        }
        scale.range([0, width]).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartNormalizedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartNormalizedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "timeline", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartNormalizedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartNormalizedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], AreaChartNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], AreaChartNormalizedComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_d = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _d : Object)
    ], AreaChartNormalizedComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AreaChartNormalizedComponent.prototype, "hideCircles", null);
    AreaChartNormalizedComponent = __decorate([
        Component({
            selector: 'ngx-charts-area-chart-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [activeEntries]=\"activeEntries\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [showPercentage]=\"true\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                type=\"stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            normalized=\"true\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], AreaChartNormalizedComponent);
    return AreaChartNormalizedComponent;
}(BaseChartComponent));

var AreaChartStackedComponent = /** @class */ (function (_super) {
    __extends(AreaChartStackedComponent, _super);
    function AreaChartStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    AreaChartStackedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        var _loop_1 = function (i) {
            var val = this_1.xSet[i];
            var d0 = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0: d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_1(i);
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    AreaChartStackedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartStackedComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
        }
        var min$$1;
        var max$$1;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min$$1 = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, values);
            max$$1 = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min$$1), new Date(max$$1)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min$$1, max$$1];
            this.xSet = values.slice().sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    AreaChartStackedComponent.prototype.getYDomain = function () {
        var _this = this;
        var domain = [];
        var _loop_2 = function (i) {
            var val = this_2.xSet[i];
            var sum = 0;
            for (var _i = 0, _a = this_2.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    sum += d.value;
                }
            }
            domain.push(sum);
        };
        var this_2 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_2(i);
        }
        var min$$1 = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, [0].concat(domain));
        var max$$1 = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, domain);
        return [min$$1, max$$1];
    };
    AreaChartStackedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartStackedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime();
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear();
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint().padding(0.1);
        }
        scale.range([0, width]).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartStackedComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    AreaChartStackedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartStackedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    AreaChartStackedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    AreaChartStackedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartStackedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartStackedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartStackedComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartStackedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartStackedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "timeline", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AreaChartStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartStackedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartStackedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartStackedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaChartStackedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaChartStackedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaChartStackedComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartStackedComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AreaChartStackedComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], AreaChartStackedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], AreaChartStackedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], AreaChartStackedComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_d = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _d : Object)
    ], AreaChartStackedComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AreaChartStackedComponent.prototype, "hideCircles", null);
    AreaChartStackedComponent = __decorate([
        Component({
            selector: 'ngx-charts-area-chart-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n            <svg:g\n              ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [activeEntries]=\"activeEntries\"\n              stacked=\"true\"\n              [curve]=\"curve\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n              <svg:g\n                ngx-charts-circle-series\n                type=\"stacked\"\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [activeEntries]=\"activeEntries\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event, series)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            stacked=\"true\"\n            [curve]=\"curve\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], AreaChartStackedComponent);
    return AreaChartStackedComponent;
}(BaseChartComponent));

var AreaSeriesComponent = /** @class */ (function () {
    function AreaSeriesComponent() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var currentArea;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(function () { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = area()
                .x(xProperty)
                .y0(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); })
                .y1(function (d) { return _this.baseValue === 'auto' ? _this.yScale.range()[0] : _this.yScale(_this.baseValue); });
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                var max$$1 = Math.max.apply(Math, d1values);
                var min$$1 = Math.min.apply(Math, d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max$$1, min$$1);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                var max$$1 = Math.max.apply(Math, values);
                this.gradientStops = this.colors.getLinearGradientStops(max$$1);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "baseValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaSeriesComponent.prototype, "stacked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaSeriesComponent.prototype, "normalized", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AreaSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AreaSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AreaSeriesComponent.prototype, "select", void 0);
    AreaSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-area-series]',
            template: "\n    <svg:g ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [animations]=\"animations\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AreaSeriesComponent);
    return AreaSeriesComponent;
}());

var AreaChartModule = /** @class */ (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                AreaChartComponent,
                AreaChartNormalizedComponent,
                AreaChartStackedComponent,
                AreaSeriesComponent
            ],
            exports: [
                AreaChartComponent,
                AreaChartNormalizedComponent,
                AreaChartStackedComponent,
                AreaSeriesComponent
            ]
        })
    ], AreaChartModule);
    return AreaChartModule;
}());

var BarComponent = /** @class */ (function () {
    function BarComponent(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.hideBar = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    BarComponent.prototype.update = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
        this.checkToHideBar();
    };
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.updatePathEl = function () {
        var node = select(this.element).select('.bar');
        var path = this.getPath();
        if (this.animations) {
            node
                .transition()
                .duration(500)
                .attr('d', path);
        }
        else {
            node.attr('d', path);
        }
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    BarComponent.prototype.getStartingPath = function () {
        if (!this.animations) {
            return this.getPath();
        }
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    };
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    Object.defineProperty(BarComponent.prototype, "edges", {
        get: function () {
            var edges = [false, false, false, false];
            if (this.roundEdges) {
                if (this.orientation === 'vertical') {
                    if (this.data.value > 0) {
                        edges = [true, true, false, false];
                    }
                    else {
                        edges = [false, false, true, true];
                    }
                }
                else if (this.orientation === 'horizontal') {
                    if (this.data.value > 0) {
                        edges = [false, true, false, true];
                    }
                    else {
                        edges = [true, false, true, false];
                    }
                }
            }
            return edges;
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    BarComponent.prototype.checkToHideBar = function () {
        this.hideBar =
            this.noBarWhenZero &&
                ((this.orientation === 'vertical' && this.height === 0) ||
                    (this.orientation === 'horizontal' && this.width === 0));
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarComponent.prototype, "x", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarComponent.prototype, "y", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "orientation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "offset", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarComponent.prototype, "isActive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarComponent.prototype, "stops", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarComponent.prototype, "animations", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarComponent.prototype, "ariaLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BarComponent.prototype, "deactivate", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BarComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BarComponent.prototype, "onMouseLeave", null);
    BarComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-bar]',
            template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient [orientation]=\"orientation\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      role=\"img\"\n      tabIndex=\"-1\"\n      [class.active]=\"isActive\"\n      [class.hidden]=\"hideBar\"\n      [attr.d]=\"path\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], BarComponent);
    return BarComponent;
}());

var BarHorizontalComponent = /** @class */ (function (_super) {
    __extends(BarHorizontalComponent, _super);
    function BarHorizontalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        return _this;
    }
    BarHorizontalComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var spacing = this.yDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontalComponent.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min$$1 = this.xScaleMin ? Math.min.apply(Math, [this.xScaleMin].concat(values)) : Math.min.apply(Math, [0].concat(values));
        var max$$1 = this.xScaleMax ? Math.max.apply(Math, [this.xScaleMax].concat(values)) : Math.max.apply(Math, [0].concat(values));
        return [min$$1, max$$1];
    };
    BarHorizontalComponent.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    BarHorizontalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarHorizontalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.yDomain;
        }
        else {
            domain = this.xDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.yDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.xDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalComponent.prototype.onDataLabelMaxWidthChanged = function (event$$1) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event$$1.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event$$1.size.width);
        }
        if (event$$1.index === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarHorizontalComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarHorizontalComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarHorizontalComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarHorizontalComponent.prototype, "tooltipTemplate", void 0);
    BarHorizontalComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-horizontal',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-horizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event)\"\n        ></svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], BarHorizontalComponent);
    return BarHorizontalComponent;
}(BaseChartComponent));

var BarHorizontal2DComponent = /** @class */ (function (_super) {
    __extends(BarHorizontal2DComponent, _super);
    function BarHorizontal2DComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.groupPadding = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        return _this;
    }
    BarHorizontal2DComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal2DComponent.prototype.getGroupScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarHorizontal2DComponent.prototype.getInnerScale = function () {
        var height = this.groupScale.bandwidth();
        var spacing = this.innerDomain.length / (height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, height])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2DComponent.prototype.getValueScale = function () {
        var scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontal2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarHorizontal2DComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarHorizontal2DComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min$$1 = Math.min.apply(Math, [0].concat(domain));
        var max$$1 = this.xScaleMax ? Math.max.apply(Math, [this.xScaleMax].concat(domain)) : Math.max.apply(Math, [0].concat(domain));
        return [min$$1, max$$1];
    };
    BarHorizontal2DComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.label) + ")";
    };
    BarHorizontal2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontal2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontal2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontal2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontal2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontal2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontal2DComponent.prototype.onDataLabelMaxWidthChanged = function (event$$1, groupIndex) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event$$1.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event$$1.size.width);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarHorizontal2DComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontal2DComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontal2DComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontal2DComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontal2DComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontal2DComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontal2DComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontal2DComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontal2DComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "groupPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontal2DComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontal2DComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontal2DComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarHorizontal2DComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarHorizontal2DComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarHorizontal2DComponent.prototype, "tooltipTemplate", void 0);
    BarHorizontal2DComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-horizontal-2d',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-grid-panel-series\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            [xScale]=\"valueScale\"\n            [activeEntries]=\"activeEntries\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [roundEdges]=\"roundEdges\"\n            [animations]=\"animations\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarHorizontal2DComponent);
    return BarHorizontal2DComponent;
}(BaseChartComponent));

var BarHorizontalNormalizedComponent = /** @class */ (function (_super) {
    __extends(BarHorizontalNormalizedComponent, _super);
    function BarHorizontalNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarHorizontalNormalizedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarHorizontalNormalizedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarHorizontalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarHorizontalNormalizedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalNormalizedComponent.prototype.getXScale = function () {
        var scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalNormalizedComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalNormalizedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalNormalizedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalNormalizedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalNormalizedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalNormalizedComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarHorizontalNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarHorizontalNormalizedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarHorizontalNormalizedComponent.prototype, "tooltipTemplate", void 0);
    BarHorizontalNormalizedComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-horizontal-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarHorizontalNormalizedComponent);
    return BarHorizontalNormalizedComponent;
}(BaseChartComponent));

var BarHorizontalStackedComponent = /** @class */ (function (_super) {
    __extends(BarHorizontalStackedComponent, _super);
    function BarHorizontalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        return _this;
    }
    BarHorizontalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxWidth = { negative: 0, positive: 0 };
        }
        this.margin = [10, 20 + this.dataLabelMaxWidth.positive, 10, 20 + this.dataLabelMaxWidth.negative];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        var smallest = 0;
        var biggest = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var smallestSum = 0;
            var biggestSum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (d.value < 0) {
                    smallestSum += d.value;
                }
                else {
                    biggestSum += d.value;
                }
                smallest = d.value < smallest ? d.value : smallest;
                biggest = d.value > biggest ? d.value : biggest;
            }
            domain.push(smallestSum);
            domain.push(biggestSum);
        }
        domain.push(smallest);
        domain.push(biggest);
        var min$$1 = Math.min.apply(Math, [0].concat(domain));
        var max$$1 = this.xScaleMax ? Math.max.apply(Math, [this.xScaleMax].concat(domain)) : Math.max.apply(Math, domain);
        return [min$$1, max$$1];
    };
    BarHorizontalStackedComponent.prototype.getYScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.height])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStackedComponent.prototype.getXScale = function () {
        var scale = scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.onDataLabelMaxWidthChanged = function (event$$1, groupIndex) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxWidth.negative = Math.max(this.dataLabelMaxWidth.negative, event$$1.size.width);
        }
        else {
            this.dataLabelMaxWidth.positive = Math.max(this.dataLabelMaxWidth.positive, event$$1.size.width);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarHorizontalStackedComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalStackedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalStackedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalStackedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalStackedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalStackedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarHorizontalStackedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarHorizontalStackedComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarHorizontalStackedComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarHorizontalStackedComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarHorizontalStackedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarHorizontalStackedComponent.prototype, "tooltipTemplate", void 0);
    BarHorizontalStackedComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-horizontal-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [yAxisOffset]=\"dataLabelMaxWidth.negative\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-horizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelWidthChanged)=\"onDataLabelMaxWidthChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarHorizontalStackedComponent);
    return BarHorizontalStackedComponent;
}(BaseChartComponent));

var BarVerticalComponent = /** @class */ (function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVerticalComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVerticalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        var spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .range([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min$$1 = this.yScaleMin ? Math.min.apply(Math, [this.yScaleMin].concat(values)) : Math.min.apply(Math, [0].concat(values));
        if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
            min$$1 = Math.min.apply(Math, [min$$1].concat(this.yAxisTicks));
        }
        var max$$1 = this.yScaleMax ? Math.max.apply(Math, [this.yScaleMax].concat(values)) : Math.max.apply(Math, [0].concat(values));
        if (this.yAxisTicks && !this.yAxisTicks.some(isNaN)) {
            max$$1 = Math.max.apply(Math, [max$$1].concat(this.yAxisTicks));
        }
        return [min$$1, max$$1];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onDataLabelMaxHeightChanged = function (event$$1) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event$$1.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event$$1.size.height);
        }
        if (event$$1.index === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarVerticalComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarVerticalComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarVerticalComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarVerticalComponent.prototype, "tooltipTemplate", void 0);
    BarVerticalComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-vertical',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [activeEntries]=\"activeEntries\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event)\"\n        ></svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], BarVerticalComponent);
    return BarVerticalComponent;
}(BaseChartComponent));

var BarVertical2DComponent = /** @class */ (function (_super) {
    __extends(BarVertical2DComponent, _super);
    function BarVertical2DComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.scaleType = 'ordinal';
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.groupPadding = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.roundEdges = true;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVertical2DComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVertical2DComponent.prototype.onDataLabelMaxHeightChanged = function (event$$1, groupIndex) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event$$1.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event$$1.size.height);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarVertical2DComponent.prototype.getGroupScale = function () {
        var spacing = this.groupDomain.length / (this.dims.height / this.groupPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarVertical2DComponent.prototype.getInnerScale = function () {
        var width = this.groupScale.bandwidth();
        var spacing = this.innerDomain.length / (width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, width])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2DComponent.prototype.getValueScale = function () {
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVertical2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min$$1 = Math.min.apply(Math, [0].concat(domain));
        var max$$1 = this.yScaleMax ? Math.max.apply(Math, [this.yScaleMax].concat(domain)) : Math.max.apply(Math, [0].concat(domain));
        return [min$$1, max$$1];
    };
    BarVertical2DComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.label) + ", 0)";
    };
    BarVertical2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVertical2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVertical2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVertical2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVertical2DComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVertical2DComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVertical2DComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVertical2DComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVertical2DComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVertical2DComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVertical2DComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVertical2DComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVertical2DComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVertical2DComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "groupPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVertical2DComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVertical2DComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVertical2DComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarVertical2DComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarVertical2DComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarVertical2DComponent.prototype, "tooltipTemplate", void 0);
    BarVertical2DComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-vertical-2d',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-grid-panel-series\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-series-vertical\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n          [activeEntries]=\"activeEntries\"\n          [xScale]=\"innerScale\"\n          [yScale]=\"valueScale\"\n          [colors]=\"colors\"\n          [series]=\"group.series\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [showDataLabel]=\"showDataLabel\"\n          [dataLabelFormatting]=\"dataLabelFormatting\"\n          [seriesName]=\"group.name\"\n          [roundEdges]=\"roundEdges\"\n          [animations]=\"animations\"\n          [noBarWhenZero]=\"noBarWhenZero\"\n          (select)=\"onClick($event, group)\"\n          (activate)=\"onActivate($event, group)\"\n          (deactivate)=\"onDeactivate($event, group)\"\n          (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarVertical2DComponent);
    return BarVertical2DComponent;
}(BaseChartComponent));

var BarVerticalNormalizedComponent = /** @class */ (function (_super) {
    __extends(BarVerticalNormalizedComponent, _super);
    function BarVerticalNormalizedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    BarVerticalNormalizedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarVerticalNormalizedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarVerticalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarVerticalNormalizedComponent.prototype.getXScale = function () {
        var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalNormalizedComponent.prototype.getYScale = function () {
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalNormalizedComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalNormalizedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalNormalizedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalNormalizedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalNormalizedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalNormalizedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalNormalizedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalNormalizedComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalNormalizedComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarVerticalNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarVerticalNormalizedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarVerticalNormalizedComponent.prototype, "tooltipTemplate", void 0);
    BarVerticalNormalizedComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-vertical-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-vertical\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarVerticalNormalizedComponent);
    return BarVerticalNormalizedComponent;
}(BaseChartComponent));

var BarVerticalStackedComponent = /** @class */ (function (_super) {
    __extends(BarVerticalStackedComponent, _super);
    function BarVerticalStackedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.tooltipDisabled = false;
        _this.showGridLines = true;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.barPadding = 8;
        _this.roundDomains = false;
        _this.showDataLabel = false;
        _this.noBarWhenZero = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        return _this;
    }
    BarVerticalStackedComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        if (!this.showDataLabel) {
            this.dataLabelMaxHeight = { negative: 0, positive: 0 };
        }
        this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20];
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.showDataLabel) {
            this.dims.height -= this.dataLabelMaxHeight.negative;
        }
        this.formatDates();
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + (this.margin[0] + this.dataLabelMaxHeight.negative) + ")";
    };
    BarVerticalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.label)) {
                domain.push(group.label);
            }
        }
        return domain;
    };
    BarVerticalStackedComponent.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.label)) {
                    domain.push(d.label);
                }
            }
        }
        return domain;
    };
    BarVerticalStackedComponent.prototype.getValueDomain = function () {
        var domain = [];
        var smallest = 0;
        var biggest = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var smallestSum = 0;
            var biggestSum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (d.value < 0) {
                    smallestSum += d.value;
                }
                else {
                    biggestSum += d.value;
                }
                smallest = d.value < smallest ? d.value : smallest;
                biggest = d.value > biggest ? d.value : biggest;
            }
            domain.push(smallestSum);
            domain.push(biggestSum);
        }
        domain.push(smallest);
        domain.push(biggest);
        var min$$1 = Math.min.apply(Math, [0].concat(domain));
        var max$$1 = this.yScaleMax ? Math.max.apply(Math, [this.yScaleMax].concat(domain)) : Math.max.apply(Math, domain);
        return [min$$1, max$$1];
    };
    BarVerticalStackedComponent.prototype.getXScale = function () {
        var spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStackedComponent.prototype.getYScale = function () {
        var scale = scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BarVerticalStackedComponent.prototype.onDataLabelMaxHeightChanged = function (event$$1, groupIndex) {
        var _this = this;
        if (event$$1.size.negative) {
            this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event$$1.size.height);
        }
        else {
            this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event$$1.size.height);
        }
        if (groupIndex === this.results.length - 1) {
            setTimeout(function () { return _this.update(); });
        }
    };
    BarVerticalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(" + (this.xScale(group.name) || 0) + ", 0)";
    };
    BarVerticalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalStackedComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalStackedComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalStackedComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalStackedComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarVerticalStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalStackedComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalStackedComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalStackedComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BarVerticalStackedComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "barPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BarVerticalStackedComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarVerticalStackedComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BarVerticalStackedComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarVerticalStackedComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BarVerticalStackedComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BarVerticalStackedComponent.prototype, "tooltipTemplate", void 0);
    BarVerticalStackedComponent = __decorate([
        Component({
            selector: 'ngx-charts-bar-vertical-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, undefined, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, undefined, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          [xAxisOffset]=\"dataLabelMaxHeight.negative\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          *ngFor=\"let group of results; let index = index; trackBy: trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n        >\n          <svg:g\n            ngx-charts-series-vertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [showDataLabel]=\"showDataLabel\"\n            [dataLabelFormatting]=\"dataLabelFormatting\"\n            [seriesName]=\"group.name\"\n            [animations]=\"animations\"\n            [noBarWhenZero]=\"noBarWhenZero\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n            (dataLabelHeightChanged)=\"onDataLabelMaxHeightChanged($event, index)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1,
                            transform: '*'
                        }),
                        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        })
    ], BarVerticalStackedComponent);
    return BarVerticalStackedComponent;
}(BaseChartComponent));

var D0Types;
(function (D0Types) {
    D0Types["positive"] = "positive";
    D0Types["negative"] = "negative";
})(D0Types || (D0Types = {}));
var SeriesVerticalComponent = /** @class */ (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelHeightChanged = new EventEmitter();
        this.barsForDataLabels = [];
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _this = this;
        var _a;
        this.updateTooltipSettings();
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        width = Math.round(width);
        var yScaleMin = Math.max(this.yScale.domain()[0], 0);
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = _this.getLabel(d);
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(yScaleMin));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled
                ? undefined
                : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesVerticalComponent.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            if (section.total > 0) {
                section.height = this.yScale(totalPositive);
            }
            else {
                section.height = this.yScale(totalNegative);
            }
            section.width = this.xScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.label;
                section.total = d.value;
                section.x = _this.xScale(d.label);
                section.y = _this.yScale(0);
                section.height = _this.yScale(section.total) - _this.yScale(0);
                section.width = _this.xScale.bandwidth();
                return section;
            });
        }
    };
    SeriesVerticalComponent.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.getLabel = function (dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesVerticalComponent.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "series", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SeriesVerticalComponent.prototype, "seriesName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], SeriesVerticalComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "animations", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesVerticalComponent.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesVerticalComponent.prototype, "dataLabelHeightChanged", void 0);
    SeriesVerticalComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-series-vertical]',
            template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [@.disabled]=\"!animations\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n      [animations]=\"animations\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'vertical'\"\n        (dimensionsChanged)=\"dataLabelHeightChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesVerticalComponent);
    return SeriesVerticalComponent;
}());

var SeriesHorizontal = /** @class */ (function () {
    function SeriesHorizontal() {
        this.barsForDataLabels = [];
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.animations = true;
        this.showDataLabel = false;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dataLabelWidthChanged = new EventEmitter();
    }
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _this = this;
        var _a;
        this.updateTooltipSettings();
        var d0 = (_a = {},
            _a[D0Types.positive] = 0,
            _a[D0Types.negative] = 0,
            _a);
        var d0Type;
        d0Type = D0Types.positive;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        var xScaleMin = Math.max(this.xScale.domain()[0], 0);
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = _this.getLabel(d);
            var formattedLabel = formatLabel(label);
            var roundEdges = _this.roundEdges;
            d0Type = value > 0 ? D0Types.positive : D0Types.negative;
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                formattedLabel: formattedLabel
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = Math.abs(_this.xScale(value) - _this.xScale(xScaleMin));
                if (value < 0) {
                    bar.x = _this.xScale(value);
                }
                else {
                    bar.x = _this.xScale(xScaleMin);
                }
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0[d0Type];
                var offset1 = offset0 + value;
                d0[d0Type] += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            var tooltipLabel = formattedLabel;
            bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
            if (_this.seriesName) {
                tooltipLabel = _this.seriesName + " \u2022 " + formattedLabel;
                bar.data.series = _this.seriesName;
                bar.ariaLabel = _this.seriesName + ' ' + bar.ariaLabel;
            }
            bar.tooltipText = _this.tooltipDisabled
                ? undefined
                : "\n        <span class=\"tooltip-label\">" + escapeLabel(tooltipLabel) + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
        this.updateDataLabels();
    };
    SeriesHorizontal.prototype.updateDataLabels = function () {
        var _this = this;
        if (this.type === 'stacked') {
            this.barsForDataLabels = [];
            var section = {};
            section.series = this.seriesName;
            var totalPositive = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d > 0 ? sum + d : sum); }, 0);
            var totalNegative = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return (d < 0 ? sum + d : sum); }, 0);
            section.total = totalPositive + totalNegative;
            section.x = 0;
            section.y = 0;
            // if total is positive then we show it on the right, otherwise on the left
            if (section.total > 0) {
                section.width = this.xScale(totalPositive);
            }
            else {
                section.width = this.xScale(totalNegative);
            }
            section.height = this.yScale.bandwidth();
            this.barsForDataLabels.push(section);
        }
        else {
            this.barsForDataLabels = this.series.map(function (d) {
                var section = {};
                section.series = _this.seriesName ? _this.seriesName : d.label;
                section.total = d.value;
                section.x = _this.xScale(0);
                section.y = _this.yScale(d.label);
                section.width = _this.xScale(section.total) - _this.xScale(0);
                section.height = _this.yScale.bandwidth();
                return section;
            });
        }
    };
    SeriesHorizontal.prototype.updateTooltipSettings = function () {
        this.tooltipPlacement = this.tooltipDisabled ? undefined : 'top';
        this.tooltipType = this.tooltipDisabled ? undefined : 'tooltip';
    };
    SeriesHorizontal.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesHorizontal.prototype.getLabel = function (dataItem) {
        if (dataItem.label) {
            return dataItem.label;
        }
        return dataItem.name;
    };
    SeriesHorizontal.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesHorizontal.prototype.trackDataLabelBy = function (index, barLabel) {
        return index + '#' + barLabel.series + '#' + barLabel.total;
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.select.emit(data);
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "series", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SeriesHorizontal.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SeriesHorizontal.prototype, "seriesName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], SeriesHorizontal.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "roundEdges", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "animations", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "showDataLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "dataLabelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SeriesHorizontal.prototype, "noBarWhenZero", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SeriesHorizontal.prototype, "dataLabelWidthChanged", void 0);
    SeriesHorizontal = __decorate([
        Component({
            selector: 'g[ngx-charts-series-horizontal]',
            template: "\n    <svg:g\n      ngx-charts-bar\n      *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      [ariaLabel]=\"bar.ariaLabel\"\n      [animations]=\"animations\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"tooltipPlacement\"\n      [tooltipType]=\"tooltipType\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : bar.tooltipText\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"bar.data\"\n      [noBarWhenZero]=\"noBarWhenZero\"\n    ></svg:g>\n    <svg:g *ngIf=\"showDataLabel\">\n      <svg:g\n        ngx-charts-bar-label\n        *ngFor=\"let b of barsForDataLabels; let i = index; trackBy: trackDataLabelBy\"\n        [barX]=\"b.x\"\n        [barY]=\"b.y\"\n        [barWidth]=\"b.width\"\n        [barHeight]=\"b.height\"\n        [value]=\"b.total\"\n        [valueFormatting]=\"dataLabelFormatting\"\n        [orientation]=\"'horizontal'\"\n        (dimensionsChanged)=\"dataLabelWidthChanged.emit({ size: $event, index: i })\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({ opacity: 0 }))
                    ])
                ])
            ]
        })
    ], SeriesHorizontal);
    return SeriesHorizontal;
}());

var BarLabelComponent = /** @class */ (function () {
    function BarLabelComponent(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    BarLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BarLabelComponent.prototype.getSize = function () {
        var h = this.element.getBoundingClientRect().height;
        var w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    };
    BarLabelComponent.prototype.ngAfterViewInit = function () {
        this.dimensionsChanged.emit(this.getSize());
    };
    BarLabelComponent.prototype.update = function () {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = "rotate(-45, " + this.x + " , " + this.y + ")";
        }
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barX", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barY", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "barHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BarLabelComponent.prototype, "orientation", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BarLabelComponent.prototype, "dimensionsChanged", void 0);
    BarLabelComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-bar-label]',
            template: "  \n    <svg:text   \n      class=\"textDataLabel\" \n      alignment-baseline=\"middle\"     \n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\"\n      [attr.x]=\"x\" \n      [attr.y]=\"y\">\n      {{formatedValue}}     \n    </svg:text>          \n\n  ",
            styles: [".textDataLabel{font-size:11px}"],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object])
    ], BarLabelComponent);
    return BarLabelComponent;
}());

var BarChartModule = /** @class */ (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontal,
                SeriesVerticalComponent
            ],
            exports: [
                BarComponent,
                BarHorizontalComponent,
                BarHorizontal2DComponent,
                BarHorizontalNormalizedComponent,
                BarHorizontalStackedComponent,
                BarVerticalComponent,
                BarVertical2DComponent,
                BarVerticalNormalizedComponent,
                BarVerticalStackedComponent,
                BarLabelComponent,
                SeriesHorizontal,
                SeriesVerticalComponent
            ]
        })
    ], BarChartModule);
    return BarChartModule;
}());

function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    var domain = [];
    if (scaleType === 'linear') {
        values = values.map(function (v) { return Number(v); });
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        var min$$1 = minVal ? minVal : Math.min.apply(Math, values);
        var max$$1 = maxVal ? maxVal : Math.max.apply(Math, values);
        domain = [min$$1, max$$1];
    }
    else {
        domain = values;
    }
    return domain;
}
function getScale(domain, range$$1, scaleType, roundDomains) {
    var scale;
    if (scaleType === 'time') {
        scale = scaleTime()
            .range(range$$1)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = scaleLinear()
            .range(range$$1)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = scalePoint()
            .range([range$$1[0], range$$1[1]])
            .domain(domain);
    }
    return scale;
}

var BubbleChartComponent = /** @class */ (function (_super) {
    __extends(BubbleChartComponent, _super);
    function BubbleChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showGridLines = true;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.xAxis = true;
        _this.yAxis = true;
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.maxRadius = 10;
        _this.minRadius = 3;
        _this.schemeType = 'ordinal';
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.scaleType = 'linear';
        _this.margin = [10, 20, 10, 20];
        _this.bubblePadding = [0, 0, 0, 0];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.activeEntries = [];
        return _this;
    }
    BubbleChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.results.map(function (d) { return d.name; });
        this.rDomain = this.getRDomain();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.transform = "translate(" + this.dims.xOffset + "," + this.margin[0] + ")";
        var colorDomain = this.schemeType === 'ordinal' ? this.seriesDomain : this.rDomain;
        this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);
        this.data = this.results;
        this.minRadius = Math.max(this.minRadius, 1);
        this.maxRadius = Math.max(this.maxRadius, 1);
        this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);
        this.bubblePadding = [0, 0, 0, 0];
        this.setScales();
        this.bubblePadding = this.getBubblePadding();
        this.setScales();
        this.legendOptions = this.getLegendOptions();
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    BubbleChartComponent.prototype.hideCircles = function () {
        this.deactivateAll();
    };
    BubbleChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    BubbleChartComponent.prototype.getBubblePadding = function () {
        var yMin = 0;
        var xMin = 0;
        var yMax = this.dims.height;
        var xMax = this.dims.width;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var s = _a[_i];
            for (var _b = 0, _c = s.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var r = this.rScale(d.r);
                var cx = this.xScaleType === 'linear' ? this.xScale(Number(d.x)) : this.xScale(d.x);
                var cy = this.yScaleType === 'linear' ? this.yScale(Number(d.y)) : this.yScale(d.y);
                xMin = Math.max(r - cx, xMin);
                yMin = Math.max(r - cy, yMin);
                yMax = Math.max(cy + r, yMax);
                xMax = Math.max(cx + r, xMax);
            }
        }
        xMax = Math.max(xMax - this.dims.width, 0);
        yMax = Math.max(yMax - this.dims.height, 0);
        return [yMin, xMax, yMax, xMin];
    };
    BubbleChartComponent.prototype.setScales = function () {
        var width = this.dims.width;
        if (this.xScaleMin === undefined && this.xScaleMax === undefined) {
            width = width - this.bubblePadding[1];
        }
        var height = this.dims.height;
        if (this.yScaleMin === undefined && this.yScaleMax === undefined) {
            height = height - this.bubblePadding[2];
        }
        this.xScale = this.getXScale(this.xDomain, width);
        this.yScale = this.getYScale(this.yDomain, height);
    };
    BubbleChartComponent.prototype.getYScale = function (domain, height) {
        return getScale(domain, [height, this.bubblePadding[0]], this.yScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getXScale = function (domain, width) {
        return getScale(domain, [this.bubblePadding[3], width], this.xScaleType, this.roundDomains);
    };
    BubbleChartComponent.prototype.getRScale = function (domain, range$$1) {
        var scale = scaleLinear()
            .range(range$$1)
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    BubbleChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            position: this.legendPosition,
            title: undefined
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.rDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BubbleChartComponent.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.x)) {
                    values.push(d.x);
                }
            }
        }
        this.xScaleType = getScaleType(values);
        return getDomain(values, this.xScaleType, this.autoScale, this.xScaleMin, this.xScaleMax);
    };
    BubbleChartComponent.prototype.getYDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.y)) {
                    values.push(d.y);
                }
            }
        }
        this.yScaleType = getScaleType(values);
        return getDomain(values, this.yScaleType, this.autoScale, this.yScaleMin, this.yScaleMax);
    };
    BubbleChartComponent.prototype.getRDomain = function () {
        var min$$1 = Infinity;
        var max$$1 = -Infinity;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                var value = Number(d.r) || 1;
                min$$1 = Math.min(min$$1, value);
                max$$1 = Math.max(max$$1, value);
            }
        }
        return [min$$1, max$$1];
    };
    BubbleChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BubbleChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BubbleChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    BubbleChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    BubbleChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BubbleChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], BubbleChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BubbleChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BubbleChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "maxRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "minRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], BubbleChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], BubbleChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], BubbleChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BubbleChartComponent.prototype, "hideCircles", null);
    BubbleChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-bubble-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [activeEntries]=\"activeEntries\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"bubble-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [showGridLines]=\"showGridLines\"\n          [dims]=\"dims\"\n          [xScale]=\"xScale\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        />\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [showGridLines]=\"showGridLines\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        />\n        <svg:rect\n          class=\"bubble-chart-area\"\n          x=\"0\"\n          y=\"0\"\n          [attr.width]=\"dims.width\"\n          [attr.height]=\"dims.height\"\n          style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          (mouseenter)=\"deactivateAll()\"\n        />\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of data; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-bubble-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [rScale]=\"rScale\"\n              [xScaleType]=\"xScaleType\"\n              [yScaleType]=\"yScaleType\"\n              [xAxisLabel]=\"xAxisLabel\"\n              [yAxisLabel]=\"yAxisLabel\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ]
        })
    ], BubbleChartComponent);
    return BubbleChartComponent;
}(BaseChartComponent));

var BubbleSeriesComponent = /** @class */ (function () {
    function BubbleSeriesComponent() {
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    BubbleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BubbleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    BubbleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series
            .map(function (d, i) {
            if (typeof d.y !== 'undefined' && typeof d.x !== 'undefined') {
                var y = d.y;
                var x = d.x;
                var r = d.r;
                var radius = _this.rScale(r || 1);
                var tooltipLabel = formatLabel(d.name);
                var cx = _this.xScaleType === 'linear' ? _this.xScale(Number(x)) : _this.xScale(x);
                var cy = _this.yScaleType === 'linear' ? _this.yScale(Number(y)) : _this.yScale(y);
                var color = _this.colors.scaleType === 'linear' ? _this.colors.getColor(r) : _this.colors.getColor(seriesName);
                var isActive = !_this.activeEntries.length ? true : _this.isActive({ name: seriesName });
                var opacity = isActive ? 1 : 0.3;
                var data = Object.assign({}, d, {
                    series: seriesName,
                    name: d.name,
                    value: d.y,
                    x: d.x,
                    radius: d.r
                });
                return {
                    data: data,
                    x: x,
                    y: y,
                    r: r,
                    classNames: ["circle-data-" + i],
                    value: y,
                    label: x,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    isActive: isActive,
                    transform: "translate(" + cx + "," + cy + ")"
                };
            }
        })
            .filter(function (circle) { return circle !== undefined; });
    };
    BubbleSeriesComponent.prototype.getTooltipText = function (circle) {
        var hasRadius = typeof circle.r !== 'undefined';
        var hasTooltipLabel = circle.tooltipLabel && circle.tooltipLabel.length;
        var hasSeriesName = circle.seriesName && circle.seriesName.length;
        var radiusValue = hasRadius ? formatLabel(circle.r) : '';
        var xAxisLabel = this.xAxisLabel && this.xAxisLabel !== '' ? this.xAxisLabel + ":" : '';
        var yAxisLabel = this.yAxisLabel && this.yAxisLabel !== '' ? this.yAxisLabel + ":" : '';
        var x = formatLabel(circle.x);
        var y = formatLabel(circle.y);
        var name = hasSeriesName && hasTooltipLabel
            ? circle.seriesName + " \u2022 " + circle.tooltipLabel
            : circle.seriesName + circle.tooltipLabel;
        var tooltipTitle = hasSeriesName || hasTooltipLabel ?
            "<span class=\"tooltip-label\">" + escapeLabel(name) + "</span>" : '';
        return "\n      " + tooltipTitle + "\n      <span class=\"tooltip-label\">\n        <label>" + escapeLabel(xAxisLabel) + "</label> " + escapeLabel(x) + "<br />\n        <label>" + escapeLabel(yAxisLabel) + "</label> " + escapeLabel(y) + "\n      </span>\n      <span class=\"tooltip-val\">\n        " + escapeLabel(radiusValue) + "\n      </span>\n    ";
    };
    BubbleSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BubbleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    BubbleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    BubbleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    BubbleSeriesComponent.prototype.trackBy = function (index, circle) {
        return circle.data.series + " " + circle.data.name;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "rScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "xScaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "yScaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BubbleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleSeriesComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BubbleSeriesComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BubbleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], BubbleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BubbleSeriesComponent.prototype, "deactivate", void 0);
    BubbleSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-bubble-series]',
            template: "\n    <svg:g *ngFor=\"let circle of circles; trackBy: trackBy\">\n      <svg:g [attr.transform]=\"circle.transform\">\n        <svg:g\n          ngx-charts-circle\n          [@animationState]=\"'active'\"\n          class=\"circle\"\n          [cx]=\"0\"\n          [cy]=\"0\"\n          [r]=\"circle.radius\"\n          [fill]=\"circle.color\"\n          [style.opacity]=\"circle.opacity\"\n          [class.active]=\"circle.isActive\"\n          [pointerEvents]=\"'all'\"\n          [data]=\"circle.value\"\n          [classNames]=\"circle.classNames\"\n          (select)=\"onClick(circle.data)\"\n          (activate)=\"activateCircle(circle)\"\n          (deactivate)=\"deactivateCircle(circle)\"\n          ngx-tooltip\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipPlacement]=\"'top'\"\n          [tooltipType]=\"'tooltip'\"\n          [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipContext]=\"circle.data\"\n        />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0,
                            transform: 'scale(0)'
                        }),
                        animate(250, style({ opacity: 1, transform: 'scale(1)' }))
                    ])
                ])
            ]
        })
    ], BubbleSeriesComponent);
    return BubbleSeriesComponent;
}());

var BubbleChartModule = /** @class */ (function () {
    function BubbleChartModule() {
    }
    BubbleChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ],
            exports: [
                BubbleChartComponent,
                BubbleSeriesComponent
            ]
        })
    ], BubbleChartModule);
    return BubbleChartModule;
}());

var ForceDirectedGraphComponent = /** @class */ (function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = forceSimulation()
            .force('charge', forceManyBody())
            .force('collide', forceCollide(5))
            .force('x', forceX())
            .force('y', forceY());
        _this.forceLink = forceLink().id(function (node) { return node.value; });
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.nodes = [];
        _this.links = [];
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [0, 0, 0, 0];
        _this.results = [];
        _this.groupResultsBy = function (node) { return node.value; };
        return _this;
    }
    ForceDirectedGraphComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.seriesDomain = this.getSeriesDomain();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "\n      translate(" + (this.dims.xOffset + this.dims.width / 2) + ", " + (this.margin[0] + this.dims.height / 2) + ")\n    ";
        if (this.force) {
            this.force
                .nodes(this.nodes)
                .force('link', this.forceLink.links(this.links))
                .alpha(0.5)
                .restart();
        }
    };
    ForceDirectedGraphComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    ForceDirectedGraphComponent.prototype.onActivate = function (event$$1) {
        if (this.activeEntries.indexOf(event$$1) > -1)
            return;
        this.activeEntries = [event$$1].concat(this.activeEntries);
        this.activate.emit({ value: event$$1, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.onDeactivate = function (event$$1) {
        var idx = this.activeEntries.indexOf(event$$1);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event$$1, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.getSeriesDomain = function () {
        var _this = this;
        return this.nodes
            .map(function (d) { return _this.groupResultsBy(d); })
            .reduce(function (nodes, node) { return (nodes.includes(node) ? nodes : nodes.concat([node])); }, [])
            .sort();
    };
    ForceDirectedGraphComponent.prototype.trackLinkBy = function (index, link) {
        return link.index;
    };
    ForceDirectedGraphComponent.prototype.trackNodeBy = function (index, node) {
        return node.value;
    };
    ForceDirectedGraphComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    ForceDirectedGraphComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.seriesDomain,
            colors: this.colors,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    ForceDirectedGraphComponent.prototype.onDragStart = function (node, $event) {
        this.force.alphaTarget(0.3).restart();
        this.draggingNode = node;
        this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDrag = function ($event) {
        if (!this.draggingNode)
            return;
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDragEnd = function ($event) {
        if (!this.draggingNode)
            return;
        this.force.alphaTarget(0);
        this.draggingNode.fx = undefined;
        this.draggingNode.fy = undefined;
        this.draggingNode = undefined;
    };
    ForceDirectedGraphComponent.prototype.escape = function (label) {
        return escapeLabel(label);
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ForceDirectedGraphComponent.prototype, "force", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ForceDirectedGraphComponent.prototype, "forceLink", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ForceDirectedGraphComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ForceDirectedGraphComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ForceDirectedGraphComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ForceDirectedGraphComponent.prototype, "nodes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
    ], ForceDirectedGraphComponent.prototype, "links", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ForceDirectedGraphComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ForceDirectedGraphComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], ForceDirectedGraphComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], ForceDirectedGraphComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('linkTemplate', { static: false }),
        __metadata("design:type", typeof (_d = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _d : Object)
    ], ForceDirectedGraphComponent.prototype, "linkTemplate", void 0);
    __decorate([
        ContentChild('nodeTemplate', { static: false }),
        __metadata("design:type", typeof (_e = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _e : Object)
    ], ForceDirectedGraphComponent.prototype, "nodeTemplate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_f = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _f : Object)
    ], ForceDirectedGraphComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ViewChild(ChartComponent, { read: ElementRef, static: false }),
        __metadata("design:type", typeof (_g = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _g : Object)
    ], ForceDirectedGraphComponent.prototype, "chart", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], ForceDirectedGraphComponent.prototype, "groupResultsBy", void 0);
    __decorate([
        HostListener('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_h = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _h : Object]),
        __metadata("design:returntype", void 0)
    ], ForceDirectedGraphComponent.prototype, "onDrag", null);
    __decorate([
        HostListener('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_j = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _j : Object]),
        __metadata("design:returntype", void 0)
    ], ForceDirectedGraphComponent.prototype, "onDragEnd", null);
    ForceDirectedGraphComponent = __decorate([
        Component({
            selector: 'ngx-charts-force-directed-graph',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy: trackLinkBy\">\n            <ng-template\n              *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: link }\"\n            ></ng-template>\n            <svg:line\n              *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\"\n              class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g\n            *ngFor=\"let node of nodes; trackBy: trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors.getColor(groupResultsBy(node))\"\n            [attr.stroke]=\"colors.getColor(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({ name: node.value })\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : escape(node.value)\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"node\"\n          >\n            <ng-template\n              *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: node }\"\n            ></ng-template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".force-directed-graph .edge{stroke:#333}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], ForceDirectedGraphComponent);
    return ForceDirectedGraphComponent;
}(BaseChartComponent));

var ForceDirectedGraphModule = /** @class */ (function () {
    function ForceDirectedGraphModule() {
    }
    ForceDirectedGraphModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                ForceDirectedGraphComponent,
            ],
            exports: [
                ForceDirectedGraphComponent,
            ]
        })
    ], ForceDirectedGraphModule);
    return ForceDirectedGraphModule;
}());

var HeatMapCellComponent = /** @class */ (function () {
    function HeatMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        node
            .transition()
            .duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    HeatMapCellComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    HeatMapCellComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "x", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "y", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapCellComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapCellComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeatMapCellComponent.prototype, "deactivate", void 0);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HeatMapCellComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], HeatMapCellComponent.prototype, "onMouseLeave", null);
    HeatMapCellComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-heat-map-cell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient orientation=\"vertical\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], HeatMapCellComponent);
    return HeatMapCellComponent;
}());

var HeatCellSeriesComponent = /** @class */ (function () {
    function HeatCellSeriesComponent() {
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnInit = function () {
        if (!this.tooltipText) {
            this.tooltipText = this.getTooltipText;
        }
    };
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                cell.series = row.name;
                cells.push({
                    row: row,
                    cell: cell,
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: formatLabel(cell.name),
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(series) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], HeatCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatCellSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeatCellSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], HeatCellSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_c = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _c : Object)
    ], HeatCellSeriesComponent.prototype, "deactivate", void 0);
    HeatCellSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-heat-map-cell-series]',
            template: "\n    <svg:g\n      ngx-charts-heat-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick(c.cell)\"\n      (activate)=\"activate.emit(c.cell)\"\n      (deactivate)=\"deactivate.emit(c.cell)\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"{ series: c.series, name: c.label, value: c.data }\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], HeatCellSeriesComponent);
    return HeatCellSeriesComponent;
}());

var HeatMapComponent = /** @class */ (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.innerPadding = 8;
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.tooltipDisabled = false;
        _this.activeEntries = [];
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.scaleType = 'linear';
        return _this;
    }
    HeatMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.formatDates();
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.scaleType = getScaleType(this.valueDomain, false);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.scaleType,
            legendPosition: this.legendPosition
        });
        if (this.scaleType === 'linear') {
            var min$$1 = this.min;
            var max$$1 = this.max;
            if (!this.min) {
                min$$1 = Math.min.apply(Math, [0].concat(this.valueDomain));
            }
            if (!this.max) {
                max$$1 = Math.max.apply(Math, this.valueDomain);
            }
            this.valueDomain = [min$$1, max$$1];
        }
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getDimension = function (value, index, N, L) {
        if (index === void 0) { index = 0; }
        if (typeof value === 'string') {
            value = value
                .replace('[', '')
                .replace(']', '')
                .replace('px', '')
                .replace('\'', '');
            if (value.includes(',')) {
                value = value.split(',');
            }
        }
        if (Array.isArray(value) && typeof index === 'number') {
            return this.getDimension(value[index], null, N, L);
        }
        if (typeof value === 'string' && value.includes('%')) {
            return +value.replace('%', '') / 100;
        }
        return N / (L / +value + 1);
    };
    HeatMapComponent.prototype.getXScale = function () {
        var f = this.getDimension(this.innerPadding, 0, this.xDomain.length, this.dims.width);
        return scaleBand()
            .rangeRound([0, this.dims.width])
            .domain(this.xDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getYScale = function () {
        var f = this.getDimension(this.innerPadding, 1, this.yDomain.length, this.dims.height);
        return scaleBand()
            .rangeRound([this.dims.height, 0])
            .domain(this.yDomain)
            .paddingInner(f);
    };
    HeatMapComponent.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: this.scaleType,
            domain: this.valueDomain,
            colors: this.scaleType === 'ordinal' ? this.colors : this.colors.scale,
            title: this.scaleType === 'ordinal' ? this.legendTitle : undefined,
            position: this.legendPosition
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    HeatMapComponent.prototype.onActivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        var items = this.results
            .map(function (g) { return g.series; })
            .flat()
            .filter(function (i) {
            if (fromLegend) {
                return i.label === item.name;
            }
            else {
                return i.name === item.name && i.series === item.series;
            }
        });
        this.activeEntries = items.slice();
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    HeatMapComponent.prototype.onDeactivate = function (event$$1, group, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        var item = Object.assign({}, event$$1);
        if (group) {
            item.series = group.name;
        }
        this.activeEntries = this.activeEntries.filter(function (i) {
            if (fromLegend) {
                return i.label !== item.name;
            }
            else {
                return !(i.name === item.name && i.series === item.series);
            }
        });
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HeatMapComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HeatMapComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], HeatMapComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], HeatMapComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], HeatMapComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], HeatMapComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeatMapComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeatMapComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], HeatMapComponent.prototype, "activeEntries", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], HeatMapComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], HeatMapComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], HeatMapComponent.prototype, "tooltipTemplate", void 0);
    HeatMapComponent = __decorate([
        Component({
            selector: 'ngx-charts-heat-map',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [animations]=\"animations\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:rect\n          *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g\n          ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, undefined)\"\n          (deactivate)=\"onDeactivate($event, undefined)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None
        })
    ], HeatMapComponent);
    return HeatMapComponent;
}(BaseChartComponent));

var HeatMapModule = /** @class */ (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                HeatMapCellComponent,
                HeatCellSeriesComponent,
                HeatMapComponent
            ],
            exports: [
                HeatMapCellComponent,
                HeatCellSeriesComponent,
                HeatMapComponent
            ]
        })
    ], HeatMapModule);
    return HeatMapModule;
}());

var LineComponent = /** @class */ (function () {
    function LineComponent(element) {
        this.element = element;
        this.fill = 'none';
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
    }
    LineComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    };
    LineComponent.prototype.updatePathEl = function () {
        var node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node
                .transition().duration(750)
                .attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "path", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "stroke", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LineComponent.prototype, "select", void 0);
    LineComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-line]',
            template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"initialPath\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                        }),
                        animate(1000, style({
                            strokeDashoffset: 0
                        }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], LineComponent);
    return LineComponent;
}());

var LineChartComponent = /** @class */ (function (_super) {
    __extends(LineChartComponent, _super);
    function LineChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showRefLines = false;
        _this.showRefLabels = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    LineChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    LineChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    LineChartComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
        }
        var min$$1;
        var max$$1;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min$$1 = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, values);
            max$$1 = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, values);
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min$$1), new Date(max$$1)];
            this.xSet = values.slice().sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min$$1, max$$1];
            this.xSet = values.slice().sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    LineChartComponent.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    this.hasRange = true;
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        var values = domain.slice();
        if (!this.autoScale) {
            values.push(0);
        }
        var min$$1 = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, values);
        var max$$1 = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, values);
        return [min$$1, max$$1];
    };
    LineChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    LineChartComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    LineChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    LineChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    LineChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    LineChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    LineChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    LineChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    LineChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    LineChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    LineChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    LineChartComponent.prototype.onActivate = function (item) {
        this.deactivateAll();
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item];
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "timeline", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LineChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LineChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineChartComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LineChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LineChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "showRefLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineChartComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], LineChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], LineChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], LineChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_d = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _d : Object)
    ], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LineChartComponent.prototype, "hideCircles", null);
    LineChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-line-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [referenceLines]=\"referenceLines\"\n          [showRefLines]=\"showRefLines\"\n          [showRefLabels]=\"showRefLabels\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [hasRange]=\"hasRange\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [activeEntries]=\"activeEntries\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n            [hasRange]=\"hasRange\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ]
        })
    ], LineChartComponent);
    return LineChartComponent;
}(BaseChartComponent));

var LineSeriesComponent = /** @class */ (function () {
    function LineSeriesComponent() {
        this.animations = true;
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var data = this.sortData(this.data.series);
        var lineGen = this.getLineGenerator();
        this.path = lineGen(data) || '';
        var areaGen = this.getAreaGenerator();
        this.areaPath = areaGen(data) || '';
        if (this.hasRange) {
            var range$$1 = this.getRangeGenerator();
            this.outerPath = range$$1(data) || '';
        }
        if (this.hasGradient) {
            this.stroke = this.gradientUrl;
            var values = this.data.series.map(function (d) { return d.value; });
            var max$$1 = Math.max.apply(Math, values);
            var min$$1 = Math.min.apply(Math, values);
            if (max$$1 === min$$1) {
                this.stroke = this.colors.getColor(max$$1);
            }
        }
        else {
            this.stroke = this.colors.getColor(this.data.name);
        }
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getRangeGenerator = function () {
        var _this = this;
        return area()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y0(function (d) { return _this.yScale(typeof d.min === 'number' ? d.min : d.value); })
            .y1(function (d) { return _this.yScale(typeof d.max === 'number' ? d.max : d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return area()
            .x(xProperty)
            .y0(function () { return _this.yScale.range()[0]; })
            .y1(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            this.gradientId = 'grad' + id().toString();
            this.gradientUrl = "url(#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) { return d.value; });
            var max$$1 = Math.max.apply(Math, values);
            var min$$1 = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max$$1, min$$1);
            this.areaGradientStops = this.colors.getLinearGradientStops(max$$1);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LineSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], LineSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LineSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineSeriesComponent.prototype, "hasRange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LineSeriesComponent.prototype, "animations", void 0);
    LineSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-line-series]',
            template: "\n    <svg:g>\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [animations]=\"animations\"\n      />\n      <svg:g ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"stroke\"\n        [animations]=\"animations\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n     <svg:g ngx-charts-area\n        *ngIf=\"hasRange\"\n        class=\"line-series-range\"\n        [data]=\"data\"\n        [path]=\"outerPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n        [opacity]=\"rangeFillOpacity\"\n        [animations]=\"animations\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LineSeriesComponent);
    return LineSeriesComponent;
}());

var LineChartModule = /** @class */ (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                LineComponent,
                LineChartComponent,
                LineSeriesComponent
            ],
            exports: [
                LineComponent,
                LineChartComponent,
                LineSeriesComponent
            ]
        })
    ], LineChartModule);
    return LineChartModule;
}());

var twoPI = 2 * Math.PI;
var PolarChartComponent = /** @class */ (function (_super) {
    __extends(PolarChartComponent, _super);
    function PolarChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.showGridLines = true;
        _this.curve = curveCardinalClosed;
        _this.activeEntries = [];
        _this.rangeFillOpacity = 0.15;
        _this.trimYAxisTicks = true;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showSeriesOnHover = true;
        _this.gradient = false;
        _this.yAxisMinScale = 0;
        _this.labelTrim = true;
        _this.labelTrimSize = 10;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        return _this;
    }
    PolarChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.setDims();
        this.setScales();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.setTicks();
    };
    PolarChartComponent.prototype.setDims = function () {
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        var halfWidth = Math.floor(this.dims.width / 2);
        var halfHeight = Math.floor(this.dims.height / 2);
        var outerRadius = (this.outerRadius = Math.min(halfHeight / 1.5, halfWidth / 1.5));
        var yOffset = Math.max(0, halfHeight - outerRadius);
        this.yAxisDims = __assign({}, this.dims, { width: halfWidth });
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        this.transformYAxis = "translate(0, " + yOffset + ")";
        this.labelOffset = this.dims.height + 40;
        this.transformPlot = "translate(" + halfWidth + ", " + halfHeight + ")";
    };
    PolarChartComponent.prototype.setScales = function () {
        var xValues = this.getXValues();
        this.scaleType = getScaleType(xValues);
        this.xDomain = this.filteredDomain || this.getXDomain(xValues);
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, twoPI);
        this.yScale = this.getYScale(this.yDomain, this.outerRadius);
        this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);
    };
    PolarChartComponent.prototype.setTicks = function () {
        var _this = this;
        var tickFormat;
        if (this.xAxisTickFormatting) {
            tickFormat = this.xAxisTickFormatting;
        }
        else if (this.xScale.tickFormat) {
            tickFormat = this.xScale.tickFormat.apply(this.xScale, [5]);
        }
        else {
            tickFormat = function (d) {
                if (isDate(d)) {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        var outerRadius = this.outerRadius;
        var s = 1.1;
        this.thetaTicks = this.xDomain.map(function (d) {
            var startAngle = _this.xScale(d);
            var dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);
            var label = tickFormat(d);
            var startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
            var pos = [dd, s * startPos[1]];
            return {
                innerRadius: 0,
                outerRadius: outerRadius,
                startAngle: startAngle,
                endAngle: startAngle,
                value: outerRadius,
                label: label,
                startPos: startPos,
                pos: pos
            };
        });
        var minDistance = 10;
        for (var i = 0; i < this.thetaTicks.length - 1; i++) {
            var a = this.thetaTicks[i];
            for (var j = i + 1; j < this.thetaTicks.length; j++) {
                var b = this.thetaTicks[j];
                if (b.pos[0] * a.pos[0] > 0) {
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        this.radiusTicks = this.yAxisScale.ticks(Math.floor(this.dims.height / 50)).map(function (d) { return _this.yScale(d); });
    };
    PolarChartComponent.prototype.getXValues = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        return values;
    };
    PolarChartComponent.prototype.getXDomain = function (values) {
        if (values === void 0) { values = this.getXValues(); }
        if (this.scaleType === 'time') {
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            return [min$$1, max$$1];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min$$1 = Math.min.apply(Math, values);
            var max$$1 = Math.max.apply(Math, values);
            return [min$$1, max$$1];
        }
        return values;
    };
    PolarChartComponent.prototype.getYValues = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
                if (d.min !== undefined) {
                    if (domain.indexOf(d.min) < 0) {
                        domain.push(d.min);
                    }
                }
                if (d.max !== undefined) {
                    if (domain.indexOf(d.max) < 0) {
                        domain.push(d.max);
                    }
                }
            }
        }
        return domain;
    };
    PolarChartComponent.prototype.getYDomain = function (domain) {
        if (domain === void 0) { domain = this.getYValues(); }
        var min$$1 = Math.min.apply(Math, domain);
        var max$$1 = Math.max.apply(Math, [this.yAxisMinScale].concat(domain));
        min$$1 = Math.max(0, min$$1);
        if (!this.autoScale) {
            min$$1 = Math.min(0, min$$1);
        }
        return [min$$1, max$$1];
    };
    PolarChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PolarChartComponent.prototype.getXScale = function (domain, width) {
        switch (this.scaleType) {
            case 'time':
                return scaleTime()
                    .range([0, width])
                    .domain(domain);
            case 'linear':
                var scale = scaleLinear()
                    .range([0, width])
                    .domain(domain);
                return this.roundDomains ? scale.nice() : scale;
            default:
                return scalePoint()
                    .range([0, width - twoPI / domain.length])
                    .padding(0)
                    .domain(domain);
        }
    };
    PolarChartComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([0, height])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    PolarChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    PolarChartComponent.prototype.setColors = function () {
        var domain = this.schemeType === 'ordinal' ? this.seriesDomain : this.yDomain.reverse();
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    PolarChartComponent.prototype.getLegendOptions = function () {
        if (this.schemeType === 'ordinal') {
            return {
                scaleType: this.schemeType,
                colors: this.colors,
                domain: this.seriesDomain,
                title: this.legendTitle,
                position: this.legendPosition
            };
        }
        return {
            scaleType: this.schemeType,
            colors: this.colors.scale,
            domain: this.yDomain,
            title: undefined,
            position: this.legendPosition
        };
    };
    PolarChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    PolarChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    PolarChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = this.showSeriesOnHover ? [item].concat(this.activeEntries) : this.activeEntries;
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PolarChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    PolarChartComponent.prototype.deactivateAll = function () {
        this.activeEntries = this.activeEntries.slice();
        for (var _i = 0, _a = this.activeEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    };
    PolarChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PolarChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PolarChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PolarChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PolarChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarChartComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PolarChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PolarChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarChartComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PolarChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PolarChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "showSeriesOnHover", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarChartComponent.prototype, "yAxisMinScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarChartComponent.prototype, "labelTrim", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarChartComponent.prototype, "labelTrimSize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], PolarChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], PolarChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], PolarChartComponent.prototype, "tooltipTemplate", void 0);
    PolarChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-polar-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g class=\"polar-chart chart\" [attr.transform]=\"transform\">\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:circle class=\"polar-chart-background\" cx=\"0\" cy=\"0\" [attr.r]=\"this.outerRadius\" />\n          <svg:g *ngIf=\"showGridLines\">\n            <svg:circle\n              *ngFor=\"let r of radiusTicks\"\n              class=\"gridline-path radial-gridline-path\"\n              cx=\"0\"\n              cy=\"0\"\n              [attr.r]=\"r\"\n            />\n          </svg:g>\n          <svg:g *ngIf=\"xAxis\">\n            <svg:g\n              ngx-charts-pie-label\n              *ngFor=\"let tick of thetaTicks\"\n              [data]=\"tick\"\n              [radius]=\"outerRadius\"\n              [label]=\"tick.label\"\n              [max]=\"outerRadius\"\n              [value]=\"showGridLines ? 1 : outerRadius\"\n              [explodeSlices]=\"true\"\n              [animations]=\"animations\"\n              [labelTrim]=\"labelTrim\"\n              [labelTrimSize]=\"labelTrimSize\"\n            ></svg:g>\n          </svg:g>\n        </svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          [attr.transform]=\"transformYAxis\"\n          *ngIf=\"yAxis\"\n          [yScale]=\"yAxisScale\"\n          [dims]=\"yAxisDims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-axis-label\n          *ngIf=\"xAxis && showXAxisLabel\"\n          [label]=\"xAxisLabel\"\n          [offset]=\"labelOffset\"\n          [orient]=\"'bottom'\"\n          [height]=\"dims.height\"\n          [width]=\"dims.width\"\n        ></svg:g>\n        <svg:g [attr.transform]=\"transformPlot\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-polar-series\n              [gradient]=\"gradient\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [animations]=\"animations\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              (select)=\"onClick($event)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [
                ".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}",
                ".pie-label{font-size:11px}.pie-label.animation{animation:750ms ease-in fadeIn}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{animation:3s linear drawOut;transition:d 750ms}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}",
                ".polar-chart .polar-chart-background{fill:none}.polar-chart .radial-gridline-path{stroke-dasharray:10 10;fill:none}.polar-chart .pie-label-line{stroke:#2f3646}.polar-charts-series .polar-series-area{pointer-events:none}.polar-series-path{pointer-events:none}"
            ],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ]
        })
    ], PolarChartComponent);
    return PolarChartComponent;
}(BaseChartComponent));

var PolarSeriesComponent = /** @class */ (function () {
    function PolarSeriesComponent() {
        this.tooltipDisabled = false;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.circleRadius = 3;
    }
    PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PolarSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradients();
        var line$$1 = this.getLineGenerator();
        var data = this.sortData(this.data.series);
        var seriesName = this.data.name;
        var linearScaleType = this.colors.scaleType === 'linear';
        var min$$1 = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min$$1 : seriesName);
        this.path = line$$1(data) || '';
        this.circles = data.map(function (d) {
            var a = _this.getAngle(d);
            var r = _this.getRadius(d);
            var value = d.value;
            var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            var cData = Object.assign({}, d, {
                series: seriesName,
                value: value,
                name: d.name
            });
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value: value,
                color: color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
    };
    PolarSeriesComponent.prototype.getAngle = function (d) {
        var label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    };
    PolarSeriesComponent.prototype.getRadius = function (d) {
        return this.yScale(d.value);
    };
    PolarSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return lineRadial()
            .angle(function (d) { return _this.getAngle(d); })
            .radius(function (d) { return _this.getRadius(d); })
            .curve(this.curve);
    };
    PolarSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            return sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return sortByTime(data, 'name');
        }
        return sortByDomain(data, 'name', 'asc', this.xScale.domain());
    };
    PolarSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    PolarSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(this.data.name) + " \u2022 " + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    PolarSeriesComponent.prototype.updateGradients = function () {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        if (this.colors.scaleType === 'linear') {
            var values = this.data.series.map(function (d) { return d.value; });
            var max$$1 = Math.max.apply(Math, values);
            var min$$1 = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max$$1, min$$1);
        }
        else {
            this.gradientStops = undefined;
        }
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PolarSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PolarSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "deactivate", void 0);
    PolarSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-polar-series]',
            template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-radial-gradient\n          *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g\n        ngx-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n        [animations]=\"animations\"\n      />\n      <svg:g\n        ngx-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        tooltipType=\"tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n        (select)=\"select.emit(circle.data)\"\n        (activate)=\"activate.emit({ name: circle.data.series })\"\n        (deactivate)=\"deactivate.emit({ name: circle.data.series })\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PolarSeriesComponent);
    return PolarSeriesComponent;
}());

var AdvancedPieChartComponent = /** @class */ (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    AdvancedPieChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: (this.width * 4) / 12.0,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.legendWidth = this.width - this.dims.width - this.margin[1];
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AdvancedPieChartComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedPieChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdvancedPieChartComponent.prototype, "label", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], AdvancedPieChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], AdvancedPieChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "nameFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "percentageFormatting", void 0);
    AdvancedPieChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-advanced-pie-chart',
            template: "\n    <div [style.width.px]=\"width\" [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\" [style.width.px]=\"dims.width\" [style.height.px]=\"dims.height\">\n        <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n          <svg:g [attr.transform]=\"transform\" class=\"pie chart\">\n            <svg:g\n              ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n              [animations]=\"animations\"\n            ></svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div class=\"advanced-pie-legend-wrapper\" [style.width.px]=\"width - dims.width\" [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          [animations]=\"animations\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"nameFormatting\"\n          [percentageFormatting]=\"percentageFormatting\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event, true)\"\n          (deactivate)=\"onDeactivate($event, true)\"\n        >\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".advanced-pie{display:inline-block;float:left}.advanced-pie-legend-wrapper{display:inline-block}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AdvancedPieChartComponent);
    return AdvancedPieChartComponent;
}(BaseChartComponent));

var PieLabelComponent = /** @class */ (function () {
    function PieLabelComponent() {
        this.animations = true;
        this.labelTrim = true;
        this.labelTrimSize = 10;
        this.isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
        this.trimLabel = trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        // Calculate innerPos then scale outer position to match label position
        var innerPos = innerArc.centroid(this.data);
        var scale = this.data.pos[1] / innerPos[1];
        if (this.data.pos[1] === 0 || innerPos[1] === 0) {
            scale = 1;
        }
        var outerPos = [scale * innerPos[0], scale * innerPos[1]];
        this.line = "M" + innerPos + "L" + outerPos + "L" + this.data.pos;
    };
    Object.defineProperty(PieLabelComponent.prototype, "textX", {
        get: function () {
            return this.data.pos[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textY", {
        get: function () {
            return this.data.pos[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "styleTransform", {
        get: function () {
            return this.isIE ? null : "translate3d(" + this.textX + "px," + this.textY + "px, 0)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "attrTransform", {
        get: function () {
            return !this.isIE ? null : "translate(" + this.textX + "," + this.textY + ")";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieLabelComponent.prototype, "textTransition", {
        get: function () {
            return this.isIE || !this.animations ? null : 'transform 0.75s';
        },
        enumerable: true,
        configurable: true
    });
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "radius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieLabelComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieLabelComponent.prototype, "animations", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieLabelComponent.prototype, "labelTrim", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieLabelComponent.prototype, "labelTrimSize", void 0);
    PieLabelComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-label]',
            template: "\n    <title>{{label}}</title>\n    <svg:g\n      [attr.transform]=\"attrTransform\"\n      [style.transform]=\"styleTransform\"\n      [style.transition]=\"textTransition\">\n      <svg:text\n        class=\"pie-label\"\n        [class.animation]=\"animations\"\n        dy=\".35em\"\n        [style.textAnchor]=\"textAnchor()\"\n        [style.shapeRendering]=\"'crispEdges'\">\n        {{labelTrim ? trimLabel(label, labelTrimSize) : label}}\n      </svg:text>\n    </svg:g>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"pie-label-line line\"\n      [class.animation]=\"animations\">\n    </svg:path>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], PieLabelComponent);
    return PieLabelComponent;
}());

var PieArcComponent = /** @class */ (function () {
    function PieArcComponent(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.getGradient = function () {
        return this.gradient ? this.gradientFill : this.fill;
    };
    PieArcComponent.prototype.getPointerEvents = function () {
        return this.pointerEvents ? 'auto' : 'none';
    };
    PieArcComponent.prototype.update = function () {
        var calc = this.calculateArc();
        this.startOpacity = 0.5;
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = "url(#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
        else {
            this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = (this.outerRadius * this.value) / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        })
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var calc = this.calculateArc();
        node
            .transition()
            .duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return calc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        var _this = this;
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () { return _this.select.emit(_this.data); }, 200);
    };
    PieArcComponent.prototype.onDblClick = function (event$$1) {
        event$$1.preventDefault();
        event$$1.stopPropagation();
        clearTimeout(this._timeout);
        this.dblclick.emit({
            data: this.data,
            nativeEvent: event$$1
        });
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieArcComponent.prototype, "startAngle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieArcComponent.prototype, "endAngle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieArcComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieArcComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieArcComponent.prototype, "animate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieArcComponent.prototype, "pointerEvents", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieArcComponent.prototype, "isActive", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieArcComponent.prototype, "dblclick", void 0);
    PieArcComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-arc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"getGradient()\"\n        (click)=\"onClick()\"\n        (dblclick)=\"onDblClick($event)\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"getPointerEvents()\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], PieArcComponent);
    return PieArcComponent;
}());

var PieChartComponent = /** @class */ (function (_super) {
    __extends(PieChartComponent, _super);
    function PieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labels = false;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.explodeSlices = false;
        _this.doughnut = false;
        _this.arcWidth = 0.25;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.trimLabels = true;
        _this.maxLabelLength = 10;
        _this.dblclick = new EventEmitter();
        _this.select = new EventEmitter();
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        return _this;
    }
    PieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (this.labels && this.hasNoOptionalMarginsSet()) {
            this.margins = [30, 80, 30, 80];
        }
        else if (!this.labels && this.hasNoOptionalMarginsSet()) {
            this.margins = [20, 20, 20, 20];
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margins,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.formatDates();
        var xOffset = this.margins[3] + this.dims.width / 2;
        var yOffset = this.margins[0] + this.dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(this.dims.width, this.dims.height);
        if (this.labels) {
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * (1 - this.arcWidth);
        }
        this.domain = this.getDomain();
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
        this.legendOptions = this.getLegendOptions();
    };
    PieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    PieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieChartComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    PieChartComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.hasNoOptionalMarginsSet = function () {
        return !this.margins || this.margins.length <= 0;
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "labels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PieChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PieChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "doughnut", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "arcWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieChartComponent.prototype, "trimLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieChartComponent.prototype, "maxLabelLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "tooltipText", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "dblclick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PieChartComponent.prototype, "margins", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieChartComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], PieChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], PieChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], PieChartComponent.prototype, "tooltipTemplate", void 0);
    PieChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-pie-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelActivate)=\"onActivate($event, true)\"\n      (legendLabelDeactivate)=\"onDeactivate($event, true)\"\n      (legendLabelClick)=\"onClick($event)\"\n    >\n      <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n        <svg:g\n          ngx-charts-pie-series\n          [colors]=\"colors\"\n          [series]=\"data\"\n          [showLabels]=\"labels\"\n          [labelFormatting]=\"labelFormatting\"\n          [trimLabels]=\"trimLabels\"\n          [maxLabelLength]=\"maxLabelLength\"\n          [activeEntries]=\"activeEntries\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipText]=\"tooltipText\"\n          (dblclick)=\"dblclick.emit($event)\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-label{font-size:11px}.pie-label.animation{animation:750ms ease-in fadeIn}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.pie-label-line{stroke-dasharray:100%}.pie-label-line.animation{animation:3s linear drawOut;transition:d 750ms}@keyframes drawOut{from{stroke-dashoffset:100%}to{stroke-dashoffset:0}}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieChartComponent);
    return PieChartComponent;
}(BaseChartComponent));

function gridSize(dims, len, minWidth) {
    var rows = 1;
    var cols = len;
    var width = dims.width;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
function gridLayout(dims, data, minWidth, designatedTotal) {
    var xScale = scaleBand();
    var yScale = scaleBand();
    var width = dims.width;
    var height = dims.height;
    var _a = gridSize(dims, data.length, minWidth), columns = _a[0], rows = _a[1];
    var xDomain = [];
    var yDomain = [];
    for (var i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (var i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    var res = [];
    var total = designatedTotal ? designatedTotal : getTotal(data);
    var cardWidth = xScale.bandwidth();
    var cardHeight = yScale.bandwidth();
    for (var i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
            label: data[i] ? data[i].label : ''
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = total > 0 ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results.map(function (d) { return (d ? d.value : 0); }).reduce(function (sum, val) { return sum + val; }, 0);
}

var PieGridComponent = /** @class */ (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.minWidth = 150;
        _this.activeEntries = [];
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieGridComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieGridComponent.prototype.defaultTooltipText = function (_a) {
        var data = _a.data;
        var label = trimLabel(formatLabel(data.name));
        var val = data.value.toLocaleString();
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var name = d.data.name;
            var label = formatLabel(name);
            var value = d.data.value;
            var radius = min([d.width - padding, d.height - baselineLabelHeight]) / 2 - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                name: name,
                label: trimLabel(label),
                total: value,
                value: value,
                percent: format('.1%')(d.data.percent),
                data: [
                    d,
                    {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }
                ]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieGridComponent.prototype.onActivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieGridComponent.prototype.onDeactivate = function (item, fromLegend) {
        if (fromLegend === void 0) { fromLegend = false; }
        item = this.results.find(function (d) {
            if (fromLegend) {
                return d.label === item.name;
            }
            else {
                return d.name === item.name;
            }
        });
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    var _a, _b, _c;
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieGridComponent.prototype, "designatedTotal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieGridComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PieGridComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PieGridComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieGridComponent.prototype, "minWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PieGridComponent.prototype, "activeEntries", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], PieGridComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], PieGridComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], PieGridComponent.prototype, "tooltipTemplate", void 0);
    PieGridComponent = __decorate([
        Component({
            selector: 'ngx-charts-pie-grid',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g *ngFor=\"let series of series\" class=\"pie-grid-item\" [attr.transform]=\"series.transform\">\n          <svg:g\n            ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText({ data: series })\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"series.data[0].data\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          />\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\"\n          ></svg:text>\n          <svg:text *ngIf=\"!animations\" class=\"label percent-label\" dy=\"-0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.percent.toLocaleString() }}\n          </svg:text>\n          <svg:text class=\"label\" dy=\"0.5em\" x=\"0\" y=\"5\" text-anchor=\"middle\">\n            {{ series.label }}\n          </svg:text>\n          <svg:text\n            *ngIf=\"animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"label + ': '\"\n          ></svg:text>\n          <svg:text\n            *ngIf=\"!animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n          >\n            {{ label }}: {{ series.total.toLocaleString() }}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".pie-grid .arc1{opacity:.4}.pie-grid .percent-label{font-size:16px;font-weight:400}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieGridComponent);
    return PieGridComponent;
}(BaseChartComponent));

var PieGridSeriesComponent = /** @class */ (function () {
    function PieGridSeriesComponent(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieGridSeriesComponent.prototype.update = function () {
        this.layout = pie()
            .value(function (d) { return d.data.value; })
            .sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeriesComponent.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc$$1, index) {
            var label = arc$$1.data.data.name;
            var other = arc$$1.data.data.other;
            if (index === 0) {
                arc$$1.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc$$1.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc$$1.startAngle,
                endAngle: arc$$1.endAngle,
                animate: _this.animations && !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(this.data[0].data);
    };
    PieGridSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeriesComponent.prototype.label = function (arc$$1) {
        return arc$$1.data.name;
    };
    PieGridSeriesComponent.prototype.color = function (arc$$1) {
        return this.colors(this.label(arc$$1));
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieGridSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieGridSeriesComponent.prototype, "deactivate", void 0);
    PieGridSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-grid-series]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g\n        ngx-charts-pie-arc\n        *ngFor=\"let arc of arcs; trackBy: trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], PieGridSeriesComponent);
    return PieGridSeriesComponent;
}());

var PieSeriesComponent = /** @class */ (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.trimLabels = true;
        this.maxLabelLength = 10;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pieGenerator = pie()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pieGenerator(this.series);
        this.max = max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var factor = 1.5;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = factor * _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            if (!this.labelVisible(a)) {
                continue;
            }
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (!this.labelVisible(b)) {
                    continue;
                }
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    var o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
                    if (o > 0) {
                        // push the second up or down
                        b.pos[1] += Math.sign(b.pos[0]) * o;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (myArc) {
        return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
    };
    PieSeriesComponent.prototype.getTooltipTitle = function (a) {
        return this.tooltipTemplate ? undefined : this.tooltipText(a);
    };
    PieSeriesComponent.prototype.labelText = function (myArc) {
        if (this.labelFormatting) {
            return this.labelFormatting(myArc.data.name);
        }
        return this.label(myArc);
    };
    PieSeriesComponent.prototype.label = function (myArc) {
        return formatLabel(myArc.data.name);
    };
    PieSeriesComponent.prototype.defaultTooltipText = function (myArc) {
        var label = this.label(myArc);
        var val = formatLabel(myArc.data.value);
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (myArc) {
        return this.colors.getColor(this.label(myArc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "series", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "explodeSlices", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "showLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PieSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieSeriesComponent.prototype, "trimLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieSeriesComponent.prototype, "maxLabelLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PieSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], PieSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "deactivate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PieSeriesComponent.prototype, "dblclick", void 0);
    PieSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-pie-series]',
            template: "\n    <svg:g *ngFor=\"let arc of data; trackBy: trackBy\">\n      <svg:g\n        ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"labelText(arc)\"\n        [labelTrim]=\"trimLabels\"\n        [labelTrimSize]=\"maxLabelLength\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\"\n        [animations]=\"animations\"\n      ></svg:g>\n      <svg:g\n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        [animate]=\"animations\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"\n        (dblclick)=\"dblclick.emit($event)\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipTitle(arc)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"arc.data\"\n      ></svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PieSeriesComponent);
    return PieSeriesComponent;
}());

var PieChartModule = /** @class */ (function () {
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ],
            exports: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ]
        })
    ], PieChartModule);
    return PieChartModule;
}());

var PolarChartModule = /** @class */ (function () {
    function PolarChartModule() {
    }
    PolarChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule, PieChartModule, LineChartModule],
            declarations: [
                PolarChartComponent,
                PolarSeriesComponent
            ],
            exports: [
                PolarChartComponent,
                PolarSeriesComponent
            ]
        })
    ], PolarChartModule);
    return PolarChartModule;
}());

var CardComponent = /** @class */ (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return escapeLabel(trimLabel(card.label, 55)); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.label ? _this.label : _this.data.name;
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = (_this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8);
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 15);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "bandColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "textColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "x", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "y", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CardComponent.prototype, "medianSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CardComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CardComponent.prototype, "select", void 0);
    __decorate([
        ViewChild('textEl', { static: false }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], CardComponent.prototype, "textEl", void 0);
    CardComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-card]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\" (click)=\"onClick()\">\n      <svg:rect class=\"card\" [style.fill]=\"color\" [attr.width]=\"cardWidth\" [attr.height]=\"cardHeight\" rx=\"3\" ry=\"3\" />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{ label }}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\"\n      >\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\"\n        >\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text\n        #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\"\n      >\n        {{ value }}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object, typeof (_c = typeof ChangeDetectorRef !== "undefined" && ChangeDetectorRef) === "function" ? _c : Object, typeof (_d = typeof NgZone !== "undefined" && NgZone) === "function" ? _d : Object])
    ], CardComponent);
    return CardComponent;
}());

var CardSeriesComponent = /** @class */ (function () {
    function CardSeriesComponent() {
        this.innerPadding = 15;
        this.emptyColor = 'rgba(0, 0, 0, 0)';
        this.animations = true;
        this.select = new EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        if (this.data.length > 2) {
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var sortedLengths = this.data
                .map(function (d) {
                var hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
                return hasValue
                    ? valueFormatting_1({
                        data: d.data,
                        label: d ? d.data.name : '',
                        value: d && d.data ? d.data.value : ''
                    }).length
                    : 0;
            })
                .sort(function (a, b) { return b - a; });
            var idx = Math.ceil(this.data.length / 2);
            this.medianSize = sortedLengths[idx];
        }
        var cards = this.getCards();
        this.cards = cards.filter(function (d) { return d.data.value !== null; });
        this.emptySlots = cards.filter(function (d) { return d.data.value === null; });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        var yPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[0] + this.innerPadding[2];
        var xPadding = typeof this.innerPadding === 'number' ? this.innerPadding : this.innerPadding[1] + this.innerPadding[3];
        return this.data.map(function (d, index) {
            var label = d.data.name;
            if (label && label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label ? label.toLocaleString() : label;
            }
            var value = d.data.value;
            var valueColor = label ? _this.colors.getColor(label) : _this.emptyColor;
            var color = _this.cardColor || valueColor || '#000';
            return {
                x: d.x,
                y: d.y,
                width: d.width - xPadding,
                height: d.height - yPadding,
                color: color,
                bandColor: _this.bandColor || valueColor,
                textColor: _this.textColor || invertColor(color),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CardSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CardSeriesComponent.prototype, "slots", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "cardColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "bandColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "emptyColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "textColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CardSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CardSeriesComponent.prototype, "select", void 0);
    CardSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-card-series]',
            template: "\n    <svg:rect\n      *ngFor=\"let c of emptySlots; trackBy: trackBy\"\n      class=\"card-empty\"\n      [attr.x]=\"c.x\"\n      [attr.y]=\"c.y\"\n      [style.fill]=\"emptyColor\"\n      [attr.width]=\"c.width\"\n      [attr.height]=\"c.height\"\n      rx=\"3\"\n      ry=\"3\"\n    />\n    <svg:g\n      ngx-charts-card\n      *ngFor=\"let c of cards; trackBy: trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [bandColor]=\"c.bandColor\"\n      [textColor]=\"c.textColor\"\n      [data]=\"c.data\"\n      [label]=\"c.label\"\n      [medianSize]=\"medianSize\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n    />\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardSeriesComponent);
    return CardSeriesComponent;
}());

var NumberCardComponent = /** @class */ (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyColor = 'rgba(0, 0, 0, 0)';
        _this.innerPadding = 15;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    Object.defineProperty(NumberCardComponent.prototype, "clickable", {
        get: function () {
            return !!this.select.observers.length;
        },
        enumerable: true,
        configurable: true
    });
    NumberCardComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.formatDates();
        this.domain = this.getDomain();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var size = gridSize(this.dims, this.results.length, 150);
        var N = size[0] * size[1];
        var data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150, this.designatedTotal);
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.label; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NumberCardComponent.prototype, "cardColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NumberCardComponent.prototype, "bandColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NumberCardComponent.prototype, "emptyColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NumberCardComponent.prototype, "innerPadding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NumberCardComponent.prototype, "textColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NumberCardComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NumberCardComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NumberCardComponent.prototype, "designatedTotal", void 0);
    NumberCardComponent = __decorate([
        Component({
            selector: 'ngx-charts-number-card',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n        <svg:g\n          ngx-charts-card-series\n          [colors]=\"colors\"\n          [cardColor]=\"cardColor\"\n          [bandColor]=\"bandColor\"\n          [textColor]=\"textColor\"\n          [emptyColor]=\"emptyColor\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [innerPadding]=\"innerPadding\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", "ngx-charts-number-card .cell .trimmed-label{font-size:12px;pointer-events:none;overflow:hidden;text-align:left;line-height:1em}ngx-charts-number-card .cell .trimmed-label p{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%;padding:0;margin:0}ngx-charts-number-card .cell .value-text{pointer-events:none}ngx-charts-number-card .number-card.clickable .cell .card,ngx-charts-number-card .number-card.clickable .cell .card-band{cursor:pointer}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NumberCardComponent);
    return NumberCardComponent;
}(BaseChartComponent));

var NumberCardModule = /** @class */ (function () {
    function NumberCardModule() {
    }
    NumberCardModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                CardComponent,
                CardSeriesComponent,
                NumberCardComponent
            ],
            exports: [
                CardComponent,
                CardSeriesComponent,
                NumberCardComponent
            ]
        })
    ], NumberCardModule);
    return NumberCardModule;
}());

var TreeMapCellComponent = /** @class */ (function () {
    function TreeMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function () {
        this.update();
        this.valueFormatting = this.valueFormatting || (function (value) { return value.toLocaleString(); });
        var labelFormatting = this.labelFormatting || (function (cell) { return escapeLabel(trimLabel(cell.label, 55)); });
        var cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedValue = this.valueFormatting(cellData.value);
        this.formattedLabel = labelFormatting(cellData);
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            if (this.animations) {
                this.loadAnimation();
            }
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return invertColor(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        if (this.animations) {
            node
                .transition()
                .duration(750)
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
        else {
            node
                .attr('opacity', 1)
                .attr('x', this.x)
                .attr('y', this.y)
                .attr('width', this.width)
                .attr('height', this.height);
        }
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    TreeMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "x", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "y", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "valueType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeMapCellComponent.prototype, "select", void 0);
    TreeMapCellComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-tree-map-cell]',
            template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient orientation=\"vertical\" [name]=\"gradientId\" [stops]=\"gradientStops\" />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"treemap-label\"\n        [style.pointer-events]=\"'none'\"\n      >\n        <xhtml:p [style.color]=\"getTextColor()\" [style.height]=\"height + 'px'\" [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\"> </xhtml:span>\n          <xhtml:br />\n          <xhtml:span\n            *ngIf=\"animations\"\n            class=\"treemap-val\"\n            ngx-charts-count-up\n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\"\n          >\n          </xhtml:span>\n          <xhtml:span *ngIf=\"!animations\" class=\"treemap-val\">\n            {{ formattedValue }}\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object])
    ], TreeMapCellComponent);
    return TreeMapCellComponent;
}());

var TreeMapCellSeriesComponent = /** @class */ (function () {
    function TreeMapCellSeriesComponent() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            return {
                data: d.data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "dims", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], TreeMapCellSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapCellSeriesComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeMapCellSeriesComponent.prototype, "select", void 0);
    TreeMapCellSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-tree-map-cell-series]',
            template: "\n    <svg:g\n      ngx-charts-tree-map-cell\n      *ngFor=\"let c of cells; trackBy: trackBy\"\n      [data]=\"c.data\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      [valueFormatting]=\"valueFormatting\"\n      [labelFormatting]=\"labelFormatting\"\n      [gradient]=\"gradient\"\n      [animations]=\"animations\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(c)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"c.data\"\n    ></svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapCellSeriesComponent);
    return TreeMapCellSeriesComponent;
}());

var TreeMapComponent = /** @class */ (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.gradient = false;
        _this.select = new EventEmitter();
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    TreeMapComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.treemap = treemap().size([this.dims.width, this.dims.height]);
        var rootNode = {
            name: 'root',
            value: 0,
            isRoot: true
        };
        var root = stratify()
            .id(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            return label;
        })
            .parentId(function (d) { return (d.isRoot ? null : 'root'); })([rootNode].concat(this.results))
            .sum(function (d) { return d.value; });
        this.data = this.treemap(root);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMapComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    TreeMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    var _a;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapComponent.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeMapComponent.prototype, "labelFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TreeMapComponent.prototype, "gradient", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeMapComponent.prototype, "select", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_a = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _a : Object)
    ], TreeMapComponent.prototype, "tooltipTemplate", void 0);
    TreeMapComponent = __decorate([
        Component({
            selector: 'ngx-charts-tree-map',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g\n          ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          [gradient]=\"gradient\"\n          [animations]=\"animations\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".tree-map .treemap-val{font-size:1.3em;padding-top:5px;display:inline-block}.tree-map .treemap-label p{display:table-cell;text-align:center;line-height:1.2em;vertical-align:middle}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], TreeMapComponent);
    return TreeMapComponent;
}(BaseChartComponent));

var TreeMapModule = /** @class */ (function () {
    function TreeMapModule() {
    }
    TreeMapModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                TreeMapCellComponent,
                TreeMapCellSeriesComponent,
                TreeMapComponent
            ],
            exports: [
                TreeMapCellComponent,
                TreeMapCellSeriesComponent,
                TreeMapComponent
            ]
        })
    ], TreeMapModule);
    return TreeMapModule;
}());

var LinearGaugeComponent = /** @class */ (function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.value = 0;
        _this.margin = [10, 20, 10, 20];
        _this.valueResizeScale = 1;
        _this.unitsResizeScale = 1;
        _this.valueTextTransform = '';
        _this.valueTranslate = '';
        _this.unitsTextTransform = '';
        _this.unitsTranslate = '';
        return _this;
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.transformLine = "translate(" + (this.margin[3] + this.valueScale(this.previousValue)) + ", " + yOffset + ")";
        this.valueTranslate = "translate(0, -15)";
        this.unitsTranslate = "translate(0, 15)";
        setTimeout(function () { return _this.scaleText('value'); }, 50);
        setTimeout(function () { return _this.scaleText('units'); }, 50);
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element, repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0)
            return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () {
                    _this.scaleText(element, false);
                }, 50);
            }
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LinearGaugeComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LinearGaugeComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LinearGaugeComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LinearGaugeComponent.prototype, "units", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LinearGaugeComponent.prototype, "previousValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], LinearGaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([
        ViewChild('valueTextEl', { static: false }),
        __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
    ], LinearGaugeComponent.prototype, "valueTextEl", void 0);
    __decorate([
        ViewChild('unitsTextEl', { static: false }),
        __metadata("design:type", typeof (_b = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _b : Object)
    ], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
    LinearGaugeComponent = __decorate([
        Component({
            selector: 'ngx-charts-linear-gauge',
            template: "\n    <ngx-charts-chart [view]=\"[width, height]\" [showLegend]=\"false\" [animations]=\"animations\" (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g\n          ngx-charts-bar\n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-bar\n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\"\n          [animations]=\"animations\"\n        ></svg:g>\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\"\n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:line\n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\"\n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"\n        />\n\n        <svg:g [attr.transform]=\"transform\">\n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text\n              #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"\n              alignment-baseline=\"after-edge\"\n            >\n              {{ displayValue }}\n            </svg:text>\n          </svg:g>\n\n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text\n              #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"\n              alignment-baseline=\"before-edge\"\n            >\n              {{ units }}\n            </svg:text>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:rgba(0,0,0,.05)}.linear-gauge .units{fill:#666}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], LinearGaugeComponent);
    return LinearGaugeComponent;
}(BaseChartComponent));

var GaugeComponent = /** @class */ (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legend = false;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.min = 0;
        _this.max = 100;
        _this.bigSegments = 10;
        _this.smallSegments = 5;
        _this.showAxis = true;
        _this.startAngle = -120;
        _this.angleSpan = 240;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.showText = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.resizeScale = 1;
        _this.rotation = '';
        _this.textTransform = 'scale(1, 1)';
        _this.cornerRadius = 10;
        return _this;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        if (!this.showAxis) {
            if (!this.margin) {
                this.margin = [10, 20, 10, 20];
            }
        }
        else {
            if (!this.margin) {
                this.margin = [60, 100, 60, 100];
            }
        }
        if (this.startAngle < 0) {
            this.startAngle = (this.startAngle % 360) + 360;
        }
        this.angleSpan = Math.min(this.angleSpan, 360);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.domain = this.getDomain();
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
        this.arcs = this.getArcs();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = "translate(" + xOffset + ", " + yOffset + ")";
        this.rotation = "rotate(" + this.startAngle + ")";
        setTimeout(function () { return _this.scaleText(); }, 50);
    };
    GaugeComponent.prototype.getArcs = function () {
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var d = _a[_i];
            var outerRadius = this.outerRadius - i * radiusPerArc;
            var innerRadius = outerRadius - arcWidth;
            var backgroundArc = {
                endAngle: (this.angleSpan * Math.PI) / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            var valueArc = {
                endAngle: (Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI) / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            var arc$$1 = {
                backgroundArc: backgroundArc,
                valueArc: valueArc
            };
            arcs.push(arc$$1);
            i++;
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, values);
        var dataMax = Math.max.apply(Math, values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        if (this.textValue && 0 !== this.textValue.length) {
            return this.textValue.toLocaleString();
        }
        if (this.valueFormatting) {
            return this.valueFormatting(value);
        }
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function (repeat) {
        var _this = this;
        if (repeat === void 0) { repeat = true; }
        if (!this.showText) {
            return;
        }
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        var oldScale = this.resizeScale;
        if (width === 0) {
            this.resizeScale = 1;
        }
        else {
            var availableSpace = this.textRadius;
            this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        }
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            if (repeat) {
                setTimeout(function () { return _this.scaleText(false); }, 50);
            }
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            colors: this.colors,
            domain: this.domain,
            title: this.legendTitle,
            position: this.legendPosition
        };
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    GaugeComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    GaugeComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    GaugeComponent.prototype.trackBy = function (index, item) {
        return item.valueArc.data.name;
    };
    var _a, _b, _c, _d;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeComponent.prototype, "legend", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GaugeComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GaugeComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GaugeComponent.prototype, "textValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GaugeComponent.prototype, "units", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "bigSegments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "smallSegments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GaugeComponent.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeComponent.prototype, "showAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "startAngle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeComponent.prototype, "angleSpan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GaugeComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeComponent.prototype, "axisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], GaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeComponent.prototype, "showText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GaugeComponent.prototype, "margin", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_a = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _a : Object)
    ], GaugeComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", typeof (_b = typeof EventEmitter !== "undefined" && EventEmitter) === "function" ? _b : Object)
    ], GaugeComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate', { static: false }),
        __metadata("design:type", typeof (_c = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _c : Object)
    ], GaugeComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ViewChild('textEl', { static: false }),
        __metadata("design:type", typeof (_d = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _d : Object)
    ], GaugeComponent.prototype, "textEl", void 0);
    GaugeComponent = __decorate([
        Component({
            selector: 'ngx-charts-gauge',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs; trackBy: trackBy\" [attr.transform]=\"rotation\">\n          <svg:g\n            ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            [isActive]=\"isActive(arc.valueArc.data)\"\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [valueFormatting]=\"valueFormatting\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            (activate)=\"onActivate($event)\"\n            (deactivate)=\"onDeactivate($event)\"\n          ></svg:g>\n        </svg:g>\n\n        <svg:g\n          ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\"\n          [tickFormatting]=\"axisTickFormatting\"\n        ></svg:g>\n\n        <svg:text\n          #textEl\n          *ngIf=\"showText\"\n          [style.textAnchor]=\"'middle'\"\n          [attr.transform]=\"textTransform\"\n          alignment-baseline=\"central\"\n        >\n          <tspan x=\"0\" dy=\"0\">{{ displayValue }}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{ units }}</tspan>\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}", ".gauge .background-arc path{fill:rgba(0,0,0,.05)}.gauge .gauge-tick path{stroke:#666}.gauge .gauge-tick text{font-size:12px;fill:#666;font-weight:700}.gauge .gauge-tick-large path{stroke-width:2px}.gauge .gauge-tick-small path{stroke-width:1px}"],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeComponent);
    return GaugeComponent;
}(BaseChartComponent));

var GaugeArcComponent = /** @class */ (function () {
    function GaugeArcComponent() {
        this.isActive = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
    }
    GaugeArcComponent.prototype.tooltipText = function (arc$$1) {
        var label = formatLabel(arc$$1.data.name);
        var val;
        if (this.valueFormatting) {
            val = this.valueFormatting(arc$$1.data.value);
        }
        else {
            val = formatLabel(arc$$1.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(label) + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    var _a, _b;
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "backgroundArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "valueArc", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_a = typeof ColorHelper !== "undefined" && ColorHelper) === "function" ? _a : Object)
    ], GaugeArcComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "isActive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], GaugeArcComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", typeof (_b = typeof TemplateRef !== "undefined" && TemplateRef) === "function" ? _b : Object)
    ], GaugeArcComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GaugeArcComponent.prototype, "animations", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], GaugeArcComponent.prototype, "deactivate", void 0);
    GaugeArcComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-gauge-arc]',
            template: "\n    <svg:g ngx-charts-pie-arc\n      class=\"background-arc\"\n      [startAngle]=\"0\"\n      [endAngle]=\"backgroundArc.endAngle\"\n      [innerRadius]=\"backgroundArc.innerRadius\"\n      [outerRadius]=\"backgroundArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [data]=\"backgroundArc.data\"\n      [animate]=\"false\"\n      [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n      [startAngle]=\"0\"\n      [endAngle]=\"valueArc.endAngle\"\n      [innerRadius]=\"valueArc.innerRadius\"\n      [outerRadius]=\"valueArc.outerRadius\"\n      [cornerRadius]=\"cornerRadius\"\n      [fill]=\"colors.getColor(valueArc.data.name)\"\n      [data]=\"valueArc.data\"\n      [animate]=\"animations\"\n      [isActive]=\"isActive\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipDisabled]=\"tooltipDisabled\"\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(valueArc)\"\n      [tooltipTemplate]=\"tooltipTemplate\"\n      [tooltipContext]=\"valueArc.data\">\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());

var GaugeAxisComponent = /** @class */ (function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / (this.smallSegments);
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            var skip = false;
            if (i === 0 && this.angleSpan === 360) {
                skip = true;
            }
            if (!skip) {
                var text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();
                if (this.tickFormatting) {
                    text = this.tickFormatting(text);
                }
                ticks.big.push({
                    line: this.getTickPath(startDistance, tickLength, angle),
                    textAnchor: textAnchor,
                    text: text,
                    textTransform: "\n            translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")\n          "
                });
            }
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var lineGenerator = line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return lineGenerator(points);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "bigSegments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "smallSegments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeAxisComponent.prototype, "angleSpan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeAxisComponent.prototype, "startAngle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "radius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "valueScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeAxisComponent.prototype, "tickFormatting", void 0);
    GaugeAxisComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-gauge-axis]',
            template: "\n    <svg:g [attr.transform]=\"rotate\">\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:text\n                [style.textAnchor]=\"tick.textAnchor\"\n                [attr.transform]=\"tick.textTransform\"\n                alignment-baseline=\"central\">\n                {{tick.text}}\n            </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"\n            class=\"gauge-tick gauge-tick-small\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeAxisComponent);
    return GaugeAxisComponent;
}());

var GaugeModule = /** @class */ (function () {
    function GaugeModule() {
    }
    GaugeModule = __decorate([
        NgModule({
            imports: [ChartCommonModule, PieChartModule, BarChartModule],
            declarations: [
                LinearGaugeComponent,
                GaugeComponent,
                GaugeArcComponent,
                GaugeAxisComponent
            ],
            exports: [
                LinearGaugeComponent,
                GaugeComponent,
                GaugeArcComponent,
                GaugeAxisComponent
            ]
        })
    ], GaugeModule);
    return GaugeModule;
}());

var NgxChartsModule = /** @class */ (function () {
    function NgxChartsModule() {
    }
    NgxChartsModule = __decorate([
        NgModule({
            exports: [
                ChartCommonModule,
                AreaChartModule,
                BarChartModule,
                BubbleChartModule,
                ForceDirectedGraphModule,
                HeatMapModule,
                LineChartModule,
                PolarChartModule,
                NumberCardModule,
                PieChartModule,
                TreeMapModule,
                GaugeModule
            ]
        })
    ], NgxChartsModule);
    return NgxChartsModule;
}());

function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = timeFormat('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}

export { NgxChartsModule, ChartCommonModule, LegendComponent, ScaleLegendComponent, LegendEntryComponent, AdvancedLegendComponent, TooltipModule, TooltipService, TooltipContentComponent, TooltipDirective, StyleTypes, AlignmentTypes, ShowTypes, AxesModule, AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent, reduceTicks, CountUpDirective, count, decimalChecker, Timeline, ColorHelper, ChartComponent, AreaComponent, BaseChartComponent, CircleComponent, CircleSeriesComponent, gridSize, gridLayout, GridPanelComponent, GridPanelSeriesComponent, SvgLinearGradientComponent, SvgRadialGradientComponent, TooltipArea, tickFormat, trimLabel, calculateViewDimensions, formatLabel, escapeLabel, getUniqueXDomainValues, getScaleType, AreaChartModule, AreaChartComponent, AreaChartNormalizedComponent, AreaChartStackedComponent, AreaSeriesComponent, BarChartModule, BarComponent, BarHorizontalComponent, BarHorizontal2DComponent, BarHorizontalNormalizedComponent, BarHorizontalStackedComponent, SeriesHorizontal, BarLabelComponent, BarVerticalComponent, BarVertical2DComponent, BarVerticalNormalizedComponent, BarVerticalStackedComponent, D0Types, SeriesVerticalComponent, BubbleChartModule, BubbleChartComponent, getDomain, getScale, BubbleSeriesComponent, ForceDirectedGraphModule, ForceDirectedGraphComponent, HeatMapModule, HeatMapComponent, HeatMapCellComponent, HeatCellSeriesComponent, LineChartModule, LineChartComponent, LineComponent, LineSeriesComponent, PolarChartModule, PolarChartComponent, PolarSeriesComponent, NumberCardModule, NumberCardComponent, CardComponent, CardSeriesComponent, PieChartModule, AdvancedPieChartComponent, PieChartComponent, PieArcComponent, PieGridComponent, PieGridSeriesComponent, PieSeriesComponent, PieLabelComponent, TreeMapModule, TreeMapComponent, TreeMapCellComponent, TreeMapCellSeriesComponent, GaugeModule, GaugeArcComponent, GaugeAxisComponent, GaugeComponent, LinearGaugeComponent };
