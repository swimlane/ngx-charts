import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel } from '@swimlane/ngx-charts/common/label.helper';
import { PlacementTypes } from '@swimlane/ngx-charts/common/tooltip/position/placement-type.enum';
import { StyleTypes } from '@swimlane/ngx-charts/common/tooltip/style.type';
import { BarOrientation } from '@swimlane/ngx-charts/common/types/bar-orientation.enum';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g[ngx-combo-charts-series-vertical]',
  template: `
    <svg:g
      ngx-charts-bar
      *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [stops]="bar.gradientStops"
      [data]="bar.data"
      [orientation]="barOrientation.Vertical"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [isActive]="isActive(bar.data)"
      [animations]="animations"
      [noBarWhenZero]="noBarWhenZero"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="placementTypes.Top"
      [tooltipType]="styleTypes.tooltip"
      [tooltipTitle]="bar.tooltipText"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('* => void', [
        style({
          opacity: 1,
          transform: '*'
        }),
        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ],
  standalone: false
})
export class ComboSeriesVerticalComponent implements OnChanges {
  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() seriesLine;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() activeEntries: any[];
  @Input() seriesName: string;
  @Input() animations: boolean = true;
  @Input() noBarWhenZero: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() bandwidth = new EventEmitter();

  bars: any;
  x: any;
  y: any;

  placementTypes = PlacementTypes;
  barOrientation = BarOrientation;
  styleTypes = StyleTypes;

  ngOnChanges(changes): void {
    this.update();
  }

  update(): void {
    let width;
    if (this.series.length) {
      width = this.xScale.bandwidth();
      this.bandwidth.emit(width);
    }

    let d0 = 0;
    let total;
    if (this.type === 'normalized') {
      total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }

    this.bars = this.series.map((d, index) => {
      let value = d.value;
      const label = d.name;
      const formattedLabel = formatLabel(label);
      const roundEdges = this.type === 'standard';

      const bar: any = {
        value,
        label,
        roundEdges,
        data: d,
        width,
        formattedLabel,
        height: 0,
        x: 0,
        y: 0
      };

      if (this.type === 'standard') {
        bar.height = Math.abs(this.yScale(value) - this.yScale(0));
        bar.x = this.xScale(label);

        if (value < 0) {
          bar.y = this.yScale(0);
        } else {
          bar.y = this.yScale(value);
        }
      } else if (this.type === 'stacked') {
        const offset0 = d0;
        const offset1 = offset0 + value;
        d0 += value;

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = 0;
        bar.y = this.yScale(offset1);
        bar.offset0 = offset0;
        bar.offset1 = offset1;
      } else if (this.type === 'normalized') {
        let offset0 = d0;
        let offset1 = offset0 + value;
        d0 += value;

        if (total > 0) {
          offset0 = (offset0 * 100) / total;
          offset1 = (offset1 * 100) / total;
        } else {
          offset0 = 0;
          offset1 = 0;
        }

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = 0;
        bar.y = this.yScale(offset1);
        bar.offset0 = offset0;
        bar.offset1 = offset1;
        value = (offset1 - offset0).toFixed(2) + '%';
      }

      if (this.colors.scaleType === 'ordinal') {
        bar.color = this.colors.getColor(label);
      } else {
        if (this.type === 'standard') {
          bar.color = this.colors.getColor(value);
          bar.gradientStops = this.colors.getLinearGradientStops(value);
        } else {
          bar.color = this.colors.getColor(bar.offset1);
          bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
        }
      }

      let tooltipLabel = formattedLabel;
      if (this.seriesName) {
        tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
      }

      this.getSeriesTooltips(this.seriesLine, index);
      const lineValue = this.seriesLine[0].series[index].value;
      bar.tooltipText = `
        <span class="tooltip-label">${tooltipLabel}</span>
        <span class="tooltip-val"> Y1 - ${value.toLocaleString()} • Y2 - ${lineValue.toLocaleString()}%</span>
      `;

      return bar;
    });
  }
  getSeriesTooltips(seriesLine, index) {
    return seriesLine.map(d => {
      return d.series[index];
    });
  }
  isActive(entry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name && entry.series === d.series;
    });
    return item !== undefined;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  trackBy(index, bar): string {
    return bar.label;
  }
}
