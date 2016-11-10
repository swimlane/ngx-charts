import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges
} from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[pieGridSeries]',
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:g pieArc *ngFor="let arc of arcs; trackBy:trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [max]="max"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (clickHandler)="click($event)">
      </svg:g>

    </svg:g>
  `
})

export class PieGridSeries implements OnChanges {
  element: HTMLElement;
  layout: any;
  arcs: any;

  @Input() colors;
  @Input() data;
  @Input() innerRadius = 60;
  @Input() outerRadius = 80;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.layout = d3.pie()
      .value((d) => d.data.value).sort(null);

    this.arcs = this.getArcs();
  }

  getArcs() {
    return this.layout(this.data).map((arc, index) => {
      let label = arc.data.data.name;
      let other = arc.data.data.other;

      if (index === 0) {
        arc.startAngle = 0;
      }

      let color = this.colors(label);
      return {
        data: arc.data.data,
        class: 'arc ' + 'arc' + index,
        fill: color,
        startAngle: other ? 0 : arc.startAngle,
        endAngle: arc.endAngle,
        animate: !other,
        pointerEvents: !other
      };
    });
  }

  click(data) {
    this.clickHandler.emit({
      name: this.data[0].data.name,
      value: this.data[0].data.value
    });
  }

  trackBy(index, item) {
    return item.data.name;
  }

  label(arc) {
    return arc.data.name;
  }

  color(arc) {
    return this.colors(this.label(arc));
  }

}
