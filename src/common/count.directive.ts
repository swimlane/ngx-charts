import {
  Component, Input, Output, EventEmitter, ChangeDetectorRef, NgZone, OnDestroy
} from '@angular/core';

// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
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
@Component({
  selector: '[count-up]',
  template: `<span>{{value.toLocaleString()}}</span>`
})
export class CountUpDirective implements OnDestroy {

  @Input() countDecimals: number = 0;
  @Input() countDuration: number = 1;

  @Input()
  set countTo(val) {
    this._countTo = parseFloat(val);
    this.start();
  }

  @Input()
  set countFrom(val) {
    this._countFrom = parseFloat(val);
    this.start();
  }

  @Output() countChange = new EventEmitter();
  @Output() countFinish = new EventEmitter();

  private value: any = '';
  private animationReq: any;
  private startTime: any;

  private _countTo: number = 0;
  private _countFrom: number = 0;

  constructor(private cd: ChangeDetectorRef, private zone: NgZone) { }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationReq);
  }

  start(): void {
    const startVal = Number(this._countFrom);
    const endVal = Number(this._countTo);
    const countDown = (startVal > endVal);
    const decimals = Math.max(0, this.countDecimals);
    const dec = Math.pow(10, decimals);
    const duration = Number(this.countDuration) * 1000;

    cancelAnimationFrame(this.animationReq);
    requestAnimationFrame((val) => 
      this.count(startVal, endVal, dec, duration, countDown, val));
  }

  count(startVal, endVal, dec, duration, countDown, timestamp) {
    if (!this.startTime) this.startTime = timestamp;

    let frameVal;
    const progress = timestamp - this.startTime;

    if (countDown) {
      frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
    } else {
      frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
    }

    if (countDown) {
      frameVal = (frameVal < endVal) ? endVal : frameVal;
    } else {
      frameVal = (frameVal > endVal) ? endVal : frameVal;
    }

    frameVal = Math.round(frameVal * dec) / dec;

    this.zone.run(() => {
      this.value = frameVal;
      this.cd.markForCheck();
      this.countChange.emit({ value: frameVal, progress });
    });

    if (progress < duration) {
      this.animationReq = requestAnimationFrame((val) => 
        this.count(startVal, endVal, dec, duration, countDown, val));
    } else {
      this.startTime = undefined;
      this.countFinish.emit(true);
    }
  }

}
