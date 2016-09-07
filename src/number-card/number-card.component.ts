import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { gridLayout } from '../common/grid-layout.helper';

@Component({
  selector: 'number-card',
  template: `
    <chart
      [legend]="false"
      [view]="view">
      <svg:g [attr.transform]="transform" class="numbercard">
        <svg:g cardSeries
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class NumberCard extends BaseChart implements OnInit, OnChanges {
  dims: ViewDimensions;
  data: any[];
  colors: Function;
  transform: string;
  domain: any[];

  @Input() view;
  @Input() results;
  @Input() margin = [10, 10, 10, 10];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);

    this.domain = this.getDomain();

    // let sortedData = this.results;
    // sortedData.array = sortedData.sort((a, b) => {
    //   return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1]);
    // });

    this.data = gridLayout(this.dims, this.results, 150);

    this.setColors();
    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  getDomain() {
    return this.results.map(d => d.name);
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
