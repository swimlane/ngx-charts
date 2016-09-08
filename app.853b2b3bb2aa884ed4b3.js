webpackJsonp([1],{

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared__ = __webpack_require__(70);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AbstractFormGroupDirective; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * This is a base class for code shared between {@link NgModelGroup} and {@link FormGroupName}.
 *
 * @stable
 */
var AbstractFormGroupDirective = (function (_super) {
    __extends(AbstractFormGroupDirective, _super);
    function AbstractFormGroupDirective() {
        _super.apply(this, arguments);
    }
    AbstractFormGroupDirective.prototype.ngOnInit = function () {
        this._checkParentType();
        this.formDirective.addFormGroup(this);
    };
    AbstractFormGroupDirective.prototype.ngOnDestroy = function () {
        if (this.formDirective) {
            this.formDirective.removeFormGroup(this);
        }
    };
    Object.defineProperty(AbstractFormGroupDirective.prototype, "control", {
        /**
         * Get the {@link FormGroup} backing this binding.
         */
        get: function () { return this.formDirective.getFormGroup(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "path", {
        /**
         * Get the path to this control group.
         */
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__shared__["a" /* controlPath */])(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "formDirective", {
        /**
         * Get the {@link Form} to which this group belongs.
         */
        get: function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "validator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__shared__["b" /* composeValidators */])(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFormGroupDirective.prototype, "asyncValidator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__shared__["c" /* composeAsyncValidators */])(this._asyncValidators); },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    AbstractFormGroupDirective.prototype._checkParentType = function () { };
    return AbstractFormGroupDirective;
}(__WEBPACK_IMPORTED_MODULE_0__control_container__["a" /* ControlContainer */]));
//# sourceMappingURL=abstract_form_group_directive.js.map

/***/ },

/***/ 1082:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(122);
var Observable_1 = __webpack_require__(174);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {Promise<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional Scheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

/***/ },

/***/ 1083:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var PromiseObservable_1 = __webpack_require__(1082);
exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
//# sourceMappingURL=fromPromise.js.map

/***/ },

/***/ 1084:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(122);
/**
 * @param PromiseCtor
 * @return {Promise<T>}
 * @method toPromise
 * @owner Observable
 */
function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
exports.toPromise = toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__(70);
/* unused harmony export formDirectiveProvider */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgForm; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};








var formDirectiveProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_6__control_container__["a" /* ControlContainer */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NgForm; })
};
var resolvedPromise = Promise.resolve(null);
/**
 * If `NgForm` is bound in a component, `<form>` elements in that component will be
 * upgraded to use the Angular form system.
 *
 * ### Typical Use
 *
 * Include `FORM_DIRECTIVES` in the `directives` section of a {@link Component} annotation
 * to use `NgForm` and its associated controls.
 *
 * ### Structure
 *
 * An Angular form is a collection of `FormControl`s in some hierarchy.
 * `FormControl`s can be at the top level or can be organized in `FormGroup`s
 * or `FormArray`s. This hierarchy is reflected in the form's `value`, a
 * JSON object that mirrors the form structure.
 *
 * ### Submission
 *
 * The `ngSubmit` event signals when the user triggers a form submission.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <p>Submit the form to see the data object Angular builds</p>
 *       <h2>NgForm demo</h2>
 *       <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
 *         <h3>Control group: credentials</h3>
 *         <div ngModelGroup="credentials">
 *           <p>Login: <input type="text" name="login" ngModel></p>
 *           <p>Password: <input type="password" name="password" ngModel></p>
 *         </div>
 *         <h3>Control group: person</h3>
 *         <div ngModelGroup="person">
 *           <p>First name: <input type="text" name="firstName" ngModel></p>
 *           <p>Last name: <input type="text" name="lastName" ngModel></p>
 *         </div>
 *         <button type="submit">Submit Form</button>
 *       <p>Form data submitted:</p>
 *       </form>
 *       <pre>{{data}}</pre>
 *     </div>
 * `,
 *   directives: []
 * })
 * export class App {
 *   constructor() {}
 *
 *   data: string;
 *
 *   onSubmit(data) {
 *     this.data = JSON.stringify(data, null, 2);
 *   }
 * }
 *  ```
 *
 *  @stable
 */
var NgForm = (function (_super) {
    __extends(NgForm, _super);
    function NgForm(validators, asyncValidators) {
        _super.call(this);
        this._submitted = false;
        this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__facade_async__["a" /* EventEmitter */]();
        this.form =
            new __WEBPACK_IMPORTED_MODULE_4__model__["a" /* FormGroup */]({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["b" /* composeValidators */])(validators), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["c" /* composeAsyncValidators */])(asyncValidators));
    }
    Object.defineProperty(NgForm.prototype, "submitted", {
        get: function () { return this._submitted; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForm.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    NgForm.prototype.addControl = function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var container = _this._findContainer(dir.path);
            dir._control = container.registerControl(dir.name, dir.control);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["d" /* setUpControl */])(dir.control, dir);
            dir.control.updateValueAndValidity({ emitEvent: false });
        });
    };
    NgForm.prototype.getControl = function (dir) { return this.form.get(dir.path); };
    NgForm.prototype.removeControl = function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var container = _this._findContainer(dir.path);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(container)) {
                container.removeControl(dir.name);
            }
        });
    };
    NgForm.prototype.addFormGroup = function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var container = _this._findContainer(dir.path);
            var group = new __WEBPACK_IMPORTED_MODULE_4__model__["a" /* FormGroup */]({});
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["e" /* setUpFormContainer */])(group, dir);
            container.registerControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    };
    NgForm.prototype.removeFormGroup = function (dir) {
        var _this = this;
        resolvedPromise.then(function () {
            var container = _this._findContainer(dir.path);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(container)) {
                container.removeControl(dir.name);
            }
        });
    };
    NgForm.prototype.getFormGroup = function (dir) { return this.form.get(dir.path); };
    NgForm.prototype.updateModel = function (dir, value) {
        var _this = this;
        resolvedPromise.then(function () {
            var ctrl = _this.form.get(dir.path);
            ctrl.setValue(value);
        });
    };
    NgForm.prototype.setValue = function (value) { this.control.setValue(value); };
    NgForm.prototype.onSubmit = function () {
        this._submitted = true;
        this.ngSubmit.emit(null);
        return false;
    };
    NgForm.prototype.onReset = function () { this.resetForm(); };
    NgForm.prototype.resetForm = function (value) {
        if (value === void 0) { value = undefined; }
        this.form.reset(value);
        this._submitted = false;
    };
    /** @internal */
    NgForm.prototype._findContainer = function (path) {
        path.pop();
        return __WEBPACK_IMPORTED_MODULE_2__facade_collection__["b" /* ListWrapper */].isEmpty(path) ? this.form : this.form.get(path);
    };
    NgForm.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]',
                    providers: [formDirectiveProvider],
                    host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
                    outputs: ['ngSubmit'],
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    NgForm.ctorParameters = [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_5__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_5__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
    ];
    return NgForm;
}(__WEBPACK_IMPORTED_MODULE_6__control_container__["a" /* ControlContainer */]));
//# sourceMappingURL=ng_form.js.map

/***/ },

/***/ 1092:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(899);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(555)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/postcss-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./demo.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/postcss-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./demo.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 1093:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(900);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(555)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/postcss-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./ng2d3.scss", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/postcss-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./ng2d3.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 1094:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(90);
var forms_1 = __webpack_require__(557);
var platform_browser_dynamic_1 = __webpack_require__(177);
var app_1 = __webpack_require__(558);
var ng2d3_1 = __webpack_require__(559);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [ng2d3_1.NG2D3Module, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [app_1.App],
            bootstrap: [app_1.App]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
document.addEventListener('DOMContentLoaded', function () {
    platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(function (err) { return console.error(err); });
});


/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reactive_errors__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__(70);
/* unused harmony export formDirectiveProvider */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormGroupDirective; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};








var formDirectiveProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_5__control_container__["a" /* ControlContainer */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FormGroupDirective; })
};
/**
 * Binds an existing form group to a DOM element.  It requires importing the {@link
 * ReactiveFormsModule}.
 *
 * In this example, we bind the form group to the form element, and we bind the login and
 * password controls to the login and password elements.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Binding an existing form group</h2>
 *       <form [formGroup]="loginForm">
 *         <p>Login: <input type="text" formControlName="login"></p>
 *         <p>Password: <input type="password" formControlName="password"></p>
 *       </form>
 *       <p>Value:</p>
 *       <pre>{{ loginForm.value | json}}</pre>
 *     </div>
 *   `
 * })
 * export class App {
 *   loginForm: FormGroup;
 *
 *   constructor() {
 *     this.loginForm = new FormGroup({
 *       login: new FormControl(""),
 *       password: new FormControl("")
 *     });
 *   }
 *
 * }
 *  ```
 *
 * We can also use setValue() to populate the form programmatically.
 *
 *  ```typescript
 * @Component({
 *      selector: "login-comp",
 *      template: `
 *        <form [formGroup]='loginForm'>
 *          Login <input type='text' formControlName='login'>
 *          Password <input type='password' formControlName='password'>
 *          <button (click)="onLogin()">Login</button>
 *        </form>`
 *      })
 * class LoginComp {
 *  loginForm: FormGroup;
 *
 *  constructor() {
 *    this.loginForm = new FormGroup({
 *      login: new FormControl(''),
 *      password: new FormControl('')
 *    });
 *  }
 *
 *  populate() {
 *    this.loginForm.setValue({ login: 'some login', password: 'some password'});
 *  }
 *
 *  onLogin(): void {
 *    // this.credentials.login === 'some login'
 *    // this.credentials.password === 'some password'
 *  }
 * }
 *  ```
 *
 *  @stable
 */
var FormGroupDirective = (function (_super) {
    __extends(FormGroupDirective, _super);
    function FormGroupDirective(_validators, _asyncValidators) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._submitted = false;
        this.directives = [];
        this.form = null;
        this.ngSubmit = new __WEBPACK_IMPORTED_MODULE_1__facade_async__["a" /* EventEmitter */]();
    }
    FormGroupDirective.prototype.ngOnChanges = function (changes) {
        this._checkFormPresent();
        if (__WEBPACK_IMPORTED_MODULE_2__facade_collection__["a" /* StringMapWrapper */].contains(changes, 'form')) {
            var sync = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["b" /* composeValidators */])(this._validators);
            this.form.validator = __WEBPACK_IMPORTED_MODULE_4__validators__["a" /* Validators */].compose([this.form.validator, sync]);
            var async = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["c" /* composeAsyncValidators */])(this._asyncValidators);
            this.form.asyncValidator = __WEBPACK_IMPORTED_MODULE_4__validators__["a" /* Validators */].composeAsync([this.form.asyncValidator, async]);
            this._updateDomValue(changes);
        }
    };
    Object.defineProperty(FormGroupDirective.prototype, "submitted", {
        get: function () { return this._submitted; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroupDirective.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroupDirective.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormGroupDirective.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    FormGroupDirective.prototype.addControl = function (dir) {
        var ctrl = this.form.get(dir.path);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["d" /* setUpControl */])(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
        this.directives.push(dir);
    };
    FormGroupDirective.prototype.getControl = function (dir) { return this.form.get(dir.path); };
    FormGroupDirective.prototype.removeControl = function (dir) { __WEBPACK_IMPORTED_MODULE_2__facade_collection__["b" /* ListWrapper */].remove(this.directives, dir); };
    FormGroupDirective.prototype.addFormGroup = function (dir) {
        var ctrl = this.form.get(dir.path);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["e" /* setUpFormContainer */])(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    };
    FormGroupDirective.prototype.removeFormGroup = function (dir) { };
    FormGroupDirective.prototype.getFormGroup = function (dir) { return this.form.get(dir.path); };
    FormGroupDirective.prototype.addFormArray = function (dir) {
        var ctrl = this.form.get(dir.path);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["e" /* setUpFormContainer */])(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    };
    FormGroupDirective.prototype.removeFormArray = function (dir) { };
    FormGroupDirective.prototype.getFormArray = function (dir) { return this.form.get(dir.path); };
    FormGroupDirective.prototype.updateModel = function (dir, value) {
        var ctrl = this.form.get(dir.path);
        ctrl.setValue(value);
    };
    FormGroupDirective.prototype.onSubmit = function () {
        this._submitted = true;
        this.ngSubmit.emit(null);
        return false;
    };
    FormGroupDirective.prototype.onReset = function () { this.resetForm(); };
    FormGroupDirective.prototype.resetForm = function (value) {
        if (value === void 0) { value = undefined; }
        this.form.reset(value);
        this._submitted = false;
    };
    /** @internal */
    FormGroupDirective.prototype._updateDomValue = function (changes) {
        var _this = this;
        var oldForm = changes['form'].previousValue;
        this.directives.forEach(function (dir) {
            var newCtrl = _this.form.get(dir.path);
            var oldCtrl = oldForm.get(dir.path);
            if (oldCtrl !== newCtrl) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["h" /* cleanUpControl */])(oldCtrl, dir);
                if (newCtrl)
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["d" /* setUpControl */])(newCtrl, dir);
            }
        });
        this.form._updateTreeValidity({ emitEvent: false });
    };
    FormGroupDirective.prototype._checkFormPresent = function () {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["c" /* isBlank */])(this.form)) {
            __WEBPACK_IMPORTED_MODULE_6__reactive_errors__["a" /* ReactiveErrors */].missingFormException();
        }
    };
    FormGroupDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[formGroup]',
                    providers: [formDirectiveProvider],
                    host: { '(submit)': 'onSubmit()', '(reset)': 'onReset()' },
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    FormGroupDirective.ctorParameters = [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_4__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_4__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
    ];
    FormGroupDirective.propDecorators = {
        'form': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['formGroup',] },],
        'ngSubmit': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return FormGroupDirective;
}(__WEBPACK_IMPORTED_MODULE_5__control_container__["a" /* ControlContainer */]));
//# sourceMappingURL=form_group_directive.js.map

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_form_group_directive__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reactive_errors__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_group_directive__ = __webpack_require__(110);
/* unused harmony export formGroupNameProvider */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormGroupName; });
/* unused harmony export formArrayNameProvider */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return FormArrayName; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};







var formGroupNameProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FormGroupName; })
};
/**
 * Syncs an existing form group to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.  It also requires
 * importing the {@link ReactiveFormsModule}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular FormGroup Example</h2>
 *       <form [formGroup]="myForm">
 *         <div formGroupName="name">
 *           <h3>Enter your name:</h3>
 *           <p>First: <input formControlName="first"></p>
 *           <p>Middle: <input formControlName="middle"></p>
 *           <p>Last: <input formControlName="last"></p>
 *         </div>
 *         <h3>Name value:</h3>
 *         <pre>{{ myForm.get('name') | json }}</pre>
 *         <p>Name is {{myForm.get('name')?.valid ? "valid" : "invalid"}}</p>
 *         <h3>What's your favorite food?</h3>
 *         <p><input formControlName="food"></p>
 *         <h3>Form value</h3>
 *         <pre> {{ myForm | json }} </pre>
 *       </form>
 *     </div>
 *   `
 * })
 * export class App {
 *   myForm = new FormGroup({
 *     name: new FormGroup({
 *       first: new FormControl('', Validators.required),
 *       middle: new FormControl(''),
 *       last: new FormControl('', Validators.required)
 *     }),
 *     food: new FormControl()
 *   });
 * }
 * ```
 *
 * This example syncs the form group for the user's name. The value and validation state of
 * this group can be accessed separately from the overall form.
 *
 * @stable
 */
var FormGroupName = (function (_super) {
    __extends(FormGroupName, _super);
    function FormGroupName(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    /** @internal */
    FormGroupName.prototype._checkParentType = function () {
        if (_hasInvalidParent(this._parent)) {
            __WEBPACK_IMPORTED_MODULE_4__reactive_errors__["a" /* ReactiveErrors */].groupParentException();
        }
    };
    FormGroupName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[formGroupName]', providers: [formGroupNameProvider] },] },
    ];
    /** @nocollapse */
    FormGroupName.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
    ];
    FormGroupName.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['formGroupName',] },],
    };
    return FormGroupName;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_form_group_directive__["a" /* AbstractFormGroupDirective */]));
var formArrayNameProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FormArrayName; })
};
/**
 * Syncs an existing form array to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.  It also requires
 * importing the {@link ReactiveFormsModule}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular FormArray Example</h2>
 *       <form [formGroup]="myForm">
 *         <div formArrayName="cities">
 *           <div *ngFor="let city of cityArray.controls; let i=index">
 *             <input [formControlName]="i">
 *           </div>
 *         </div>
 *       </form>
 *       {{ myForm.value | json }}     // {cities: ['SF', 'NY']}
 *     </div>
 *   `
 * })
 * export class App {
 *   cityArray = new FormArray([
 *     new FormControl('SF'),
 *     new FormControl('NY')
 *   ]);
 *   myForm = new FormGroup({
 *     cities: this.cityArray
 *   });
 * }
 * ```
 *
 * @stable
 */
var FormArrayName = (function (_super) {
    __extends(FormArrayName, _super);
    function FormArrayName(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    FormArrayName.prototype.ngOnInit = function () {
        this._checkParentType();
        this.formDirective.addFormArray(this);
    };
    FormArrayName.prototype.ngOnDestroy = function () {
        if (this.formDirective) {
            this.formDirective.removeFormArray(this);
        }
    };
    Object.defineProperty(FormArrayName.prototype, "control", {
        get: function () { return this.formDirective.getFormArray(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "formDirective", {
        get: function () {
            return this._parent ? this._parent.formDirective : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "path", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__shared__["a" /* controlPath */])(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "validator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__shared__["b" /* composeValidators */])(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__shared__["c" /* composeAsyncValidators */])(this._asyncValidators); },
        enumerable: true,
        configurable: true
    });
    FormArrayName.prototype._checkParentType = function () {
        if (_hasInvalidParent(this._parent)) {
            __WEBPACK_IMPORTED_MODULE_4__reactive_errors__["a" /* ReactiveErrors */].arrayParentException();
        }
    };
    FormArrayName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[formArrayName]', providers: [formArrayNameProvider] },] },
    ];
    /** @nocollapse */
    FormArrayName.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
    ];
    FormArrayName.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['formArrayName',] },],
    };
    return FormArrayName;
}(__WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */]));
function _hasInvalidParent(parent) {
    return !(parent instanceof FormGroupName) && !(parent instanceof __WEBPACK_IMPORTED_MODULE_6__form_group_directive__["a" /* FormGroupDirective */]) &&
        !(parent instanceof FormArrayName);
}
//# sourceMappingURL=form_group_name.js.map

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__control_value_accessor__ = __webpack_require__(47);
/* unused harmony export CHECKBOX_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CheckboxControlValueAccessor; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


var CHECKBOX_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CheckboxControlValueAccessor; }),
    multi: true
};
/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *  ### Example
 *  ```
 *  <input type="checkbox" name="rememberLogin" ngModel>
 *  ```
 *
 *  @stable
 */
var CheckboxControlValueAccessor = (function () {
    function CheckboxControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    CheckboxControlValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
    };
    CheckboxControlValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    CheckboxControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    CheckboxControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    CheckboxControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]',
                    host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
                    providers: [CHECKBOX_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckboxControlValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ];
    return CheckboxControlValueAccessor;
}());
//# sourceMappingURL=checkbox_value_accessor.js.map

/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_value_accessor__ = __webpack_require__(47);
/* unused harmony export DEFAULT_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DefaultValueAccessor; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var DEFAULT_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return DefaultValueAccessor; }),
    multi: true
};
/**
 * The default accessor for writing a value and listening to changes that is used by the
 * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="text" name="searchQuery" ngModel>
 *  ```
 *
 *  @stable
 */
var DefaultValueAccessor = (function () {
    function DefaultValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DefaultValueAccessor.prototype.writeValue = function (value) {
        var normalizedValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(value) ? '' : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DefaultValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DefaultValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    DefaultValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
                    // TODO: vsavkin replace the above selector with the one below it once
                    // https://github.com/angular/angular/issues/3011 is implemented
                    // selector: '[ngControl],[ngModel],[ngFormControl]',
                    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [DEFAULT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DefaultValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ];
    return DefaultValueAccessor;
}());
//# sourceMappingURL=default_value_accessor.js.map

/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_form_group_directive__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__template_driven_errors__ = __webpack_require__(453);
/* unused harmony export modelGroupProvider */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgModelGroup; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






var modelGroupProvider = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NgModelGroup; })
};
/**
 * Creates and binds a model group to a DOM element.
 *
 * This directive can only be used as a child of {@link NgForm}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular forms Example</h2>
 *       <form #f="ngForm">
 *         <div ngModelGroup="name" #mgName="ngModelGroup">
 *           <h3>Enter your name:</h3>
 *           <p>First: <input name="first" ngModel required></p>
 *           <p>Middle: <input name="middle" ngModel></p>
 *           <p>Last: <input name="last" ngModel required></p>
 *         </div>
 *         <h3>Name value:</h3>
 *         <pre>{{ mgName.value | json }}</pre>
 *         <p>Name is {{mgName?.valid ? "valid" : "invalid"}}</p>
 *         <h3>What's your favorite food?</h3>
 *         <p><input name="food" ngModel></p>
 *         <h3>Form value</h3>
 *         <pre>{{ f.value | json }}</pre>
 *       </form>
 *     </div>
 *   `
 * })
 * export class App {}
 * ```
 *
 * This example declares a model group for a user's name. The value and validation state of
 * this group can be accessed separately from the overall form.
 *
 * @stable
 */
var NgModelGroup = (function (_super) {
    __extends(NgModelGroup, _super);
    function NgModelGroup(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    /** @internal */
    NgModelGroup.prototype._checkParentType = function () {
        if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof __WEBPACK_IMPORTED_MODULE_4__ng_form__["a" /* NgForm */])) {
            __WEBPACK_IMPORTED_MODULE_5__template_driven_errors__["a" /* TemplateDrivenErrors */].modelGroupParentException();
        }
    };
    NgModelGroup.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
    ];
    /** @nocollapse */
    NgModelGroup.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_3__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_1__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
    ];
    NgModelGroup.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngModelGroup',] },],
    };
    return NgModelGroup;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_form_group_directive__["a" /* AbstractFormGroupDirective */]));
//# sourceMappingURL=ng_model_group.js.map

/***/ },

/***/ 146:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_control__ = __webpack_require__(77);
/* unused harmony export RADIO_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return RadioControlRegistry; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RadioControlValueAccessor; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */





var RADIO_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return RadioControlValueAccessor; }),
    multi: true
};
/**
 * Internal class used by Angular to uncheck radio buttons with the matching name.
 */
var RadioControlRegistry = (function () {
    function RadioControlRegistry() {
        this._accessors = [];
    }
    RadioControlRegistry.prototype.add = function (control, accessor) {
        this._accessors.push([control, accessor]);
    };
    RadioControlRegistry.prototype.remove = function (accessor) {
        var indexToRemove = -1;
        for (var i = 0; i < this._accessors.length; ++i) {
            if (this._accessors[i][1] === accessor) {
                indexToRemove = i;
            }
        }
        __WEBPACK_IMPORTED_MODULE_1__facade_collection__["b" /* ListWrapper */].removeAt(this._accessors, indexToRemove);
    };
    RadioControlRegistry.prototype.select = function (accessor) {
        var _this = this;
        this._accessors.forEach(function (c) {
            if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].fireUncheck(accessor.value);
            }
        });
    };
    RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
        if (!controlPair[0].control)
            return false;
        return controlPair[0]._parent === accessor._control._parent &&
            controlPair[1].name === accessor.name;
    };
    RadioControlRegistry.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    RadioControlRegistry.ctorParameters = [];
    return RadioControlRegistry;
}());
/**
 * The accessor for writing a radio control value and listening to changes that is used by the
 * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  @Component({
 *    template: `
 *      <input type="radio" name="food" [(ngModel)]="food" value="chicken">
 *      <input type="radio" name="food" [(ngModel)]="food" value="fish">
 *    `
 *  })
 *  class FoodCmp {
 *    food = 'chicken';
 *  }
 *  ```
 */
var RadioControlValueAccessor = (function () {
    function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    RadioControlValueAccessor.prototype.ngOnInit = function () {
        this._control = this._injector.get(__WEBPACK_IMPORTED_MODULE_4__ng_control__["a" /* NgControl */]);
        this._checkName();
        this._registry.add(this._control, this);
    };
    RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
    RadioControlValueAccessor.prototype.writeValue = function (value) {
        this._state = value === this.value;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(value)) {
            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', this._state);
        }
    };
    RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function () {
            fn(_this.value);
            _this._registry.select(_this);
        };
    };
    RadioControlValueAccessor.prototype.fireUncheck = function (value) { this.writeValue(value); };
    RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    RadioControlValueAccessor.prototype._checkName = function () {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this._throwNameError();
        }
        if (!this.name && this.formControlName)
            this.name = this.formControlName;
    };
    RadioControlValueAccessor.prototype._throwNameError = function () {
        throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
    };
    RadioControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
                    host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
                    providers: [RADIO_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RadioControlValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: RadioControlRegistry, },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], },
    ];
    RadioControlValueAccessor.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'formControlName': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return RadioControlValueAccessor;
}());
//# sourceMappingURL=radio_control_value_accessor.js.map

/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_examples__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ReactiveErrors; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var ReactiveErrors = (function () {
    function ReactiveErrors() {
    }
    ReactiveErrors.controlParentException = function () {
        throw new Error("formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formControlName);
    };
    ReactiveErrors.ngModelGroupException = function () {
        throw new Error("formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a \"form\" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formGroupName + "\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].ngModelGroup);
    };
    ReactiveErrors.missingFormException = function () {
        throw new Error("formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formControlName);
    };
    ReactiveErrors.groupParentException = function () {
        throw new Error("formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formGroupName);
    };
    ReactiveErrors.arrayParentException = function () {
        throw new Error("formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formArrayName);
    };
    ReactiveErrors.disabledAttrWarning = function () {
        console.warn("\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    ");
    };
    return ReactiveErrors;
}());
//# sourceMappingURL=reactive_errors.js.map

/***/ },

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__ = __webpack_require__(47);
/* unused harmony export SELECT_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SelectControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NgSelectOption; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




var SELECT_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return SelectControlValueAccessor; }),
    multi: true
};
function _buildValueString(id, value) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["c" /* isBlank */])(id))
        return "" + value;
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["j" /* isPrimitive */])(value))
        value = 'Object';
    return __WEBPACK_IMPORTED_MODULE_2__facade_lang__["k" /* StringWrapper */].slice(id + ": " + value, 0, 50);
}
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/**
 * The accessor for writing a value and listening to changes on a select element.
 *
 * Note: We have to listen to the 'change' event because 'input' events aren't fired
 * for selects in Firefox and IE:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1024350
 * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4660045/
 *
 * @stable
 */
