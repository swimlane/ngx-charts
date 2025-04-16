import { Output, EventEmitter, NgZone, Directive, ElementRef } from '@angular/core';

/**
 * Visibility Observer
 */
@Directive({
  selector: 'visibility-observer',
  standalone: false
})
export class VisibilityObserver {
  @Output() visible: EventEmitter<any> = new EventEmitter();

  timeout: any;
  isVisible: boolean = false;

  constructor(private element: ElementRef, private zone: NgZone) {
    this.runCheck();
  }

  destroy(): void {
    clearTimeout(this.timeout);
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

  runCheck(): void {
    const check = () => {
      if (!this.element) {
        return;
      }

      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 100);
        });
      }
    };

    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => check());
    });
  }
}
