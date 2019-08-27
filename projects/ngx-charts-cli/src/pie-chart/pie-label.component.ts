import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { arc } from 'd3-shape';

import { trimLabel } from '../common/trim-label.helper';

@Component({
  selector: 'g[ngx-charts-pie-label]',
  template: `
    <title>{{label}}</title>
    <svg:g
      [attr.transform]="attrTransform"
      [style.transform]="styleTransform"
      [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'">
        {{labelTrim ? trimLabel(label, labelTrimSize) : label}}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations">
    </svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieLabelComponent implements OnChanges {
  @Input() data;
  @Input() radius;
  @Input() label;
  @Input() color;
  @Input() max;
  @Input() value;
  @Input() explodeSlices;
  @Input() animations: boolean = true;
  @Input() labelTrim: boolean = true;
  @Input() labelTrimSize: number = 10;

  trimLabel: (label: string, max?: number) => string;
  line: string;

  private readonly isIE = /(edge|msie|trident)/i.test(navigator.userAgent);

  constructor() {
    this.trimLabel = trimLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let startRadius = this.radius;
    if (this.explodeSlices) {
      startRadius = this.radius * this.value / this.max;
    }

    const innerArc = arc()
      .innerRadius(startRadius)
      .outerRadius(startRadius);

    // Calculate innerPos then scale outer position to match label position
    const innerPos = innerArc.centroid(this.data);

    let scale = this.data.pos[1] / innerPos[1];
    if (this.data.pos[1] === 0 || innerPos[1] === 0) {
      scale = 1;
    }
    const outerPos = [scale * innerPos[0], scale * innerPos[1]];

    this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
  }

  get textX(): number {
    return this.data.pos[0];
  }

  get textY(): number {
    return this.data.pos[1];
  }

  get styleTransform(): string {
    return this.isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
  }

  get attrTransform(): string {
    return !this.isIE ? null : `translate(${this.textX},${this.textY})`;
  }

  get textTransition(): string {
    return this.isIE || !this.animations ? null : 'transform 0.75s';
  }

  textAnchor(): any {
    return this.midAngle(this.data) < Math.PI ? 'start' : 'end';
  }

  midAngle(d): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }
}
