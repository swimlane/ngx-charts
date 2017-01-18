/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../src/pie-chart/advanced-pie-chart.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/linker/element_ref';
import * as import10 from '@angular/core/src/zone/ng_zone';
import * as import11 from '@angular/common/src/location/location';
import * as import12 from '@angular/core/src/linker/view_container';
import * as import13 from '../../../src/common/charts/chart.component';
import * as import14 from '../../../src/common/tooltip/tooltip.service';
import * as import15 from '../common/charts/chart.component.ngfactory';
import * as import16 from '../../../src/pie-chart/pie-series.component';
import * as import17 from './pie-series.component.ngfactory';
import * as import18 from '../../../src/common/legend/advanced-legend.component';
import * as import19 from '../common/legend/advanced-legend.component.ngfactory';
import * as import20 from '../../../src/services/injection.service';
import * as import21 from '@angular/core/src/security';
export class Wrapper_AdvancedPieChartComponent {
  /*private*/ _eventHandler:Function;
  context:import0.AdvancedPieChartComponent;
  /*private*/ _changed:boolean;
  /*private*/ _changes:{[key: string]:any};
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  subscription0:any;
  subscription1:any;
  subscription2:any;
  constructor(p0:any,p1:any,p2:any,p3:any) {
    this._changed = false;
    this._changes = {};
    this.context = new import0.AdvancedPieChartComponent(p0,p1,p2,p3);
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
    this._expr_6 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    this.context.ngOnDestroy();
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
    (this.subscription2 && this.subscription2.unsubscribe());
  }
  check_results(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.results = currValue;
      this._changes['results'] = new import1.SimpleChange(this._expr_0,currValue);
      this._expr_0 = currValue;
    }
  }
  check_view(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.view = currValue;
      this._changes['view'] = new import1.SimpleChange(this._expr_1,currValue);
      this._expr_1 = currValue;
    }
  }
  check_scheme(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.scheme = currValue;
      this._changes['scheme'] = new import1.SimpleChange(this._expr_2,currValue);
      this._expr_2 = currValue;
    }
  }
  check_schemeType(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.schemeType = currValue;
      this._changes['schemeType'] = new import1.SimpleChange(this._expr_3,currValue);
      this._expr_3 = currValue;
    }
  }
  check_customColors(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.customColors = currValue;
      this._changes['customColors'] = new import1.SimpleChange(this._expr_4,currValue);
      this._expr_4 = currValue;
    }
  }
  check_gradient(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_5,currValue))) {
      this._changed = true;
      this.context.gradient = currValue;
      this._changes['gradient'] = new import1.SimpleChange(this._expr_5,currValue);
      this._expr_5 = currValue;
    }
  }
  check_activeEntries(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_6,currValue))) {
      this._changed = true;
      this.context.activeEntries = currValue;
      this._changes['activeEntries'] = new import1.SimpleChange(this._expr_6,currValue);
      this._expr_6 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if (changed) {
      this.context.ngOnChanges(this._changes);
      this._changes = {};
    } }
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean,emit1:boolean,emit2:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.select.subscribe(_eventHandler.bind(view,'select'))); }
    if (emit1) { (this.subscription1 = this.context.activate.subscribe(_eventHandler.bind(view,'activate'))); }
    if (emit2) { (this.subscription2 = this.context.deactivate.subscribe(_eventHandler.bind(view,'deactivate'))); }
  }
}
var renderType_AdvancedPieChartComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_AdvancedPieChartComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.AdvancedPieChartComponent>;
  _AdvancedPieChartComponent_0_3:Wrapper_AdvancedPieChartComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_AdvancedPieChartComponent_Host0,renderType_AdvancedPieChartComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ngx-charts-advanced-pie-chart',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_AdvancedPieChartComponent0(this.viewUtils,this,0,this._el_0);
    this._AdvancedPieChartComponent_0_3 = new Wrapper_AdvancedPieChartComponent(new import9.ElementRef(this._el_0),this.injectorGet(import10.NgZone,this.parentIndex),this.compView_0.ref,this.injectorGet(import11.Location,this.parentIndex));
    this.compView_0.create(this._AdvancedPieChartComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._AdvancedPieChartComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.AdvancedPieChartComponent) && (0 === requestNodeIndex))) { return this._AdvancedPieChartComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._AdvancedPieChartComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._AdvancedPieChartComponent_0_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._AdvancedPieChartComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const AdvancedPieChartComponentNgFactory:import8.ComponentFactory<import0.AdvancedPieChartComponent> = new import8.ComponentFactory<import0.AdvancedPieChartComponent>('ngx-charts-advanced-pie-chart',View_AdvancedPieChartComponent_Host0,import0.AdvancedPieChartComponent);
const styles_AdvancedPieChartComponent:any[] = ([] as any[]);
var renderType_AdvancedPieChartComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_AdvancedPieChartComponent,{});
export class View_AdvancedPieChartComponent0 extends import2.AppView<import0.AdvancedPieChartComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  /*private*/ _vc_5:import12.ViewContainer;
  compView_5:import2.AppView<import13.ChartComponent>;
  _TooltipService_5_5:import14.TooltipService;
  _ChartComponent_5_6:import15.Wrapper_ChartComponent;
  _text_6:any;
  _el_7:any;
  _text_8:any;
  _el_9:any;
  compView_9:import2.AppView<import16.PieSeriesComponent>;
  _PieSeriesComponent_9_3:import17.Wrapper_PieSeriesComponent;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _el_17:any;
  compView_17:import2.AppView<import18.AdvancedLegendComponent>;
  _AdvancedLegendComponent_17_3:import19.Wrapper_AdvancedLegendComponent;
  _text_18:any;
  _text_19:any;
  _text_20:any;
  _text_21:any;
  /*private*/ _expr_30:any;
  /*private*/ _expr_31:any;
  /*private*/ _expr_32:any;
  /*private*/ _expr_33:any;
  _arr_34:any;
  /*private*/ _expr_35:any;
  /*private*/ _expr_36:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_AdvancedPieChartComponent0,renderType_AdvancedPieChartComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckOnce);
    this._expr_30 = import1.UNINITIALIZED;
    this._expr_31 = import1.UNINITIALIZED;
    this._expr_32 = import1.UNINITIALIZED;
    this._expr_33 = import1.UNINITIALIZED;
    this._arr_34 = import3.pureProxy2((p0:any,p1:any):any[] => {
      return [
        p0,
        p1
      ]
      ;
    });
    this._expr_35 = import1.UNINITIALIZED;
    this._expr_36 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','advanced-pie chart'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n        ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'ngx-charts-chart',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._vc_5 = new import12.ViewContainer(5,3,this,this._el_5);
    this.compView_5 = new import15.View_ChartComponent0(this.viewUtils,this,5,this._el_5);
    this._TooltipService_5_5 = new import14.TooltipService(this.parentView.injectorGet(import20.InjectionService,this.parentIndex));
    this._ChartComponent_5_6 = new import15.Wrapper_ChartComponent(this._vc_5.vcRef,this._TooltipService_5_5);
    this._text_6 = this.renderer.createText((null as any),'\n          ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,(null as any),':svg:g',new import3.InlineArray2(2,'class','pie chart'),(null as any));
    this._text_8 = this.renderer.createText(this._el_7,'\n            ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_7,':svg:g',new import3.InlineArray2(2,'ngx-charts-pie-series',''),(null as any));
    this.compView_9 = new import17.View_PieSeriesComponent0(this.viewUtils,this,9,this._el_9);
    this._PieSeriesComponent_9_3 = new import17.Wrapper_PieSeriesComponent();
    this._text_10 = this.renderer.createText((null as any),'\n            ',(null as any));
    this.compView_9.create(this._PieSeriesComponent_9_3.context);
    this._text_11 = this.renderer.createText(this._el_7,'\n          ',(null as any));
    this._text_12 = this.renderer.createText((null as any),'\n        ',(null as any));
    this.compView_5.create(this._ChartComponent_5_6.context);
    this._text_13 = this.renderer.createText(this._el_3,'\n      ',(null as any));
    this._text_14 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','advanced-pie-legend-wrapper'),(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'\n        ',(null as any));
    this._el_17 = import3.createRenderElement(this.renderer,this._el_15,'ngx-charts-advanced-legend',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_17 = new import19.View_AdvancedLegendComponent0(this.viewUtils,this,17,this._el_17);
    this._AdvancedLegendComponent_17_3 = new import19.Wrapper_AdvancedLegendComponent();
    this._text_18 = this.renderer.createText((null as any),'\n        ',(null as any));
    this.compView_17.create(this._AdvancedLegendComponent_17_3.context);
    this._text_19 = this.renderer.createText(this._el_15,'\n      ',(null as any));
    this._text_20 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._text_21 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_9,new import3.InlineArray2(2,'select',(null as any)),this.eventHandler(this.handleEvent_9));
    this._PieSeriesComponent_9_3.subscribe(this,this.eventHandler(this.handleEvent_9),true,false,false);
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_17,new import3.InlineArray8(6,'select',(null as any),'activate',(null as any),'deactivate',(null as any)),this.eventHandler(this.handleEvent_17));
    this._AdvancedLegendComponent_17_3.subscribe(this,this.eventHandler(this.handleEvent_17),true,true,true);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._text_12,
      this._text_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._el_17,
      this._text_18,
      this._text_19,
      this._text_20,
      this._text_21
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import16.PieSeriesComponent) && ((9 <= requestNodeIndex) && (requestNodeIndex <= 10)))) { return this._PieSeriesComponent_9_3.context; }
    if (((token === import14.TooltipService) && ((5 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._TooltipService_5_5; }
    if (((token === import13.ChartComponent) && ((5 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._ChartComponent_5_6.context; }
    if (((token === import18.AdvancedLegendComponent) && ((17 <= requestNodeIndex) && (requestNodeIndex <= 18)))) { return this._AdvancedLegendComponent_17_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_5_0_0:any = this._arr_34(this.context.width,this.context.height);
    this._ChartComponent_5_6.check_view(currVal_5_0_0,throwOnChange,false);
    const currVal_5_0_1:any = false;
    this._ChartComponent_5_6.check_showLegend(currVal_5_0_1,throwOnChange,false);
    if (this._ChartComponent_5_6.ngDoCheck(this,this._el_5,throwOnChange)) { this.compView_5.markAsCheckOnce(); }
    const currVal_9_0_0:any = this.context.colors;
    this._PieSeriesComponent_9_3.check_colors(currVal_9_0_0,throwOnChange,false);
    const currVal_9_0_1:any = this.context.results;
    this._PieSeriesComponent_9_3.check_series(currVal_9_0_1,throwOnChange,false);
    const currVal_9_0_2:any = this.context.innerRadius;
    this._PieSeriesComponent_9_3.check_innerRadius(currVal_9_0_2,throwOnChange,false);
    const currVal_9_0_3:any = this.context.outerRadius;
    this._PieSeriesComponent_9_3.check_outerRadius(currVal_9_0_3,throwOnChange,false);
    const currVal_9_0_4:any = this.context.labels;
    this._PieSeriesComponent_9_3.check_showLabels(currVal_9_0_4,throwOnChange,false);
    const currVal_9_0_5:any = this.context.gradient;
    this._PieSeriesComponent_9_3.check_gradient(currVal_9_0_5,throwOnChange,false);
    const currVal_9_0_6:any = this.context.activeEntries;
    this._PieSeriesComponent_9_3.check_activeEntries(currVal_9_0_6,throwOnChange,false);
    if (this._PieSeriesComponent_9_3.ngDoCheck(this,this._el_9,throwOnChange)) { this.compView_9.markAsCheckOnce(); }
    const currVal_17_0_0:any = ((this.context.width - this.context.dims.width) - this.context.margin[1]);
    this._AdvancedLegendComponent_17_3.check_width(currVal_17_0_0,throwOnChange,false);
    const currVal_17_0_1:any = this.context.results;
    this._AdvancedLegendComponent_17_3.check_data(currVal_17_0_1,throwOnChange,false);
    const currVal_17_0_2:any = this.context.colors;
    this._AdvancedLegendComponent_17_3.check_colors(currVal_17_0_2,throwOnChange,false);
    if (this._AdvancedLegendComponent_17_3.ngDoCheck(this,this._el_17,throwOnChange)) { this.compView_17.markAsCheckOnce(); }
    this._vc_5.detectChangesInNestedViews(throwOnChange);
    const currVal_30:any = this.context.width;
    if (import3.checkBinding(throwOnChange,this._expr_30,currVal_30)) {
      this.renderer.setElementStyle(this._el_1,'width',((this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_30) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_30).toString() + 'px')));
      this._expr_30 = currVal_30;
    }
    const currVal_31:any = this.context.height;
    if (import3.checkBinding(throwOnChange,this._expr_31,currVal_31)) {
      this.renderer.setElementStyle(this._el_1,'height',((this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_31) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_31).toString() + 'px')));
      this._expr_31 = currVal_31;
    }
    const currVal_32:any = this.context.dims.width;
    if (import3.checkBinding(throwOnChange,this._expr_32,currVal_32)) {
      this.renderer.setElementStyle(this._el_3,'width',((this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_32) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_32).toString() + 'px')));
      this._expr_32 = currVal_32;
    }
    const currVal_33:any = this.context.dims.height;
    if (import3.checkBinding(throwOnChange,this._expr_33,currVal_33)) {
      this.renderer.setElementStyle(this._el_3,'height',((this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_33) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_33).toString() + 'px')));
      this._expr_33 = currVal_33;
    }
    const currVal_35:any = this.context.transform;
    if (import3.checkBinding(throwOnChange,this._expr_35,currVal_35)) {
      this.renderer.setElementAttribute(this._el_7,'transform',((currVal_35 == null)? (null as any): currVal_35.toString()));
      this._expr_35 = currVal_35;
    }
    const currVal_36:any = (this.context.width - this.context.dims.width);
    if (import3.checkBinding(throwOnChange,this._expr_36,currVal_36)) {
      this.renderer.setElementStyle(this._el_15,'width',((this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_36) == null)? (null as any): (this.viewUtils.sanitizer.sanitize(import21.SecurityContext.STYLE,currVal_36).toString() + 'px')));
      this._expr_36 = currVal_36;
    }
    this.compView_5.internalDetectChanges(throwOnChange);
    this.compView_9.internalDetectChanges(throwOnChange);
    this.compView_17.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this._vc_5.destroyNestedViews();
    this.compView_5.destroy();
    this.compView_9.destroy();
    this.compView_17.destroy();
    this._PieSeriesComponent_9_3.ngOnDestroy();
    this._ChartComponent_5_6.ngOnDestroy();
    this._AdvancedLegendComponent_17_3.ngOnDestroy();
  }
  visitProjectableNodesInternal(nodeIndex:number,ngContentIndex:number,cb:any,ctx:any):void {
    if (((nodeIndex == 5) && (ngContentIndex == 0))) {
      cb(this._text_6,ctx);
      cb(this._el_7,ctx);
      cb(this._text_12,ctx);
    }
  }
  handleEvent_9(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'select')) {
      const pd_sub_0:any = ((<any>this.context.onClick($event)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_17(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'select')) {
      const pd_sub_0:any = ((<any>this.context.onClick($event)) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'activate')) {
      const pd_sub_1:any = ((<any>this.context.onActivate($event)) !== false);
      result = (pd_sub_1 && result);
    }
    if ((eventName == 'deactivate')) {
      const pd_sub_2:any = ((<any>this.context.onDeactivate($event)) !== false);
      result = (pd_sub_2 && result);
    }
    return result;
  }
}