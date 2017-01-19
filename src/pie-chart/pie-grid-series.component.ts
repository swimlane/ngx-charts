import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import d3 from '../d3';

@Component({
  selector: 'g[ngx-charts-pie-grid-series]',
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:g ngx-charts-pie-arc *ngFor="let arc of arcs; trackBy:trackBy"
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
        (select)="onClick($event)">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PieGridSeriesComponent implements OnChanges {

  @Input() colors;
  @Input() data;
  @Input() innerRadius = 70;
  @Input() outerRadius = 80;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  layout: any;
  arcs: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.layout = d3.pie()
      .value((d) => d.data.value).sort(null);

    this.arcs = this.getArcs();
  }

  getArcs(): any[] {
    return this.layout(this.data).map((arc, index) => {
      const label = arc.data.data.name;
      const other = arc.data.data.other;

      if (index === 0) {
        arc.startAngle = 0;
      }

      const color = this.colors(label);
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

  onClick(data): void {
    this.select.emit({
      name: this.data[0].data.name,
      value: this.data[0].data.value
    });
  }

  trackBy(index, item): string {
    return item.data.name;
  }

  label(arc): string {
    return arc.data.name;
  }

  color(arc): any {
    return this.colors(this.label(arc));
  }

}
