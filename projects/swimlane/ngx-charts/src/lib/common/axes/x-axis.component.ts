import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';
import { select } from 'd3-selection';

@Component({
  selector: 'g[ngx-charts-x-axis]',
  template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        [wrapTicks]="wrapTicks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <title>{{ labelText }}</title>
      <svg:g
        ngx-charts-axis-label
        class="x-axis-label"
        *ngIf="showLabel"
        [label]="labelTextTemp"
        [offset]="labelOffset"
        [orient]="orientation.Bottom"
        [height]="dims.height"
        [width]="dims.width"
        [trimLabel]="trimLabel"
        [maxLabelLength]="maxLabelLength"
        [wrapLabel]="wrapLabel"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {
  @Input() xScale;
  @Input() dims: ViewDimensions;
  @Input() trimTicks: boolean;
  @Input() rotateTicks: boolean = true;
  @Input() maxTickLength: number;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel: boolean;
  @Input() labelText: string;
  @Input() ticks: any[];
  @Input() xAxisTickCount: number;
  @Input() xOrient: Orientation = Orientation.Bottom;
  @Input() xAxisOffset: number = 0;
  @Input() wrapTicks = false;
  @Input() maxLabelLength: number;
  @Input() trimLabel: boolean;
  @Input() wrapLabel: boolean;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisClassName: string = 'x axis';

  tickArguments: number[];
  transform: string;
  labelOffset: number = 0;
  fill: string = 'none';
  stroke: string = 'stroke';
  tickStroke: string = '#ccc';
  strokeWidth: string = 'none';
  padding: number = 5;
  labelTextTemp: string;

  readonly orientation = Orientation;

  @ViewChild(XAxisTicksComponent) ticksComponent: XAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;

    if (typeof this.xAxisTickCount !== 'undefined') {
      this.tickArguments = [this.xAxisTickCount];
    }

    // labelLength = number of characters
    let labelLength = this.labelText.length;
    this.labelTextTemp = this.labelText;
    this.maxLabelLength = Number(this.maxLabelLength);
    let labelElement = select('.xAxisLabel');
    let textElement = labelElement.select('text');
    let xVal;
    if (!textElement.empty()) {
      xVal = textElement.attr('x');
    }

    if (this.showLabel && this.trimLabel && this.maxLabelLength > 0) {
      if (this.maxLabelLength < labelLength) {
        //trim
        let tspanElements = textElement.selectAll('tspan');
        if (tspanElements) {
          tspanElements.remove();
        }
        labelLength = this.maxLabelLength;
        this.labelTextTemp = this.labelText.slice(0, labelLength) + '...';
        textElement.text(this.labelTextTemp);
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (this.showLabel && this.wrapLabel && this.maxLabelLength > 0) {
      // wrap with specified maxLabelLength

      if (this.maxLabelLength < labelLength && this.maxLabelLength > 0) {
        textElement.text('');

        const firstLine = this.labelTextTemp.slice(0, this.maxLabelLength);
        textElement.append('tspan')
          .text(firstLine)
          .attr('dy', '1em');
        let start = this.maxLabelLength;
        while (start + this.maxLabelLength <= labelLength) {
          let line = this.labelTextTemp.slice(start, start + this.maxLabelLength);
          textElement.append('tspan')
            .text(line)
            .attr('x', xVal)
            .attr('dy', '1.2em');
          start += this.maxLabelLength;
        }
        if (start < labelLength) {
          let lastLine = this.labelTextTemp.slice(start, labelLength);
          textElement.append('tspan')
            .text(lastLine)
            .attr('x', xVal)
            .attr('dy', '1.2em');
        }
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (this.maxLabelLength == 0 && this.wrapLabel) {
      // auto-wrap without specified maxLabelLength
      if (labelLength > this.dims.width / 11) {
        let wrappedLines = this.wrapText(this.labelTextTemp, this.dims.width / 11);
        let firstLine = wrappedLines[0];
        textElement.text('');
        textElement.append('tspan')
          .text(firstLine)
          .attr('dy', '1em');
        let xVal = textElement.attr('x');
        for (let i = 1; i < wrappedLines.length; i++) {
          let line = wrappedLines[i];
          textElement.append('tspan')
            .text(line)
            .attr('x', xVal)
            .attr('dy', '1.2em');
        }
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (!this.trimLabel && !this.wrapLabel) {
      let tspanElements = textElement.selectAll('tspan');
      if (tspanElements) {
        tspanElements.remove();
      }
      this.labelTextTemp = this.labelText;
      textElement.text(this.labelTextTemp);
    }

  }

  emitTicksHeight({ height }): void {
    const newLabelOffset = height + 25 + 5;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ height });
      }, 0);
    }
  }

  wrapText(text, maxLineWidth) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testLineLength = testLine.length;

      if (testLineLength <= maxLineWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }
}
