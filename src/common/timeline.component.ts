import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import * as moment from 'moment';
import d3 from '../d3';
import { id } from "../utils/id";

@Component({
  selector: 'g[timeline]',
  template: `
    <svg:g
      class="timeline"
      [attr.transform]="transform">

      <svg:filter [attr.id]="filterId">
        <svg:feColorMatrix in="SourceGraphic"
            type="matrix"
            values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />
      </svg:filter>

      <svg:g [attr.filter]="filter" class="embedded-chart">
        <ng-content></ng-content>
      </svg:g>

      <svg:g class="brush">
      </svg:g>

    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timeline implements OnChanges {
  element: HTMLElement;
  dims: any;
  xDomain: any[];
  xScale: any;
  brush: any;
  transform: string;
  initialized: boolean = false;
  filterId: any;
  filter: any;

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

  @Output() clickHandler = new EventEmitter();
  @Output() onDomainChange = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();

    if (!this.initialized) {
      this.addBrush();
      this.initialized = true;
    }
  }

  update() {
    this.dims = this.getDims();
    this.height = this.dims.height;
    let offsetY = this.view[1] - this.height;

    this.xDomain = this.getXDomain();
    this.xScale = this.getXScale();

    if (this.brush) {
      this.updateBrush();
    }

    this.transform = `translate(0 , ${ offsetY })`;

    let pageUrl = window.location.href;
    this.filterId = 'filter' + id().toString();
    this.filter = `url(${pageUrl}#${this.filterId})`;
  }

  getXDomain() {
    let values = [];
    for (let results of this.results) {
      for (let d of results.series){
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    let domain = [];
    if (this.scaleType === 'time') {
      values = values.map(v => moment(v).toDate());
      let min = Math.min(...values);
      let max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      let min = Math.min(...values);
      let max = Math.max(...values);
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

  addBrush() {
    if (this.brush) {
      return;
    }

    let height = this.height;
    let width = this.view[0];

    this.brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on("brush end", () => {
        let selection = d3.selection.event.selection || this.xScale.range();
        let newDomain = selection.map(this.xScale.invert);
        this.onDomainChange.emit(newDomain);
      });

    d3.select(this.element)
      .select('.brush')
      .call(this.brush);
  }

  updateBrush() {
    if (!this.brush) {
      return;
    }

    let height = this.height;
    let width = this.view[0];

    this.brush.extent([[0, 0], [width, height]]);
    d3.select(this.element)
      .select('.brush')
      .call(this.brush);

    // clear hardcoded properties so they can be defined by CSS
    d3.select(this.element).select('.selection')
      .attr('fill', undefined)
      .attr('stroke', undefined)
      .attr('fill-opacity', undefined);
  }

  getDims() {
    let width = this.view[0];

    let dims = {
      width: width,
      height: this.height
    };
    return dims;
  }

}
