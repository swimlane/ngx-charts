"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var viz_1 = require('../viz');
var data_1 = require('./data');
require('../viz.scss');
var App = (function () {
    function App() {
        console.log('Alles gut');
        Object.assign(this, { barData: data_1.barData, pieData: data_1.pieData, lineData: data_1.lineData });
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n    \t<h3>Bar chart</h3>\n\n      <bar-vertical\n        [view]=\"[700,200]\"\n        [scheme]=\"{domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']}\"\n        [labels]=\"true\"\n        [results]=\"barData\"\n        [xaxis]=\"true\"\n        [yaxis]=\"true\"\n        [show-x-axis-label]=\"true\"\n        [xaxis-label]=\"'hello x'\"\n        [yaxis-label]=\"'hello y'\"\n        [show-y-axis-label]=\"true\">\n      </bar-vertical>\n\n    </div>\n  ",
            directives: [viz_1.VIZ_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
