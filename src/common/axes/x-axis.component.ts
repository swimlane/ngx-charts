import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'g[xAxis]',
  template: `
    <svg:g
      [attr.class]="xAxisClassName"
      [attr.transform]="transform">
      <svg:g xAxisTicks
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
      />

      <svg:g axisLabel
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="80"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `
})
export class XAxis implements OnChanges {
  @Input() xScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() xAxisTickInterval;

  xAxisTickCount: any;
  xAxisClassName: any;
  xOrient: any;
  tickArguments: any;
  xAxisOffset: any;
  transform: any;

  constructor() {
    Object.assign(this, {
      xAxisClassName: 'x axis',
      xOrient: 'bottom',
      fill: 'none',
      stroke: 'none',
      tickStroke: '#ccc',
      strokeWidth: 'none',
      xAxisOffset: 5,
    });
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.transform = `translate(0,${this.xAxisOffset + this.dims.height})`;

    if (typeof this.xAxisTickCount !== 'undefined') {
      this.tickArguments = [this.xAxisTickCount];
    }

    if (typeof this.xAxisTickInterval !== 'undefined') {
      // todo we need to change this, because the function names have changed: https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
      // this.tickArguments = [d3.time[this.xAxisTickInterval.unit], this.xAxisTickInterval.interval];
    }
  }

}
