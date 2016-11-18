import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[pieSeries]',
  template: `
    <svg:g *ngFor="let arc of data; trackBy:trackBy">
      <svg:g pieLabel
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="label(arc)"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices">
      </svg:g>

      <svg:g pieArc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [max]="max"
        [explodeSlices]="explodeSlices"
        (clickHandler)="click($event)"
        [gradient]="gradient"

        swui-tooltip
        [tooltipPlacement]="'top'"
        [tooltipType]="'tooltip'"
        [tooltipTitle]="tooltipText(arc)">
      </svg:g>

    </svg:g>
  `
})
export class PieSeries implements OnChanges {
  max: number;
  data: any;

  @Input() colors;
  @Input() series: any = [];
  @Input() dims;
  @Input() innerRadius = 60;
  @Input() outerRadius = 80;
  @Input() explodeSlices;
  @Input() showLabels;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }

  update() {
    let pie: any = d3.pie()
      .value((d) => d.value)
      .sort(null);

    let arcData = pie(this.series);

    this.max = d3.max(arcData, (d) => {
      return d.value;
    });

    this.data = this.calculateLabelPositions(arcData);
  }

  midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  outerArc() {
    let factor = 1.5;
    return d3.arc()
      .innerRadius(this.outerRadius * factor)
      .outerRadius(this.outerRadius * factor);
  }

  calculateLabelPositions(pieData) {
    let minDistance = 10;
    let chart = this;
    let labelPositions = pieData;

    labelPositions.forEach(function(d) {
      d.pos = chart.outerArc().centroid(d);
      d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
    });

    for (let i = 0; i < labelPositions.length - 1; i++) {
      let a = labelPositions[i];

      for (let j = i + 1; j < labelPositions.length; j++) {
        let b = labelPositions[j];
        // if they're on the same side
        if (b.pos[0] * a.pos[0] > 0) {
          // if they're overlapping
          if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
            // push the second one down
            labelPositions[j].pos[1] = b.pos[1] + minDistance;
            j--;
          }
        }
      }
    }

    return labelPositions;
  }

  labelVisible(arc) {
    return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
  }

  label(arc) {
    let label = arc.data.name;
    if (label.constructor.name === 'Date') {
      label = label.toLocaleDateString();
    }
    return arc.data.name;
  }

  tooltipText(arc) {
    return `${this.label(arc)}: ${arc.data.value.toLocaleString()}`;
  }

  color(arc) {
    return this.colors(this.label(arc));
  }

  trackBy(index, item) {
    return item.data.name;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
