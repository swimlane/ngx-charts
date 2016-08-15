import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[pieGridSeries]',
  directives: [],
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:path *ngFor="let arc of arcs"
        [attr.class]="arc.class"
        [attr.d]="arc.d"
        [style.cursor]="arc.cursor"
        [attr.fill]="arc.fill"
        (clickHandler)="click($event)"
      />
    </svg:g>
  `
})
export class PieGridSeries implements OnInit {
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
    this.layout = d3.pie()
      .value((d) => d.data.value).sort(null);

    this.arcs = this.getArcs();
    this.loadAnimation();
  }

  getArcs() {
    return this.layout(this.data).reverse().map((arc, index) => {
      let label = arc.data.data.formattedLabel[0];
      // let value = arc.data.data.value; // unusued variable
      let other = arc.data.data.other;
      if (index === 0) {
        arc.startAngle = 0;
      }
      let genArcPath: any = d3.arc()
        .innerRadius(this.innerRadius).outerRadius(this.outerRadius)
        .startAngle(arc.startAngle).endAngle(arc.endAngle);

      return {
        class: 'viz arc ' + 'arc' + index,
        d: genArcPath(), // todo check need arguments ?
        cursor: other ? 'auto' : 'pointer',
        fill: this.colors(label)
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
    this.clickHandler.emit(data);
  }

}