var SelectControlValueAccessor = (function () {
    function SelectControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** @internal */
        this._optionMap = new Map();
        /** @internal */
        this._idCounter = 0;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    SelectControlValueAccessor.prototype.writeValue = function (value) {
        this.value = value;
        var valueString = _buildValueString(this._getOptionId(value), value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
    };
    SelectControlValueAccessor.prototype.registerOnChange = function (fn) {
        var _this = this;
        this.onChange = function (valueString) {
            _this.value = valueString;
            fn(_this._getOptionValue(valueString));
        };
    };
    SelectControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SelectControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /** @internal */
    SelectControlValueAccessor.prototype._registerOption = function () { return (this._idCounter++).toString(); };
    /** @internal */
    SelectControlValueAccessor.prototype._getOptionId = function (value) {
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__facade_collection__["c" /* MapWrapper */].keys(this._optionMap); _i < _a.length; _i++) {
            var id = _a[_i];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["l" /* looseIdentical */])(this._optionMap.get(id), value))
                return id;
        }
        return null;
    };
    /** @internal */
    SelectControlValueAccessor.prototype._getOptionValue = function (valueString) {
        var value = this._optionMap.get(_extractId(valueString));
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(value) ? value : valueString;
    };
    SelectControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]',
                    host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [SELECT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectControlValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ];
    return SelectControlValueAccessor;
}());
/**
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * ### Example
 *
 * ```
 * <select name="city" ngModel>
 *   <option *ngFor="let c of cities" [value]="c"></option>
 * </select>
 * ```
 *
 * @stable
 */
var NgSelectOption = (function () {
    function NgSelectOption(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select))
            this.id = this._select._registerOption();
    }
    Object.defineProperty(NgSelectOption.prototype, "ngValue", {
        set: function (value) {
            if (this._select == null)
                return;
            this._select._optionMap.set(this.id, value);
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectOption.prototype, "value", {
        set: function (value) {
            this._setElementValue(value);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select))
                this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgSelectOption.prototype._setElementValue = function (value) {
        this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
    };
    NgSelectOption.prototype.ngOnDestroy = function () {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select)) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    };
    NgSelectOption.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: 'option' },] },
    ];
    /** @nocollapse */
    NgSelectOption.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: SelectControlValueAccessor, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] },] },
    ];
    NgSelectOption.propDecorators = {
        'ngValue': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngValue',] },],
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['value',] },],
    };
    return NgSelectOption;
}());
//# sourceMappingURL=select_control_value_accessor.js.map

/***/ },

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__ = __webpack_require__(47);
/* unused harmony export SELECT_MULTIPLE_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SelectMultipleControlValueAccessor; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NgSelectMultipleOption; });
/* unused harmony export SELECT_DIRECTIVES */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




var SELECT_MULTIPLE_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_3__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return SelectMultipleControlValueAccessor; }),
    multi: true
};
function _buildValueString(id, value) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["c" /* isBlank */])(id))
        return "" + value;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["g" /* isString */])(value))
        value = "'" + value + "'";
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["j" /* isPrimitive */])(value))
        value = 'Object';
    return __WEBPACK_IMPORTED_MODULE_2__facade_lang__["k" /* StringWrapper */].slice(id + ": " + value, 0, 50);
}
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/** Mock interface for HTMLCollection */
var HTMLCollection = (function () {
    function HTMLCollection() {
    }
    return HTMLCollection;
}());
/**
 * The accessor for writing a value and listening to changes on a select element.
 *
 * @stable
 */
var SelectMultipleControlValueAccessor = (function () {
    function SelectMultipleControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** @internal */
        this._optionMap = new Map();
        /** @internal */
        this._idCounter = 0;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    SelectMultipleControlValueAccessor.prototype.writeValue = function (value) {
        var _this = this;
        this.value = value;
        if (value == null)
            return;
        var values = value;
        // convert values to ids
        var ids = values.map(function (v) { return _this._getOptionId(v); });
        this._optionMap.forEach(function (opt, o) { opt._setSelected(ids.indexOf(o.toString()) > -1); });
    };
    SelectMultipleControlValueAccessor.prototype.registerOnChange = function (fn) {
        var _this = this;
        this.onChange = function (_) {
            var selected = [];
            if (_.hasOwnProperty('selectedOptions')) {
                var options = _.selectedOptions;
                for (var i = 0; i < options.length; i++) {
                    var opt = options.item(i);
                    var val = _this._getOptionValue(opt.value);
                    selected.push(val);
                }
            }
            else {
                var options = _.options;
                for (var i = 0; i < options.length; i++) {
                    var opt = options.item(i);
                    if (opt.selected) {
                        var val = _this._getOptionValue(opt.value);
                        selected.push(val);
                    }
                }
            }
            fn(selected);
        };
    };
    SelectMultipleControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SelectMultipleControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /** @internal */
    SelectMultipleControlValueAccessor.prototype._registerOption = function (value) {
        var id = (this._idCounter++).toString();
        this._optionMap.set(id, value);
        return id;
    };
    /** @internal */
    SelectMultipleControlValueAccessor.prototype._getOptionId = function (value) {
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__facade_collection__["c" /* MapWrapper */].keys(this._optionMap); _i < _a.length; _i++) {
            var id = _a[_i];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["l" /* looseIdentical */])(this._optionMap.get(id)._value, value))
                return id;
        }
        return null;
    };
    /** @internal */
    SelectMultipleControlValueAccessor.prototype._getOptionValue = function (valueString) {
        var opt = this._optionMap.get(_extractId(valueString));
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(opt) ? opt._value : valueString;
    };
    SelectMultipleControlValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
                    host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
                    providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectMultipleControlValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ];
    return SelectMultipleControlValueAccessor;
}());
/**
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * ### Example
 *
 * ```
 * <select multiple name="city" ngModel>
 *   <option *ngFor="let c of cities" [value]="c"></option>
 * </select>
 * ```
 */
var NgSelectMultipleOption = (function () {
    function NgSelectMultipleOption(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select)) {
            this.id = this._select._registerOption(this);
        }
    }
    Object.defineProperty(NgSelectMultipleOption.prototype, "ngValue", {
        set: function (value) {
            if (this._select == null)
                return;
            this._value = value;
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectMultipleOption.prototype, "value", {
        set: function (value) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select)) {
                this._value = value;
                this._setElementValue(_buildValueString(this.id, value));
                this._select.writeValue(this._select.value);
            }
            else {
                this._setElementValue(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgSelectMultipleOption.prototype._setElementValue = function (value) {
        this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
    };
    /** @internal */
    NgSelectMultipleOption.prototype._setSelected = function (selected) {
        this._renderer.setElementProperty(this._element.nativeElement, 'selected', selected);
    };
    NgSelectMultipleOption.prototype.ngOnDestroy = function () {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(this._select)) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    };
    NgSelectMultipleOption.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: 'option' },] },
    ];
    /** @nocollapse */
    NgSelectMultipleOption.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: SelectMultipleControlValueAccessor, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] },] },
    ];
    NgSelectMultipleOption.propDecorators = {
        'ngValue': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngValue',] },],
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['value',] },],
    };
    return NgSelectMultipleOption;
}());
var SELECT_DIRECTIVES = [SelectMultipleControlValueAccessor, NgSelectMultipleOption];
//# sourceMappingURL=select_multiple_control_value_accessor.js.map

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_fromPromise__ = __webpack_require__(1083);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_shared__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__facade_lang__ = __webpack_require__(26);
/* unused harmony export VALID */
/* unused harmony export INVALID */
/* unused harmony export PENDING */
/* unused harmony export DISABLED */
/* unused harmony export isControl */
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return AbstractControl; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return FormControl; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormGroup; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return FormArray; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * Indicates that a FormControl is valid, i.e. that no errors exist in the input value.
 */
var VALID = 'VALID';
/**
 * Indicates that a FormControl is invalid, i.e. that an error exists in the input value.
 */
var INVALID = 'INVALID';
/**
 * Indicates that a FormControl is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
var PENDING = 'PENDING';
/**
 * Indicates that a FormControl is disabled, i.e. that the control is exempt from ancestor
 * calculations of validity or value.
 */
var DISABLED = 'DISABLED';
function isControl(control) {
    return control instanceof AbstractControl;
}
function _find(control, path, delimiter) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["c" /* isBlank */])(path))
        return null;
    if (!(path instanceof Array)) {
        path = path.split(delimiter);
    }
    if (path instanceof Array && __WEBPACK_IMPORTED_MODULE_3__facade_collection__["b" /* ListWrapper */].isEmpty(path))
        return null;
    return path.reduce(function (v, name) {
        if (v instanceof FormGroup) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof FormArray) {
            var index = name;
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
function toObservable(r) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["h" /* isPromise */])(r) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_rxjs_observable_fromPromise__["fromPromise"])(r) : r;
}
function coerceToValidator(validator) {
    return Array.isArray(validator) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__directives_shared__["b" /* composeValidators */])(validator) : validator;
}
function coerceToAsyncValidator(asyncValidator) {
    return Array.isArray(asyncValidator) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__directives_shared__["c" /* composeAsyncValidators */])(asyncValidator) : asyncValidator;
}
/**
 * @stable
 */
var AbstractControl = (function () {
    function AbstractControl(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function () { return this._status === VALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "invalid", {
        get: function () { return this._status === INVALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
        /**
         * Returns the errors of this control.
         */
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pristine", {
        get: function () { return this._pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
        get: function () { return !this.pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "touched", {
        get: function () { return this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "untouched", {
        get: function () { return !this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChanges", {
        get: function () { return this._valueChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "statusChanges", {
        get: function () { return this._statusChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pending", {
        get: function () { return this._status == PENDING; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "disabled", {
        get: function () { return this._status === DISABLED; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "enabled", {
        get: function () { return this._status !== DISABLED; },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.setAsyncValidators = function (newValidator) {
        this.asyncValidator = coerceToAsyncValidator(newValidator);
    };
    AbstractControl.prototype.clearAsyncValidators = function () { this.asyncValidator = null; };
    AbstractControl.prototype.setValidators = function (newValidator) {
        this.validator = coerceToValidator(newValidator);
    };
    AbstractControl.prototype.clearValidators = function () { this.validator = null; };
    AbstractControl.prototype.markAsTouched = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["n" /* normalizeBool */])(onlySelf);
        this._touched = true;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent.markAsTouched({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.markAsDirty = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["n" /* normalizeBool */])(onlySelf);
        this._pristine = false;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.markAsPristine = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._pristine = true;
        this._forEachChild(function (control) { control.markAsPristine({ onlySelf: true }); });
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent._updatePristine({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.markAsUntouched = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._touched = false;
        this._forEachChild(function (control) { control.markAsUntouched({ onlySelf: true }); });
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent._updateTouched({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.markAsPending = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["n" /* normalizeBool */])(onlySelf);
        this._status = PENDING;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent.markAsPending({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.disable = function (_a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
        emitEvent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(emitEvent) ? emitEvent : true;
        this._status = DISABLED;
        this._forEachChild(function (control) { control.disable({ onlySelf: true }); });
        this._updateValue();
        if (emitEvent) {
            this._valueChanges.emit(this._value);
            this._statusChanges.emit(this._status);
        }
        this._updateAncestors(onlySelf);
        this._onDisabledChange(true);
    };
    AbstractControl.prototype.enable = function (_a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
        this._status = VALID;
        this._forEachChild(function (control) { control.enable({ onlySelf: true }); });
        this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
        this._updateAncestors(onlySelf);
        this._onDisabledChange(false);
    };
    AbstractControl.prototype._updateAncestors = function (onlySelf) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity();
            this._parent._updatePristine();
            this._parent._updateTouched();
        }
    };
    AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
    AbstractControl.prototype.updateValueAndValidity = function (_a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
        onlySelf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["n" /* normalizeBool */])(onlySelf);
        emitEvent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        var originalStatus = this._status;
        this._status = this._calculateStatus();
        if (this._status == VALID || this._status == PENDING) {
            this._runAsyncValidator(emitEvent);
        }
        if (this._disabledChanged(originalStatus)) {
            this._updateValue();
        }
        if (emitEvent) {
            this._valueChanges.emit(this._value);
            this._statusChanges.emit(this._status);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    };
    /** @internal */
    AbstractControl.prototype._updateTreeValidity = function (_a) {
        var emitEvent = (_a === void 0 ? { emitEvent: true } : _a).emitEvent;
        this._forEachChild(function (ctrl) { return ctrl._updateTreeValidity({ emitEvent: emitEvent }); });
        this.updateValueAndValidity({ onlySelf: true, emitEvent: emitEvent });
    };
    AbstractControl.prototype._runValidator = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this.validator) ? this.validator(this) : null;
    };
    AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
        var _this = this;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this.asyncValidator)) {
            this._status = PENDING;
            this._cancelExistingSubscription();
            var obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = obs.subscribe({ next: function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); } });
        }
    };
    AbstractControl.prototype._cancelExistingSubscription = function () {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._asyncValidationSubscription)) {
            this._asyncValidationSubscription.unsubscribe();
        }
    };
    AbstractControl.prototype._disabledChanged = function (originalStatus) {
        return this._status !== originalStatus &&
            (this._status === DISABLED || originalStatus === DISABLED);
    };
    /**
     * Sets errors on a form control.
     *
     * This is used when validations are run not automatically, but manually by the user.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ## Usage
     *
     * ```
     * var login = new FormControl("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.updateValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    AbstractControl.prototype.setErrors = function (errors, _a) {
        var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
        emitEvent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._updateControlsErrors(emitEvent);
    };
    AbstractControl.prototype.get = function (path) { return _find(this, path, '.'); };
    AbstractControl.prototype.getError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        var control = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(path) && !__WEBPACK_IMPORTED_MODULE_3__facade_collection__["b" /* ListWrapper */].isEmpty(path) ? this.get(path) : this;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(control) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(control._errors)) {
            return __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].get(control._errors, errorCode);
        }
        else {
            return null;
        }
    };
    AbstractControl.prototype.hasError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this.getError(errorCode, path));
    };
    Object.defineProperty(AbstractControl.prototype, "root", {
        get: function () {
            var x = this;
            while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(x._parent)) {
                x = x._parent;
            }
            return x;
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    AbstractControl.prototype._updateControlsErrors = function (emitEvent) {
        this._status = this._calculateStatus();
        if (emitEvent) {
            this._statusChanges.emit(this._status);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent)) {
            this._parent._updateControlsErrors(emitEvent);
        }
    };
    /** @internal */
    AbstractControl.prototype._initObservables = function () {
        this._valueChanges = new __WEBPACK_IMPORTED_MODULE_2__facade_async__["a" /* EventEmitter */]();
        this._statusChanges = new __WEBPACK_IMPORTED_MODULE_2__facade_async__["a" /* EventEmitter */]();
    };
    AbstractControl.prototype._calculateStatus = function () {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._errors))
            return INVALID;
        if (this._anyControlsHaveStatus(PENDING))
            return PENDING;
        if (this._anyControlsHaveStatus(INVALID))
            return INVALID;
        if (this._allControlsDisabled())
            return DISABLED;
        return VALID;
    };
    /** @internal */
    AbstractControl.prototype._anyControlsHaveStatus = function (status) {
        return this._anyControls(function (control) { return control.status == status; });
    };
    /** @internal */
    AbstractControl.prototype._anyControlsDirty = function () {
        return this._anyControls(function (control) { return control.dirty; });
    };
    /** @internal */
    AbstractControl.prototype._anyControlsTouched = function () {
        return this._anyControls(function (control) { return control.touched; });
    };
    /** @internal */
    AbstractControl.prototype._updatePristine = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._pristine = !this._anyControlsDirty();
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent._updatePristine({ onlySelf: onlySelf });
        }
    };
    /** @internal */
    AbstractControl.prototype._updateTouched = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._touched = this._anyControlsTouched();
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(this._parent) && !onlySelf) {
            this._parent._updateTouched({ onlySelf: onlySelf });
        }
    };
    /** @internal */
    AbstractControl.prototype._onDisabledChange = function (isDisabled) { };
    /** @internal */
    AbstractControl.prototype._isBoxedValue = function (formState) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["o" /* isStringMap */])(formState) && Object.keys(formState).length === 2 && 'value' in formState &&
            'disabled' in formState;
    };
    return AbstractControl;
}());
/**
 * Defines a part of a form that cannot be divided into other controls. `FormControl`s have values
 * and
 * validation state, which is determined by an optional validation function.
 *
 * `FormControl` is one of the three fundamental building blocks used to define forms in Angular,
 * along
 * with {@link FormGroup} and {@link FormArray}.
 *
 * ## Usage
 *
 * By default, a `FormControl` is created for every `<input>` or other form component.
 * With {@link FormControlDirective} or {@link FormGroupDirective} an existing {@link FormControl}
 * can be bound to a DOM element instead. This `FormControl` can be configured with a custom
 * validation function.
 *
 * @stable
 */
var FormControl = (function (_super) {
    __extends(FormControl, _super);
    function FormControl(formState, validator, asyncValidator) {
        if (formState === void 0) { formState = null; }
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, coerceToValidator(validator), coerceToAsyncValidator(asyncValidator));
        /** @internal */
        this._onChange = [];
        this._applyFormState(formState);
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this._initObservables();
    }
    /**
     * Set the value of the form control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `FormControl`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `FormControl` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     *
     * If `emitViewToModelChange` is `true`, an ngModelChange event will be fired to update the
     * model.  This is the default behavior if `emitViewToModelChange` is not specified.
     */
    FormControl.prototype.setValue = function (value, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange, emitViewToModelChange = _b.emitViewToModelChange;
        emitModelToViewChange = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(emitModelToViewChange) ? emitModelToViewChange : true;
        emitViewToModelChange = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__facade_lang__["a" /* isPresent */])(emitViewToModelChange) ? emitViewToModelChange : true;
        this._value = value;
        if (this._onChange.length && emitModelToViewChange) {
            this._onChange.forEach(function (changeFn) { return changeFn(_this._value, emitViewToModelChange); });
        }
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    };
    /**
     * This function is functionally the same as updateValue() at this level.  It exists for
     * symmetry with patchValue() on FormGroups and FormArrays, where it does behave differently.
     */
    FormControl.prototype.patchValue = function (value, options) {
        if (options === void 0) { options = {}; }
        this.setValue(value, options);
    };
    FormControl.prototype.reset = function (formState, _a) {
        if (formState === void 0) { formState = null; }
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._applyFormState(formState);
        this.markAsPristine({ onlySelf: onlySelf });
        this.markAsUntouched({ onlySelf: onlySelf });
        this.setValue(this._value, { onlySelf: onlySelf });
    };
    /**
     * @internal
     */
    FormControl.prototype._updateValue = function () { };
    /**
     * @internal
     */
    FormControl.prototype._anyControls = function (condition) { return false; };
    /**
     * @internal
     */
    FormControl.prototype._allControlsDisabled = function () { return this.disabled; };
    /**
     * Register a listener for change events.
     */
    FormControl.prototype.registerOnChange = function (fn) { this._onChange.push(fn); };
    /**
     * @internal
     */
    FormControl.prototype._clearChangeFns = function () {
        this._onChange = [];
        this._onDisabledChange = null;
    };
    /**
     * Register a listener for disabled events.
     */
    FormControl.prototype.registerOnDisabledChange = function (fn) { this._onDisabledChange = fn; };
    /**
     * @internal
     */
    FormControl.prototype._forEachChild = function (cb) { };
    FormControl.prototype._applyFormState = function (formState) {
        if (this._isBoxedValue(formState)) {
            this._value = formState.value;
            formState.disabled ? this.disable({ onlySelf: true, emitEvent: false }) :
                this.enable({ onlySelf: true, emitEvent: false });
        }
        else {
            this._value = formState;
        }
    };
    return FormControl;
}(AbstractControl));
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `FormGroup` aggregates the values of each {@link FormControl} in the group.
 * The status of a `FormGroup` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire group is invalid.
 * Similarly, if a control changes its value, the entire group changes as well.
 *
 * `FormGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link FormControl} and {@link FormArray}. {@link FormArray} can also contain other
 * controls, but is of variable length.
 *
 *
 * @stable
 */
var FormGroup = (function (_super) {
    __extends(FormGroup, _super);
    function FormGroup(controls, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Register a control with the group's list of controls.
     */
    FormGroup.prototype.registerControl = function (name, control) {
        if (this.controls[name])
            return this.controls[name];
        this.controls[name] = control;
        control.setParent(this);
        return control;
    };
    /**
     * Add a control to this group.
     */
    FormGroup.prototype.addControl = function (name, control) {
        this.registerControl(name, control);
        this.updateValueAndValidity();
    };
    /**
     * Remove a control from this group.
     */
    FormGroup.prototype.removeControl = function (name) {
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].delete(this.controls, name);
        this.updateValueAndValidity();
    };
    /**
     * Check whether there is a control with the given name in the group.
     */
    FormGroup.prototype.contains = function (controlName) {
        var c = __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].contains(this.controls, controlName);
        return c && this.get(controlName).enabled;
    };
    FormGroup.prototype.setValue = function (value, _a) {
        var _this = this;
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._checkAllValuesPresent(value);
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].forEach(value, function (newValue, name) {
            _this._throwIfControlMissing(name);
            _this.controls[name].setValue(newValue, { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    };
    FormGroup.prototype.patchValue = function (value, _a) {
        var _this = this;
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].forEach(value, function (newValue, name) {
            if (_this.controls[name]) {
                _this.controls[name].patchValue(newValue, { onlySelf: true });
            }
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    };
    FormGroup.prototype.reset = function (value, _a) {
        if (value === void 0) { value = {}; }
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._forEachChild(function (control, name) {
            control.reset(value[name], { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
        this._updatePristine({ onlySelf: onlySelf });
        this._updateTouched({ onlySelf: onlySelf });
    };
    FormGroup.prototype.getRawValue = function () {
        return this._reduceChildren({}, function (acc, control, name) {
            acc[name] = control.value;
            return acc;
        });
    };
    /** @internal */
    FormGroup.prototype._throwIfControlMissing = function (name) {
        if (!Object.keys(this.controls).length) {
            throw new Error("\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }
        if (!this.controls[name]) {
            throw new Error("Cannot find form control with name: " + name + ".");
        }
    };
    /** @internal */
    FormGroup.prototype._forEachChild = function (cb) {
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].forEach(this.controls, cb);
    };
    /** @internal */
    FormGroup.prototype._setParentForControls = function () {
        var _this = this;
        this._forEachChild(function (control, name) { control.setParent(_this); });
    };
    /** @internal */
    FormGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
    /** @internal */
    FormGroup.prototype._anyControls = function (condition) {
        var _this = this;
        var res = false;
        this._forEachChild(function (control, name) {
            res = res || (_this.contains(name) && condition(control));
        });
        return res;
    };
    /** @internal */
    FormGroup.prototype._reduceValue = function () {
        var _this = this;
        return this._reduceChildren({}, function (acc, control, name) {
            if (control.enabled || _this.disabled) {
                acc[name] = control.value;
            }
            return acc;
        });
    };
    /** @internal */
    FormGroup.prototype._reduceChildren = function (initValue, fn) {
        var res = initValue;
        this._forEachChild(function (control, name) { res = fn(res, control, name); });
        return res;
    };
    /** @internal */
    FormGroup.prototype._allControlsDisabled = function () {
        for (var _i = 0, _a = Object.keys(this.controls); _i < _a.length; _i++) {
            var controlName = _a[_i];
            if (this.controls[controlName].enabled) {
                return false;
            }
        }
        return !__WEBPACK_IMPORTED_MODULE_3__facade_collection__["a" /* StringMapWrapper */].isEmpty(this.controls);
    };
    /** @internal */
    FormGroup.prototype._checkAllValuesPresent = function (value) {
        this._forEachChild(function (control, name) {
            if (value[name] === undefined) {
                throw new Error("Must supply a value for form control with name: '" + name + "'.");
            }
        });
    };
    return FormGroup;
}(AbstractControl));
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `FormArray` aggregates the values of each {@link FormControl} in the group.
 * The status of a `FormArray` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire array is invalid.
 * Similarly, if a control changes its value, the entire array changes as well.
 *
 * `FormArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link FormControl} and {@link FormGroup}. {@link FormGroup} can also contain
 * other controls, but is of fixed length.
 *
 * ## Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `FormArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `FormArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 *
 * @stable
 */
