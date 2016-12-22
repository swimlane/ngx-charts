import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import d3 from '../d3';

@Component({
  selector: 'g[ngx-charts-pie-label]',
  template: `
    <title>{{label}}</title>
    <svg:text
      class="pie-label"
      [attr.transform]="transform"
      dy=".35em"
      [style.textAnchor]="textAnchor()"
      [style.shapeRendering]="'crispEdges'"
      [style.textTransform]="'uppercase'">
      {{trimLabel(label, 10)}}
    </svg:text>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="line"
      [style.strokeDasharray]="2000"
      [style.strokeDashoffset]="0">
    </svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  trimLabel: Function;
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

    let outerArc = d3.arc()
      .innerRadius(this.radius * factor)
      .outerRadius(this.radius * factor);

    let startRadius = this.radius;
    if (this.explodeSlices) {
      startRadius = this.radius * this.value / this.max;
    }

    let innerArc = d3.arc()
      .innerRadius(startRadius)
      .outerRadius(startRadius);

    this.labelXY = outerArc.centroid(this.data);
    this.labelXY[0] = this.radius * factor * (this.midAngle(this.data) < Math.PI ? 1 : -1);
    this.labelXY[1] = this.data.pos[1];

    this.line = `M${innerArc.centroid(this.data)}L${outerArc.centroid(this.data)}L${this.labelXY}`;
    this.transform = `translate(${this.labelXY})`;

    this.loadAnimation();
  }

  textAnchor(): any {
    return this.midAngle(this.data) < Math.PI ? "start" : "end";
  }

  midAngle(d): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  loadAnimation(): void {
    let label = d3.select(this.element).select('.label');
    let line = d3.select(this.element).select('.line');

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
