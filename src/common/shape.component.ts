import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-shape]',
  template: `
    <ng-container [ngSwitch]="shapeType">
      <ng-container *ngSwitchCase="'rect'">
        <svg:rect
          [attr.x]="x"
          [attr.y]="y"
          [attr.rx]="rx"
          [attr.ry]="ry"
          [attr.width]="width"
          [attr.height]="height"
          [attr.fill]="fill"
          [attr.stroke]="stroke"
          [attr.opacity]="circleOpacity"
          [attr.class]="classNames"
          [attr.pointer-events]="pointerEvents"
        />
      </ng-container>
      <ng-container *ngSwitchCase="'polygon'">
        <svg:polygon
          [attr.points]="points"
          [attr.fill]="fill"
          [attr.stroke]="stroke"
          [attr.opacity]="circleOpacity"
          [attr.class]="classNames"
          [attr.pointer-events]="pointerEvents"
        />
      </ng-container>
      <ng-container *ngSwitchDefault>
        <svg:circle
          [attr.cx]="cx"
          [attr.cy]="cy"
          [attr.r]="r"
          [attr.fill]="fill"
          [attr.stroke]="stroke"
          [attr.opacity]="circleOpacity"
          [attr.class]="classNames"
          [attr.pointer-events]="pointerEvents"
        />
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShapeComponent implements OnChanges {
  @Input() shapeType: string = 'circle';

  // Circle Inputs
  @Input() r: number;

  // Rectangle Inputs
  @Input() rx: number = 0;
  @Input() ry: number = 0;
  @Input() width: number;
  @Input() height: number;

  // Polygon Inputs
  @Input() points: string = '';

  // Common Inputs
  @Input() cx: number;
  @Input() cy: number;
  @Input() fill: string;
  @Input() stroke: string;
  @Input() data: string | number | Date;
  @Input() classNames: string;
  @Input() circleOpacity: number;
  @Input() pointerEvents: string;

  @Output() select: EventEmitter<string | number | Date> = new EventEmitter();
  @Output() activate: EventEmitter<string | number | Date> = new EventEmitter();
  @Output() deactivate: EventEmitter<string | number | Date> = new EventEmitter();

  // Rectangle Center.
  x: number;
  y: number;

  // Polygons formatted points
  formattedPoints: string;

  @HostListener('click')
  onClick() {
    this.select.emit(this.data);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += 'circle';
    console.log('Changes Shape: ', changes);
  }
}