var FormArray = (function (_super) {
    __extends(FormArray, _super);
    function FormArray(controls, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    FormArray.prototype.at = function (index) { return this.controls[index]; };
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    FormArray.prototype.push = function (control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    FormArray.prototype.insert = function (index, control) {
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["b" /* ListWrapper */].insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Remove the control at the given `index` in the array.
     */
    FormArray.prototype.removeAt = function (index) {
        __WEBPACK_IMPORTED_MODULE_3__facade_collection__["b" /* ListWrapper */].removeAt(this.controls, index);
        this.updateValueAndValidity();
    };
    Object.defineProperty(FormArray.prototype, "length", {
        /**
         * Length of the control array.
         */
        get: function () { return this.controls.length; },
        enumerable: true,
        configurable: true
    });
    FormArray.prototype.setValue = function (value, _a) {
        var _this = this;
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._checkAllValuesPresent(value);
        value.forEach(function (newValue, index) {
            _this._throwIfControlMissing(index);
            _this.at(index).setValue(newValue, { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    };
    FormArray.prototype.patchValue = function (value, _a) {
        var _this = this;
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        value.forEach(function (newValue, index) {
            if (_this.at(index)) {
                _this.at(index).patchValue(newValue, { onlySelf: true });
            }
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
    };
    FormArray.prototype.reset = function (value, _a) {
        if (value === void 0) { value = []; }
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        this._forEachChild(function (control, index) {
            control.reset(value[index], { onlySelf: true });
        });
        this.updateValueAndValidity({ onlySelf: onlySelf });
        this._updatePristine({ onlySelf: onlySelf });
        this._updateTouched({ onlySelf: onlySelf });
    };
    FormArray.prototype.getRawValue = function () { return this.controls.map(function (control) { return control.value; }); };
    /** @internal */
    FormArray.prototype._throwIfControlMissing = function (index) {
        if (!this.controls.length) {
            throw new Error("\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
        }
        if (!this.at(index)) {
            throw new Error("Cannot find form control at index " + index);
        }
    };
    /** @internal */
    FormArray.prototype._forEachChild = function (cb) {
        this.controls.forEach(function (control, index) { cb(control, index); });
    };
    /** @internal */
    FormArray.prototype._updateValue = function () {
        var _this = this;
        this._value = this.controls.filter(function (control) { return control.enabled || _this.disabled; })
            .map(function (control) { return control.value; });
    };
    /** @internal */
    FormArray.prototype._anyControls = function (condition) {
        return this.controls.some(function (control) { return control.enabled && condition(control); });
    };
    /** @internal */
    FormArray.prototype._setParentForControls = function () {
        var _this = this;
        this._forEachChild(function (control) { control.setParent(_this); });
    };
    /** @internal */
    FormArray.prototype._checkAllValuesPresent = function (value) {
        this._forEachChild(function (control, i) {
            if (value[i] === undefined) {
                throw new Error("Must supply a value for form control at index: " + i + ".");
            }
        });
    };
    /** @internal */
    FormArray.prototype._allControlsDisabled = function () {
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            if (control.enabled)
                return false;
        }
        return !!this.controls.length;
    };
    return FormArray;
}(AbstractControl));
//# sourceMappingURL=model.js.map

/***/ },

/***/ 17:
/***/ function(module, exports) {

"use strict";
"use strict";
var BaseChart = (function () {
    function BaseChart() {
    }
    BaseChart.prototype.update = function () {
        this.results = this.cloneData(this.results);
    };
    BaseChart.prototype.cloneData = function (data) {
        var results = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var copy = {
                name: item['name']
            };
            if (item['value']) {
                copy['value'] = item['value'];
            }
            ;
            if (item['series']) {
                copy['series'] = [];
                for (var _a = 0, _b = item['series']; _a < _b.length; _a++) {
                    var seriesItem = _b[_a];
                    var seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            results.push(copy);
        }
        return results;
    };
    return BaseChart;
}());
exports.BaseChart = BaseChart;


/***/ },

/***/ 18:
/***/ function(module, exports) {

"use strict";
"use strict";
function calculateViewDimensions(view, margins, showXLabel, showYLabel, showLegend, columns) {
    if (columns === void 0) { columns = 12; }
    var width = view[0];
    var height = view[1];
    var xOffset = margins[3];
    if (showLegend) {
        width = width * columns / 12;
    }
    width = width - margins[1] - margins[3];
    height = height - margins[0] - margins[2];
    if (showXLabel) {
        height -= 40;
    }
    if (showYLabel) {
        width -= 60;
        xOffset += 60;
    }
    width = Math.max(0, width);
    height = Math.max(0, height);
    return { width: width, height: height, xOffset: xOffset };
}
exports.calculateViewDimensions = calculateViewDimensions;


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var d3_1 = __webpack_require__(7);
exports.colorSets = [
    {
        'name': 'flame',
        'base': '#590012',
        'group': 'general',
        'domain': ['#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738']
    },
    {
        'name': 'ocean',
        'base': '#0340B9',
        'group': 'general',
        'domain': ['#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1']
    },
    {
        'name': 'forest',
        'base': '#258203',
        'group': 'general',
        'domain': ['#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32']
    },
    {
        'name': 'horizon',
        'base': '#026CCB',
        'group': 'general',
        'domain': ['#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0']
    },
    {
        'name': 'neons',
        'base': '#B20000',
        'group': 'general',
        'domain': ['#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600']
    },
    {
        'name': 'picnic',
        'base': '#A37C00',
        'group': 'general',
        'domain': ['#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8']
    },
    {
        'name': 'night',
        'base': '#48025F',
        'group': 'general',
        'domain': ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
    },
    {
        'name': 'nightLights',
        'base': '#4e31a5',
        'group': 'general',
        'domain': ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
    },
    {
        'name': 'yellowGreen',
        'group': 'gradient',
        'domain': ["#f7fcb9", "#addd8e", "#31a354"]
    },
    {
        'name': 'purpleRed',
        'group': 'gradient',
        'domain': ["#e7e1ef", "#c994c7", "#dd1c77"]
    },
    {
        'name': 'yellowGreenBlue',
        'group': 'gradient',
        'domain': ["#edf8b1", "#7fcdbb", "#2c7fb8"]
    },
];
function generateColorScale(scheme, type, domain) {
    if (typeof (scheme) === 'string') {
        scheme = exports.colorSets.find(function (cs) {
            return cs.name === scheme;
        });
    }
    var colorScale;
    if (type === 'quantile') {
        colorScale = d3_1.default.scaleQuantile()
            .range(scheme.domain)
            .domain(domain);
    }
    else if (type === 'ordinal') {
        colorScale = d3_1.default.scaleOrdinal()
            .range(scheme.domain)
            .domain(domain);
    }
    else if (type === 'linear') {
        colorScale = d3_1.default.scaleLinear()
            .domain(d3_1.default.range(0, 1, 1.0 / (scheme.domain.length - 1)))
            .range(scheme.domain);
    }
    return colorScale;
}
exports.generateColorScale = generateColorScale;
function colorHelper(scheme, type, domain, customColors) {
    var colorScale = generateColorScale(scheme, type, domain);
    var colorScaleFunction = function (value) {
        if (type === 'linear') {
            var valueScale = d3_1.default.scaleLinear()
                .domain(domain)
                .range([0, 1]);
            return (colorScale(valueScale(value)));
        }
        else {
            var formattedValue_1 = value.toString();
            var found = undefined;
            if (customColors && customColors.length > 0) {
                found = customColors.find(function (mapping) {
                    return mapping.name === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return colorScale(value);
            }
        }
    };
    return colorScaleFunction;
}
exports.colorHelper = colorHelper;


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_lang__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AbstractControlDirective; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Base class for control directives.
 *
 * Only used internally in the forms module.
 *
 * @stable
 */
var AbstractControlDirective = (function () {
    function AbstractControlDirective() {
    }
    Object.defineProperty(AbstractControlDirective.prototype, "control", {
        get: function () { throw new Error('unimplemented'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "value", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.value : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valid", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.valid : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "invalid", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.invalid : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pending", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.pending : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "errors", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.errors : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.pristine : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.dirty : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "touched", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.touched : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.untouched : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "disabled", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.disabled : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "enabled", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.enabled : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "statusChanges", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.statusChanges : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valueChanges", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control) ? this.control.valueChanges : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "path", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    AbstractControlDirective.prototype.reset = function (value) {
        if (value === void 0) { value = undefined; }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__facade_lang__["a" /* isPresent */])(this.control))
            this.control.reset(value);
    };
    return AbstractControlDirective;
}());
//# sourceMappingURL=abstract_control_directive.js.map

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_control__ = __webpack_require__(77);
/* unused harmony export AbstractControlStatus */
/* unused harmony export ngControlStatusHost */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgControlStatus; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NgControlStatusGroup; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




var AbstractControlStatus = (function () {
    function AbstractControlStatus(cd) {
        this._cd = cd;
    }
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.untouched : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.touched : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.pristine : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.dirty : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.valid : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this._cd.control) ? this._cd.control.invalid : false;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractControlStatus;
}());
var ngControlStatusHost = {
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid'
};
/**
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status (valid/invalid/dirty/etc).
 *
 * @stable
 */
var NgControlStatus = (function (_super) {
    __extends(NgControlStatus, _super);
    function NgControlStatus(cd) {
        _super.call(this, cd);
    }
    NgControlStatus.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
    ];
    /** @nocollapse */
    NgControlStatus.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_3__ng_control__["a" /* NgControl */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] },] },
    ];
    return NgControlStatus;
}(AbstractControlStatus));
/**
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc).
 *
 * @stable
 */
var NgControlStatusGroup = (function (_super) {
    __extends(NgControlStatusGroup, _super);
    function NgControlStatusGroup(cd) {
        _super.call(this, cd);
    }
    NgControlStatusGroup.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
                    host: ngControlStatusHost
                },] },
    ];
    /** @nocollapse */
    NgControlStatusGroup.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] },] },
    ];
    return NgControlStatusGroup;
}(AbstractControlStatus));
//# sourceMappingURL=ng_control_status.js.map

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__abstract_form_group_directive__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__control_value_accessor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ng_control__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ng_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ng_model_group__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__template_driven_errors__ = __webpack_require__(453);
/* unused harmony export formControlBinding */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgModel; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};












var formControlBinding = {
    provide: __WEBPACK_IMPORTED_MODULE_7__ng_control__["a" /* NgControl */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NgModel; })
};
var resolvedPromise = Promise.resolve(null);
/**
 * Binds a domain model to a form control.
 *
 * ### Usage
 *
 * `ngModel` binds an existing domain model to a form control. For a
 * two-way binding, use `[(ngModel)]` to ensure the model updates in
 * both directions.
 *
 *  ```typescript
 * @Component({
 *      selector: "search-comp",
 *      directives: [],
 *      template: `<input type='text' [(ngModel)]="searchQuery">`
 *      })
 * class SearchComp {
 *  searchQuery: string;
 * }
 *  ```
 *
 *  @stable
 */
var NgModel = (function (_super) {
    __extends(NgModel, _super);
    function NgModel(parent, validators, asyncValidators, valueAccessors) {
        _super.call(this);
        /** @internal */
        this._control = new __WEBPACK_IMPORTED_MODULE_2__model__["b" /* FormControl */]();
        /** @internal */
        this._registered = false;
        this.update = new __WEBPACK_IMPORTED_MODULE_1__facade_async__["a" /* EventEmitter */]();
        this._parent = parent;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["f" /* selectValueAccessor */])(this, valueAccessors);
    }
    NgModel.prototype.ngOnChanges = function (changes) {
        this._checkForErrors();
        if (!this._registered)
            this._setUpControl();
        if ('isDisabled' in changes) {
            this._updateDisabled(changes);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["g" /* isPropertyUpdated */])(changes, this.viewModel)) {
            this._updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
    Object.defineProperty(NgModel.prototype, "control", {
        get: function () { return this._control; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "path", {
        get: function () {
            return this._parent ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* controlPath */])(this.name, this._parent) : [this.name];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "formDirective", {
        get: function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["b" /* composeValidators */])(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "asyncValidator", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["c" /* composeAsyncValidators */])(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    NgModel.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    NgModel.prototype._setUpControl = function () {
        this._isStandalone() ? this._setUpStandalone() :
            this.formDirective.addControl(this);
        this._registered = true;
    };
    NgModel.prototype._isStandalone = function () {
        return !this._parent || (this.options && this.options.standalone);
    };
    NgModel.prototype._setUpStandalone = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__shared__["d" /* setUpControl */])(this._control, this);
        this._control.updateValueAndValidity({ emitEvent: false });
    };
    NgModel.prototype._checkForErrors = function () {
        if (!this._isStandalone()) {
            this._checkParentType();
        }
        this._checkName();
    };
    NgModel.prototype._checkParentType = function () {
        if (!(this._parent instanceof __WEBPACK_IMPORTED_MODULE_9__ng_model_group__["a" /* NgModelGroup */]) &&
            this._parent instanceof __WEBPACK_IMPORTED_MODULE_4__abstract_form_group_directive__["a" /* AbstractFormGroupDirective */]) {
            __WEBPACK_IMPORTED_MODULE_11__template_driven_errors__["a" /* TemplateDrivenErrors */].formGroupNameException();
        }
        else if (!(this._parent instanceof __WEBPACK_IMPORTED_MODULE_9__ng_model_group__["a" /* NgModelGroup */]) && !(this._parent instanceof __WEBPACK_IMPORTED_MODULE_8__ng_form__["a" /* NgForm */])) {
            __WEBPACK_IMPORTED_MODULE_11__template_driven_errors__["a" /* TemplateDrivenErrors */].modelParentException();
        }
    };
    NgModel.prototype._checkName = function () {
        if (this.options && this.options.name)
            this.name = this.options.name;
        if (!this._isStandalone() && !this.name) {
            __WEBPACK_IMPORTED_MODULE_11__template_driven_errors__["a" /* TemplateDrivenErrors */].missingNameException();
        }
    };
    NgModel.prototype._updateValue = function (value) {
        var _this = this;
        resolvedPromise.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
    };
    NgModel.prototype._updateDisabled = function (changes) {
        var _this = this;
        var disabledValue = changes['isDisabled'].currentValue;
        var isDisabled = disabledValue != null && disabledValue != false;
        resolvedPromise.then(function () {
            if (isDisabled && !_this.control.disabled) {
                _this.control.disable();
            }
            else if (!isDisabled && _this.control.disabled) {
                _this.control.enable();
            }
        });
    };
    NgModel.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[ngModel]:not([formControlName]):not([formControl])',
                    providers: [formControlBinding],
                    exportAs: 'ngModel'
                },] },
    ];
    /** @nocollapse */
    NgModel.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_5__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_3__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_3__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_6__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],] },] },
    ];
    NgModel.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['disabled',] },],
        'model': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngModel',] },],
        'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngModelOptions',] },],
        'update': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['ngModelChange',] },],
    };
    return NgModel;
}(__WEBPACK_IMPORTED_MODULE_7__ng_control__["a" /* NgControl */]));
//# sourceMappingURL=ng_model.js.map

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_value_accessor__ = __webpack_require__(47);
/* unused harmony export NUMBER_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NumberValueAccessor; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var NUMBER_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NumberValueAccessor; }),
    multi: true
};
/**
 * The accessor for writing a number value and listening to changes that is used by the
 * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="number" [(ngModel)]="age">
 *  ```
 */
var NumberValueAccessor = (function () {
    function NumberValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    NumberValueAccessor.prototype.writeValue = function (value) {
        // The value needs to be normalized for IE9, otherwise it is set to 'null' when null
        var normalizedValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(value) ? '' : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    NumberValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChange = function (value) { fn(value == '' ? null : __WEBPACK_IMPORTED_MODULE_1__facade_lang__["i" /* NumberWrapper */].parseFloat(value)); };
    };
    NumberValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NumberValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    NumberValueAccessor.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: 'input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]',
                    host: {
                        '(change)': 'onChange($event.target.value)',
                        '(input)': 'onChange($event.target.value)',
                        '(blur)': 'onTouched()'
                    },
                    providers: [NUMBER_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NumberValueAccessor.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ];
    return NumberValueAccessor;
}());
//# sourceMappingURL=number_value_accessor.js.map

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__control_value_accessor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_control__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reactive_errors__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__(70);
/* unused harmony export formControlBinding */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormControlDirective; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};








var formControlBinding = {
    provide: __WEBPACK_IMPORTED_MODULE_5__ng_control__["a" /* NgControl */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FormControlDirective; })
};
/**
 * Binds an existing {@link FormControl} to a DOM element. It requires importing the {@link
 * ReactiveFormsModule}.
 *
 * In this example, we bind the control to an input element. When the value of the input element
 * changes, the value of the control will reflect that change. Likewise, if the value of the
 * control changes, the input element reflects that change.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Bind existing control example</h2>
 *       <form>
 *         <p>Element with existing control: <input type="text"
 * [formControl]="loginControl"></p>
 *         <p>Value of existing control: {{loginControl.value}}</p>
 *       </form>
 *     </div>
 *   `,
 * })
 * export class App {
 *   loginControl: FormControl = new FormControl('');
 * }
 *  ```
 *
 * ### ngModel
 *
 * We can also set the value of the form programmatically with setValue().
 **
 *  ```typescript
 * @Component({
 *      selector: "login-comp",

 *      template: "<input type='text' [formControl]='loginControl'>"
 *      })
 * class LoginComp {
 *  loginControl: FormControl = new FormControl('');
 *
 *  populate() {
 *    this.loginControl.setValue('some login');
 *  }
 *
 * }
 *  ```
 *
 *  @stable
 */
var FormControlDirective = (function (_super) {
    __extends(FormControlDirective, _super);
    function FormControlDirective(validators, asyncValidators, valueAccessors) {
        _super.call(this);
        this.update = new __WEBPACK_IMPORTED_MODULE_1__facade_async__["a" /* EventEmitter */]();
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["f" /* selectValueAccessor */])(this, valueAccessors);
    }
    Object.defineProperty(FormControlDirective.prototype, "isDisabled", {
        set: function (isDisabled) { __WEBPACK_IMPORTED_MODULE_6__reactive_errors__["a" /* ReactiveErrors */].disabledAttrWarning(); },
        enumerable: true,
        configurable: true
    });
    FormControlDirective.prototype.ngOnChanges = function (changes) {
        if (this._isControlChanged(changes)) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["d" /* setUpControl */])(this.form, this);
            if (this.control.disabled)
                this.valueAccessor.setDisabledState(true);
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["g" /* isPropertyUpdated */])(changes, this.viewModel)) {
            this.form.setValue(this.model);
            this.viewModel = this.model;
        }
    };
    Object.defineProperty(FormControlDirective.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "validator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["b" /* composeValidators */])(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared__["c" /* composeAsyncValidators */])(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    FormControlDirective.prototype._isControlChanged = function (changes) {
        return __WEBPACK_IMPORTED_MODULE_2__facade_collection__["a" /* StringMapWrapper */].contains(changes, 'form');
    };
    FormControlDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[formControl]', providers: [formControlBinding], exportAs: 'ngForm' },] },
    ];
    /** @nocollapse */
    FormControlDirective.ctorParameters = [
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_3__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_3__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_4__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],] },] },
    ];
    FormControlDirective.propDecorators = {
        'form': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['formControl',] },],
        'model': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngModel',] },],
        'update': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['ngModelChange',] },],
        'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['disabled',] },],
    };
    return FormControlDirective;
}(__WEBPACK_IMPORTED_MODULE_5__ng_control__["a" /* NgControl */]));
//# sourceMappingURL=form_control_directive.js.map

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_async__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abstract_form_group_directive__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__control_value_accessor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_control__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reactive_errors__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__form_group_directive__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__form_group_name__ = __webpack_require__(111);
/* unused harmony export controlNameBinding */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormControlName; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};











var controlNameBinding = {
    provide: __WEBPACK_IMPORTED_MODULE_6__ng_control__["a" /* NgControl */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FormControlName; })
};
/**
 * Syncs an existing form control with the specified name to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.  It also requires
 * importing the {@link ReactiveFormsModule}.

 * ### Example
 *
 * In this example, we create the login and password controls.
 * We can work with each control separately: check its validity, get its value, listen to its
 * changes.
 *
 *  ```
 * @Component({
 *      selector: "login-comp",
 *      template: `
 *        <form [formGroup]="myForm" (submit)="onLogIn()">
 *          Login <input type="text" formControlName="login">
 *          <div *ngIf="!loginCtrl.valid">Login is invalid</div>
 *          Password <input type="password" formControlName="password">
 *          <button type="submit">Log in!</button>
 *        </form>
 *      `})
 * class LoginComp {
 *  loginCtrl = new FormControl();
 *  passwordCtrl = new FormControl();
 *  myForm = new FormGroup({
 *     login: loginCtrl,
 *     password: passwordCtrl
 *  });
 *  onLogIn(): void {
 *    // value === {login: 'some login', password: 'some password'}
 *  }
 * }
 *  ```
 *
 * We can also set the value of the form programmatically using setValue().
 *
 *  ```
 * @Component({
 *      selector: "login-comp",
 *      template: `
 *        <form [formGroup]="myForm" (submit)='onLogIn()'>
 *          Login <input type='text' formControlName='login'>
 *          Password <input type='password' formControlName='password'>
 *          <button type='submit'>Log in!</button>
 *        </form>
 *      `})
 * class LoginComp {
 *  myForm = new FormGroup({
 *    login: new FormControl(),
 *    password: new FormControl()
 *  });
 *
 *  populate() {
 *     this.myForm.setValue({login: 'some login', password: 'some password'});
 *  }
 *
 *  onLogIn(): void {
 *    // this.credentials.login === "some login"
 *    // this.credentials.password === "some password"
 *  }
 * }
 *  ```
 *
 *  @stable
 */
var FormControlName = (function (_super) {
    __extends(FormControlName, _super);
    function FormControlName(parent, validators, asyncValidators, valueAccessors) {
        _super.call(this);
        this._added = false;
        this.update = new __WEBPACK_IMPORTED_MODULE_1__facade_async__["a" /* EventEmitter */]();
        this._parent = parent;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__shared__["f" /* selectValueAccessor */])(this, valueAccessors);
    }
    Object.defineProperty(FormControlName.prototype, "isDisabled", {
        set: function (isDisabled) { __WEBPACK_IMPORTED_MODULE_7__reactive_errors__["a" /* ReactiveErrors */].disabledAttrWarning(); },
        enumerable: true,
        configurable: true
    });
    FormControlName.prototype.ngOnChanges = function (changes) {
        if (!this._added) {
            this._checkParentType();
            this.formDirective.addControl(this);
            if (this.control.disabled)
                this.valueAccessor.setDisabledState(true);
            this._added = true;
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__shared__["g" /* isPropertyUpdated */])(changes, this.viewModel)) {
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    };
    FormControlName.prototype.ngOnDestroy = function () {
        if (this.formDirective) {
            this.formDirective.removeControl(this);
        }
    };
    FormControlName.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    Object.defineProperty(FormControlName.prototype, "path", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__shared__["a" /* controlPath */])(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "formDirective", {
        get: function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "validator", {
        get: function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__shared__["b" /* composeValidators */])(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "asyncValidator", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__shared__["c" /* composeAsyncValidators */])(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "control", {
        get: function () { return this.formDirective.getControl(this); },
        enumerable: true,
        configurable: true
    });
    FormControlName.prototype._checkParentType = function () {
        if (!(this._parent instanceof __WEBPACK_IMPORTED_MODULE_10__form_group_name__["a" /* FormGroupName */]) &&
            this._parent instanceof __WEBPACK_IMPORTED_MODULE_3__abstract_form_group_directive__["a" /* AbstractFormGroupDirective */]) {
            __WEBPACK_IMPORTED_MODULE_7__reactive_errors__["a" /* ReactiveErrors */].ngModelGroupException();
        }
        else if (!(this._parent instanceof __WEBPACK_IMPORTED_MODULE_10__form_group_name__["a" /* FormGroupName */]) && !(this._parent instanceof __WEBPACK_IMPORTED_MODULE_9__form_group_directive__["a" /* FormGroupDirective */]) &&
            !(this._parent instanceof __WEBPACK_IMPORTED_MODULE_10__form_group_name__["b" /* FormArrayName */])) {
            __WEBPACK_IMPORTED_MODULE_7__reactive_errors__["a" /* ReactiveErrors */].controlParentException();
        }
    };
    FormControlName.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
    ];
    /** @nocollapse */
    FormControlName.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_4__control_container__["a" /* ControlContainer */], decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["SkipSelf"] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_2__validators__["b" /* NG_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_2__validators__["c" /* NG_ASYNC_VALIDATORS */],] },] },
        { type: Array, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Self"] }, { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [__WEBPACK_IMPORTED_MODULE_5__control_value_accessor__["a" /* NG_VALUE_ACCESSOR */],] },] },
    ];
    FormControlName.propDecorators = {
        'name': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['formControlName',] },],
        'model': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['ngModel',] },],
        'update': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['ngModelChange',] },],
        'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['disabled',] },],
    };
    return FormControlName;
}(__WEBPACK_IMPORTED_MODULE_6__ng_control__["a" /* NgControl */]));
//# sourceMappingURL=form_control_name.js.map

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validators__ = __webpack_require__(49);
/* unused harmony export REQUIRED_VALIDATOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RequiredValidator; });
/* unused harmony export MIN_LENGTH_VALIDATOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return MinLengthValidator; });
/* unused harmony export MAX_LENGTH_VALIDATOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return MaxLengthValidator; });
/* unused harmony export PATTERN_VALIDATOR */
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return PatternValidator; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var REQUIRED_VALIDATOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__validators__["b" /* NG_VALIDATORS */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return RequiredValidator; }),
    multi: true
};
/**
 * A Directive that adds the `required` validator to any controls marked with the
 * `required` attribute, via the {@link NG_VALIDATORS} binding.
 *
 * ### Example
 *
 * ```
 * <input name="fullName" ngModel required>
 * ```
 *
 * @stable
 */
var RequiredValidator = (function () {
    function RequiredValidator() {
    }
    Object.defineProperty(RequiredValidator.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) {
            this._required = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(value) && "" + value !== 'false';
            if (this._onChange)
                this._onChange();
        },
        enumerable: true,
        configurable: true
    });
    RequiredValidator.prototype.validate = function (c) {
        return this.required ? __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].required(c) : null;
    };
    RequiredValidator.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    RequiredValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[required][formControlName],[required][formControl],[required][ngModel]',
                    providers: [REQUIRED_VALIDATOR],
                    host: { '[attr.required]': 'required? "" : null' }
                },] },
    ];
    /** @nocollapse */
    RequiredValidator.ctorParameters = [];
    RequiredValidator.propDecorators = {
        'required': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return RequiredValidator;
}());
/**
 * Provider which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='min'}
 */
var MIN_LENGTH_VALIDATOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__validators__["b" /* NG_VALIDATORS */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MinLengthValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MinLengthValidator} for any `formControlName`,
 * `formControl`, or control with `ngModel` that also has a `minlength` attribute.
 *
 * @stable
 */
var MinLengthValidator = (function () {
    function MinLengthValidator() {
    }
    MinLengthValidator.prototype._createValidator = function () {
        this._validator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].minLength(parseInt(this.minlength, 10));
    };
    MinLengthValidator.prototype.ngOnChanges = function (changes) {
        if (changes['minlength']) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    MinLengthValidator.prototype.validate = function (c) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this.minlength) ? this._validator(c) : null;
    };
    MinLengthValidator.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    MinLengthValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[minlength][formControlName],[minlength][formControl],[minlength][ngModel]',
                    providers: [MIN_LENGTH_VALIDATOR],
                    host: { '[attr.minlength]': 'minlength? minlength : null' }
                },] },
    ];
    /** @nocollapse */
    MinLengthValidator.ctorParameters = [];
    MinLengthValidator.propDecorators = {
        'minlength': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return MinLengthValidator;
}());
/**
 * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='max'}
 */
var MAX_LENGTH_VALIDATOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__validators__["b" /* NG_VALIDATORS */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MaxLengthValidator; }),
    multi: true
};
/**
 * A directive which installs the {@link MaxLengthValidator} for any `formControlName,
 * `formControl`,
 * or control with `ngModel` that also has a `maxlength` attribute.
 *
 * @stable
 */
var MaxLengthValidator = (function () {
    function MaxLengthValidator() {
    }
    MaxLengthValidator.prototype._createValidator = function () {
        this._validator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].maxLength(parseInt(this.maxlength, 10));
    };
    MaxLengthValidator.prototype.ngOnChanges = function (changes) {
        if (changes['maxlength']) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    MaxLengthValidator.prototype.validate = function (c) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this.maxlength) ? this._validator(c) : null;
    };
    MaxLengthValidator.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    MaxLengthValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]',
                    providers: [MAX_LENGTH_VALIDATOR],
                    host: { '[attr.maxlength]': 'maxlength? maxlength : null' }
                },] },
    ];
    /** @nocollapse */
    MaxLengthValidator.ctorParameters = [];
    MaxLengthValidator.propDecorators = {
        'maxlength': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return MaxLengthValidator;
}());
var PATTERN_VALIDATOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__validators__["b" /* NG_VALIDATORS */],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return PatternValidator; }),
    multi: true
};
/**
 * A Directive that adds the `pattern` validator to any controls marked with the
 * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
 * as the regex to validate Control value against.  Follows pattern attribute
 * semantics; i.e. regex must match entire Control value.
 *
 * ### Example
 *
 * ```
 * <input [name]="fullName" pattern="[a-zA-Z ]*" ngModel>
 * ```
 * @stable
 */
