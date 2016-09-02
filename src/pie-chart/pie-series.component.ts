import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[pieSeries]',
  template: `
    <svg:g *ngFor="let arc of data">
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
        [total]="total"
        [value]="arc.data.value"
        [max]="max"
        [explodeSlices]="explodeSlices"
        (clickHandler)="click($event)"
        swPopover
        [popoverSpacing]="15"
        [popoverText]="tooltipText(arc)"
        [popoverGroup]="'charts'"
        [gradient]="gradient"
      ></svg:g>

    </svg:g>
  `
})
export class PieSeries implements OnInit, OnChanges {
  total: number;
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

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    let pie: any = d3.pie()
      .value((d) => d.value)
      .sort(null);

    this.total = this.getTotal();

    let arcData = pie(this.series);

    this.max = d3.max(arcData, (d) => {
      return d.value;
    });

    this.data = this.calculateLabelPositions(arcData);
  }

  getTotal() {
    return this.series
      .map(d => d.value)
      .reduce((sum, val) => { return sum + val; } );
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
    var minDistance = 10;
    var chart = this;
    var labelPositions = pieData;

    labelPositions.forEach(function(d) {
      d.pos = chart.outerArc().centroid(d);
      d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
    });

    for (var i = 0; i < labelPositions.length - 1; i++) {
      var a = labelPositions[i];

      for (var j = i + 1; j < labelPositions.length; j++) {
        var b = labelPositions[j];
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
    return arc.data.name;
  }

  tooltipText(arc) {
    return `${this.label(arc)}: ${arc.data.value}`;
  }

  color(arc) {
    return this.colors(this.label(arc));
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
