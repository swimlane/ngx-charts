import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BaseChart } from '../common/BaseChart';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { gridLayout } from '../common/gridLayout';

@Component({
  selector: 'number-card',
  template: `
    <chart
      [legend]="false"
      [view]="view">
      <svg:g [attr.transform]="transform" class="viz numbercard">
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
export class NumberCard extends BaseChart implements OnInit {
  dims: ViewDimensions;
  data: any[];
  colors: Function;
  transform: string;

  @Input() view;
  @Input() results;
  @Input() margin = [10, 10, 10, 10];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);

    let sortedData = this.results.series[0];
    sortedData.array = sortedData.array.sort((a, b) => {
      return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1]);
    });

    this.data = gridLayout(this.dims, sortedData, 150);

    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
  }

  update() {
  }

}