var PatternValidator = (function () {
    function PatternValidator() {
    }
    PatternValidator.prototype._createValidator = function () { this._validator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].pattern(this.pattern); };
    PatternValidator.prototype.ngOnChanges = function (changes) {
        if (changes['pattern']) {
            this._createValidator();
            if (this._onChange)
                this._onChange();
        }
    };
    PatternValidator.prototype.validate = function (c) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(this.pattern) ? this._validator(c) : null;
    };
    PatternValidator.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    PatternValidator.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[pattern][formControlName],[pattern][formControl],[pattern][ngModel]',
                    providers: [PATTERN_VALIDATOR],
                    host: { '[attr.pattern]': 'pattern? pattern : null' }
                },] },
    ];
    /** @nocollapse */
    PatternValidator.ctorParameters = [];
    PatternValidator.propDecorators = {
        'pattern': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return PatternValidator;
}());
//# sourceMappingURL=validators.js.map

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export scheduleMicroTask */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return _global; });
/* unused harmony export getTypeNameForDebugging */
/* unused harmony export Math */
/* unused harmony export Date */
/* harmony export (immutable) */ exports["a"] = isPresent;
/* harmony export (immutable) */ exports["c"] = isBlank;
/* unused harmony export isBoolean */
/* unused harmony export isNumber */
/* harmony export (immutable) */ exports["g"] = isString;
/* unused harmony export isFunction */
/* unused harmony export isType */
/* harmony export (immutable) */ exports["o"] = isStringMap;
/* unused harmony export isStrictStringMap */
/* harmony export (immutable) */ exports["h"] = isPromise;
/* harmony export (immutable) */ exports["d"] = isArray;
/* unused harmony export isDate */
/* unused harmony export noop */
/* unused harmony export stringify */
/* unused harmony export serializeEnum */
/* unused harmony export deserializeEnum */
/* unused harmony export resolveEnumToken */
/* harmony export (binding) */ __webpack_require__.d(exports, "k", function() { return StringWrapper; });
/* unused harmony export StringJoiner */
/* harmony export (binding) */ __webpack_require__.d(exports, "i", function() { return NumberWrapper; });
/* unused harmony export RegExp */
/* unused harmony export FunctionWrapper */
/* harmony export (immutable) */ exports["l"] = looseIdentical;
/* unused harmony export getMapKey */
/* unused harmony export normalizeBlank */
/* harmony export (immutable) */ exports["n"] = normalizeBool;
/* harmony export (immutable) */ exports["e"] = isJsObject;
/* unused harmony export print */
/* unused harmony export warn */
/* unused harmony export Json */
/* unused harmony export DateWrapper */
/* unused harmony export setValueOnPath */
/* harmony export (immutable) */ exports["f"] = getSymbolIterator;
/* unused harmony export evalExpression */
/* harmony export (immutable) */ exports["j"] = isPrimitive;
/* harmony export (immutable) */ exports["m"] = hasConstructor;
/* unused harmony export escape */
/* unused harmony export escapeRegExp */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = self;
    }
    else {
        globalScope = global;
    }
}
else {
    globalScope = window;
}
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;

function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
var Math = _global.Math;
var Date = _global.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
function isBlank(obj) {
    return obj === undefined || obj === null;
}
function isBoolean(obj) {
    return typeof obj === 'boolean';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isString(obj) {
    return typeof obj === 'string';
}
function isFunction(obj) {
    return typeof obj === 'function';
}
function isType(obj) {
    return isFunction(obj);
}
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
var STRING_MAP_PROTO = Object.getPrototypeOf({});
function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return isPresent(obj) && isFunction(obj.then);
}
function isArray(obj) {
    return Array.isArray(obj);
}
function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
}
function noop() { }
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized
function serializeEnum(val) {
    return val;
}
function deserializeEnum(val, values) {
    return val;
}
function resolveEnumToken(enumValue, val) {
    return enumValue[val];
}
var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());
var StringJoiner = (function () {
    function StringJoiner(parts) {
        if (parts === void 0) { parts = []; }
        this.parts = parts;
    }
    StringJoiner.prototype.add = function (part) { this.parts.push(part); };
    StringJoiner.prototype.toString = function () { return this.parts.join(''); };
    return StringJoiner;
}());
var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
    NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());
var RegExp = _global.RegExp;
var FunctionWrapper = (function () {
    function FunctionWrapper() {
    }
    FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
    FunctionWrapper.bind = function (fn, scope) { return fn.bind(scope); };
    return FunctionWrapper;
}());
// JS has NaN !== NaN
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
function getMapKey(value) {
    return value;
}
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
function print(obj) {
    console.log(obj);
}
function warn(obj) {
    console.warn(obj);
}
// Can't be all uppercase as our transpiler would think it is a special directive...
var Json = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global.JSON.stringify(data, null, 2);
    };
    return Json;
}());
var DateWrapper = (function () {
    function DateWrapper() {
    }
    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function (str) { return new Date(str); };
    DateWrapper.fromMillis = function (ms) { return new Date(ms); };
    DateWrapper.toMillis = function (date) { return date.getTime(); };
    DateWrapper.now = function () { return new Date(); };
    DateWrapper.toJson = function (date) { return date.toJSON(); };
    return DateWrapper;
}());
function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
var _symbolIterator = null;
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
function evalExpression(sourceUrl, expr, declarations, vars) {
    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
    var fnArgNames = [];
    var fnArgValues = [];
    for (var argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
    }
    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
}
function isPrimitive(obj) {
    return !isJsObject(obj);
}
function hasConstructor(value, type) {
    return value.constructor === type;
}
function escape(s) {
    return _global.encodeURI(s);
}
function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
//# sourceMappingURL=lang.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)))

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormErrorExamples; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var FormErrorExamples = {
    formControlName: "\n    <div [formGroup]=\"myGroup\">\n      <input formControlName=\"firstName\">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });",
    formGroupName: "\n    <div [formGroup]=\"myGroup\">\n       <div formGroupName=\"person\">\n          <input formControlName=\"firstName\">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });",
    formArrayName: "\n    <div [formGroup]=\"myGroup\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cityArray.controls; let i=index\">\n          <input [formControlName]=\"i\">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl('SF')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });",
    ngModelGroup: "\n    <form>\n       <div ngModelGroup=\"person\">\n          <input [(ngModel)]=\"person.name\" name=\"firstName\">\n       </div>\n    </form>",
    ngModelWithFormGroup: "\n    <div [formGroup]=\"myGroup\">\n       <input formControlName=\"firstName\">\n       <input [(ngModel)]=\"showMoreControls\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  "
};
//# sourceMappingURL=error_examples.js.map

/***/ },

/***/ 453:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_examples__ = __webpack_require__(452);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TemplateDrivenErrors; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var TemplateDrivenErrors = (function () {
    function TemplateDrivenErrors() {
    }
    TemplateDrivenErrors.modelParentException = function () {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup's partner directive \"formControlName\" instead.  Example:\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formControlName + "\n\n      Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:\n\n      Example:\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].ngModelWithFormGroup);
    };
    TemplateDrivenErrors.formGroupNameException = function () {
        throw new Error("\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formGroupName + "\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].ngModelGroup);
    };
    TemplateDrivenErrors.missingNameException = function () {
        throw new Error("If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as 'standalone' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]=\"person.firstName\" name=\"first\">\n      Example 2: <input [(ngModel)]=\"person.firstName\" [ngModelOptions]=\"{standalone: true}\">");
    };
    TemplateDrivenErrors.modelGroupParentException = function () {
        throw new Error("\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].formGroupName + "\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      " + __WEBPACK_IMPORTED_MODULE_0__error_examples__["a" /* FormErrorExamples */].ngModelGroup);
    };
    return TemplateDrivenErrors;
}());
//# sourceMappingURL=template_driven_errors.js.map

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormBuilder; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * Creates a form object from a user-specified configuration.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <form [formGroup]="loginForm">
 *       <p>Login <input formControlName="login"></p>
 *       <div formGroupName="passwordRetry">
 *         <p>Password <input type="password" formControlName="password"></p>
 *         <p>Confirm password <input type="password" formControlName="passwordConfirmation"></p>
 *       </div>
 *     </form>
 *     <h3>Form value:</h3>
 *     <pre>{{value}}</pre>
 *   `,
 *   directives: [REACTIVE_FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginForm: FormGroup;
 *
 *   constructor(builder: FormBuilder) {
 *     this.loginForm = builder.group({
 *       login: ["", Validators.required],
 *       passwordRetry: builder.group({
 *         password: ["", Validators.required],
 *         passwordConfirmation: ["", Validators.required, asyncValidator]
 *       })
 *     });
 *   }
 *
 *   get value(): string {
 *     return JSON.stringify(this.loginForm.value, null, 2);
 *   }
 * }
 * ```
 *
 * @stable
 */
var FormBuilder = (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link FormGroup} constructor for more details.
     */
    FormBuilder.prototype.group = function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var controls = this._reduceControls(controlsConfig);
        var validator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(extra) ? __WEBPACK_IMPORTED_MODULE_1__facade_collection__["a" /* StringMapWrapper */].get(extra, 'validator') : null;
        var asyncValidator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["a" /* isPresent */])(extra) ? __WEBPACK_IMPORTED_MODULE_1__facade_collection__["a" /* StringMapWrapper */].get(extra, 'asyncValidator') : null;
        return new __WEBPACK_IMPORTED_MODULE_3__model__["a" /* FormGroup */](controls, validator, asyncValidator);
    };
    /**
     * Construct a new {@link FormControl} with the given `formState`,`validator`, and
     * `asyncValidator`.
     */
    FormBuilder.prototype.control = function (formState, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        return new __WEBPACK_IMPORTED_MODULE_3__model__["b" /* FormControl */](formState, validator, asyncValidator);
    };
    /**
     * Construct an array of {@link FormControl}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new __WEBPACK_IMPORTED_MODULE_3__model__["c" /* FormArray */](controls, validator, asyncValidator);
    };
    /** @internal */
    FormBuilder.prototype._reduceControls = function (controlsConfig) {
        var _this = this;
        var controls = {};
        __WEBPACK_IMPORTED_MODULE_1__facade_collection__["a" /* StringMapWrapper */].forEach(controlsConfig, function (controlConfig, controlName) {
            controls[controlName] = _this._createControl(controlConfig);
        });
        return controls;
    };
    /** @internal */
    FormBuilder.prototype._createControl = function (controlConfig) {
        if (controlConfig instanceof __WEBPACK_IMPORTED_MODULE_3__model__["b" /* FormControl */] || controlConfig instanceof __WEBPACK_IMPORTED_MODULE_3__model__["a" /* FormGroup */] ||
            controlConfig instanceof __WEBPACK_IMPORTED_MODULE_3__model__["c" /* FormArray */]) {
            return controlConfig;
        }
        else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__facade_lang__["d" /* isArray */])(controlConfig)) {
            var value = controlConfig[0];
            var validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    };
    FormBuilder.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    FormBuilder.ctorParameters = [];
    return FormBuilder;
}());
//# sourceMappingURL=form_builder.js.map

/***/ },

/***/ 467:
/***/ function(module, exports) {

"use strict";
"use strict";
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
exports.reduceTicks = reduceTicks;


/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var d3_1 = __webpack_require__(7);
function gridLayout(dims, data, minWidth) {
    var rows = 1;
    var xScale = d3_1.default.scaleBand();
    var yScale = d3_1.default.scaleBand();
    var dataLength = data.length;
    var width = dims.width;
    var height = dims.height;
    if (width > minWidth) {
        while (width / dataLength < minWidth) {
            rows += 1;
            dataLength = Math.ceil(data.length / rows);
        }
    }
    var columns = dataLength;
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
    var total = getTotal(data);
    var cardWidth = xScale.bandwidth();
    var cardHeight = yScale.bandwidth();
    for (var i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i].name,
            value: data[i].value
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = res[i].data.value / total;
        res[i].data.total = total;
    }
    return res;
}
exports.gridLayout = gridLayout;
function getTotal(results) {
    return results
        .map(function (d) { return d.value; })
        .reduce(function (sum, val) { return sum + val; });
}


/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var moment = __webpack_require__(2);
function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            return moment(label).format("MM/DD/YYYY");
        }
        return label.toString();
    };
}
exports.tickFormat = tickFormat;


/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NG_VALUE_ACCESSOR; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Used to provide a {@link ControlValueAccessor} for form controls.
 *
 * See {@link DefaultValueAccessor} for how to implement one.
 * @stable
 */
var NG_VALUE_ACCESSOR = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('NgValueAccessor');
//# sourceMappingURL=control_value_accessor.js.map

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lang__ = __webpack_require__(26);
/* unused harmony export Map */
/* unused harmony export Set */
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return MapWrapper; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StringMapWrapper; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ListWrapper; });
/* unused harmony export isListLikeIterable */
/* unused harmony export areIterablesEqual */
/* unused harmony export iterateListLike */
/* unused harmony export SetWrapper */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

var Map = __WEBPACK_IMPORTED_MODULE_0__lang__["b" /* global */].Map;
var Set = __WEBPACK_IMPORTED_MODULE_0__lang__["b" /* global */].Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs = (function () {
    try {
        if (new Map([[1, 2]]).size === 1) {
            return function createMapFromPairs(pairs) { return new Map(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap = (function () {
    try {
        if (new Map(new Map())) {
            return function createMapFromMap(m) { return new Map(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new Map();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues = (function () {
    if ((new Map()).keys().next) {
        return function _clearValues(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap = (function () {
    try {
        if ((new Map()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();
var MapWrapper = (function () {
    function MapWrapper() {
    }
    MapWrapper.clone = function (m) { return createMapFromMap(m); };
    MapWrapper.createFromStringMap = function (stringMap) {
        var result = new Map();
        for (var prop in stringMap) {
            result.set(prop, stringMap[prop]);
        }
        return result;
    };
    MapWrapper.toStringMap = function (m) {
        var r = {};
        m.forEach(function (v, k) { return r[k] = v; });
        return r;
    };
    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
    MapWrapper.clearValues = function (m) { _clearValues(m); };
    MapWrapper.iterable = function (m) { return m; };
    MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
    MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
    return MapWrapper;
}());
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).map(function (k) { return map[k]; });
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var k = _a[_i];
            callback(map[k], k);
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["a" /* isPresent */])(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["c" /* isBlank */])(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
function _flattenArray(source, target) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["a" /* isPresent */])(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["d" /* isArray */])(item)) {
                _flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
function isListLikeIterable(obj) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["e" /* isJsObject */])(obj))
        return false;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["d" /* isArray */])(obj) ||
        (!(obj instanceof Map) &&
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["f" /* getSymbolIterator */])() in obj); // JS Iterable have a Symbol.iterator prop
}
function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["f" /* getSymbolIterator */])()]();
    var iterator2 = b[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["f" /* getSymbolIterator */])()]();
    while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
function iterateListLike(obj, fn) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["d" /* isArray */])(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lang__["f" /* getSymbolIterator */])()]();
        var item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList = (function () {
    var test = new Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList(lst) { return new Set(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new Set(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();
var SetWrapper = (function () {
    function SetWrapper() {
    }
    SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
    SetWrapper.has = function (s, key) { return s.has(key); };
    SetWrapper.delete = function (m, k) { m.delete(k); };
    return SetWrapper;
}());
//# sourceMappingURL=collection.js.map

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_toPromise__ = __webpack_require__(1084);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facade_lang__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NG_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return NG_ASYNC_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Validators; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * Providers for validators to be used for {@link FormControl}s in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * ### Example
 *
 * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
 * @stable
 */
var NG_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('NgValidators');
/**
 * Providers for asynchronous validators to be used for {@link FormControl}s
 * in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * See {@link NG_VALIDATORS} for more details.
 *
 * @stable
 */
var NG_ASYNC_VALIDATORS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('NgAsyncValidators');
/**
 * Provides a set of validators used by form controls.
 *
 * A validator is a function that processes a {@link FormControl} or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 *
 * ### Example
 *
 * ```typescript
 * var loginControl = new FormControl("", Validators.required)
 * ```
 *
 * @stable
 */
var Validators = (function () {
    function Validators() {
    }
    /**
     * Validator that requires controls to have a non-empty value.
     */
    Validators.required = function (control) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["c" /* isBlank */])(control.value) || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["g" /* isString */])(control.value) && control.value == '') ?
            { 'required': true } :
            null;
    };
    /**
     * Validator that requires controls to have a value of a minimum length.
     */
    Validators.minLength = function (minLength) {
        return function (control) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': v.length } } :
                null;
        };
    };
    /**
     * Validator that requires controls to have a value of a maximum length.
     */
    Validators.maxLength = function (maxLength) {
        return function (control) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length > maxLength ?
                { 'maxlength': { 'requiredLength': maxLength, 'actualLength': v.length } } :
                null;
        };
    };
    /**
     * Validator that requires a control to match a regex to its value.
     */
    Validators.pattern = function (pattern) {
        return function (control) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(Validators.required(control)))
                return null;
            var regex = new RegExp("^" + pattern + "$");
            var v = control.value;
            return regex.test(v) ? null :
                { 'pattern': { 'requiredPattern': "^" + pattern + "$", 'actualValue': v } };
        };
    };
    /**
     * No-op validator.
     */
    Validators.nullValidator = function (c) { return null; };
    /**
     * Compose multiple validators into a single function that returns the union
     * of the individual error maps.
     */
    Validators.compose = function (validators) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["c" /* isBlank */])(validators))
            return null;
        var presentValidators = validators.filter(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */]);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            return _mergeErrors(_executeValidators(control, presentValidators));
        };
    };
    Validators.composeAsync = function (validators) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["c" /* isBlank */])(validators))
            return null;
        var presentValidators = validators.filter(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */]);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
            return Promise.all(promises).then(_mergeErrors);
        };
    };
    return Validators;
}());
function _convertToPromise(obj) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["h" /* isPromise */])(obj) ? obj : __WEBPACK_IMPORTED_MODULE_1_rxjs_operator_toPromise__["toPromise"].call(obj);
}
function _executeValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
function _executeAsyncValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
function _mergeErrors(arrayOfErrors) {
    var res = arrayOfErrors.reduce(function (res, errors) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__facade_lang__["a" /* isPresent */])(errors) ? __WEBPACK_IMPORTED_MODULE_2__facade_collection__["a" /* StringMapWrapper */].merge(res, errors) : res;
    }, {});
    return __WEBPACK_IMPORTED_MODULE_2__facade_collection__["a" /* StringMapWrapper */].isEmpty(res) ? null : res;
}
//# sourceMappingURL=validators.js.map

/***/ },

/***/ 499:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ 555:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 557:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_forms__ = __webpack_require__(628);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "AbstractControlDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "AbstractFormGroupDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CheckboxControlValueAccessor", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ControlContainer", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NG_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "DefaultValueAccessor", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgControl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgControlStatusGroup", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgControlStatus", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgForm", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgModel", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgModelGroup", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormControlDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormControlName", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormGroupDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormArrayName", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormGroupName", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgSelectOption", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SelectControlValueAccessor", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SelectMultipleControlValueAccessor", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "MaxLengthValidator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "MinLengthValidator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "PatternValidator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "RequiredValidator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormBuilder", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "AbstractControl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormArray", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormControl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormGroup", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NG_ASYNC_VALIDATORS", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NG_VALIDATORS", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "Validators", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FormsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["G"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "ReactiveFormsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__src_forms__["H"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the forms package.
 */

//# sourceMappingURL=index.js.map

/***/ },

/***/ 558:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var data_1 = __webpack_require__(648);
var chartTypes_1 = __webpack_require__(647);
__webpack_require__(1093);
__webpack_require__(1092);
var App = (function () {
    function App() {
        this.chartType = 'bar-vertical';
        this.realTimeData = false;
        this.view = [900, 400];
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Population';
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
        this.autoScale = true;
        Object.assign(this, { single: data_1.single, multi: data_1.multi, countries: data_1.countries, chartGroups: chartTypes_1.default });
    }
    App.prototype.ngOnInit = function () {
        this.selectChart(this.chartType);
        setInterval(this.updateData.bind(this), 2000);
    };
    App.prototype.updateData = function () {
        if (!this.realTimeData) {
            return;
        }
        var country = this.countries[Math.floor(Math.random() * this.countries.length)];
        var add = Math.random() < 0.7;
        var remove = Math.random() < 0.5;
        if (remove) {
            if (this.single.length > 1) {
                var index = Math.floor(Math.random() * this.single.length);
                this.single.splice(index, 1);
                this.single = this.single.slice();
            }
            if (this.multi.length > 1) {
                var index = Math.floor(Math.random() * this.multi.length);
                this.multi.splice(index, 1);
                this.multi = this.multi.slice();
            }
        }
        if (add) {
            var entry = {
                name: country,
                value: Math.floor(1000000 + Math.random() * 20000000)
            };
            this.single = this.single.concat([entry]);
            var multiEntry = {
                name: country,
                series: [{
                        name: "2010",
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }, {
                        name: "2011",
                        value: Math.floor(1000000 + Math.random() * 20000000)
                    }]
            };
            this.multi = this.multi.concat([multiEntry]);
        }
    };
    App.prototype.selectChart = function (chartSelector) {
        this.chartType = chartSelector;
        for (var _i = 0, _a = this.chartGroups; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.charts; _b < _c.length; _b++) {
                var chart = _c[_b];
                if (chart.selector === chartSelector) {
                    this.chart = chart;
                    return;
                }
            }
        }
    };
    App.prototype.clickHandler = function (data) {
        console.log('Item clicked', data);
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <main>\n      <div class=\"chart-col\">\n        <div class=\"chart-view\">\n          <bar-vertical\n            *ngIf=\"chartType === 'bar-vertical'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-vertical>\n\n          <bar-horizontal\n            *ngIf=\"chartType === 'bar-horizontal'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-horizontal>\n\n          <bar-vertical-2d\n            *ngIf=\"chartType === 'bar-vertical-2d'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-vertical-2d>\n\n          <bar-horizontal-2d\n            *ngIf=\"chartType === 'bar-horizontal-2d'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-horizontal-2d>\n\n          <bar-vertical-stacked\n            *ngIf=\"chartType === 'bar-vertical-stacked'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-vertical-stacked>\n\n          <bar-horizontal-stacked\n            *ngIf=\"chartType === 'bar-horizontal-stacked'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-horizontal-stacked>\n\n          <bar-vertical-normalized\n            *ngIf=\"chartType === 'bar-vertical-normalized'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-vertical-normalized>\n\n          <bar-horizontal-normalized\n            *ngIf=\"chartType === 'bar-horizontal-normalized'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [legend]=\"showLegend\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </bar-horizontal-normalized>\n\n          <pie-chart\n            *ngIf=\"chartType === 'pie-chart'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            [legend]=\"showLegend\"\n            [explodeSlices]=\"explodeSlices\"\n            [labels]=\"showLabels\"\n            [doughnut]=\"doughnut\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"clickHandler($event)\">\n          </pie-chart>\n\n          <advanced-pie-chart\n            *ngIf=\"chartType === 'advanced-pie-chart'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"clickHandler($event)\">\n          </advanced-pie-chart>\n\n          <pie-grid\n            *ngIf=\"chartType === 'pie-grid'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            (clickHandler)=\"clickHandler($event)\">\n          </pie-grid>\n\n          <line-chart\n            *ngIf=\"chartType === 'line-chart'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [legend]=\"showLegend\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            [autoScale]=\"autoScale\"\n            (clickHandler)=\"clickHandler($event)\">\n          </line-chart>\n\n          <area-chart\n            *ngIf=\"chartType === 'area-chart'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [legend]=\"showLegend\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            [autoScale]=\"autoScale\"\n            (clickHandler)=\"clickHandler($event)\">\n          </area-chart>\n\n          <area-chart-stacked\n            *ngIf=\"chartType === 'area-chart-stacked'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [legend]=\"showLegend\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </area-chart-stacked>\n\n          <area-chart-normalized\n            *ngIf=\"chartType === 'area-chart-normalized'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [legend]=\"showLegend\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </area-chart-normalized>\n\n          <heat-map\n            *ngIf=\"chartType === 'heat-map'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"multi\"\n            [legend]=\"showLegend\"\n            [gradient]=\"gradient\"\n            [xAxis]=\"showXAxis\"\n            [yAxis]=\"showYAxis\"\n            [showXAxisLabel]=\"showXAxisLabel\"\n            [showYAxisLabel]=\"showYAxisLabel\"\n            [xAxisLabel]=\"xAxisLabel\"\n            [yAxisLabel]=\"yAxisLabel\"\n            (clickHandler)=\"clickHandler($event)\">\n          </heat-map>\n\n          <number-card\n            *ngIf=\"chartType === 'number-card'\"\n            [view]=\"view\"\n            [scheme]=\"colorScheme\"\n            [results]=\"single\"\n            (clickHandler)=\"clickHandler($event)\">\n          </number-card>\n        </div>\n      </div>\n\n      <div class=\"sidebar\">\n        <h1>\n          ng2<strong>d3</strong>\n          <small>Angular2 D3 Chart Framework</small>\n        </h1>\n\n        <h3>Chart Type</h3>\n        <select\n          [ngModel]=\"chartType\"\n          (ngModelChange)=\"selectChart($event)\">\n          <template ngFor let-group [ngForOf]=\"chartGroups\">\n            <optgroup [label]=\"group.name\">\n              <option *ngFor=\"let chart of group.charts\" [value]=\"chart.selector\">{{chart.name}}</option>\n            </optgroup>\n          </template>\n        </select>\n\n        <h3>Data</h3>\n        <select>\n          <option>Country</option>\n        </select>\n\n        <pre *ngIf=\"chart.inputFormat === 'singleSeries'\">{{single | json}}</pre>\n        <pre *ngIf=\"chart.inputFormat === 'multiSeries'\">{{multi | json}}</pre>\n\n        <div>\n          <label>\n            <input type=\"checkbox\" [checked]=\"realTimeData\" (change)=\"realTimeData = $event.target.checked\">\n            Real-time\n          </label>\n        </div>\n\n        <h3>Options</h3>\n\n        <div *ngIf=\"chart.options.includes('showXAxis')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showXAxis\" (change)=\"showXAxis = $event.target.checked\">\n            Show X Axis\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('showYAxis')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showYAxis\" (change)=\"showYAxis = $event.target.checked\">\n            Show Y Axis\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('gradient')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"gradient\" (change)=\"gradient = $event.target.checked\">\n            Use gradients\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('showLegend')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showLegend\" (change)=\"showLegend = $event.target.checked\">\n            Show Legend\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('showXAxisLabel')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showXAxisLabel\" (change)=\"showXAxisLabel = $event.target.checked\">\n            Show X Axis Label\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('xAxisLabel')\">\n          <label>X Axis Label:</label><br />\n          <input type=\"text\" [(ngModel)]=\"xAxisLabel\"><br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('showYAxisLabel')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showYAxisLabel\" (change)=\"showYAxisLabel = $event.target.checked\">\n            Show Y Axis Label\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('yAxisLabel')\">\n          <label>Y Axis Label:</label><br />\n          <input type=\"text\" [(ngModel)]=\"yAxisLabel\"><br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('showLabels')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"showLabels\" (change)=\"showLabels = $event.target.checked\">\n            Show Labels\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('explodeSlices')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"explodeSlices\" (change)=\"explodeSlices = $event.target.checked\">\n            Explode Slices\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('doughnut')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"doughnut\" (change)=\"doughnut = $event.target.checked\">\n            Doughnut\n          </label> <br />\n        </div>\n\n        <div *ngIf=\"chart.options.includes('autoScale')\">\n          <label>\n            <input type=\"checkbox\" [checked]=\"autoScale\" (change)=\"autoScale = $event.target.checked\">\n            Auto Scale\n          </label> <br />\n        </div>\n      </div>\n    </main>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;


/***/ },

/***/ 559:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var area_chart_module_1 = __webpack_require__(652);
var bar_chart_module_1 = __webpack_require__(654);
var heat_map_module_1 = __webpack_require__(690);
var line_chart_module_1 = __webpack_require__(692);
var number_card_module_1 = __webpack_require__(698);
var pie_chart_module_1 = __webpack_require__(702);
var tree_map_module_1 = __webpack_require__(710);
var NG2D3Module = (function () {
    function NG2D3Module() {
    }
    NG2D3Module = __decorate([
        core_1.NgModule({
            exports: [
                common_module_1.CommonModule,
                area_chart_module_1.AreaChartModule,
                bar_chart_module_1.BarChartModule,
                heat_map_module_1.HeatMapModule,
                line_chart_module_1.LineChartModule,
                number_card_module_1.NumberCardModule,
                pie_chart_module_1.PieChartModule,
                tree_map_module_1.TreeMapModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NG2D3Module);
    return NG2D3Module;
}());
exports.NG2D3Module = NG2D3Module;


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_control_directive__ = __webpack_require__(212);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ControlContainer; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * A directive that contains multiple {@link NgControl}s.
 *
 * Only used by the forms module.
 *
 * @stable
 */
var ControlContainer = (function (_super) {
    __extends(ControlContainer, _super);
    function ControlContainer() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ControlContainer.prototype, "formDirective", {
        /**
         * Get the form to which this container belongs.
         */
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlContainer.prototype, "path", {
        /**
         * Get the path to this container.
         */
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return ControlContainer;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_control_directive__["a" /* AbstractControlDirective */]));
//# sourceMappingURL=control_container.js.map

/***/ },

/***/ 62:
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = {};
function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    var id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    if (!cache[id]) {
        cache[id] = true;
        return id;
    }
    return ObjectId();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectId;
;


/***/ },

/***/ 625:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_checkbox_value_accessor__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_default_value_accessor__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_ng_control_status__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_ng_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_ng_model__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_ng_model_group__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_number_value_accessor__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_radio_control_value_accessor__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_reactive_directives_form_control_directive__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_reactive_directives_form_control_name__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_reactive_directives_form_group_directive__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_reactive_directives_form_group_name__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_select_control_value_accessor__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_select_multiple_control_value_accessor__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__directives_validators__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__directives_ng_control__ = __webpack_require__(77);
/* unused harmony export SHARED_FORM_DIRECTIVES */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TEMPLATE_DRIVEN_DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return REACTIVE_DRIVEN_DIRECTIVES; });
/* unused harmony export FORM_DIRECTIVES */
/* unused harmony export REACTIVE_FORM_DIRECTIVES */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return InternalFormsSharedModule; });
/* unused harmony reexport CheckboxControlValueAccessor */
/* unused harmony reexport DefaultValueAccessor */
/* unused harmony reexport NgControl */
/* unused harmony reexport NgControlStatus */
/* unused harmony reexport NgControlStatusGroup */
/* unused harmony reexport NgForm */
/* unused harmony reexport NgModel */
/* unused harmony reexport NgModelGroup */
/* unused harmony reexport NumberValueAccessor */
/* unused harmony reexport RadioControlValueAccessor */
/* unused harmony reexport FormControlDirective */
/* unused harmony reexport FormControlName */
/* unused harmony reexport FormGroupDirective */
/* unused harmony reexport FormArrayName */
/* unused harmony reexport FormGroupName */
/* unused harmony reexport NgSelectOption */
/* unused harmony reexport SelectControlValueAccessor */
/* unused harmony reexport NgSelectMultipleOption */
/* unused harmony reexport SelectMultipleControlValueAccessor */
/* unused harmony reexport MaxLengthValidator */
/* unused harmony reexport MinLengthValidator */
/* unused harmony reexport PatternValidator */
/* unused harmony reexport RequiredValidator */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
































var SHARED_FORM_DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_13__directives_select_control_value_accessor__["b" /* NgSelectOption */], __WEBPACK_IMPORTED_MODULE_14__directives_select_multiple_control_value_accessor__["b" /* NgSelectMultipleOption */], __WEBPACK_IMPORTED_MODULE_2__directives_default_value_accessor__["a" /* DefaultValueAccessor */], __WEBPACK_IMPORTED_MODULE_7__directives_number_value_accessor__["a" /* NumberValueAccessor */],
    __WEBPACK_IMPORTED_MODULE_1__directives_checkbox_value_accessor__["a" /* CheckboxControlValueAccessor */], __WEBPACK_IMPORTED_MODULE_13__directives_select_control_value_accessor__["a" /* SelectControlValueAccessor */], __WEBPACK_IMPORTED_MODULE_14__directives_select_multiple_control_value_accessor__["a" /* SelectMultipleControlValueAccessor */],
    __WEBPACK_IMPORTED_MODULE_8__directives_radio_control_value_accessor__["a" /* RadioControlValueAccessor */], __WEBPACK_IMPORTED_MODULE_3__directives_ng_control_status__["a" /* NgControlStatus */], __WEBPACK_IMPORTED_MODULE_3__directives_ng_control_status__["b" /* NgControlStatusGroup */], __WEBPACK_IMPORTED_MODULE_15__directives_validators__["a" /* RequiredValidator */],
    __WEBPACK_IMPORTED_MODULE_15__directives_validators__["b" /* MinLengthValidator */], __WEBPACK_IMPORTED_MODULE_15__directives_validators__["c" /* MaxLengthValidator */], __WEBPACK_IMPORTED_MODULE_15__directives_validators__["d" /* PatternValidator */]
];
var TEMPLATE_DRIVEN_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_5__directives_ng_model__["a" /* NgModel */], __WEBPACK_IMPORTED_MODULE_6__directives_ng_model_group__["a" /* NgModelGroup */], __WEBPACK_IMPORTED_MODULE_4__directives_ng_form__["a" /* NgForm */]];
var REACTIVE_DRIVEN_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_9__directives_reactive_directives_form_control_directive__["a" /* FormControlDirective */], __WEBPACK_IMPORTED_MODULE_11__directives_reactive_directives_form_group_directive__["a" /* FormGroupDirective */], __WEBPACK_IMPORTED_MODULE_10__directives_reactive_directives_form_control_name__["a" /* FormControlName */], __WEBPACK_IMPORTED_MODULE_12__directives_reactive_directives_form_group_name__["a" /* FormGroupName */], __WEBPACK_IMPORTED_MODULE_12__directives_reactive_directives_form_group_name__["b" /* FormArrayName */]];
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 * @stable
 */
