import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  trigger,
  style,
  transition,
  animate
} from '@angular/core';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';

import { trimLabel } from '../common/trim-label.helper';

@Component({
  selector: 'g[ngx-charts-pie-label]',
  template: `
    <title>{{label}}</title>
    <svg:text
      [@animationState]="'active'"
      class="pie-label"
      [attr.transform]="transform"
      dy=".35em"
      [style.textAnchor]="textAnchor()"
      [style.shapeRendering]="'crispEdges'"
      [style.textTransform]="'uppercase'">
      {{trimLabel(label, 10)}}
    </svg:text>
    <svg:path
      [@animationState]="'active'"
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="line"
      [style.strokeDasharray]="2000"
      [style.strokeDashoffset]="0">
    </svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('0.25s 1s', style({opacity: 1}))
      ])
    ])
  ]
})
export class PieLabelComponent implements OnChanges {

  @Input() data;
  @Input() radius;
  @Input() label;
  @Input() color;
  @Input() max;
  @Input() value;
  @Input() explodeSlices;

  element: HTMLElement;
  trimLabel: (label: string, max?: number) => string;
  labelXY: any;
  transform: string;
  line: string;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.trimLabel = trimLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    const factor = 1.5;

    const outerArc = arc()
      .innerRadius(this.radius * factor)
      .outerRadius(this.radius * factor);

    let startRadius = this.radius;
    if (this.explodeSlices) {
      startRadius = this.radius * this.value / this.max;
    }

    const innerArc = arc()
      .innerRadius(startRadius)
      .outerRadius(startRadius);

    this.labelXY = this.data.pos;

    // Calculate innerPos then scale outer position to match label position
    const innerPos = innerArc.centroid(this.data);
    const scale = this.data.pos[1] / innerPos[1];
    const outerPos = [scale * innerPos[0], scale * innerPos[1]];

    this.line = `M${innerPos}L${outerPos}L${this.labelXY}`;
    this.transform = `translate(${this.labelXY})`;

    this.loadAnimation();
  }

  textAnchor(): any {
    return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
  }

  midAngle(d): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  loadAnimation(): void {
    const label = select(this.element).select('.label');
    const line = select(this.element).select('.line');

    label
      .attr('opacity', 0)
      .transition().delay(750).duration(750)
      .attr('opacity', 1);

    line
      .style('stroke-dashoffset', 2000)
      .transition().delay(750).duration(750)
      .style('stroke-dashoffset', '0')
      .transition()
      .style('stroke-dasharray', 'none');
  }

}
