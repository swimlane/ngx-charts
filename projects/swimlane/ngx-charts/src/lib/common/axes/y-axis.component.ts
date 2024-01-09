import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';
import { select } from 'd3-selection';


@Component({
  selector: 'g[ngx-charts-y-axis]',
  template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        [wrapTicks]="wrapTicks"
        (dimensionsChanged)="emitTicksWidth($event)"
      />
      <title>{{ labelText }}</title>
      <svg:g
        ngx-charts-axis-label
        class="y-axis-label"
        *ngIf="showLabel"
        [label]="labelTextTemp"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
        [trimLabel]="trimLabel"
        [maxLabelLength]="maxLabelLength"
        [wrapLabel]="wrapLabel"
      >
    </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnChanges {
  @Input() yScale;
  @Input() dims: ViewDimensions;
  @Input() trimTicks: boolean;
  @Input() maxTickLength: number;
  @Input() tickFormatting;
  @Input() ticks: any[];
  @Input() showGridLines: boolean = false;
  @Input() showLabel: boolean;
  @Input() labelText: string;
  @Input() yAxisTickCount: any;
  @Input() yOrient: Orientation = Orientation.Left;
  @Input() referenceLines;
  @Input() showRefLines: boolean;
  @Input() showRefLabels: boolean;
  @Input() yAxisOffset: number = 0;
  @Input() wrapTicks = false;
  @Output() dimensionsChanged = new EventEmitter();
  @Input() maxLabelLength: number;
  @Input() trimLabel: boolean;
  @Input() wrapLabel: boolean;

  yAxisClassName: string = 'y axis';
  tickArguments: number[];
  offset: number;
  transform: string;
  labelOffset: number = 15;
  fill: string = 'none';
  stroke: string = '#CCC';
  tickStroke: string = '#CCC';
  strokeWidth: number = 1;
  padding: number = 5;
  labelTextTemp: string;

  @ViewChild(YAxisTicksComponent) ticksComponent: YAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.offset = -(this.yAxisOffset + this.padding);
    if (this.yOrient === Orientation.Right) {
      this.labelOffset = 65;
      this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
      this.transform = `translate(${this.offset} , 0)`;
    }

    if (this.yAxisTickCount !== undefined) {
      this.tickArguments = [this.yAxisTickCount];
    }

    // labelLength = number of characters
    let labelLength = this.labelText.length;
    this.labelTextTemp = this.labelText;
    this.maxLabelLength = Number(this.maxLabelLength);
    let labelElement = select('.yAxisLabel');
    let textElement = labelElement.select('text');
    if (this.showLabel && this.trimLabel) {
      if (this.maxLabelLength < labelLength) {
        setTimeout(() => {
          let tspanElements = textElement.selectAll('tspan')
          if (tspanElements) {
            tspanElements.remove();
          }
          labelLength = this.maxLabelLength;
          this.labelTextTemp = this.labelTextTemp.slice(0, labelLength) + "...";
          textElement.text(this.labelTextTemp);
        }, 150);
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (this.showLabel && this.wrapLabel && this.maxLabelLength > 0) {
      if (this.maxLabelLength < labelLength && this.maxLabelLength > 0) {
        setTimeout(() => {
          textElement.text('');

          let numLine = Math.ceil(labelLength / this.maxLabelLength);
          let yVal = parseFloat(textElement.attr('y')) - 30 * numLine;
          let xVal = parseFloat(textElement.attr('x')) - 30;
          const firstLine = this.labelTextTemp.slice(0, this.maxLabelLength);
          textElement.append('tspan')
            .text(firstLine)
            .attr('x', xVal)
            .attr('y', yVal)
            .attr('dx', '1em');

          let start = this.maxLabelLength;
          while (numLine > 1) {
            numLine--;
            yVal = yVal + 30;
            let line = this.labelTextTemp.slice(start, start + this.maxLabelLength);
            textElement.append('tspan')
              .text(line)
              .attr('x', xVal)
              .attr('y', yVal)
              .attr('dx', '1.2em');
            start += this.maxLabelLength;
          }
        }, 150);
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (this.maxLabelLength == 0 && this.wrapLabel) {
      if (labelLength > this.dims.height / 11) {
        let wrappedLines = this.wrapText(this.labelTextTemp, this.dims.height / 11);
        let firstLine = wrappedLines[0];
        textElement.text('');
        let yVal = parseFloat(textElement.attr('y')) - 30 * wrappedLines.length;
        let xVal = parseFloat(textElement.attr('x')) - 30;
        textElement.append('tspan')
          .text(firstLine)
          .attr('x', xVal)
          .attr('y', yVal)
          .attr('dx', '1em');
        for (let i = 1; i < wrappedLines.length; i++) {
          let line = wrappedLines[i];
          yVal = yVal + 30;
          textElement.append('tspan')
            .text(line)
            .attr('x', xVal)
            .attr('y', yVal)
            .attr('dx', '1.2em');
        }
      } else {
        this.labelTextTemp = this.labelText;
        textElement.text(this.labelTextTemp);
      }
    } else if (!this.trimLabel && !this.wrapLabel) {
      let tspanElements = textElement.selectAll('tspan')
      if (tspanElements) {
        tspanElements.remove();
      }
      this.labelTextTemp = this.labelText;
      textElement.text(this.labelTextTemp);
    }
  }

  emitTicksWidth({ width }): void {
    if (width !== this.labelOffset && this.yOrient === Orientation.Right) {
      this.labelOffset = width + this.labelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
      }, 0);
    } else if (width !== this.labelOffset) {
      this.labelOffset = width;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
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
