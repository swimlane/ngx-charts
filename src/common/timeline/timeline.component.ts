import {
  Component, Input, Output, EventEmitter, ElementRef,
  OnChanges, ChangeDetectionStrategy, NgZone,
  ChangeDetectorRef, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import d3 from '../../d3';
import { id } from '../../utils';

@Component({
  selector: 'g[ngx-charts-timeline]',
  template: `
    <svg:g
      class="timeline"
      [attr.transform]="transform">
      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix in="SourceGraphic"
            type="matrix"
            values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
      </svg:filter>
      <svg:g class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>
      <svg:rect x="0"
        [attr.width]="view[0]"
        y="0"
        [attr.height]="height"
        class="brush-background"
      />
      <svg:g class="brush"></svg:g>
    </svg:g>
  `,
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timeline implements OnChanges {

  @Input() view;
  @Input() state;
  @Input() results;
  @Input() scheme;
  @Input() customColors;
  @Input() legend;
  @Input() miniChart;
  @Input() autoScale;
  @Input() scaleType;
  @Input() height: number = 50;

  @Output() select = new EventEmitter();
  @Output() onDomainChange = new EventEmitter();

  element: HTMLElement;
  dims: any;
  xDomain: any[];
  xScale: any;
  brush: any;
  transform: string;
  initialized: boolean = false;
  filterId: any;
  filter: any;

  constructor(
    element: ElementRef,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private location: LocationStrategy) {
      this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();

    if (!this.initialized) {
      this.addBrush();
      this.initialized = true;
    }
  }

  update(): void {
    this.zone.run(() => {
      this.dims = this.getDims();
      this.height = this.dims.height;
      const offsetY = this.view[1] - this.height;

      this.xDomain = this.getXDomain();
      this.xScale = this.getXScale();

      if (this.brush) {
        this.updateBrush();
      }

      this.transform = `translate(0 , ${ offsetY })`;

      const pageUrl = this.location instanceof PathLocationStrategy
        ? this.location.path()
        : '';

      this.filterId = 'filter' + id().toString();
      this.filter = `url(${pageUrl}#${this.filterId})`;

      this.cd.markForCheck();
    });
  }

  getXDomain(): any[] {
    let values = [];

    for (const results of this.results) {
      for (const d of results.series){
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    let domain = [];
    if (this.scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }

    return domain;
  }

  getXScale() {
    let scale;

    if (this.scaleType === 'time') {
      scale = d3.scaleTime()
        .range([0, this.dims.width])
        .domain(this.xDomain);
    } else if (this.scaleType === 'linear') {
      scale = d3.scaleLinear()
        .range([0, this.dims.width])
        .domain(this.xDomain);
    } else if (this.scaleType === 'ordinal') {
      scale = d3.scalePoint()
        .range([0, this.dims.width])
        .padding(0.1)
        .domain(this.xDomain);
    }

    return scale;
  }

  addBrush(): void {
    if (this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on('brush end', () => {
        this.zone.run(() => {
          const selection = d3.selection.event.selection || this.xScale.range();
          const newDomain = selection.map(this.xScale.invert);

          this.onDomainChange.emit(newDomain);
          this.cd.markForCheck();
        });
      });

    d3.select(this.element)
      .select('.brush')
      .call(this.brush);
  }

  updateBrush(): void {
    if (!this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.zone.run(() => {
      this.brush.extent([[0, 0], [width, height]]);
      d3.select(this.element)
        .select('.brush')
        .call(this.brush);

      // clear hardcoded properties so they can be defined by CSS
      d3.select(this.element).select('.selection')
        .attr('fill', undefined)
        .attr('stroke', undefined)
        .attr('fill-opacity', undefined);

      this.cd.markForCheck();
    });
  }

  getDims(): any {
    const width = this.view[0];

    const dims = {
      width,
      height: this.height
    };

    return dims;
  }

}
