import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-svg-linear-gradient]',
  template: `
    <svg:linearGradient
      [id]="name"
      [attr.x1]="x1"
      [attr.y1]="y1"
      [attr.x2]="x2"
      [attr.y2]="y2">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />     
    </svg:linearGradient>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgLinearGradientComponent implements OnChanges {
  
  @Input() orientation = 'vertical';
  @Input() color;
  @Input() name;
  @Input() stops: any[];

  x1: any;
  x2: any;
  y1: any;
  y2: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.x1 = '0%';
    this.x2 = '0%';
    this.y1 = '0%';
    this.y2 = '0%';

    if (this.orientation === 'horizontal') {
      this.x2 = '100%';
    } else if (this.orientation === 'vertical') {
      this.y1 = '100%';
    }

  }
}
