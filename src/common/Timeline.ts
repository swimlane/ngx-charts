import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import d3 from 'd3';
import { Chart } from '../common/charts/Chart';
import { XAxis } from '../common/axes/XAxis';
import moment = require("moment");
import { throttle } from "../utils/throttle";

@Component({
  selector: 'g[timeline]',
  directives: [Chart, XAxis],
  template: `
    <svg:g
      [attr.transform]="transform">

      <svg:g x-axis
        [xScale]="xScale"
        [dims]="dims"
        [showGridLines]="showGridLines"
      />

      <svg:g class="x brush">
      </svg:g>

    </svg:g>
  `
})
export class Timeline implements OnInit {
  element: HTMLElement;
  dims: any;
  xScale: d3.time.Scale;
  brush: d3.svg.Brush;
  transform: string;

  @Input() view;
  @Input() state;
  @Input() results;
  @Input() scheme;
  @Input() margin = [10, 20, 70, 20];
  @Input() customColors;
  @Input() legend;
  @Input() miniChart;
  @Input() autoScale;

  @Output() clickHandler = new EventEmitter();
  @Output() updateXDomain = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.dims = this.calculateDims();
    let offsetY = this.view[1] - 150;
    let results = this.results;

    results.series[0] = results.series[0].sort((a, b) => {
      return results.d0Domain.indexOf(a.vals[0].label[0][0]) - results.d0Domain.indexOf(b.vals[0].label[0][0]);
    });

    let yScale = d3.scale.linear()
      .range([this.dims.height, 0])
      .domain(results.m0Domain);

    if (!this.autoScale) {
      yScale.domain([0, results.m0Domain[1]]);
    }

    this.xScale = this.calculateXScale();
    this.transform = `translate(${ this.margin[3] } , ${ this.margin[0] + offsetY })`;

    this.addBrush();
  }

  addBrush() {
    if (this.state.brush) {
      this.brush = this.state.brush;
    } else {
      this.brush = d3.svg.brush()
        .x(this.state.xScale)
        .on("brush", throttle(() => {
          var newDomain = this.brush.empty() ? this.state.xScale.domain() : this.brush.extent();
          this.updateXDomain.emit(newDomain);
        }, 100));

      // todo fix missing function
      this.setState({
        brush: this.brush
      });
    }

    let height = 150 - this.margin[0] - this.margin[2];
    let width = this.view[0];
    if (this.legend) {
      width = width * 9 / 12.0;
    }
    width = width - this.margin[1] - this.margin[3];

    d3.select(this.element)
      .select('.brush')
      .call(this.brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height);

    d3.select(this.element)
      .selectAll('.background')
      .attr('width', width);
  }

  calculateXScale() {
    let xScale;
    let domain = d3.extent(this.results.d0Domain, function(d) {
      return moment(d).toDate();
    });
    if (this.state.xScale) {
      xScale = this.state.xScale;

    } else {
      xScale = d3.time.scale()
        .range([0, this.dims.width])
        .domain(domain);
    }

    if (xScale.domain() !== domain) {
      xScale.domain(domain);
    }

    return xScale;
  }

  calculateDims() {
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
