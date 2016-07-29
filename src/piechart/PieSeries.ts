import { Component, Input, Output, EventEmitter } from '@angular/core';
import d3 from 'd3';
import { PieArc } from './PieArc';
import { Label } from './Label';
import { Popover } from '../common/popover/PopoverComponent';

@Component({
  selector: 'g[pie-series]',
  directives: [PieArc, Label, Popover],
  template: `
    <svg:g *ngFor="let arc of data">
      <svg:g pie-label
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="label(arc)"
        [max]="max"
        [value]="arc.data.vals[0].value"
        [explodeSlices]="explodeSlices">
      </svg:g>

      <svg:g pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [total]="total"
        [value]="arc.data.vals[0].value"
        [max]="max"
        [explodeSlices]="explodeSlices"
        (clickHandler)="click($event)"
        sw-popover
        [popoverSpacing]="15"
        [popoverText]="tooltipText(arc)"
        [popoverGroup]="'charts'">
      </svg:g>

    </svg:g>
  `
})
export class PieSeries {
  @Input() colors;
  @Input() data = [];
  @Input() dims;
  @Input() innerRadius = 60;
  @Input() outerRadius = 80;
  @Input() explodeSlices;
  @Input() showLabels;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    let pie = d3.layout.pie()
      .value((d) => d.vals[0].value)
      .sort(null);

    this.total = this.data.total();

    let arcData = pie(this.data.array);

    this.max = d3.max(arcData, function(d){ return d.data.vals[0].value});

    this.data = this.calculateLabelPositions(arcData);
  }

  midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  outerArc(){
    let factor = 1.5;
    return d3.svg.arc()
      .innerRadius(this.outerRadius * factor)
      .outerRadius(this.outerRadius * factor);
  }

  calculateLabelPositions(pieData) {
    var minDistance = 10;
    var chart = this;
    var labelPositions = pieData;

    labelPositions.forEach(function (d) {
      d.pos = chart.outerArc().centroid(d);
      d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
    });

    for (var i = 0; i < labelPositions.length - 1; i++) {
      var a = labelPositions[i];

      for (var j = i+1; j < labelPositions.length; j++) {
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

  labelVisible(arc){
    return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
  }

  label(arc){
    return arc.data.vals[0].formattedLabel[0].toString();
  }

  tooltipText(arc){
    return `${this.label(arc)}: ${arc.data.vals[0].value}`;
  }

  color(arc){
    return this.colors(this.label(arc));
  }

  click(data){
    this.clickHandler.emit(data);
  }

}
