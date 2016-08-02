import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import d3 from 'd3';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { CellSeries } from './CellSeries';
import { calculateViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';

@Component({
  selector: 'tree-map',
  directives: [Chart, CellSeries],
  template: `
    <chart
      legend="false"
      [view]="view">
      <svg:g [attr.transform]="transform" class="viz treemap">
        <svg:g cell-series
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class TreeMap extends BaseChart implements OnInit {
  @Input() view;
  @Input() results;
  @Input() margin = [10, 10, 10, 10];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  dims: any;
  transform: any;
  colors: any;
  treemap: any;
  data: any;


  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false, 12);

    let data = [];

    for (var i = 0; i < this.results.data.length; i++) {
      data[i] = {};
      data[i].value = this.results.data[i].value;
      data[i].valueType = this.results.data[i].valueType;
      data[i].label = this.results.data[i].label;
    }

    this.treemap = d3.layout.treemap()
      .children(d => d)
      .size([this.dims.width, this.dims.height])
      .sticky(true)
      .value(d => d.value); // todo check if value method exists ?

    this.data = this.treemap(data);

    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
