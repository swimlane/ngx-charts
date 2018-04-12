var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
export { GridPanelComponent };
//# sourceMappingURL=grid-panel.component.js.map