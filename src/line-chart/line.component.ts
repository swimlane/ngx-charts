import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import {select} from 'd3-selection';
import {easeLinear} from 'd3-ease';
import {scaleLinear} from 'd3-scale';
import {RealtimeDataConfig} from '../models/RealtimeDataConfig';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:g>
      <svg:path
        [@animationState]="'active'"
        class="line"
        [attr.d]="initialPath"
        [attr.fill]="fill"
        [attr.stroke]="stroke"
        stroke-width="1.5px"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
        }),
        animate(1000, style({
          strokeDashoffset: 0
        }))
      ])
    ])
  ]
})
export class LineComponent implements OnChanges {
  @Input() path;
  @Input() stroke;
  @Input() data;
  @Input() fill: string = 'none';
  @Input() animations: boolean = true;
  @Input() realtimeDataConfig: RealtimeDataConfig;
  @Input() chartWidth: number;

  @Output() select = new EventEmitter();

  initialized: boolean = false;
  initialPath: string;

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.initialized = true;
      this.initialPath = this.path;
    } else {
      this.updatePathEl(changes);
    }
  }

  updatePathEl(changes: SimpleChanges): void {
    const node = select(this.element.nativeElement).select('.line');

    if (this.animations) {
      if (this.realtimeDataConfig && !isNullOrUndefined(changes.path)) {
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
        node
          .transition()
          .duration(750)
          .attr('d', this.path);
      }
    } else {
      node.attr('d', this.path);
    }
  }

  private x(pos: number): number {
    return scaleLinear()
      .domain([0, this.realtimeDataConfig.numPoints - 1])
      .rangeRound([0, this.chartWidth])(pos);
  }
}