var FORM_DIRECTIVES = [TEMPLATE_DRIVEN_DIRECTIVES, SHARED_FORM_DIRECTIVES];
/**
 * @stable
 */
var REACTIVE_FORM_DIRECTIVES = [REACTIVE_DRIVEN_DIRECTIVES, SHARED_FORM_DIRECTIVES];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */
var InternalFormsSharedModule = (function () {
    function InternalFormsSharedModule() {
    }
    InternalFormsSharedModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{ declarations: SHARED_FORM_DIRECTIVES, exports: SHARED_FORM_DIRECTIVES },] },
    ];
    /** @nocollapse */
    InternalFormsSharedModule.ctorParameters = [];
    return InternalFormsSharedModule;
}());
//# sourceMappingURL=directives.js.map

/***/ },

/***/ 626:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = normalizeValidator;
/* harmony export (immutable) */ exports["b"] = normalizeAsyncValidator;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function normalizeValidator(validator) {
    if (validator.validate !== undefined) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
function normalizeAsyncValidator(validator) {
    if (validator.validate !== undefined) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
//# sourceMappingURL=normalize_validator.js.map

/***/ },

/***/ 627:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_radio_control_value_accessor__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_builder__ = __webpack_require__(454);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FormsModule; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ReactiveFormsModule; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * The ng module for forms.
 * @stable
 */
var FormsModule = (function () {
    function FormsModule() {
    }
    FormsModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: __WEBPACK_IMPORTED_MODULE_1__directives__["a" /* TEMPLATE_DRIVEN_DIRECTIVES */],
                    providers: [__WEBPACK_IMPORTED_MODULE_2__directives_radio_control_value_accessor__["b" /* RadioControlRegistry */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__directives__["b" /* InternalFormsSharedModule */], __WEBPACK_IMPORTED_MODULE_1__directives__["a" /* TEMPLATE_DRIVEN_DIRECTIVES */]]
                },] },
    ];
    /** @nocollapse */
    FormsModule.ctorParameters = [];
    return FormsModule;
}());
/**
 * The ng module for reactive forms.
 * @stable
 */
var ReactiveFormsModule = (function () {
    function ReactiveFormsModule() {
    }
    ReactiveFormsModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    declarations: [__WEBPACK_IMPORTED_MODULE_1__directives__["c" /* REACTIVE_DRIVEN_DIRECTIVES */]],
                    providers: [__WEBPACK_IMPORTED_MODULE_3__form_builder__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__directives_radio_control_value_accessor__["b" /* RadioControlRegistry */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_1__directives__["b" /* InternalFormsSharedModule */], __WEBPACK_IMPORTED_MODULE_1__directives__["c" /* REACTIVE_DRIVEN_DIRECTIVES */]]
                },] },
    ];
    /** @nocollapse */
    ReactiveFormsModule.ctorParameters = [];
    return ReactiveFormsModule;
}());
//# sourceMappingURL=form_providers.js.map

/***/ },

