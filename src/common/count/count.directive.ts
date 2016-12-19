import {
  Component, Input, Output, EventEmitter,
  ChangeDetectorRef, NgZone, OnDestroy, ElementRef
} from '@angular/core';
import { count, decimalChecker } from './count.helper';

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
@Component({
  selector: '[ngx-charts-count-up]',
  template: `{{value}}`
})
export class CountUpDirective implements OnDestroy {

  @Input() countDuration: number = 1;
  @Input() countPrefix: string = '';
  @Input() countSuffix: string = '';

  @Input()
  set countDecimals(val: number) {
    this._countDecimals = val;
  }

  get countDecimals(): number {
    if(this._countDecimals) return this._countDecimals;
    return decimalChecker(this.countTo);
  }

  @Input()
  set countTo(val) {
    this._countTo = parseFloat(val);
    this.start();
  }

  get countTo(): any {
    return this._countTo;
  }

  @Input()
  set countFrom(val) {
    this._countFrom = parseFloat(val);
    this.start();
  }

  get countFrom(): any {
    return this._countFrom;
  }

  @Output() countChange = new EventEmitter();
  @Output() countFinish = new EventEmitter();

  nativeElement: any;

  private value: any = '';
  private animationReq: any;

  private _countDecimals: number = 0;
  private _countTo: number = 0;
  private _countFrom: number = 0;

  constructor(private cd: ChangeDetectorRef, private zone: NgZone, element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationReq);
  }

  start(): void {
    cancelAnimationFrame(this.animationReq);

    const callback = ({ value, progress, finished }) => {
      this.zone.run(() => {
        this.value = `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`;
        this.cd.markForCheck();

        if(!finished) this.countChange.emit({ value, progress });
        if(finished) this.countFinish.emit({ value, progress });
      });
    };

    this.animationReq = count(
      this.countFrom, 
      this.countTo, 
      this.countDecimals, 
      this.countDuration, 
      callback);
  }

}
