import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { pie, arc } from 'd3-shape';
import { PieArcConfig } from './pie-arc.config';

@Component({
  selector: 'g[ngx-charts-pie-grid-series]',
  template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [config]="getArcConfig(arc)"
        [data]="arc.data"
        (select)="select.emit($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PieGridSeriesComponent implements OnChanges {
  @Input() colors;
  @Input() data;
  @Input() innerRadius = 70;
  @Input() outerRadius = 80;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  layout: any;
  arcs: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.layout = pie<any, any>()
      .value(d => d.data.value)
      .sort(null);

    this.arcs = this.layout(this.data);
  }

  getArcConfig(arc): PieArcConfig {
    return {
      fill: this.colors.getColor(arc.data.name),
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      cornerRadius: 0,
      value: arc.data.value,
      max: 0,
      explodeSlices: false,
      gradient: false,
      animate: this.animations,
      pointerEvents: arc.data.pointerEvents,
      isActive: false
    };
  }

  trackBy(index, item): string {
    return item.data.name;
  }
}