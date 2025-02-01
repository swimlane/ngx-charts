import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'g[ngx-charts-pie-arc]',
  template: `
    <svg:g class="arc-group" @toggleAnimation (@toggleAnimation.start)="onScaleToHidden($event)">
      <svg:defs *ngIf="gradient">
        <svg:g ngx-charts-svg-radial-gradient [color]="fill" [name]="radialGradientId" [startOpacity]="startOpacity" />
      </svg:defs>
      <svg:path
        [attr.d]="path"
        class="arc"
        [class.active]="isActive"
        [attr.fill]="getGradient()"
        (click)="onClick()"
        (dblclick)="onDblClick($event)"
        (mouseenter)="activate.emit(data)"
        (mouseleave)="deactivate.emit(data)"
        [style.pointer-events]="getPointerEvents()"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleAnimation', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('750ms', style({ opacity: 0 }))
      ]),
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('750ms 400ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PieArcComponent implements OnChanges {
  @Input() fill: string;
  @Input() startAngle: number = 0;
  @Input() endAngle: number = Math.PI * 2;
  @Input() innerRadius: number;
  @Input() outerRadius: number;
  @Input() cornerRadius: number = 0;
  @Input() value: number;
  @Input() max: number;
  @Input() data: DataItem;
  @Input() explodeSlices: boolean = false;
  @Input() gradient: boolean = false;
  @Input() animate: boolean = true;
  @Input() pointerEvents: boolean = true;
  @Input() isActive: boolean = false;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() dblclick = new EventEmitter();

  barOrientation = BarOrientation;

  element: HTMLElement;
  path: any;
  startOpacity: number;
  radialGradientId: string;
  gradientFill: string;
  initialized: boolean = false;

  private _timeout;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getGradient(): string {
    return this.gradient ? this.gradientFill : this.fill;
  }

  getPointerEvents(): string {
    return this.pointerEvents ? 'auto' : 'none';
  }

  update(): void {
    const calc = this.calculateArc();
    this.startOpacity = 0.5;
    this.radialGradientId = 'linearGrad' + id().toString();
    this.gradientFill = `url(#${this.radialGradientId})`;

    if (this.animate) {
      if (this.initialized) {
        this.updateAnimation();
      } else {
        this.loadAnimation();
        this.initialized = true;
      }
    } else {
      this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
    }
  }

  calculateArc(): any {
    let outerRadius = this.outerRadius;
    if (this.explodeSlices && this.innerRadius === 0) {
      outerRadius = (this.outerRadius * this.value) / this.max;
    }

    return arc().innerRadius(this.innerRadius).outerRadius(outerRadius).cornerRadius(this.cornerRadius);
  }

  onScaleToHidden(event): void {
    if (!this.animate) return;
    if (event.fromState || event.toState !== 'void') return;

    const node = select(this.element)
      .selectAll('.arc')
      .data([{ startAngle: this.startAngle, endAngle: this.startAngle }]);

    const calc = this.calculateArc();

    node
      .transition()
      .duration(750)
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        console.log((<any>this)._current);
        return function (t) {
          return calc(interpolater(t));
        };
      });
  }

  loadAnimation(): void {
    const node = select(this.element)
      .selectAll('.arc')
      .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);

    const calc = this.calculateArc();

    node
      .transition()
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const copyOfD = Object.assign({}, d);
        copyOfD.endAngle = copyOfD.startAngle;
        const interpolater = interpolate(copyOfD, copyOfD);
        (<any>this)._current = interpolater(0);
        return function (t) {
          return calc(interpolater(t));
        };
      })
      .transition()
      .duration(750)
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function (t) {
          return calc(interpolater(t));
        };
      });
  }

  updateAnimation(): void {
    const node = select(this.element)
      .selectAll('.arc')
      .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);

    const calc = this.calculateArc();

    node
      .transition()
      .duration(750)
      .attrTween('d', function (d) {
        (<any>this)._current = (<any>this)._current || d;
        const interpolater = interpolate((<any>this)._current, d);
        (<any>this)._current = interpolater(0);
        return function (t) {
          return calc(interpolater(t));
        };
      });
  }

  onClick(): void {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.select.emit(this.data), 200);
  }

  onDblClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this._timeout);

    this.dblclick.emit({
      data: this.data,
      nativeEvent: event
    });
  }
}
