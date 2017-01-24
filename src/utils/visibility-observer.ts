import { Output, EventEmitter, NgZone } from '@angular/core';

/**
 * Visibility Observer
 */
export class VisibilityObserver {

  @Output() visible: EventEmitter<any> = new EventEmitter();

  timeout: any;
  isVisible: boolean = false;

  constructor(private element: any, private zone: NgZone) {
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
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 50);
        });
      }
    };

    setTimeout(() => check());
  }

}
