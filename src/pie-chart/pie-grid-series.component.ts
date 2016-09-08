import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[pieGridSeries]',
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:path *ngFor="let arc of arcs"
        [attr.class]="arc.class"
        [attr.d]="arc.d"
        [style.cursor]="arc.cursor"
        [style.opacity]="arc.opacity"
        [attr.fill]="arc.fill"
        (click)="click(arc.data)"
      />
    </svg:g>
  `
})
export class PieGridSeries implements OnInit, OnChanges {
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

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.layout = d3.pie()
      .value((d) => d.data.value).sort(null);

    this.arcs = this.getArcs();
    this.loadAnimation();
  }

  getArcs() {
    return this.layout(this.data).map((arc, index) => {
      let label = arc.data.data.name;
      let other = arc.data.data.other;

      if (index === 0) {
        arc.startAngle = 0;
      }
      let genArcPath: any = d3.arc()
        .innerRadius(this.innerRadius).outerRadius(this.outerRadius)
        .startAngle(arc.startAngle).endAngle(arc.endAngle);

      return {
        class: 'arc ' + 'arc' + index,
        d: genArcPath(), // todo check need arguments ?
        cursor: other ? 'auto' : 'pointer',
        fill: this.colors(label),
        opacity: other ? 0.4 : 1
      };
    });
  }

  loadAnimation() {
    let layout = d3.pie()
      .value((d) => d.data.value).sort(null);
    let data = layout(this.data);

    let node = d3.select(this.element).selectAll('.arc1').data([{
      startAngle: data[0].startAngle,
      endAngle: data[0].endAngle
    }]);
    var arc = this.calculateArc(this.innerRadius, this.outerRadius);

    node
      .transition()
      .attrTween("d", function(d) {
        this._current = this._current || d;
        var copyOfD = Object.assign({}, d);
        copyOfD.endAngle = copyOfD.startAngle;
        var interpolate = d3.interpolate(copyOfD, copyOfD);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      })
      .transition().duration(750)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  }

  calculateArc(innerRadius, outerRadius) {
    return d3.arc()
      .innerRadius(innerRadius).outerRadius(outerRadius);
  }

  click(data) {
    this.clickHandler.emit({
      name: this.data[0].data.name,
      value: this.data[0].data.value
    });
  }

}
