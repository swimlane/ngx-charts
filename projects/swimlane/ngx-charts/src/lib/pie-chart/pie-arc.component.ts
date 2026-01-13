import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { calculatePieArcPath, animatePieArc, getGradient, getPointerEvents } from './pie-arc.helper';
import { PieArcConfig } from './pie-arc.config';

@Component({
  selector: 'g[ngx-charts-pie-arc]',
  templateUrl: './pie-arc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PieArcComponent implements OnChanges {
  @Input() config: Partial<PieArcConfig>;
  @Input() data: DataItem;

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

  get configValues(): PieArcConfig {
    const defaultConfig: PieArcConfig = {
      fill: '',
      startAngle: 0,
      endAngle: Math.PI * 2,
      innerRadius: 0,
      outerRadius: 0,
      cornerRadius: 0,
      value: 0,
      max: 0,
      explodeSlices: false,
      gradient: false,
      animate: true,
      pointerEvents: true,
      isActive: false
    };
    return { ...defaultConfig, ...this.config };
  }

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getGradient(): string {
    const config = this.configValues;
    return getGradient(config.gradient, this.gradientFill, config.fill);
  }

  getPointerEvents(): string {
    return getPointerEvents(this.configValues.pointerEvents);
  }

  update(): void {
    const config = this.configValues;
    this.startOpacity = 0.5;
    this.radialGradientId = 'linearGrad' + id().toString();
    this.gradientFill = `url(#${this.radialGradientId})`;

    if (config.animate) {
      animatePieArc(
        this.element,
        config.startAngle,
        config.endAngle,
        config.innerRadius,
        config.outerRadius,
        config.max,
        config.value,
        config.cornerRadius,
        config.explodeSlices,
        this.initialized,
        select(this.element)
          .selectAll('.arc')
          .data([{ startAngle: config.startAngle, endAngle: config.endAngle }])
      );
      this.initialized = true;
    } else {
      this.path = calculatePieArcPath(
        config.innerRadius,
        config.outerRadius,
        config.max,
        config.value,
        config.cornerRadius,
        config.explodeSlices
      )
        .startAngle(config.startAngle)
        .endAngle(config.endAngle)();
    }
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