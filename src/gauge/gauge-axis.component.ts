import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import d3 from '../d3';

@Component({
  selector: 'g[ngx-charts-gauge-axis]',
  template: `
    <svg:g [attr.transform]="rotate">
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
        <svg:g *ngFor="let tick of ticks.big"
            class="gauge-tick gauge-tick-large">
            <svg:text
                [style.textAnchor]="tick.textAnchor"
                [attr.transform]="tick.textTransform"
                alignment-baseline="central">
                {{tick.text}}
            </svg:text>
        </svg:g>
        <svg:g *ngFor="let tick of ticks.small"            
            class="gauge-tick gauge-tick-small">
            <svg:path [attr.d]="tick.line" />
        </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeAxisComponent implements OnChanges {
  @Input() bigSegments: any;
  @Input() smallSegments: any;
  @Input() min: any;
  @Input() max: any;
  @Input() angleSpan: number;
  @Input() startAngle: number;
  @Input() radius: any;
  @Input() valueScale: any;

  ticks: any[];
  rotationAngle: number;
  rotate: string = '';

  ngOnChanges() {
    this.update();
  }

  update(): void {
    this.rotationAngle = -90 + this.startAngle;
    this.rotate = `rotate(${ this.rotationAngle })`;
    this.ticks = this.getTicks();
  }

  getTicks(): any {
    let bigTickSegment = this.angleSpan / this.bigSegments;
    let smallTickSegment = bigTickSegment / (this.smallSegments);
    let tickLength = 20;
    let ticks = {
      big: [],
      small: []
    };

    let startDistance = this.radius + 10;
    let textDist = startDistance + tickLength + 10;

    for (let i = 0; i <= this.bigSegments; i++) {
      let angleDeg = i * bigTickSegment;
      let angle = angleDeg * Math.PI / 180;

      let textAnchor = this.getTextAnchor(angleDeg);

      ticks.big.push({
        line: this.getTickPath(startDistance, tickLength, angle),
        textAnchor: textAnchor,
        text: Number.parseInt(this.valueScale.invert(angleDeg).toString()).toLocaleString(),
        textTransform: `translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(${ -this.rotationAngle })`
      });

      if (i === this.bigSegments) {
        continue;
      }

      for (let j = 1; j <= this.smallSegments; j++) {
        let smallAngleDeg = angleDeg + j * smallTickSegment;
        let smallAngle = smallAngleDeg * Math.PI / 180;        

        ticks.small.push({
          line: this.getTickPath(startDistance, tickLength/2, smallAngle)
        });
      }
    }

    return ticks;
  }

  getTextAnchor(angle) {
    // [0, 45] = 'middle';
    // [46, 135] = 'start';
    // [136, 225] = 'middle';
    // [226, 315] = 'end';

    angle = (this.startAngle + angle) % 360;
    let textAnchor = 'middle';
    if (angle > 45 && angle <= 135) {
      textAnchor = 'start';
    } else if (angle > 225 && angle <= 315) {
      textAnchor = 'end';
    }
    return textAnchor;
  }

  getTickPath(startDistance, tickLength, angle): any {
    let y1 = startDistance * Math.sin(angle);
    let y2 = (startDistance + tickLength) * Math.sin(angle);
    let x1 = startDistance * Math.cos(angle);
    let x2 = (startDistance + tickLength) * Math.cos(angle);

    let points = [{x: x1, y: y1}, {x: x2, y: y2}];
    let line = d3.line().x(d => d.x).y(d => d.y);
    return line(points);
  }

}
