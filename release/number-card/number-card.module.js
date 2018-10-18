var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { CardComponent } from './card.component';
import { CardSeriesComponent } from './card-series.component';
import { NumberCardComponent } from './number-card.component';
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
export { NumberCardModule };
//# sourceMappingURL=number-card.module.js.map