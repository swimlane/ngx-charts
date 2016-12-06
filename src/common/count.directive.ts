import {
  Component, Input, Output, EventEmitter, ChangeDetectorRef, NgZone
} from '@angular/core';

/**
 * Count up component
 * Loosely inspired by: https://github.com/izupet/angular2-counto
 * 
 * @export
 * @class CountUpDirective
 */
@Component({
  selector: '[count-up]',
  template: `<span>{{value.toLocaleString()}}</span>`
})
export class CountUpDirective {

  @Input()
  set duration(duration) {
    this._duration = parseFloat(duration);
    this.run();
  }

  @Input()
  set countTo(countTo) {
    this._countTo = parseFloat(countTo);
    this.run();
  }

  @Input()
  set countFrom(countFrom) {
    this._countFrom = parseFloat(countFrom);
    this.run();
  }

  @Input()
  set step(step) {
    this._step = parseFloat(step);
    this.run();
  }

  @Output() countChange = new EventEmitter();

  private timer: any;
  private value: any = '';

  private _duration: number = .5;
  private _countTo: number;
  private _countFrom: number = 0;
  private _step: number = 1;

  constructor(private cd: ChangeDetectorRef, private zone: NgZone) { }

  run(): void {
    clearInterval(this.timer);

    if (isNaN(this._duration)) return;
    if (isNaN(this._step)) return;
    if (isNaN(this._countFrom)) return;
    if (isNaN(this._countTo)) return;
    if (this._step <= 0) throw new Error('Step must be greater than 0.');
    if (this._duration <= 0) throw new Error('Duration must be greater than 0.');
    if (this._step > this._duration * 1000) throw new Error('Step must be equal or smaller than duration.');

    let intermediate = this._countFrom;
    let increment = Math.abs(this._countTo - this._countFrom) / ((this._duration * 1000) / this._step);

    this.value = intermediate;
    this.cd.markForCheck();
    this.countChange.emit(intermediate);

    this.timer = setInterval(() => {
      this.zone.run(() => {
        if (this._countTo < this._countFrom) {
          if (intermediate <= this._countTo) {
            clearInterval(this.timer);

            this.value = this._countTo;
            this.cd.markForCheck();

            this.countChange.emit(this._countTo);
          } else {
            this.value = intermediate;
            this.cd.markForCheck();
            
            this.countChange.emit(intermediate);
            intermediate -= increment;
          }
        } else {
          if (intermediate >= this._countTo) {
            clearInterval(this.timer);

            this.value = this._countTo;
            this.cd.markForCheck();

            this.countChange.emit(this._countTo);
          } else {
            this.value = intermediate;
            this.cd.markForCheck();

            this.countChange.emit(intermediate);
            intermediate += increment;
          }
        }
      });
    }, this._step);
  }

}
