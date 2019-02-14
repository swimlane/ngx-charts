import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils';
import {RealtimeDataConfig} from '../models/RealtimeDataConfig';
import {easeLinear} from 'd3-ease';
import {scaleLinear} from 'd3-scale';

@Component({
  selector: 'g[ngx-charts-area]',
  template: `
    <svg:defs *ngIf="gradient">
      <svg:g ngx-charts-svg-linear-gradient
        orientation="vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
    </svg:defs>
    <svg:path
      class="area"
      [attr.d]="areaPath"
      [attr.fill]="gradient ? gradientFill : fill"
      [style.opacity]="opacity"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaComponent implements OnChanges {
  @Input() data;
  @Input() path;
  @Input() startingPath;
  @Input() fill;
  @Input() opacity = 1;
  @Input() startOpacity = 0.5;
  @Input() endOpacity = 1;
  @Input() activeLabel;
  @Input() gradient: boolean = false;
  @Input() stops: any[];
  @Input() animations: boolean = true;
  @Input() realtimeDataConfig: RealtimeDataConfig;
  @Input() chartWidth: number;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  gradientId: string;
  gradientFill: string;
  areaPath: string;
  initialized: boolean = false;
  gradientStops: any[];
  hasGradient: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.loadAnimation();
      this.initialized = true;
    } else {
      this.update(changes);
    }
  }

  update(changes: SimpleChanges): void {
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(#${this.gradientId})`;

    if (this.gradient || this.stops) {
      this.gradientStops = this.getGradient();
      this.hasGradient = true;
    } else {
      this.hasGradient = false;
    }

    this.updatePathEl(changes);
  }

  loadAnimation(): void {
    this.areaPath = this.startingPath;
    setTimeout(this.update.bind(this), 100);
  }

  updatePathEl(changes: SimpleChanges): void {
    const node = select(this.element).select('.area');

    if (this.animations) {
      if (this.realtimeDataConfig && changes && changes.path) {
        node
          .transition()
          .duration(this.realtimeDataConfig.animationDuration)
          .ease(easeLinear)
          .attr('transform', `translate(${this.x(-1)}) scale(1.05, 1)`)
          .on('start', () => {
            node
              .attr('d', this.path)
              .attr('transform', 'scale(1.05, 1)');
          });
      } else {
        node.transition().duration(750)
          .attr('d', this.path);
      }
    } else {
      node.attr('d', this.path);
    }
  }

  getGradient() {
    if (this.stops) {
      return this.stops;
    }

    return [
      {
        offset: 0,
        color: this.fill,
        opacity: this.startOpacity
      },
      {
        offset: 100,
        color: this.fill,
        opacity: this.endOpacity
    }];
  }

  private x(pos: number): number {
    return scaleLinear()
      .domain([0, this.realtimeDataConfig.numPoints - 1])
      .rangeRound([0, this.chartWidth])(pos);
  }
}
