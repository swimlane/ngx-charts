import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
} from '@angular/core';
import { BarComponent } from '../bar-chart/bar.component';

@Component({
  selector: 'g[ngx-charts-timeline-bar]',
  template: `
    <svg:defs *ngIf="hasGradient">
      <svg:g ngx-charts-svg-linear-gradient [orientation]="orientation" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      role="img"
      tabIndex="-1"
      [class.active]="isActive"
      [class.hidden]="hideBar"
      [attr.d]="path"
      [attr.aria-label]="ariaLabel"
      [attr.fill]="hasGradient ? gradientFill : fill"
      (click)="select.emit(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineBarComponent extends BarComponent implements OnChanges {
  
}
