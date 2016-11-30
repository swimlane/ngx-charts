import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';

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
        (dimensionsChanged)="emitTicksHeight($event)"
      />

      <svg:g axisLabel
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="'bottom'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {

  @Input() xScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() xAxisTickInterval;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisTickCount: any;
  xAxisClassName: any;
  xOrient: any;
  tickArguments: any;
  xAxisOffset: any;
  transform: any;
  labelOffset: number = 80;

  @ViewChild(XAxisTicksComponent) ticksComponent: XAxisTicksComponent;

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
  }

  emitTicksHeight({height}) {
    let newLabelOffset = height + 25 + 5;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({height: height});
      }, 0);
    }
  }

}
