import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';

@Component({
  selector: 'g[yAxis]',
  template: `
    <svg:g
      [attr.class]="yAxisClassName"
      [attr.transform]="transform">
      <svg:g yAxisTicks
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g axisLabel
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnChanges {

  @Input() yScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() yAxisTickInterval;

  @Output() dimensionsChanged = new EventEmitter();

  yAxisTickCount: any;
  tickArguments: any;
  offset: any;
  transform: any;
  yAxisOffset: any;
  yOrient: any;
  labelOffset: number = 80;

  @ViewChild(YAxisTicksComponent) ticksComponent: YAxisTicksComponent;

  constructor() {
    Object.assign(this, {
      yAxisClassName: 'y axis',
      yOrient: 'left',
      fill: 'none',
      stroke: '#ccc',
      tickStroke: '#ccc',
      strokeWidth: '1',
      yAxisOffset: -5
    });
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.offset = this.yAxisOffset;
    if (this.yOrient === 'right') {
      this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
      this.transform = `translate(${this.offset} , 0)`;
    }

    if (this.yAxisTickCount !== undefined) {
      this.tickArguments = [this.yAxisTickCount];
    }
  }

  emitTicksWidth({width}) {
    if (width !== this.labelOffset) {
      this.labelOffset = width;
      setTimeout(() => {
        this.dimensionsChanged.emit({width: width});
      }, 0);
    }
  }

}