/***/ 628:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_abstract_control_directive__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_abstract_form_group_directive__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_checkbox_value_accessor__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_control_container__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_control_value_accessor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_default_value_accessor__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_ng_control__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_ng_control_status__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_ng_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_ng_model__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_ng_model_group__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__directives_reactive_directives_form_control_directive__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_reactive_directives_form_control_name__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__directives_reactive_directives_form_group_directive__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_reactive_directives_form_group_name__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__directives_select_control_value_accessor__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__directives_select_multiple_control_value_accessor__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__directives_validators__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__form_builder__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__model__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__form_providers__ = __webpack_require__(627);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_abstract_control_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_abstract_form_group_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_checkbox_value_accessor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_control_container__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_control_value_accessor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__directives_default_value_accessor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__directives_ng_control__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__directives_ng_control_status__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__directives_ng_control_status__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "j", function() { return __WEBPACK_IMPORTED_MODULE_8__directives_ng_form__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "k", function() { return __WEBPACK_IMPORTED_MODULE_9__directives_ng_model__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "l", function() { return __WEBPACK_IMPORTED_MODULE_10__directives_ng_model_group__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "m", function() { return __WEBPACK_IMPORTED_MODULE_11__directives_reactive_directives_form_control_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "n", function() { return __WEBPACK_IMPORTED_MODULE_12__directives_reactive_directives_form_control_name__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "o", function() { return __WEBPACK_IMPORTED_MODULE_13__directives_reactive_directives_form_group_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "p", function() { return __WEBPACK_IMPORTED_MODULE_14__directives_reactive_directives_form_group_name__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "q", function() { return __WEBPACK_IMPORTED_MODULE_14__directives_reactive_directives_form_group_name__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "r", function() { return __WEBPACK_IMPORTED_MODULE_15__directives_select_control_value_accessor__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "s", function() { return __WEBPACK_IMPORTED_MODULE_15__directives_select_control_value_accessor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "t", function() { return __WEBPACK_IMPORTED_MODULE_16__directives_select_multiple_control_value_accessor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "u", function() { return __WEBPACK_IMPORTED_MODULE_17__directives_validators__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "v", function() { return __WEBPACK_IMPORTED_MODULE_17__directives_validators__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "w", function() { return __WEBPACK_IMPORTED_MODULE_17__directives_validators__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "x", function() { return __WEBPACK_IMPORTED_MODULE_17__directives_validators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "y", function() { return __WEBPACK_IMPORTED_MODULE_18__form_builder__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "z", function() { return __WEBPACK_IMPORTED_MODULE_19__model__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "A", function() { return __WEBPACK_IMPORTED_MODULE_19__model__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "B", function() { return __WEBPACK_IMPORTED_MODULE_19__model__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "C", function() { return __WEBPACK_IMPORTED_MODULE_19__model__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "D", function() { return __WEBPACK_IMPORTED_MODULE_20__validators__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "E", function() { return __WEBPACK_IMPORTED_MODULE_20__validators__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "F", function() { return __WEBPACK_IMPORTED_MODULE_20__validators__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "G", function() { return __WEBPACK_IMPORTED_MODULE_21__form_providers__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "H", function() { return __WEBPACK_IMPORTED_MODULE_21__form_providers__["b"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link FormGroup} that
 * consists of
 * {@link FormControl} objects, and mapping them onto the DOM. {@link FormControl} objects can then
 * be used
 * to read information
 * from the form DOM elements.
 *
 * Forms providers are not included in default providers; you must import these providers
 * explicitly.
 */























//# sourceMappingURL=forms.js.map

/***/ },

/***/ 647:
/***/ function(module, exports) {

"use strict";
"use strict";
var chartGroups = [
    {
        name: "Bar Charts",
        charts: [
            {
                name: "Vertical Bar Chart",
                selector: 'bar-vertical',
                inputFormat: 'singleSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Horizontal Bar Chart",
                selector: 'bar-horizontal',
                inputFormat: 'singleSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Grouped Vertical Bar Chart",
                selector: 'bar-vertical-2d',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Grouped Horizontal Bar Chart",
                selector: 'bar-horizontal-2d',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Stacked Vertical Bar Chart",
                selector: 'bar-vertical-stacked',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Stacked Horizontal Bar Chart",
                selector: 'bar-horizontal-stacked',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Normalized Vertical Bar Chart",
                selector: 'bar-vertical-normalized',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Normalized Horizontal Bar Chart",
                selector: 'bar-horizontal-normalized',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            }
        ]
    },
    {
        name: "Pie Charts",
        charts: [
            {
                name: "Pie Chart",
                selector: 'pie-chart',
                inputFormat: 'singleSeries',
                options: ['colorScheme', 'gradient', 'showLegend', 'doughnut', 'explodeSlices', 'showLabels']
            },
            {
                name: "Advanced Pie Chart",
                selector: 'advanced-pie-chart',
                inputFormat: 'singleSeries',
                options: ['colorScheme', 'gradient', 'showLegend', 'doughnut', 'showLabels']
            },
            {
                name: "Pie Grid",
                selector: 'pie-grid',
                inputFormat: 'singleSeries',
                options: ['colorScheme']
            }
        ]
    },
    {
        name: "Line/Area Charts",
        charts: [
            {
                name: "Line Chart",
                selector: 'line-chart',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline']
            },
            {
                name: "Area Chart",
                selector: 'area-chart',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline']
            },
            {
                name: "Stacked Area Chart",
                selector: 'area-chart-stacked',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline']
            },
            {
                name: "Normalized Area Chart",
                selector: 'area-chart-normalized',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'autoScale', 'timeline']
            },
        ]
    },
    {
        name: "Other Charts",
        charts: [
            {
                name: "Heat Map",
                selector: 'heat-map',
                inputFormat: 'multiSeries',
                options: ['colorScheme', 'showXAxis', 'showYAxis', 'gradient', 'showLegend', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel']
            },
            {
                name: "Number Cards",
                selector: 'number-card',
                inputFormat: 'singleSeries',
                options: ['colorScheme']
            }
        ]
    }
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = chartGroups;


/***/ },

/***/ 648:
/***/ function(module, exports) {

"use strict";
"use strict";
exports.single = [
    {
        "name": "Germany",
        "value": 8940000
    },
    {
        "name": "USA",
        "value": 5000000
    },
    {
        "name": "France",
        "value": 7200000
    }
];
exports.multi = [
    {
        "name": "Germany",
        "series": [
            {
                "name": "2010",
                "value": 7300000
            },
            {
                "name": "2011",
                "value": 8940000
            }
        ]
    },
    {
        "name": "USA",
        "series": [
            {
                "name": "2010",
                "value": 7870000
            },
            {
                "name": "2011",
                "value": 8270000
            }
        ]
    },
    {
        "name": "France",
        "series": [
            {
                "name": "2010",
                "value": 5000002
            },
            {
                "name": "2011",
                "value": 5800000
            }
        ]
    }
];
exports.countries = [
    "Abkhazia", "Afghanistan", "Akrotiri and Dhekelia", "Aland", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ascension Island", "Australia", "Austria", "Azerbaijan", "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Africa Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote d'lvoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Cambia, The", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guemsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, N", "Korea, S", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Nagorno-Karabakh", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Cyprus", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcaim Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russia", "Rwanda", "Sahrawi Arab Democratic Republic", "Saint-Barthelemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and Grenadines", "Samos", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Ossetia", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Transnistria", "Trinidad and Tobago", "Tristan da Cunha", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Yemen", "Zambia", "Zimbabwe"
];


/***/ },

/***/ 649:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var moment = __webpack_require__(2);
var object_id_1 = __webpack_require__(62);
var AreaChartNormalized = (function (_super) {
    __extends(AreaChartNormalized, _super);
    function AreaChartNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaChartNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChartNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChartNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        var _loop_1 = function(i) {
            var val = this_1.xDomain[i];
            var d0 = 0;
            var total = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                total += d.value;
            }
            for (var _b = 0, _c = this_1.results; _b < _c.length; _b++) {
                var group = _c[_b];
                var d = group.series.find(function (item) { return item.name === val; });
                d.d0 = d0;
                d.d1 = d0 + d.value;
                d0 += d.value;
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
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_1(i);
        }
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartNormalized.prototype.getXDomain = function () {
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
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChartNormalized.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalized.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalized.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChartNormalized.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChartNormalized.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartNormalized.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartNormalized.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChartNormalized.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "clickHandler", void 0);
    AreaChartNormalized = __decorate([
        core_1.Component({
            selector: 'area-chart-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              chartType=\"area\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartNormalized);
    return AreaChartNormalized;
}(base_chart_component_1.BaseChart));
exports.AreaChartNormalized = AreaChartNormalized;


/***/ },

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var moment = __webpack_require__(2);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var AreaChartStacked = (function (_super) {
    __extends(AreaChartStacked, _super);
    function AreaChartStacked(element) {
        _super.call(this);
        this.margin = [10, 20, 70, 70];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    AreaChartStacked.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChartStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChartStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        var _loop_1 = function(i) {
            var val = this_1.xDomain[i];
            var d0 = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                d.d0 = d0;
                d.d1 = d0 + d.value;
                d0 += d.value;
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_1(i);
        }
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
        this.addTooltip();
    };
    AreaChartStacked.prototype.getXDomain = function () {
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
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChartStacked.prototype.getYDomain = function () {
        var domain = [];
        var _loop_2 = function(i) {
            var val = this_2.xDomain[i];
            var sum = 0;
            for (var _i = 0, _a = this_2.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                sum += d.value;
            }
            domain.push(sum);
        };
        var this_2 = this;
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_2(i);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    AreaChartStacked.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartStacked.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChartStacked.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChartStacked.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartStacked.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartStacked.prototype.addTooltip = function () {
    };
    AreaChartStacked.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChartStacked.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "clickHandler", void 0);
    AreaChartStacked = __decorate([
        core_1.Component({
            selector: 'area-chart-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"area chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              stacked=\"true\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AreaChartStacked);
    return AreaChartStacked;
}(base_chart_component_1.BaseChart));
exports.AreaChartStacked = AreaChartStacked;


/***/ },

/***/ 651:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var moment = __webpack_require__(2);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var AreaChart = (function (_super) {
    __extends(AreaChart, _super);
    function AreaChart() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaChart.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChart.prototype.getXDomain = function () {
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
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChart.prototype.getYDomain = function () {
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
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    AreaChart.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChart.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChart.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChart.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChart.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChart.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "clickHandler", void 0);
    AreaChart = __decorate([
        core_1.Component({
            selector: 'area-chart',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChart);
    return AreaChart;
}(base_chart_component_1.BaseChart));
exports.AreaChart = AreaChart;


/***/ },

/***/ 652:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var area_chart_component_1 = __webpack_require__(651);
var area_chart_normalized_component_1 = __webpack_require__(649);
var area_chart_stacked_component_1 = __webpack_require__(650);
var area_series_component_1 = __webpack_require__(653);
var common_module_1 = __webpack_require__(71);
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                area_chart_component_1.AreaChart,
                area_chart_normalized_component_1.AreaChartNormalized,
                area_chart_stacked_component_1.AreaChartStacked,
                area_series_component_1.AreaSeries
            ],
            exports: [
                area_chart_component_1.AreaChart,
                area_chart_normalized_component_1.AreaChartNormalized,
                area_chart_stacked_component_1.AreaChartStacked,
                area_series_component_1.AreaSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartModule);
    return AreaChartModule;
}());
exports.AreaChartModule = AreaChartModule;


/***/ },

/***/ 653:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var moment = __webpack_require__(2);
var AreaSeries = (function () {
    function AreaSeries() {
        this.stacked = false;
        this.normalized = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    AreaSeries.prototype.ngOnInit = function () {
        this.update();
    };
    AreaSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaSeries.prototype.update = function () {
        var _this = this;
        var area;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            if (_this.scaleType === 'time') {
                return _this.xScale(moment(label).toDate());
            }
            else {
                return _this.xScale(label);
            }
        };
        if (this.stacked || this.normalized) {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        this.opacity = 1;
        this.path = area(this.data.series);
        this.startingPath = startingArea(this.data.series);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "normalized", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "clickHandler", void 0);
    AreaSeries = __decorate([
        core_1.Component({
            selector: 'g[areaSeries]',
            template: "\n    <svg:g area\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"color\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaSeries);
    return AreaSeries;
}());
exports.AreaSeries = AreaSeries;


/***/ },

/***/ 654:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var bar_component_1 = __webpack_require__(663);
var bar_horizontal_component_1 = __webpack_require__(658);
var bar_horizontal_2d_component_1 = __webpack_require__(655);
var bar_horizontal_normalized_component_1 = __webpack_require__(656);
var bar_horizontal_stacked_component_1 = __webpack_require__(657);
var bar_vertical_component_1 = __webpack_require__(662);
var bar_vertical_2d_component_1 = __webpack_require__(659);
var bar_vertical_normalized_component_1 = __webpack_require__(660);
var bar_vertical_stacked_component_1 = __webpack_require__(661);
var date_bar_component_1 = __webpack_require__(664);
var series_horizontal_component_1 = __webpack_require__(665);
var series_vertical_component_1 = __webpack_require__(666);
var BarChartModule = (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                bar_component_1.Bar,
                bar_horizontal_component_1.BarHorizontal,
                bar_horizontal_2d_component_1.BarHorizontal2D,
                bar_horizontal_normalized_component_1.BarHorizontalNormalized,
                bar_horizontal_stacked_component_1.BarHorizontalStacked,
                bar_vertical_component_1.BarVertical,
                bar_vertical_2d_component_1.BarVertical2D,
                bar_vertical_normalized_component_1.BarVerticalNormalized,
                bar_vertical_stacked_component_1.BarVerticalStacked,
                date_bar_component_1.DateBar,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVertical
            ],
            exports: [
                bar_component_1.Bar,
                bar_horizontal_component_1.BarHorizontal,
                bar_horizontal_2d_component_1.BarHorizontal2D,
                bar_horizontal_normalized_component_1.BarHorizontalNormalized,
                bar_horizontal_stacked_component_1.BarHorizontalStacked,
                bar_vertical_component_1.BarVertical,
                bar_vertical_2d_component_1.BarVertical2D,
                bar_vertical_normalized_component_1.BarVerticalNormalized,
                bar_vertical_stacked_component_1.BarVerticalStacked,
                date_bar_component_1.DateBar,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVertical
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartModule);
    return BarChartModule;
}());
exports.BarChartModule = BarChartModule;


/***/ },

/***/ 655:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarHorizontal2D = (function (_super) {
    __extends(BarHorizontal2D, _super);
    function BarHorizontal2D() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontal2D.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontal2D.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal2D.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal2D.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontal2D.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2D.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
    };
    BarHorizontal2D.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontal2D.prototype.getInnerDomain = function () {
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
    BarHorizontal2D.prototype.getValueDomain = function () {
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
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontal2D.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.name) + ")";
    };
    BarHorizontal2D.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontal2D.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal2D.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "clickHandler", void 0);
    BarHorizontal2D = __decorate([
        core_1.Component({
            selector: 'bar-horizontal-2d',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g gridPanelSeries\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\">\n        </svg:g>\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            [xScale]=\"valueScale\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontal2D);
    return BarHorizontal2D;
}(base_chart_component_1.BaseChart));
exports.BarHorizontal2D = BarHorizontal2D;


/***/ },

/***/ 656:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarHorizontalNormalized = (function (_super) {
    __extends(BarHorizontalNormalized, _super);
    function BarHorizontalNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontalNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontalNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontalNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalNormalized.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalNormalized.prototype.getInnerDomain = function () {
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
    BarHorizontalNormalized.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarHorizontalNormalized.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalNormalized.prototype.getXScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalNormalized.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalNormalized.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontalNormalized.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalNormalized.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "clickHandler", void 0);
    BarHorizontalNormalized = __decorate([
        core_1.Component({
            selector: 'bar-horizontal-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalNormalized);
    return BarHorizontalNormalized;
}(base_chart_component_1.BaseChart));
exports.BarHorizontalNormalized = BarHorizontalNormalized;


/***/ },

/***/ 657:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarHorizontalStacked = (function (_super) {
    __extends(BarHorizontalStacked, _super);
    function BarHorizontalStacked() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontalStacked.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontalStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontalStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalStacked.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStacked.prototype.getInnerDomain = function () {
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
    BarHorizontalStacked.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontalStacked.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStacked.prototype.getXScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalStacked.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStacked.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontalStacked.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalStacked.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "clickHandler", void 0);
    BarHorizontalStacked = __decorate([
        core_1.Component({
            selector: 'bar-horizontal-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalStacked);
    return BarHorizontalStacked;
}(base_chart_component_1.BaseChart));
exports.BarHorizontalStacked = BarHorizontalStacked;


/***/ },

/***/ 658:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var tick_format_helper_1 = __webpack_require__(469);
var d3_1 = __webpack_require__(7);
var BarHorizontal = (function (_super) {
    __extends(BarHorizontal, _super);
    function BarHorizontal() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarHorizontal.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
    };
    BarHorizontal.prototype.getYScale = function () {
        var spacing = 0.2;
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontal.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarHorizontal.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarHorizontal.prototype.yAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tick_format_helper_1.tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarHorizontal.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarHorizontal.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.yDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "clickHandler", void 0);
    BarHorizontal = __decorate([
        core_1.Component({
            selector: 'bar-horizontal',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"yDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"yAxisTickFormatting()\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesHorizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontal);
    return BarHorizontal;
}(base_chart_component_1.BaseChart));
exports.BarHorizontal = BarHorizontal;


/***/ },

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarVertical2D = (function (_super) {
    __extends(BarVertical2D, _super);
    function BarVertical2D() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.scaleType = 'ordinal';
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVertical2D.prototype.ngOnInit = function () {
        this.update();
    };
    BarVertical2D.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVertical2D.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical2D.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVertical2D.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2D.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
    };
    BarVertical2D.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVertical2D.prototype.getInnerDomain = function () {
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
    BarVertical2D.prototype.getValueDomain = function () {
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
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVertical2D.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.name) + ", 0)";
    };
    BarVertical2D.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVertical2D.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical2D.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "clickHandler", void 0);
    BarVertical2D = __decorate([
        core_1.Component({
            selector: 'bar-vertical-2d',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g gridPanelSeries\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\">\n        </svg:g>\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            [xScale]=\"innerScale\"\n            [yScale]=\"valueScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical2D);
    return BarVertical2D;
}(base_chart_component_1.BaseChart));
exports.BarVertical2D = BarVertical2D;


/***/ },

/***/ 660:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarVerticalNormalized = (function (_super) {
    __extends(BarVerticalNormalized, _super);
    function BarVerticalNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVerticalNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    BarVerticalNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVerticalNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalNormalized.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalNormalized.prototype.getInnerDomain = function () {
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
    BarVerticalNormalized.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarVerticalNormalized.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalNormalized.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalNormalized.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalNormalized.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVerticalNormalized.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalNormalized.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "clickHandler", void 0);
    BarVerticalNormalized = __decorate([
        core_1.Component({
            selector: 'bar-vertical-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalNormalized);
    return BarVerticalNormalized;
}(base_chart_component_1.BaseChart));
exports.BarVerticalNormalized = BarVerticalNormalized;


/***/ },

/***/ 661:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var BarVerticalStacked = (function (_super) {
    __extends(BarVerticalStacked, _super);
    function BarVerticalStacked() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVerticalStacked.prototype.ngOnInit = function () {
        this.update();
    };
    BarVerticalStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVerticalStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalStacked.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalStacked.prototype.getInnerDomain = function () {
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
    BarVerticalStacked.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVerticalStacked.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStacked.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalStacked.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalStacked.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVerticalStacked.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalStacked.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "clickHandler", void 0);
    BarVerticalStacked = __decorate([
        core_1.Component({
            selector: 'bar-vertical-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalStacked);
    return BarVerticalStacked;
}(base_chart_component_1.BaseChart));
exports.BarVerticalStacked = BarVerticalStacked;


/***/ },

/***/ 662:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var tick_format_helper_1 = __webpack_require__(469);
var d3_1 = __webpack_require__(7);
var BarVertical = (function (_super) {
    __extends(BarVertical, _super);
    function BarVertical() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    BarVertical.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVertical.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical.prototype.getXScale = function () {
        var spacing = 0.2;
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVertical.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    BarVertical.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVertical.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVertical.prototype.xAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tick_format_helper_1.tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarVertical.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarVertical.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "clickHandler", void 0);
    BarVertical = __decorate([
        core_1.Component({
            selector: 'bar-vertical',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"xDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"xAxisTickFormatting()\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\">\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical);
    return BarVertical;
}(base_chart_component_1.BaseChart));
exports.BarVertical = BarVertical;


/***/ },

/***/ 663:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var Bar = (function () {
    function Bar(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.clickHandler = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Bar.prototype.ngOnInit = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.startOpacity = this.getStartOpacity();
    };
    Bar.prototype.ngOnChanges = function () {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    Bar.prototype.update = function () {
        this.animateToCurrentForm();
    };
    Bar.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    Bar.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(750)
            .attr('d', path);
    };
    Bar.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, true, false, true);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, false, false, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, false, false, false);
            }
        }
        return path;
    };
    Bar.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    Bar.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > radius && this.width > radius) {
            radius = 5;
        }
        return radius;
    };
    Bar.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0;
        }
        else {
            return 0.5;
        }
    };
    Bar.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
        var retval;
        retval = "M" + (x + r) + "," + y;
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
        }
        else {
            retval += "h" + r;
            retval += "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
        }
        else {
            retval += "v" + r;
            retval += "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
        }
        else {
            retval += "h" + -r;
            retval += "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
        }
        else {
            retval += "v" + -r;
            retval += "h" + r;
        }
        retval += "z";
        return retval;
    };
    Bar.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "roundEdges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "offset", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "clickHandler", void 0);
    Bar = __decorate([
        core_1.Component({
            selector: 'g[bar]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.cursor]=\"'pointer'\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Bar);
    return Bar;
}());
exports.Bar = Bar;


/***/ },

/***/ 664:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var d3_1 = __webpack_require__(7);
var DateBar = (function (_super) {
    __extends(DateBar, _super);
    function DateBar() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    DateBar.prototype.ngOnInit = function () {
        var groupSpacing = 0.2;
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.yScale = d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain([0, this.results.m0Domain[1]]);
        this.xScale = d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width], groupSpacing)
            .domain(this.results.d0Domain);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    DateBar.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    DateBar.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
    };
    DateBar.prototype.update = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DateBar.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "clickHandler", void 0);
    DateBar = __decorate([
        core_1.Component({
            selector: 'date-bar',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"results.series[0]\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [xAxisTickInterval]=\"{unit: 'hour', interval: 2}\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          scaleType=\"time\"\n          [colors]=\"colors\"\n          [series]=\"results.series[0]\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DateBar);
    return DateBar;
}(base_chart_component_1.BaseChart));
exports.DateBar = DateBar;


/***/ },

/***/ 665:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var SeriesHorizontal = (function () {
    function SeriesHorizontal() {
        this.type = 'standard';
        this.clickHandler = new core_1.EventEmitter();
    }
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _this = this;
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; });
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                color: _this.colors(label),
                roundEdges: roundEdges,
                data: d,
                tooltipText: label + ": " + value
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = _this.xScale(value);
                bar.x = 0;
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
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
            }
            return bar;
        });
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeriesHorizontal.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "clickHandler", void 0);
    SeriesHorizontal = __decorate([
        core_1.Component({
            selector: 'g[seriesHorizontal]',
            template: "\n    <svg:g bar *ngFor=\"let bar of bars\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (clickHandler)=\"click($event)\"\n      [gradient]=\"gradient\"\n\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"bar.tooltipText\"\n      [popoverGroup]=\"'charts'\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesHorizontal);
    return SeriesHorizontal;
}());
exports.SeriesHorizontal = SeriesHorizontal;


/***/ },

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var moment = __webpack_require__(2);
var SeriesVertical = (function () {
    function SeriesVertical() {
        this.type = 'standard';
        this.scaleType = 'ordinal';
        this.clickHandler = new core_1.EventEmitter();
    }
    SeriesVertical.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVertical.prototype.update = function () {
        var _this = this;
        var width;
        if (this.series.length) {
            if (this.scaleType === 'time') {
                var count = this.series.array[0].vals[0].label[0].length;
                var firstDate = this.series.array[0].vals[0].label[0][count - 1];
                var secondDate = moment(firstDate).add(1, 'hours');
                width = Math.abs(this.xScale(secondDate) - this.xScale(firstDate)) * 0.8;
            }
            else {
                width = this.xScale.bandwidth();
            }
        }
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; });
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                color: _this.colors(label),
                roundEdges: roundEdges,
                data: d,
                width: width,
                tooltipText: label + ": " + value,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = _this.dims.height - _this.yScale(value);
                bar.x = _this.xScale(label);
                bar.y = _this.yScale(value);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
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
            }
            return bar;
        });
    };
    SeriesVertical.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeriesVertical.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "clickHandler", void 0);
    SeriesVertical = __decorate([
        core_1.Component({
            selector: 'g[seriesVertical]',
            template: "\n    <svg:g bar *ngFor=\"let bar of bars\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (clickHandler)=\"click($event)\"\n      [gradient]=\"gradient\"\n\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"bar.tooltipText\"\n      [popoverGroup]=\"'charts'\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesVertical);
    return SeriesVertical;
}());
exports.SeriesVertical = SeriesVertical;


/***/ },

/***/ 667:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var Area = (function () {
    function Area(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Area.prototype.ngOnInit = function () {
        this.update();
    };
    Area.prototype.ngOnChanges = function () {
        this.update();
    };
    Area.prototype.update = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    Area.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node
            .attr('d', this.startingPath);
        this.animateToCurrentForm();
    };
    Area.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startingPath", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "opacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "endOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "activeLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Area.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Area.prototype, "clickHandler", void 0);
    Area = __decorate([
        core_1.Component({
            selector: 'g[area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n        [endOpacity]=\"endOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [attr.opacity]=\"opacity\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Area);
    return Area;
}());
exports.Area = Area;


/***/ },

/***/ 668:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var axis_label_component_1 = __webpack_require__(669);
var x_axis_component_1 = __webpack_require__(671);
var x_axis_ticks_component_1 = __webpack_require__(670);
var y_axis_component_1 = __webpack_require__(673);
var y_axis_ticks_component_1 = __webpack_require__(672);
var platform_browser_1 = __webpack_require__(90);
var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [axis_label_component_1.AxisLabel, x_axis_component_1.XAxis, x_axis_ticks_component_1.XAxisTicks, y_axis_component_1.YAxis, y_axis_ticks_component_1.YAxisTicks],
            exports: [axis_label_component_1.AxisLabel, x_axis_component_1.XAxis, x_axis_ticks_component_1.XAxisTicks, y_axis_component_1.YAxis, y_axis_ticks_component_1.YAxisTicks]
        }), 
        __metadata('design:paramtypes', [])
    ], AxesModule);
    return AxesModule;
}());
exports.AxesModule = AxesModule;


/***/ },

/***/ 669:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var AxisLabel = (function () {
    function AxisLabel() {
    }
    AxisLabel.prototype.ngOnInit = function () {
        this.update();
    };
    AxisLabel.prototype.ngOnChanges = function () {
        this.update();
    };
    AxisLabel.prototype.update = function () {
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
                this.y = -this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
            case 'right':
                this.y = this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "height", void 0);
    AxisLabel = __decorate([
        core_1.Component({
            selector: 'g[axisLabel]',
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AxisLabel);
    return AxisLabel;
}());
exports.AxisLabel = AxisLabel;


/***/ },

/***/ 670:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__(78);
var ticks_helper_1 = __webpack_require__(467);
var XAxisTicks = (function () {
    function XAxisTicks() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.maxAllowedLength = 16;
        Object.assign(this, {
            innerTickSize: 6,
            outerTickSize: 6,
            tickPadding: 3,
            rotateLabels: false,
            verticalSpacing: 20,
            textAnchor: 'middle',
            maxTicksLength: 0,
            trimLabel: trim_label_helper_1.trimLabel
        });
    }
    XAxisTicks.prototype.ngOnInit = function () {
        this.update();
    };
    XAxisTicks.prototype.ngOnChanges = function () {
        this.update();
    };
    XAxisTicks.prototype.update = function () {
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
                return d;
            };
        }
        var angle = this.getRotationAngle(this.ticks);
        this.adjustedScale = this.scale.bandwidth ? function (d) {
            return this.scale(d) + this.scale.bandwidth() * 0.5;
        } : this.scale;
        this.textTransform = '';
        if (angle !== 0) {
            this.textTransform = "rotate(" + angle + ")";
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
    };
    XAxisTicks.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = ticks[i].toString();
            if (tick.length > this.maxTicksLength) {
                this.maxTicksLength = tick.length;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8;
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicks.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicks.prototype.getMaxTicks = function () {
        var tickWidth = 20;
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicks.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicks.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickArguments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "gridLineHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "width", void 0);
    XAxisTicks = __decorate([
        core_1.Component({
            selector: 'g[xAxisTicks]',
            template: "\n    <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n      [attr.transform]=\"tickTransform(tick)\">\n      <title>{{tickFormat(tick)}}</title>\n      <svg:text\n        stroke-width=\"0.01\"\n        [attr.text-anchor]=\"textAnchor\"\n        [attr.transform]=\"textTransform\"\n        [style.font-size]=\"'12px'\">\n        {{trimLabel(tickFormat(tick))}}\n      </svg:text>\n\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n\n        <svg:line\n          class=\"gridline-path gridline-path-vertical gridline-path-shadow\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n        <svg:line\n          class=\"gridline-path gridline-path-vertical\"\n          x1=\"1\"\n          x2=\"1\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], XAxisTicks);
    return XAxisTicks;
}());
exports.XAxisTicks = XAxisTicks;


/***/ },

/***/ 671:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var XAxis = (function () {
    function XAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            xAxisClassName: 'x axis',
            xOrient: 'bottom',
            fill: 'none',
            stroke: 'none',
            tickStroke: '#ccc',
            strokeWidth: 'none',
            xAxisOffset: 5,
        });
    }
    XAxis.prototype.ngOnInit = function () {
        this.update();
    };
    XAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    XAxis.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
        if (typeof this.xAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xAxisTickInterval", void 0);
    XAxis = __decorate([
        core_1.Component({
            selector: 'g[xAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g xAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], XAxis);
    return XAxis;
}());
exports.XAxis = XAxis;


/***/ },

/***/ 672:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__(78);
var ticks_helper_1 = __webpack_require__(467);
var YAxisTicks = (function () {
    function YAxisTicks() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        Object.assign(this, {
            innerTickSize: 6,
            outerTickSize: 6,
            tickPadding: 3,
            rotateLabels: false,
            verticalSpacing: 20,
            textAnchor: 'middle',
            trimLabel: trim_label_helper_1.trimLabel
        });
    }
    YAxisTicks.prototype.ngOnInit = function () {
        this.update();
    };
    YAxisTicks.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxisTicks.prototype.update = function () {
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
                return d;
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        switch (this.orient) {
            case "top":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "bottom":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "left":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "end";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
            case "right":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "start";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
        }
    };
    YAxisTicks.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicks.prototype.getMaxTicks = function () {
        var tickHeight = 20;
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicks.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    YAxisTicks.prototype.gridLineTransform = function () {
        return "translate(0," + this.verticalSpacing + ")";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickArguments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "height", void 0);
    YAxisTicks = __decorate([
        core_1.Component({
            selector: 'g[yAxisTicks]',
            template: "\n    <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n      [attr.transform]=\"transform(tick)\" >\n      <title>{{tickFormat(tick)}}</title>\n      <svg:text\n        stroke-width=\"0.01\"\n        [attr.dy]=\"dy\"\n        [attr.x]=\"x1\"\n        [attr.y]=\"y1\"\n        [attr.text-anchor]=\"textAnchor\"\n\n        [style.font-size]=\"'12px'\">\n        {{trimLabel(tickFormat(tick))}}\n      </svg:text>\n\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal gridline-path-shadow\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          y1=\"1\"\n          y2=\"1\" />\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YAxisTicks);
    return YAxisTicks;
}());
exports.YAxisTicks = YAxisTicks;


/***/ },

/***/ 673:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var YAxis = (function () {
    function YAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            yAxisClassName: 'y axis',
            yOrient: 'left',
            fill: 'none',
            stroke: '#ccc',
            tickStroke: '#ccc',
            strokeWidth: '1',
            yAxisOffset: -5,
        });
    }
    YAxis.prototype.ngOnInit = function () {
        this.update();
    };
    YAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxis.prototype.update = function () {
        this.offset = this.yAxisOffset;
        if (this.yOrient === 'right') {
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
        if (typeof this.yAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yAxisTickInterval", void 0);
    YAxis = __decorate([
        core_1.Component({
            selector: 'g[yAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g yAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [height]=\"dims.height\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YAxis);
    return YAxis;
}());
exports.YAxis = YAxis;


/***/ },

/***/ 674:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var Chart = (function () {
    function Chart() {
        this.legend = false;
        this.legendTitle = 'Legend';
    }
    Chart.prototype.ngOnInit = function () {
        this.update();
    };
    Chart.prototype.ngOnChanges = function () {
        this.update();
    };
    Chart.prototype.update = function () {
        this.legendWidth = 0;
        if (this.legend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                this.legendWidth = 1;
            }
            else {
                this.legendWidth = 3;
            }
        }
        this.chartWidth = 12 - this.legendWidth;
    };
    Chart.prototype.getLegendType = function () {
        if (typeof this.legendData === 'function') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "colors", void 0);
    Chart = __decorate([
        core_1.Component({
            selector: 'chart',
            template: "\n    <svg\n      class=\"ng2d3\"\n      [attr.width]=\"view[0] * chartWidth / 12.0\"\n      [attr.height]=\"view[1]\">\n\n      <ng-content></ng-content>\n    </svg>\n\n    <scale-legend\n      *ngIf=\"legend && legendType === 'scaleLegend'\"\n      class=\"legend\"\n      [valueRange]=\"data\"\n      [colors]=\"legendData\"\n      [height]=\"view[1]\">\n    </scale-legend>\n\n    <legend\n      *ngIf=\"legend && legendType === 'legend'\"\n      class=\"legend\"\n      [data]=\"legendData\"\n      [title]=\"legendTitle\"\n      [colors]=\"colors\"\n      [height]=\"view[1]\">\n    </legend>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], Chart);
    return Chart;
}());
exports.Chart = Chart;


/***/ },

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var moment = __webpack_require__(2);
var object_id_1 = __webpack_require__(62);
var CircleSeries = (function () {
    function CircleSeries() {
        this.type = 'standard';
        this.clickHandler = new core_1.EventEmitter();
    }
    CircleSeries.prototype.ngOnInit = function () {
        this.update();
    };
    CircleSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CircleSeries.prototype.update = function () {
        this.circles = this.getCircles();
    };
    CircleSeries.prototype.getCircles = function () {
        var _this = this;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            if (value) {
                var cx = void 0;
                if (_this.scaleType === 'time') {
                    cx = _this.xScale(moment(label).toDate());
                }
                else if (_this.scaleType === 'linear') {
                    cx = _this.xScale(Number(label));
                }
                else {
                    cx = _this.xScale(label);
                }
                var cy = _this.yScale(_this.type === 'standard' ? value : d.d1);
                var radius = 5;
                var height = _this.yScale.range()[0] - cy;
                var gradientIdRect = 'grad' + object_id_1.default().toString();
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    gradientIdRect: gradientIdRect
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeries.prototype.click = function (value, label) {
        this.clickHandler.emit({
            name: label,
            value: value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "strokeColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "scaleType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "clickHandler", void 0);
    CircleSeries = __decorate([
        core_1.Component({
            selector: 'g[circleSeries]',
            template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <svg:rect\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"color\"\n        class=\"tooltip-bar\"\n        style=\"pointerEvents: 'none'; opacity: 0;\"\n      />\n\n      <svg:g circle\n        [attr.class]=\"className\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"color\"\n        [stroke]=\"strokeColor\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (clickHandler)=\"click($event, circle.label)\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSeries);
    return CircleSeries;
}());
exports.CircleSeries = CircleSeries;


/***/ },

/***/ 676:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var Circle = (function () {
    function Circle() {
        this.clickHandler = new core_1.EventEmitter();
    }
    Circle.prototype.ngOnInit = function () {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    Circle.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "r", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "classNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "circleOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "pointerEvents", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "clickHandler", void 0);
    Circle = __decorate([
        core_1.Component({
            selector: 'g[circle]',
            template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Circle);
    return Circle;
}());
exports.Circle = Circle;


/***/ },

/***/ 677:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var GridPanelSeries = (function () {
    function GridPanelSeries() {
    }
    GridPanelSeries.prototype.ngOnInit = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeries.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d, i) {
            var color = 'rgba(255,255,255,0.02)';
            var offset, width, height, x, y;
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = _this.xScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.xScale.range()[0] / 2;
                width = _this.xScale.bandwidth() + 2 * offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = _this.yScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.yScale.range()[0] / 2;
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + 2 * offset;
                x = 0;
                y = _this.yScale(d.name) - offset;
            }
            return {
                name: d.name,
                color: color,
                offset: offset,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "orient", void 0);
    GridPanelSeries = __decorate([
        core_1.Component({
            selector: 'g[gridPanelSeries]',
            template: "\n    <svg:g gridPanel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [fill]=\"gridPanel.color\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanelSeries);
    return GridPanelSeries;
}());
exports.GridPanelSeries = GridPanelSeries;


/***/ },

/***/ 678:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
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


/***/ },

/***/ 679:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__(78);
var Legend = (function () {
    function Legend() {
    }
    Legend.prototype.ngOnInit = function () {
        this.update();
    };
    Legend.prototype.ngOnChanges = function () {
        this.update();
    };
    Legend.prototype.update = function () {
        this.legendItems = this.getLegendItems();
    };
    Legend.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (label, index) {
            return {
                className: 'legend-label',
                label: label,
                trimmedLabel: trim_label_helper_1.trimLabel(label) || '(empty)',
                backgroundColor: _this.colors(label)
            };
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "height", void 0);
    Legend = __decorate([
        core_1.Component({
            selector: 'legend',
            template: "\n    <div >\n      <header class=\"legend-title\"\n        style=\"white-space: nowrap; overflow: hidden;\">\n        <span class=\"legend-icon incon-eye-1\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\" style=\"white-space: nowrap;\">\n          <li *ngFor=\"let legendItem of legendItems\" [class]=\"legendItem.className\">\n            <span\n              [title]=\"legendItem.label\"\n              class=\"legend-label-color\"\n              [style.background-color]=\"colors(legendItem.label)\">\n            </span>\n\n            <span [title]=\"legendItem.label\" class=\"legend-label-text\">\n              {{legendItem.trimmedLabel}}\n            </span>\n\n          </li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Legend);
    return Legend;
}());
exports.Legend = Legend;


/***/ },

/***/ 680:
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ 681:
/***/ function(module, exports) {

"use strict";
"use strict";
var caretOffset = 6;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    var result;
    if (alignment === 'top') {
        result = elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        result = elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        result = elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return result;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    var result;
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return result;
}
var PositionHelper = (function () {
    function PositionHelper() {
    }
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 - 1 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - 1 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2 - 1;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 - 1 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - 1 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2 - 1;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, alignment, spacing) {
        var flip = false;
        if (placement === 'right') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    return PositionHelper;
}());
exports.PositionHelper = PositionHelper;


/***/ },

/***/ 682:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var position_helper_1 = __webpack_require__(681);
var popover_registry_service_1 = __webpack_require__(680);
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


/***/ },

/***/ 683:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var ScaleLegend = (function () {
    function ScaleLegend() {
    }
    ScaleLegend.prototype.ngOnInit = function () {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = "linear-gradient(to bottom, " + gradientValues + ")";
    };
    ScaleLegend.prototype.gradientString = function (colors, splits) {
        splits.push(1);
        var pairs = [];
        colors.forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "valueRange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "height", void 0);
    ScaleLegend = __decorate([
        core_1.Component({
            selector: 'scale-legend',
            template: "\n    <div>\n      <div\n        style=\"padding: 10px 0px; width: 30px; text-align: center;\"\n        [style.height]=\"(height - 40) + 'px'\">\n\n        <div>\n          <span>{{valueRange[0]}}</span>\n        </div>\n\n        <div class=\"legend-wrap\"\n          style=\"height: 100%; width: 100%; border-radius: 5px;\"\n          [style.background]=\"gradient\">\n        </div>\n\n        <div>\n          <span>{{valueRange[1].toFixed()}}</span>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ScaleLegend);
    return ScaleLegend;
}());
exports.ScaleLegend = ScaleLegend;


/***/ },

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var SvgLinearGradient = (function () {
    function SvgLinearGradient() {
        this.orientation = 'vertical';
        this.endOpacity = 1;
    }
    SvgLinearGradient.prototype.ngOnInit = function () {
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "endOpacity", void 0);
    SvgLinearGradient = __decorate([
        core_1.Component({
            selector: 'g[svgLinearGradient]',
            template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop\n        [attr.offset]=\"'0%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        [attr.offset]=\"'100%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:linearGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgLinearGradient);
    return SvgLinearGradient;
}());
exports.SvgLinearGradient = SvgLinearGradient;


/***/ },

/***/ 685:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var SvgRadialGradient = (function () {
    function SvgRadialGradient() {
        this.endOpacity = 1;
    }
    SvgRadialGradient.prototype.ngOnInit = function () {
        this.cx = 0;
        this.cy = 0;
        this.r = "30%";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "endOpacity", void 0);
    SvgRadialGradient = __decorate([
        core_1.Component({
            selector: 'g[svgRadialGradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradient-units=\"userSpaceOnUse\">\n      <svg:stop\n        offset=\"0%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        offset=\"100%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:radialGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgRadialGradient);
    return SvgRadialGradient;
}());
exports.SvgRadialGradient = SvgRadialGradient;


/***/ },

/***/ 686:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var moment = __webpack_require__(2);
var throttle_1 = __webpack_require__(711);
var d3_1 = __webpack_require__(7);
var Timeline = (function () {
    function Timeline(element) {
        this.margin = [10, 20, 70, 20];
        this.clickHandler = new core_1.EventEmitter();
        this.updateXDomain = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnInit = function () {
        this.dims = this.calculateDims();
        var offsetY = this.view[1] - 150;
        var results = this.results;
        results.series[0] = results.series[0].sort(function (a, b) {
            return results.d0Domain.indexOf(a.vals[0].label[0][0]) - results.d0Domain.indexOf(b.vals[0].label[0][0]);
        });
        var yScale = d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(results.m0Domain);
        if (!this.autoScale) {
            yScale.domain([0, results.m0Domain[1]]);
        }
        this.xScale = this.calculateXScale();
        this.transform = "translate(" + this.margin[3] + " , " + (this.margin[0] + offsetY) + ")";
        this.addBrush();
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.state.brush) {
            this.brush = this.state.brush;
        }
        else {
            this.brush = d3_1.default.brushX(this.state.xScale)
                .on("brush", throttle_1.throttle(function () {
                var newDomain = _this.brush.empty() ? _this.state.xScale.domain() : _this.brush.extent();
                _this.updateXDomain.emit(newDomain);
            }, 100));
        }
        var height = 150 - this.margin[0] - this.margin[2];
        var width = this.view[0];
        if (this.legend) {
            width = width * 9 / 12.0;
        }
        width = width - this.margin[1] - this.margin[3];
        d3_1.default.select(this.element)
            .select('.brush')
            .call(this.brush)
            .selectAll("rect")
            .attr("y", 0)
            .attr("height", height);
        d3_1.default.select(this.element)
            .selectAll('.background')
            .attr('width', width);
    };
    Timeline.prototype.calculateXScale = function () {
        var xScale;
        var domain = d3_1.default.extent(this.results.d0Domain, function (d) {
            return moment(d).toDate();
        });
        if (this.state.xScale) {
            xScale = this.state.xScale;
        }
        else {
            xScale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(domain);
        }
        if (xScale.domain() !== domain) {
            xScale.domain(domain);
        }
        return xScale;
    };
    Timeline.prototype.calculateDims = function () {
        var width = this.view[0];
        var height = 150;
        if (this.legend) {
            width = width * 9 / 12.0;
        }
        var dims = {
            width: width - this.margin[1] - this.margin[3],
            height: height - this.margin[0] - this.margin[2]
        };
        return dims;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "miniChart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "autoScale", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "clickHandler", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "updateXDomain", void 0);
    Timeline = __decorate([
        core_1.Component({
            selector: 'g[timeline]',
            template: "\n    <svg:g\n      [attr.transform]=\"transform\">\n\n      <svg:g xAxis\n        [xScale]=\"xScale\"\n        [dims]=\"dims\"\n        [showGridLines]=\"showGridLines\"\n      />\n\n      <svg:g class=\"x brush\">\n      </svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Timeline);
    return Timeline;
}());
exports.Timeline = Timeline;


/***/ },

/***/ 687:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var HeatCellSeries = (function () {
    function HeatCellSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    HeatCellSeries.prototype.ngOnInit = function () {
        this.update();
    };
    HeatCellSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatCellSeries.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeries.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                var label = cell.name;
                cells.push({
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors(value),
                    data: value,
                    label: label,
                    series: row.name,
                    tooltipText: label + ": " + value
                });
            });
        });
        return cells;
    };
    HeatCellSeries.prototype.click = function (value, label, series) {
        this.clickHandler.emit({
            name: label,
            value: value,
            series: series
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatCellSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "clickHandler", void 0);
    HeatCellSeries = __decorate([
        core_1.Component({
            selector: 'g[heatMapCellSeries]',
            template: "\n    <svg:g heatMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event, c.label, c.series)\"\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"c.tooltipText\"\n      [popoverGroup]=\"'charts'\"\n      [gradient]=\"gradient\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeatCellSeries);
    return HeatCellSeries;
}());
exports.HeatCellSeries = HeatCellSeries;


/***/ },

/***/ 688:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var HeatMapCell = (function () {
    function HeatMapCell(element) {
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCell.prototype.ngOnInit = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = window.location.href;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    HeatMapCell.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCell.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCell.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatMapCell.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "clickHandler", void 0);
    HeatMapCell = __decorate([
        core_1.Component({
            selector: 'g[heatMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </defs>\n\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"click()\"\n      />\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HeatMapCell);
    return HeatMapCell;
}());
exports.HeatMapCell = HeatMapCell;


/***/ },

/***/ 689:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var base_chart_component_1 = __webpack_require__(17);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var HeatMap = (function (_super) {
    __extends(HeatMap, _super);
    function HeatMap() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.clickHandler = new core_1.EventEmitter();
    }
    HeatMap.prototype.ngOnInit = function () {
        this.update();
    };
    HeatMap.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatMap.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 11);
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMap.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMap.prototype.getYDomain = function () {
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
    HeatMap.prototype.getValueDomain = function () {
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
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    HeatMap.prototype.getXScale = function () {
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(0.1)
            .domain(this.xDomain);
    };
    HeatMap.prototype.getYScale = function () {
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(0.1)
            .domain(this.yDomain);
    };
    HeatMap.prototype.getRects = function () {
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
    HeatMap.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    HeatMap.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'linear', this.valueDomain);
        this.colorScale = color_sets_1.generateColorScale(this.scheme, 'linear', this.valueDomain);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatMap.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "clickHandler", void 0);
    HeatMap = __decorate([
        core_1.Component({
            selector: 'heat-map',
            template: "\n    <chart\n      [legend]=\"false\"\n      [legendData]=\"colorScale\"\n      [data]=\"results.m0Domain\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"numbercard\">\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n\n        <svg:g heatMapCellSeries\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMap);
    return HeatMap;
}(base_chart_component_1.BaseChart));
exports.HeatMap = HeatMap;


/***/ },

/***/ 690:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var heat_map_cell_component_1 = __webpack_require__(688);
var heat_map_cell_series_component_1 = __webpack_require__(687);
var heat_map_component_1 = __webpack_require__(689);
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                heat_map_cell_component_1.HeatMapCell,
                heat_map_cell_series_component_1.HeatCellSeries,
                heat_map_component_1.HeatMap
            ],
            exports: [
                heat_map_cell_component_1.HeatMapCell,
                heat_map_cell_series_component_1.HeatCellSeries,
                heat_map_component_1.HeatMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMapModule);
    return HeatMapModule;
}());
exports.HeatMapModule = HeatMapModule;


/***/ },

/***/ 691:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var object_id_1 = __webpack_require__(62);
var d3_1 = __webpack_require__(7);
var moment_1 = __webpack_require__(2);
var LineChart = (function (_super) {
    __extends(LineChart, _super);
    function LineChart() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.clickHandler = new core_1.EventEmitter();
    }
    LineChart.prototype.ngOnInit = function () {
        this.update();
    };
    LineChart.prototype.ngOnChanges = function () {
        this.update();
    };
    LineChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        var clipPathId = 'clip' + object_id_1.default().toString();
        this.clipPath = "url(" + pageUrl + "#" + clipPathId + ")";
    };
    LineChart.prototype.getXDomain = function () {
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
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment_1.default(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    LineChart.prototype.getYDomain = function () {
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
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    LineChart.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChart.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    LineChart.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    LineChart.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    LineChart.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    LineChart.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    LineChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LineChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "clickHandler", void 0);
    LineChart = __decorate([
        core_1.Component({
            selector: 'line-chart',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath id=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            transform=\"translate(-5, -5)\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n        <!--\n          <svg:g area\n            *ngIf=\"gradient\"\n            [fill]=\"colors('Line')\"\n            [path]=\"areaPath\"\n            [startingPath]=\"areaPath\"\n            [data]=\"series\"\n            startOpacity=\"0\"\n            endOpacity=\"0.2\"\n            [gradient]=\"gradient\"\n          />\n          -->\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g lineSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LineChart);
    return LineChart;
}(base_chart_component_1.BaseChart));
exports.LineChart = LineChart;


/***/ },

/***/ 692:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var line_component_1 = __webpack_require__(694);
var line_chart_component_1 = __webpack_require__(691);
var line_series_component_1 = __webpack_require__(693);
var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                line_component_1.Line,
                line_chart_component_1.LineChart,
                line_series_component_1.LineSeries
            ],
            exports: [
                line_component_1.Line,
                line_chart_component_1.LineChart,
                line_series_component_1.LineSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartModule);
    return LineChartModule;
}());
exports.LineChartModule = LineChartModule;


/***/ },

/***/ 693:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var moment_1 = __webpack_require__(2);
var LineSeries = (function () {
    function LineSeries() {
    }
    LineSeries.prototype.ngOnInit = function () {
        this.update();
    };
    LineSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    LineSeries.prototype.update = function () {
        var _this = this;
        var line = d3_1.default.line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(moment_1.default(label).toDate());
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); });
        var data = this.data.series;
        this.path = line(data) || '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "scaleType", void 0);
    LineSeries = __decorate([
        core_1.Component({
            selector: 'g[lineSeries]',
            template: "\n    <svg:g line\n      [data]=\"data\"\n      [path]=\"path\"\n      [stroke]=\"color\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LineSeries);
    return LineSeries;
}());
exports.LineSeries = LineSeries;


/***/ },

/***/ 694:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var Line = (function () {
    function Line() {
        this.clickHandler = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Line.prototype, "clickHandler", void 0);
    Line = __decorate([
        core_1.Component({
            selector: 'g[line]',
            template: "\n    <svg:path\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n      style=\"strokeDasharray: 2000; strokeDashoffset: 0\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Line);
    return Line;
}());
exports.Line = Line;


/***/ },

/***/ 695:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var CardSeries = (function () {
    function CardSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    CardSeries.prototype.ngOnInit = function () {
        this.update();
    };
    CardSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CardSeries.prototype.update = function () {
        this.cards = this.getCards();
    };
    CardSeries.prototype.getCards = function () {
        var _this = this;
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            var value = d.data.value;
            return {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                color: _this.colors(label),
                label: d.data.label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "clickHandler", void 0);
    CardSeries = __decorate([
        core_1.Component({
            selector: 'g[cardSeries]',
            template: "\n    <svg:g card *ngFor=\"let c of cards\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event)\"\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"c.tooltipText\"\n      [popoverGroup]=\"'charts'\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CardSeries);
    return CardSeries;
}());
exports.CardSeries = CardSeries;


/***/ },

/***/ 696:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__(78);
var d3_1 = __webpack_require__(7);
var Card = (function () {
    function Card(element) {
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Card.prototype.ngOnInit = function () {
        this.update();
    };
    Card.prototype.update = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.label = this.data.name;
        this.trimmedLabel = trim_label_helper_1.trimLabel(this.label, 55);
        this.value = d3_1.default.format(",.0f")(this.data.value);
        this.cardWidth = Math.max(0, this.width - 5);
        this.cardHeight = Math.max(0, this.height - 5);
        this.textWidth = Math.max(0, this.width - 15);
        this.loadAnimation();
    };
    Card.prototype.loadAnimation = function () {
        this.animateToCurrentForm();
    };
    Card.prototype.animateToCurrentForm = function () {
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        };
        var endValue = this.data.value;
        if (this.data.valueType === 'currency') {
            options.prefix = '$';
        }
        else if (this.data.valueType === 'duration') {
            if (endValue < 60) {
                options.suffix = ' sec';
            }
            else if (endValue < 3600) {
                endValue = endValue / 60;
                options.suffix = ' min';
            }
            else {
                endValue = endValue / 3600;
                options.suffix = ' hours';
            }
        }
    };
    Card.prototype.click = function () {
        this.clickHandler.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Card.prototype, "clickHandler", void 0);
    Card = __decorate([
        core_1.Component({
            selector: 'g[card]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\"\n      (click)=\"click()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [style.opacity]=\"0.3\"\n        style=\"cursor: pointer; stroke-width: 2px; stroke: #192024;\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        x=\"5\"\n        [attr.y]=\"height * 0.7\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"height * 0.3\"\n        style=\"fill: #fff; font-size: 12px; pointer-events: none; text-transform: uppercase; overflow: hidden; text-align: center;\">\n        <xhtml:p>\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n\n      <svg:text\n        [attr.x]=\"width / 2\"\n        [attr.y]=\"height * 0.30\"\n        dy='.35em'\n        class=\"value-text\"\n        [style.fill]=\"color\"\n        text-anchor=\"middle\"\n        style=\"font-size: 46px; pointer-events: none;\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Card);
    return Card;
}());
exports.Card = Card;


/***/ },

/***/ 697:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var base_chart_component_1 = __webpack_require__(17);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var grid_layout_helper_1 = __webpack_require__(468);
var NumberCard = (function (_super) {
    __extends(NumberCard, _super);
    function NumberCard() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
    }
    NumberCard.prototype.ngOnInit = function () {
        this.update();
    };
    NumberCard.prototype.ngOnChanges = function () {
        this.update();
    };
    NumberCard.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = grid_layout_helper_1.gridLayout(this.dims, this.results, 150);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    NumberCard.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCard.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    NumberCard.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "clickHandler", void 0);
    NumberCard = __decorate([
        core_1.Component({
            selector: 'number-card',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"numbercard\">\n        <svg:g cardSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCard);
    return NumberCard;
}(base_chart_component_1.BaseChart));
exports.NumberCard = NumberCard;


/***/ },

/***/ 698:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var card_component_1 = __webpack_require__(696);
var card_series_component_1 = __webpack_require__(695);
var number_card_component_1 = __webpack_require__(697);
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                card_component_1.Card,
                card_series_component_1.CardSeries,
                number_card_component_1.NumberCard
            ],
            exports: [
                card_component_1.Card,
                card_series_component_1.CardSeries,
                number_card_component_1.NumberCard
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCardModule);
    return NumberCardModule;
}());
exports.NumberCardModule = NumberCardModule;


/***/ },

/***/ 699:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var trim_label_helper_1 = __webpack_require__(78);
var AdvancedPieChart = (function (_super) {
    __extends(AdvancedPieChart, _super);
    function AdvancedPieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new core_1.EventEmitter();
    }
    AdvancedPieChart.prototype.ngOnInit = function () {
        this.update();
    };
    AdvancedPieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AdvancedPieChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions([this.view[0] * 4 / 12.0, this.view[1]], this.margin, false, false, false);
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        this.total = this.getTotal();
        this.roundedTotal = Math.round(this.total);
        this.totalLabel = 'total';
        this.legendItems = this.getLegendItems();
    };
    AdvancedPieChart.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    AdvancedPieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChart.prototype.getLegendItems = function () {
        var _this = this;
        return this.results.map(function (d, index) {
            var label = d.name;
            var value = d.value;
            var percentage = Math.round(value / _this.total * 100);
            return {
                value: Math.round(value),
                label: trim_label_helper_1.trimLabel(label, 20),
                percentage: percentage
            };
        });
    };
    AdvancedPieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    AdvancedPieChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AdvancedPieChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "clickHandler", void 0);
    AdvancedPieChart = __decorate([
        core_1.Component({
            selector: 'advanced-pie-chart',
            template: "\n    <div class=\"advanced-pie\"\n      [style.width]=\"dims.width\"\n      [style.height]=\"view[1]\">\n\n      <chart\n        [colors]=\"colors\"\n        [view]=\"[dims.width, dims.height]\">\n\n        <svg:g\n          [attr.transform]=\"transform\"\n          class=\"pie chart\">\n          <svg:g pieSeries\n            [colors]=\"colors\"\n            [showLabels]=\"labels\"\n            [series]=\"results\"\n            [innerRadius]=\"innerRadius\"\n            [outerRadius]=\"outerRadius\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event)\">\n          </svg:g>\n        </svg:g>\n      </chart>\n    </div>\n\n    <div [style.width]=\"view[0] - dims.width\">\n      <div class=\"advanced-pie-legend\"\n        [style.margin-top]=\"(view[1] - 215)/2\">\n\n        <div class=\"total-value\">\n          {{roundedTotal}}\n        </div>\n        <div class=\"total-label\">\n          {{totalLabel}}\n        </div>\n\n        <div class=\"legend-items-container\">\n          <div class=\"legend-items\">\n            <div *ngFor=\"let legendItem of legendItems\" class=\"legend-item\">\n              <div class=\"item-color\"\n                [style.background]=\"colors(legendItem.label)\">\n              </div>\n              <div class=\"item-value\">{{legendItem.value}}</div>\n              <div class=\"item-label\">{{legendItem.label}}</div>\n              <div class=\"item-percent\">{{legendItem.percentage}}%</div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AdvancedPieChart);
    return AdvancedPieChart;
}(base_chart_component_1.BaseChart));
exports.AdvancedPieChart = AdvancedPieChart;


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facade_collection__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facade_lang__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validators__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_value_accessor__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__default_value_accessor__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__normalize_validator__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__number_value_accessor__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__radio_control_value_accessor__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_control_value_accessor__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__select_multiple_control_value_accessor__ = __webpack_require__(149);
/* harmony export (immutable) */ exports["a"] = controlPath;
/* harmony export (immutable) */ exports["d"] = setUpControl;
/* harmony export (immutable) */ exports["h"] = cleanUpControl;
/* harmony export (immutable) */ exports["e"] = setUpFormContainer;
/* harmony export (immutable) */ exports["b"] = composeValidators;
/* harmony export (immutable) */ exports["c"] = composeAsyncValidators;
/* harmony export (immutable) */ exports["g"] = isPropertyUpdated;
/* unused harmony export isBuiltInAccessor */
/* harmony export (immutable) */ exports["f"] = selectValueAccessor;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */










function controlPath(name, parent) {
    var p = __WEBPACK_IMPORTED_MODULE_0__facade_collection__["b" /* ListWrapper */].clone(parent.path);
    p.push(name);
    return p;
}
function setUpControl(control, dir) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(control))
        _throwError(dir, 'Cannot find control with');
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(dir.valueAccessor))
        _throwError(dir, 'No value accessor for form control with');
    control.validator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].compose([control.validator, dir.validator]);
    control.asyncValidator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange(function (newValue) {
        dir.viewToModelUpdate(newValue);
        control.markAsDirty();
        control.setValue(newValue, { emitModelToViewChange: false });
    });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
    control.registerOnChange(function (newValue, emitModelEvent) {
        // control -> view
        dir.valueAccessor.writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    });
    if (dir.valueAccessor.setDisabledState) {
        control.registerOnDisabledChange(function (isDisabled) { dir.valueAccessor.setDisabledState(isDisabled); });
    }
    // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
    dir._rawValidators.forEach(function (validator) {
        if (validator.registerOnChange)
            validator.registerOnChange(function () { return control.updateValueAndValidity(); });
    });
    dir._rawAsyncValidators.forEach(function (validator) {
        if (validator.registerOnChange)
            validator.registerOnChange(function () { return control.updateValueAndValidity(); });
    });
}
function cleanUpControl(control, dir) {
    dir.valueAccessor.registerOnChange(function () { return _noControlError(dir); });
    dir.valueAccessor.registerOnTouched(function () { return _noControlError(dir); });
    dir._rawValidators.forEach(function (validator) { return validator.registerOnChange(null); });
    dir._rawAsyncValidators.forEach(function (validator) { return validator.registerOnChange(null); });
    if (control)
        control._clearChangeFns();
}
function setUpFormContainer(control, dir) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(control))
        _throwError(dir, 'Cannot find control with');
    control.validator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].compose([control.validator, dir.validator]);
    control.asyncValidator = __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].composeAsync([control.asyncValidator, dir.asyncValidator]);
}
function _noControlError(dir) {
    return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}
function _throwError(dir, message) {
    var messageEnd;
    if (dir.path.length > 1) {
        messageEnd = "path: '" + dir.path.join(' -> ') + "'";
    }
    else if (dir.path[0]) {
        messageEnd = "name: '" + dir.path + "'";
    }
    else {
        messageEnd = 'unspecified name attribute';
    }
    throw new Error(message + " " + messageEnd);
}
function composeValidators(validators) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(validators) ? __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].compose(validators.map(__WEBPACK_IMPORTED_MODULE_5__normalize_validator__["a" /* normalizeValidator */])) : null;
}
function composeAsyncValidators(validators) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(validators) ? __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* Validators */].composeAsync(validators.map(__WEBPACK_IMPORTED_MODULE_5__normalize_validator__["b" /* normalizeAsyncValidator */])) :
        null;
}
function isPropertyUpdated(changes, viewModel) {
    if (!__WEBPACK_IMPORTED_MODULE_0__facade_collection__["a" /* StringMapWrapper */].contains(changes, 'model'))
        return false;
    var change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["l" /* looseIdentical */])(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
    return (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(valueAccessor, __WEBPACK_IMPORTED_MODULE_3__checkbox_value_accessor__["a" /* CheckboxControlValueAccessor */]) ||
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(valueAccessor, __WEBPACK_IMPORTED_MODULE_6__number_value_accessor__["a" /* NumberValueAccessor */]) ||
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(valueAccessor, __WEBPACK_IMPORTED_MODULE_8__select_control_value_accessor__["a" /* SelectControlValueAccessor */]) ||
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(valueAccessor, __WEBPACK_IMPORTED_MODULE_9__select_multiple_control_value_accessor__["a" /* SelectMultipleControlValueAccessor */]) ||
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(valueAccessor, __WEBPACK_IMPORTED_MODULE_7__radio_control_value_accessor__["a" /* RadioControlValueAccessor */]));
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["c" /* isBlank */])(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function (v) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["m" /* hasConstructor */])(v, __WEBPACK_IMPORTED_MODULE_4__default_value_accessor__["a" /* DefaultValueAccessor */])) {
            defaultAccessor = v;
        }
        else if (isBuiltInAccessor(v)) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(builtinAccessor))
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(customAccessor))
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(customAccessor))
        return customAccessor;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(builtinAccessor))
        return builtinAccessor;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__facade_lang__["a" /* isPresent */])(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for form control with');
    return null;
}
//# sourceMappingURL=shared.js.map

/***/ },

/***/ 700:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var object_id_1 = __webpack_require__(62);
var PieArc = (function () {
    function PieArc(element) {
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieArc.prototype.ngOnInit = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.3;
        var pageUrl = window.location.href;
        this.radialGradientId = 'linearGrad' + object_id_1.default().toString();
        this.linearGradientId = 'radialGrad' + object_id_1.default().toString();
        if (this.innerRadius !== 0) {
            this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        }
        else {
            this.gradientFill = "url(" + pageUrl + "#" + this.linearGradientId + ")";
        }
        this.loadAnimation();
    };
    PieArc.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return d3_1.default.arc()
            .innerRadius(this.innerRadius).outerRadius(outerRadius);
    };
    PieArc.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArc.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "endAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "total", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArc.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "clickHandler", void 0);
    PieArc = __decorate([
        core_1.Component({
            selector: 'g[pieArc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"linearGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n        <svg:g svgRadialGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [style.cursor]=\"'pointer'\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"click()\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieArc);
    return PieArc;
}());
exports.PieArc = PieArc;


/***/ },

/***/ 701:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.labels = false;
        this.legend = false;
        this.explodeSlices = false;
        this.doughnut = false;
        this.clickHandler = new core_1.EventEmitter();
    }
    PieChart.prototype.ngOnInit = function () {
        this.update();
    };
    PieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    PieChart.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        var dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, this.legend, 9);
        var xOffset = this.margin[3] + dims.width / 2;
        var yOffset = this.margin[0] + dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(dims.width, dims.height);
        if (this.labels) {
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * 0.75;
        }
        this.domain = this.getDomain();
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
    };
    PieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieChart.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "labels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "doughnut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "clickHandler", void 0);
    PieChart = __decorate([
        core_1.Component({
            selector: 'pie-chart',
            template: "\n    <chart\n      [colors]=\"colors\"\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [legendData]=\"domain\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie chart\">\n        <svg:g pieSeries\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"data\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieChart);
    return PieChart;
}(base_chart_component_1.BaseChart));
exports.PieChart = PieChart;


/***/ },

/***/ 702:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var advanced_pie_chart_component_1 = __webpack_require__(699);
var pie_label_component_1 = __webpack_require__(705);
var pie_arc_component_1 = __webpack_require__(700);
var pie_chart_component_1 = __webpack_require__(701);
var pie_grid_component_1 = __webpack_require__(704);
var pie_grid_series_component_1 = __webpack_require__(703);
var pie_series_component_1 = __webpack_require__(706);
var PieChartModule = (function () {
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                advanced_pie_chart_component_1.AdvancedPieChart,
                pie_label_component_1.PieLabel,
                pie_arc_component_1.PieArc,
                pie_chart_component_1.PieChart,
                pie_grid_component_1.PieGrid,
                pie_grid_series_component_1.PieGridSeries,
                pie_series_component_1.PieSeries
            ],
            exports: [
                advanced_pie_chart_component_1.AdvancedPieChart,
                pie_label_component_1.PieLabel,
                pie_arc_component_1.PieArc,
                pie_chart_component_1.PieChart,
                pie_grid_component_1.PieGrid,
                pie_grid_series_component_1.PieGridSeries,
                pie_series_component_1.PieSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartModule);
    return PieChartModule;
}());
exports.PieChartModule = PieChartModule;


/***/ },

/***/ 703:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var PieGridSeries = (function () {
    function PieGridSeries(element) {
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeries.prototype.ngOnInit = function () {
        this.update();
    };
    PieGridSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGridSeries.prototype.update = function () {
        this.layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
        this.loadAnimation();
    };
    PieGridSeries.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var genArcPath = d3_1.default.arc()
                .innerRadius(_this.innerRadius).outerRadius(_this.outerRadius)
                .startAngle(arc.startAngle).endAngle(arc.endAngle);
            return {
                class: 'arc ' + 'arc' + index,
                d: genArcPath(),
                cursor: other ? 'auto' : 'pointer',
                fill: _this.colors(label),
                opacity: other ? 0.4 : 1
            };
        });
    };
    PieGridSeries.prototype.loadAnimation = function () {
        var layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        var data = layout(this.data);
        var node = d3_1.default.select(this.element).selectAll('.arc1').data([{
                startAngle: data[0].startAngle,
                endAngle: data[0].endAngle
            }]);
        var arc = this.calculateArc(this.innerRadius, this.outerRadius);
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieGridSeries.prototype.calculateArc = function (innerRadius, outerRadius) {
        return d3_1.default.arc()
            .innerRadius(innerRadius).outerRadius(outerRadius);
    };
    PieGridSeries.prototype.click = function (data) {
        this.clickHandler.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "clickHandler", void 0);
    PieGridSeries = __decorate([
        core_1.Component({
            selector: 'g[pieGridSeries]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:path *ngFor=\"let arc of arcs\"\n        [attr.class]=\"arc.class\"\n        [attr.d]=\"arc.d\"\n        [style.cursor]=\"arc.cursor\"\n        [style.opacity]=\"arc.opacity\"\n        [attr.fill]=\"arc.fill\"\n        (click)=\"click(arc.data)\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieGridSeries);
    return PieGridSeries;
}());
exports.PieGridSeries = PieGridSeries;


/***/ },

/***/ 704:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var base_chart_component_1 = __webpack_require__(17);
var trim_label_helper_1 = __webpack_require__(78);
var grid_layout_helper_1 = __webpack_require__(468);
var d3_1 = __webpack_require__(7);
var PieGrid = (function (_super) {
    __extends(PieGrid, _super);
    function PieGrid() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new core_1.EventEmitter();
    }
    PieGrid.prototype.ngOnInit = function () {
        this.update();
    };
    PieGrid.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGrid.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = grid_layout_helper_1.gridLayout(this.dims, this.results, 150);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
    };
    PieGrid.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGrid.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var label = d.data.name;
            var value = d.data.value;
            var radius = d3_1.default.min([d.width, d.height]) / 2.1;
            var innerRadius = radius * 0.75;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale(label);
                }
            };
            return {
                transform: "translate(" + (d.x + d.width / 2) + " , " + (d.y + d.height / 2) + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                label: trim_label_helper_1.trimLabel(label),
                total: "Total: " + d3_1.default.format(".2f")(value),
                percent: d3_1.default.format(".1p")(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: 'other'
                        }
                    }]
            };
        });
    };
    PieGrid.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    PieGrid.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieGrid.prototype.setColors = function () {
        this.colorScale = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "clickHandler", void 0);
    PieGrid = __decorate([
        core_1.Component({
            selector: 'pie-grid',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\" >\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid-chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n\n          <svg:g pieGridSeries\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (clickHandler)=\"click($event)\"\n          />\n\n          <svg:text\n            class=\"label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.percent}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\">\n            {{series.total}}\n          </svg:text>\n\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieGrid);
    return PieGrid;
}(base_chart_component_1.BaseChart));
exports.PieGrid = PieGrid;


/***/ },

/***/ 705:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__(78);
var d3_1 = __webpack_require__(7);
var PieLabel = (function () {
    function PieLabel(element) {
        this.element = element.nativeElement;
        this.trimLabel = trim_label_helper_1.trimLabel;
    }
    PieLabel.prototype.ngOnInit = function () {
        this.update();
    };
    PieLabel.prototype.ngOnChanges = function () {
        this.update();
    };
    PieLabel.prototype.update = function () {
        var factor = 1.5;
        var outerArc = d3_1.default.arc()
            .innerRadius(this.radius * factor)
            .outerRadius(this.radius * factor);
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = d3_1.default.arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        this.labelXY = outerArc.centroid(this.data);
        this.labelXY[0] = this.radius * factor * (this.midAngle(this.data) < Math.PI ? 1 : -1);
        this.labelXY[1] = this.data.pos[1];
        this.line = "M" + innerArc.centroid(this.data) + "L" + outerArc.centroid(this.data) + "L" + this.labelXY;
        this.transform = "translate(" + this.labelXY + ")";
        this.loadAnimation();
    };
    PieLabel.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? "start" : "end";
    };
    PieLabel.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieLabel.prototype.loadAnimation = function () {
        var label = d3_1.default.select(this.element).select('.label');
        var line = d3_1.default.select(this.element).select('.line');
        label
            .attr('opacity', 0)
            .transition().delay(750).duration(750)
            .attr('opacity', 1);
        line
            .style('stroke-dashoffset', 2000)
            .transition().delay(750).duration(750)
            .style('stroke-dashoffset', '0')
            .transition()
            .style('stroke-dasharray', 'none');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "radius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "explodeSlices", void 0);
    PieLabel = __decorate([
        core_1.Component({
            selector: 'g[pieLabel]',
            template: "\n    <title>{{label}}</title>\n    <svg:text\n      class=\"label\"\n      [attr.transform]=\"transform\"\n      dy=\".35em\"\n      [style.textAnchor]=\"textAnchor()\"\n      [style.shapeRendering]=\"'crispEdges'\"\n      [style.textTransform]=\"'uppercase'\">\n      {{trimLabel(label)}}\n    </svg:text>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"line\"\n      [style.strokeDasharray]=\"2000\"\n      [style.strokeDashoffset]=\"0\">\n    </svg:path>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieLabel);
    return PieLabel;
}());
exports.PieLabel = PieLabel;


/***/ },

/***/ 706:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var PieSeries = (function () {
    function PieSeries() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new core_1.EventEmitter();
    }
    PieSeries.prototype.ngOnInit = function () {
        this.update();
    };
    PieSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieSeries.prototype.update = function () {
        var pie = d3_1.default.pie()
            .value(function (d) { return d.value; })
            .sort(null);
        this.total = this.getTotal();
        var arcData = pie(this.series);
        this.max = d3_1.default.max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
    };
    PieSeries.prototype.getTotal = function () {
        return this.series
            .map(function (d) { return d.value; })
            .reduce(function (sum, val) { return sum + val; });
    };
    PieSeries.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeries.prototype.outerArc = function () {
        var factor = 1.5;
        return d3_1.default.arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeries.prototype.calculateLabelPositions = function (pieData) {
        var minDistance = 10;
        var chart = this;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = chart.outerArc().centroid(d);
            d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (b.pos[0] * a.pos[0] > 0) {
                    if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
                        labelPositions[j].pos[1] = b.pos[1] + minDistance;
                        j--;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeries.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeries.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieSeries.prototype.tooltipText = function (arc) {
        return this.label(arc) + ": " + arc.data.value;
    };
    PieSeries.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    PieSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "showLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieSeries.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "clickHandler", void 0);
    PieSeries = __decorate([
        core_1.Component({
            selector: 'g[pieSeries]',
            template: "\n    <svg:g *ngFor=\"let arc of data\">\n      <svg:g pieLabel\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"label(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n\n      <svg:g pieArc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [total]=\"total\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        (clickHandler)=\"click($event)\"\n        sw-popover\n        [popoverSpacing]=\"15\"\n        [popoverText]=\"tooltipText(arc)\"\n        [popoverGroup]=\"'charts'\"\n        [gradient]=\"gradient\"\n      ></svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieSeries);
    return PieSeries;
}());
exports.PieSeries = PieSeries;


/***/ },

/***/ 707:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var TreeMapCellSeries = (function () {
    function TreeMapCellSeries() {
        this.clickHandler = new core_1.EventEmitter();
    }
    TreeMapCellSeries.prototype.ngOnInit = function () {
        this.cells = this.getCells();
    };
    TreeMapCellSeries.prototype.getCells = function () {
        var _this = this;
        return this.data
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            return {
                x: d.x,
                y: d.y,
                width: d.dx,
                height: d.dy,
                fill: _this.colors(d.label),
                label: d.label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "clickHandler", void 0);
    TreeMapCellSeries = __decorate([
        core_1.Component({
            selector: 'g[treeMapCellSeries]',
            template: "\n    <svg:g treeMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (clickHandler)=\"click($event)\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapCellSeries);
    return TreeMapCellSeries;
}());
exports.TreeMapCellSeries = TreeMapCellSeries;


/***/ },

/***/ 708:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var TreeMapCell = (function () {
    function TreeMapCell(element) {
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    TreeMapCell.prototype.ngOnInit = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.loadAnimation();
    };
    TreeMapCell.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    TreeMapCell.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    TreeMapCell.prototype.click = function () {
        this.clickHandler.emit(this.label);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "valueType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "clickHandler", void 0);
    TreeMapCell = __decorate([
        core_1.Component({
            selector: 'g[treeMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        (click)=\"click()\"\n      />\n\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        x=\"0\"\n        [attr.y]=\"height/2 - 15\"\n        [attr.width]=\"width\"\n        height=\"40\">\n        <xhtml:p>\n          <xhtml:b>{{label}}</xhtml:b>\n          <xhtml:br/>\n          {{formattedValue}}\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeMapCell);
    return TreeMapCell;
}());
exports.TreeMapCell = TreeMapCell;


/***/ },

/***/ 709:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__(7);
var base_chart_component_1 = __webpack_require__(17);
var view_dimensions_helper_1 = __webpack_require__(18);
var color_sets_1 = __webpack_require__(19);
var TreeMap = (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
    }
    TreeMap.prototype.ngOnInit = function () {
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false, 12);
        var data = [];
        for (var i = 0; i < this.results.data.length; i++) {
            data[i] = {};
            data[i].value = this.results.data[i].value;
            data[i].valueType = this.results.data[i].valueType;
            data[i].label = this.results.data[i].label;
        }
        this.treemap = d3_1.default.treemap()
            .children(function (d) { return d; })
            .size([this.dims.width, this.dims.height])
            .sticky(true)
            .value(function (d) { return d.value; });
        this.data = this.treemap(data);
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMap.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    TreeMap.prototype.setColors = function () {
    };
    TreeMap.prototype.update = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "clickHandler", void 0);
    TreeMap = __decorate([
        core_1.Component({
            selector: 'tree-map',
            template: "\n    <chart\n      legend=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"treemap\">\n        <svg:g treeMapCellSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMap);
    return TreeMap;
}(base_chart_component_1.BaseChart));
exports.TreeMap = TreeMap;


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var chart_component_1 = __webpack_require__(674);
var legend_component_1 = __webpack_require__(679);
var scale_legend_component_1 = __webpack_require__(683);
var axes_module_component_1 = __webpack_require__(668);
var sw_popover_component_1 = __webpack_require__(682);
var circle_series_component_1 = __webpack_require__(675);
var circle_component_1 = __webpack_require__(676);
var grid_panel_component_1 = __webpack_require__(678);
var grid_panel_series_component_1 = __webpack_require__(677);
var svg_linear_gradient_component_1 = __webpack_require__(684);
var svg_radial_gradient_component_1 = __webpack_require__(685);
var timeline_component_1 = __webpack_require__(686);
var platform_browser_1 = __webpack_require__(90);
var area_component_1 = __webpack_require__(667);
var COMPONENTS = [
    area_component_1.Area,
    chart_component_1.Chart,
    legend_component_1.Legend,
    scale_legend_component_1.ScaleLegend,
    circle_component_1.Circle,
    sw_popover_component_1.Popover,
    circle_series_component_1.CircleSeries,
    grid_panel_component_1.GridPanel,
    grid_panel_series_component_1.GridPanelSeries,
    svg_linear_gradient_component_1.SvgLinearGradient,
    svg_radial_gradient_component_1.SvgRadialGradient,
    timeline_component_1.Timeline
];
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                axes_module_component_1.AxesModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                platform_browser_1.BrowserModule,
                axes_module_component_1.AxesModule
            ].concat(COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;


/***/ },

/***/ 710:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_module_1 = __webpack_require__(71);
var tree_map_cell_component_1 = __webpack_require__(708);
var tree_map_cell_series_component_1 = __webpack_require__(707);
var tree_map_component_1 = __webpack_require__(709);
var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    TreeMapModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                tree_map_cell_component_1.TreeMapCell,
                tree_map_cell_series_component_1.TreeMapCellSeries,
                tree_map_component_1.TreeMap
            ],
            exports: [
                tree_map_cell_component_1.TreeMapCell,
                tree_map_cell_series_component_1.TreeMapCellSeries,
                tree_map_component_1.TreeMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapModule);
    return TreeMapModule;
}());
exports.TreeMapModule = TreeMapModule;


/***/ },

/***/ 711:
/***/ function(module, exports) {

"use strict";
"use strict";
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function () {
            var last = new Date().getTime() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
        }
        return result;
    };
}
exports.debounce = debounce;
function debounceable(duration, immediate) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: debounce(descriptor.value, duration, immediate)
                });
                return this[key];
            }
        };
    };
}
exports.debounceable = debounceable;
function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function () {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = func.apply(context, args);
    };
    return function () {
        var now = new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now.getTime() - previous);
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
exports.throttle = throttle;
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
exports.throttleable = throttleable;


/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_control_directive__ = __webpack_require__(212);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgControl; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * A base class that all control directive extend.
 * It binds a {@link FormControl} object to a DOM element.
 *
 * Used internally by Angular forms.
 *
 * @stable
 */
var NgControl = (function (_super) {
    __extends(NgControl, _super);
    function NgControl() {
        _super.apply(this, arguments);
        /** @internal */
        this._parent = null;
        this.name = null;
        this.valueAccessor = null;
        /** @internal */
        this._rawValidators = [];
        /** @internal */
        this._rawAsyncValidators = [];
    }
    Object.defineProperty(NgControl.prototype, "validator", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControl.prototype, "asyncValidator", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgControl;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_control_directive__["a" /* AbstractControlDirective */]));
//# sourceMappingURL=ng_control.js.map

/***/ },

/***/ 78:
/***/ function(module, exports) {

"use strict";
"use strict";
function trimLabel(s, max) {
    if (max === void 0) { max = 16; }
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    if (s.length <= max) {
        return s;
    }
    else {
        return s.slice(0, max).trim() + "...";
    }
}
exports.trimLabel = trimLabel;


/***/ },

/***/ 899:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(499)();
// imports


// module
exports.push([module.i, "body {\n  margin: 0;\n  padding: 0;\n  font-family: 'RobotoDraft', 'Roboto', 'Helvetica Neue, Helvetica, Arial', sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 1.4rem;\n  line-height: 2rem;\n  letter-spacing: 0.01rem;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 100vh;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  overflow: hidden; }\n\n* {\n  box-sizing: border-box; }\n\nmain {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n      flex: 1;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center; }\n  main .chart-col {\n    -ms-flex: 2;\n        flex: 2;\n    text-align: center; }\n    main .chart-col .chart-view {\n      margin: 20px auto; }\n  main .sidebar {\n    overflow-y: auto;\n    height: 100vh;\n    padding: 20px;\n    background: #2f3646;\n    color: #fff;\n    font-size: .6em;\n    min-width: 280px; }\n    main .sidebar h1 {\n      color: #1f89ff;\n      font-weight: 100;\n      text-transform: uppercase;\n      display: block;\n      margin-top: 0; }\n      main .sidebar h1 strong {\n        font-weight: 700; }\n      main .sidebar h1 small {\n        display: block;\n        font-size: .4em;\n        line-height: 1.3em;\n        color: white; }\n    main .sidebar input[type=text],\n    main .sidebar select {\n      width: 100%; }\n    main .sidebar h3 {\n      padding: 0;\n      margin: 10px 0 0 0;\n      text-transform: uppercase;\n      color: #a8b2c7; }\n    main .sidebar pre {\n      background: #1b1e27;\n      font-size: 12px;\n      line-height: 1em;\n      max-height: 400px;\n      overflow: auto;\n      padding: 15px; }\n", "", {"version":3,"sources":["/./demo/demo/demo.scss"],"names":[],"mappings":"AAAA;EAEE,UAAS;EACT,WAAW;EAEX,qFAAqF;EACrF,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,wBAAwB;EACxB,oCAAoC;EACpC,mCAAmC;EACnC,mCAAmC;EAEnC,qBAAc;EAAd,cAAc;EACd,kBAAkB;EAClB,2BAAuB;MAAvB,uBAAuB;EACnB,iBAAiB,EACtB;;AAED;EACE,uBAAuB,EACxB;;AAED;EACE,qBAAc;EAAd,cAAc;EACd,YAAQ;MAAR,QAAQ;EACR,uBAAoB;MAApB,oBAAoB;EACpB,sBAAwB;MAAxB,wBAAwB,EA6DzB;EAjED;IAOI,YAAQ;QAAR,QAAQ;IACR,mBAAmB,EAKpB;IAbH;MAWM,kBAAkB,EACnB;EAZL;IAgBI,iBAAiB;IACjB,cAAc;IAEd,cAAc;IACd,oBAAoB;IACpB,YAAY;IACZ,gBAAgB;IAChB,iBAAiB,EAyClB;IAhEH;MA0BM,eAAe;MACf,iBAAiB;MACjB,0BAA0B;MAC1B,eAAe;MACf,cAAc,EAYf;MA1CL;QAiCQ,iBAAiB,EAClB;MAlCP;QAqCQ,eAAe;QACf,gBAAgB;QAChB,mBAAmB;QACnB,aAAa,EACd;IAzCP;;MA8CM,YAAY,EACb;IA/CL;MAkDM,WAAW;MACX,mBAAmB;MACnB,0BAA0B;MAC1B,eAAe,EAChB;IAtDL;MAyDM,oBAAoB;MACpB,gBAAgB;MAChB,iBAAiB;MACjB,kBAAkB;MAClB,eAAe;MACf,cAAc,EACf","file":"demo.scss","sourcesContent":["body {\n  // background: #1b1e27;\n  margin:0;\n  padding: 0;\n\n  font-family: 'RobotoDraft', 'Roboto', 'Helvetica Neue, Helvetica, Arial', sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 1.4rem;\n  line-height: 2rem;\n  letter-spacing: 0.01rem;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column;\n      overflow: hidden;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nmain {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n\n  .chart-col {\n    flex: 2;\n    text-align: center;\n\n    .chart-view {\n      margin: 20px auto;\n    }\n  }\n\n  .sidebar {\n    overflow-y: auto;\n    height: 100vh;\n\n    padding: 20px;\n    background: #2f3646;\n    color: #fff;\n    font-size: .6em;\n    min-width: 280px;\n\n    h1 {\n      color: #1f89ff;\n      font-weight: 100;\n      text-transform: uppercase;\n      display: block;\n      margin-top: 0;\n\n      strong {\n        font-weight: 700;\n      }\n\n      small {\n        display: block;\n        font-size: .4em;\n        line-height: 1.3em;\n        color: white;\n      }\n    }\n\n    input[type=text],\n    select {\n      width: 100%;\n    }\n\n    h3 {\n      padding: 0;\n      margin: 10px 0 0 0;\n      text-transform: uppercase;\n      color: #a8b2c7;\n    }\n\n    pre {\n      background: #1b1e27;\n      font-size: 12px;\n      line-height: 1em;\n      max-height: 400px;\n      overflow: auto;\n      padding: 15px;\n    }\n  }\n}\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ },

/***/ 900:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(499)();
// imports


// module
exports.push([module.i, ".ng2d3 {\n  float: left; }\n  .ng2d3.bar:hover, .ng2d3.cell:hover, .ng2d3.arc:hover, .ng2d3.card:hover {\n    opacity: 0.8; }\n  .ng2d3.area {\n    opacity: 0.6; }\n  .ng2d3.circle:hover {\n    cursor: pointer; }\n  .ng2d3.treemap .cell {\n    cursor: pointer; }\n    .ng2d3.treemap .cell foreignObject {\n      pointer-events: none; }\n    .ng2d3.treemap .cell p {\n      text-align: center;\n      pointer-events: none; }\n\n.label {\n  font-size: 12px;\n  font-weight: normal; }\n\n.gridline-path {\n  stroke: rgba(200, 200, 200, 0.3);\n  stroke-width: 0.5;\n  fill: none; }\n\n.gridline-path-shadow {\n  stroke: black; }\n\n.a2d3-container {\n  height: 100%; }\n  .a2d3-container .status-message {\n    font-size: 14px;\n    text-align: center;\n    position: relative;\n    top: 43%;\n    color: #999; }\n  .a2d3-container .icon-loading {\n    color: #999;\n    font-size: 32px; }\n\n.brush .background {\n  visibility: visible !important;\n  fill: rgba(255, 255, 255, 0.03); }\n\n.brush .extent {\n  stroke: none;\n  fill-opacity: .3;\n  shape-rendering: 'crispEdges'; }\n\n.legend {\n  display: inline-block;\n  float: left; }\n  .legend .legend-title {\n    color: #76818a;\n    margin-left: 10px;\n    margin-bottom: 5px;\n    font-size: 14px;\n    font-weight: bold; }\n  .legend ul, .legend li {\n    padding: 0;\n    margin: 0;\n    list-style: none; }\n  .legend .legend-wrap {\n    width: 90%; }\n  .legend .legend-labels {\n    line-height: 85%;\n    list-style: none;\n    text-align: left;\n    float: left;\n    width: 100%;\n    border-radius: 3px; }\n  .legend .legend-label {\n    cursor: pointer;\n    font-size: 90%;\n    margin: 8px;\n    color: #76818a; }\n    .legend .legend-label.active {\n      color: #FFF; }\n  .legend .legend-label-color {\n    display: inline-block;\n    height: 15px;\n    width: 15px;\n    margin-right: 5px;\n    color: #5b646b;\n    border-radius: 3px; }\n  .legend .legend-label-text {\n    display: inline-block;\n    vertical-align: top;\n    line-height: 15px;\n    font-size: 12px; }\n  .legend .legend-icon {\n    color: #4d9df6;\n    margin-right: 5px; }\n  .legend .legend-title-text {\n    vertical-align: bottom;\n    display: inline-block;\n    line-height: 16px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    width: 80%; }\n\n.advanced-pie {\n  float: left; }\n\n.advanced-pie-legend {\n  float: left; }\n  .advanced-pie-legend .total-value {\n    font-size: 36px; }\n  .advanced-pie-legend .total-label {\n    font-size: 24px;\n    margin-bottom: 19px; }\n  .advanced-pie-legend .legend-items-container {\n    width: 100%; }\n    .advanced-pie-legend .legend-items-container .legend-items {\n      white-space: nowrap;\n      overflow: auto; }\n      .advanced-pie-legend .legend-items-container .legend-items .legend-item {\n        margin-right: 20px;\n        display: inline-block; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-value {\n          font-size: 24px;\n          margin-top: -6px;\n          margin-left: 11px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-label {\n          font-size: 12px;\n          opacity: 0.7;\n          margin-left: 11px;\n          margin-top: -6px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-percent {\n          font-size: 24px;\n          opacity: 0.7;\n          margin-left: 11px; }\n        .advanced-pie-legend .legend-items-container .legend-items .legend-item .item-color {\n          width: 4px;\n          height: 32px;\n          float: left;\n          margin-right: 7px; }\n", "", {"version":3,"sources":["/./src/src/ng2d3.scss"],"names":[],"mappings":"AAAA;EACE,YAAY,EAmCb;EApCD;IAQM,aAAa,EACd;EATL;IAaI,aAAa,EACd;EAdH;IAkBM,gBAAgB,EACjB;EAnBL;IAwBM,gBAAgB,EAUjB;IAlCL;MA2BQ,qBAAqB,EACtB;IA5BP;MA+BQ,mBAAmB;MACnB,qBAAqB,EACtB;;AAKP;EACE,gBAAgB;EAChB,oBAAoB,EACrB;;AAED;EACE,iCAAY;EACZ,kBAAkB;EAClB,WAAW,EACZ;;AAED;EACE,cAAY,EACb;;AAED;EACE,aAAa,EAcd;EAfD;IAII,gBAAgB;IAChB,mBAAmB;IACnB,mBAAmB;IACnB,SAAS;IACT,YAAY,EACb;EATH;IAYI,YAAY;IACZ,gBAAgB,EACjB;;AAGH;EAEI,+BAA+B;EAC/B,gCAAU,EACX;;AAJH;EAOI,aAAa;EACb,iBAAiB;EACjB,8BAA8B,EAC/B;;AAGH;EACE,sBAAsB;EACtB,YAAY,EAsEb;EAxED;IAKI,eAAe;IACf,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,kBAAkB,EACnB;EAVH;IAaI,WAAW;IACX,UAAU;IACV,iBAAiB,EAClB;EAhBH;IAmBI,WAAW,EACZ;EApBH;IAuBI,iBAAiB;IACjB,iBAAiB;IACjB,iBAAiB;IACjB,YAAY;IACZ,YAAY;IACZ,mBAAmB,EACpB;EA7BH;IAgCI,gBAAgB;IAChB,eAAe;IACf,YAAY;IACZ,eAAe,EAKhB;IAxCH;MAsCM,YAAY,EACb;EAvCL;IA2CI,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,eAAe;IACf,mBAAmB,EACpB;EAjDH;IAoDI,sBAAsB;IACtB,oBAAoB;IACpB,kBAAkB;IAClB,gBAAgB,EACjB;EAxDH;IA2DI,eAAe;IACf,kBAAkB,EACnB;EA7DH;IAgEI,uBAAuB;IACvB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IACpB,wBAAwB;IACxB,WAAW,EACZ;;AAGH;EACE,YAAY,EACb;;AAED;EACE,YAAY,EAkDb;EAnDD;IAII,gBACD,EAAC;EALJ;IAQI,gBAAgB;IAChB,oBAAoB,EACrB;EAVH;IAaI,YAAY,EAqCb;IAlDH;MAgBM,oBAAoB;MACpB,eAAe,EAgChB;MAjDL;QAoBQ,mBAAmB;QACnB,sBAAsB,EA2BvB;QAhDP;UAwBU,gBAAgB;UAChB,iBAAiB;UACjB,kBAAkB,EACnB;QA3BT;UA8BU,gBAAgB;UAChB,aAAa;UACb,kBAAkB;UAClB,iBAAiB,EAClB;QAlCT;UAqCU,gBAAgB;UAChB,aAAa;UACb,kBAAkB,EACnB;QAxCT;UA2CU,WAAW;UACX,aAAa;UACb,YAAY;UACZ,kBAAkB,EACnB","file":"ng2d3.scss","sourcesContent":[".ng2d3 {\n  float: left;\n\n  &.bar,\n  &.cell,\n  &.arc,\n  &.card {\n    &:hover {\n      opacity: 0.8;\n    }\n  }\n  \n  &.area {\n    opacity: 0.6;\n  }\n\n  &.circle {\n    &:hover {\n      cursor: pointer;\n    }\n  }\n\n  &.treemap {\n    .cell {\n      cursor: pointer;\n\n      foreignObject {\n        pointer-events: none;\n      }\n\n      p {\n        text-align: center;\n        pointer-events: none;\n      }\n    }\n  }\n}\n\n.label {\n  font-size: 12px;\n  font-weight: normal;\n}\n\n.gridline-path {\n  stroke: rgba(200, 200, 200, 0.3);\n  stroke-width: 0.5;\n  fill: none;\n}\n\n.gridline-path-shadow {\n  stroke: rgba(0, 0, 0, 1);\n}\n\n.a2d3-container {\n  height: 100%;\n\n  .status-message {\n    font-size: 14px;\n    text-align: center;\n    position: relative;\n    top: 43%;\n    color: #999;\n  }\n\n  .icon-loading {\n    color: #999;\n    font-size: 32px;\n  }\n}\n\n.brush {\n  .background {\n    visibility: visible !important;\n    fill: rgba(255, 255, 255, 0.03);\n  }\n\n  .extent {\n    stroke: none;\n    fill-opacity: .3;\n    shape-rendering: 'crispEdges';\n  }\n}\n\n.legend {\n  display: inline-block;\n  float: left;\n\n  .legend-title {\n    color: #76818a;\n    margin-left: 10px;\n    margin-bottom: 5px;\n    font-size: 14px;\n    font-weight: bold;\n  }\n\n  ul, li {\n    padding: 0;\n    margin: 0;\n    list-style: none;\n  }\n\n  .legend-wrap {\n    width: 90%;\n  }\n\n  .legend-labels {\n    line-height: 85%;\n    list-style: none;\n    text-align: left;\n    float: left;\n    width: 100%;\n    border-radius: 3px;\n  }\n\n  .legend-label {\n    cursor: pointer;\n    font-size: 90%;\n    margin: 8px;\n    color: #76818a;\n\n    &.active {\n      color: #FFF;\n    }\n  }\n\n  .legend-label-color {\n    display: inline-block;\n    height: 15px;\n    width: 15px;\n    margin-right: 5px;\n    color: #5b646b;\n    border-radius: 3px;\n  }\n\n  .legend-label-text {\n    display: inline-block;\n    vertical-align: top;\n    line-height: 15px;\n    font-size: 12px;\n  }\n\n  .legend-icon {\n    color: #4d9df6;\n    margin-right: 5px;\n  }\n\n  .legend-title-text {\n    vertical-align: bottom;\n    display: inline-block;\n    line-height: 16px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    width: 80%;\n  }\n}\n\n.advanced-pie {\n  float: left;\n}\n\n.advanced-pie-legend {\n  float: left;\n\n  .total-value {\n    font-size: 36px\n  }\n\n  .total-label {\n    font-size: 24px;\n    margin-bottom: 19px;\n  }\n\n  .legend-items-container {\n    width: 100%;\n\n    .legend-items {\n      white-space: nowrap;\n      overflow: auto;\n\n      .legend-item {\n        margin-right: 20px;\n        display: inline-block;\n\n        .item-value {\n          font-size: 24px;\n          margin-top: -6px;\n          margin-left: 11px;\n        }\n\n        .item-label {\n          font-size: 12px;\n          opacity: 0.7;\n          margin-left: 11px;\n          margin-top: -6px;\n        }\n\n        .item-percent {\n          font-size: 24px;\n          opacity: 0.7;\n          margin-left: 11px;\n        }\n\n        .item-color {\n          width: 4px;\n          height: 32px;\n          float: left;\n          margin-right: 7px;\n        }\n      }\n    }\n  }\n}\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return EventEmitter; });
/* unused harmony reexport Observable */
/* unused harmony reexport Subject */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * The events payload can be accessed by the parameter `$event` on the components output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 * @stable
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        _super.call(this);
        this.__isAsync = isAsync;
    }
    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext.next(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                    function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                    function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]));
//# sourceMappingURL=async.js.map

/***/ }

},[1094]);
//# sourceMappingURL=app.853b2b3bb2aa884ed4b3.map