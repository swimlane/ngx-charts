import { Component, Input, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import * as moment from 'moment';
import d3 from '../d3';

@Component({
  selector: 'g[timeline]',
  template: `
    <svg:g
      [attr.transform]="transform">

      <svg:g xAxis
        [xScale]="xScale"
        [dims]="dims"
        [showGridLines]="showGridLines"
      />

      <svg:g class="brush">
      </svg:g>

    </svg:g>
  `
})
export class Timeline implements OnChanges {
  element: HTMLElement;
  dims: any;
  xDomain: any[];
  yDomain: any[];
  xScale: any;
  brush: any;
  transform: string;
  margin = [10, 20, 70, 20];
  initialized: boolean = false;

  @Input() view;
  @Input() state;
  @Input() results;
  @Input() scheme;
  @Input() customColors;
  @Input() legend;
  @Input() miniChart;
  @Input() autoScale;
  @Input() scaleType;

  @Output() clickHandler = new EventEmitter();
  @Output() onDomainChange = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();

    if (!this.initialized){
      this.addBrush();
      this.initialized = true;
    }
  }

  update() {
    this.dims = this.getDims();
    let offsetY = this.view[1] - 150;

    this.xDomain = this.getXDomain();
    this.xScale = this.getXScale();

    this.transform = `translate(${ this.margin[3] } , ${ this.margin[0] + offsetY })`;
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

  getYDomain() {

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

  getYScale() {
    d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
  }

  addBrush() {
    if (this.brush) {
      return;
    }

    let height = 150 - this.margin[0] - this.margin[2];
    let width = this.view[0];
    if (this.legend) {
      width = width * 9 / 12.0;
    }
    width = width - this.margin[1] - this.margin[3];

    this.brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on("brush end", () => {
        let selection = d3.selection.event.selection || this.xScale.range();
        let newDomain = selection.map(this.xScale.invert);
        this.onDomainChange.emit(newDomain);
      });

    d3.select(this.element)
      .select('.brush')
      .call(this.brush)
  }

  getDims() {
    let width = this.view[0];
    let height = 150;

    if (this.legend) {
      width = width * 9 / 12.0;
    }

    let dims = {
      width: width - this.margin[1] - this.margin[3],
      height: height - this.margin[0] - this.margin[2]
    };
    return dims;
  }

}
