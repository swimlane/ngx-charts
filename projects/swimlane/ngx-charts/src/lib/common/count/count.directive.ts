import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges
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
 */
@Component({
  selector: '[ngx-charts-count-up]',
  template: ` {{ value }} `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class CountUpDirective implements OnChanges, OnDestroy {
  @Input() countDuration: number = 1;
  @Input() countPrefix: string = '';
  @Input() countSuffix: string = '';
  @Input() valueFormatting: ((value: number) => string) | undefined;

  @Input() countDecimals: number = 0;

  @Input() countTo: number | string = 0;
  @Input() countFrom: number | string = 0;

  @Output() countChange = new EventEmitter();
  @Output() countFinish = new EventEmitter();

  nativeElement: unknown;

  value: string = '';

  private animationReq: number | undefined;

  constructor(private cd: ChangeDetectorRef, element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['countTo'] ||
      changes['countFrom'] ||
      changes['valueFormatting'] ||
      changes['countDecimals'] ||
      changes['countDuration'] ||
      changes['countPrefix'] ||
      changes['countSuffix']
    ) {
      this.start();
    }
  }

  ngOnDestroy(): void {
    if (this.animationReq !== undefined) {
      cancelAnimationFrame(this.animationReq);
    }
  }

  get resolvedCountDecimals(): number {
    if (this.countDecimals) {
      return this.countDecimals;
    }
    return decimalChecker(this.parsedCountTo);
  }

  private get parsedCountTo(): number {
    return parseFloat(String(this.countTo));
  }

  private get parsedCountFrom(): number {
    return parseFloat(String(this.countFrom));
  }

  start(): void {
    if (this.animationReq !== undefined) {
      cancelAnimationFrame(this.animationReq);
    }

    const countTo = this.parsedCountTo;
    const countFrom = this.parsedCountFrom;
    const valueFormatting =
      this.valueFormatting ||
      ((value: number) => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);

    const callback = ({ value, progress, finished }: { value: number; progress: number; finished: boolean }) => {
      this.value = valueFormatting(value);
      this.cd.markForCheck();
      if (!finished) {
        this.countChange.emit({ value: this.value, progress });
      }
      if (finished) {
        this.countFinish.emit({ value: this.value, progress });
      }
    };

    this.animationReq = count(countFrom, countTo, this.resolvedCountDecimals, this.countDuration, callback);
  }
}
