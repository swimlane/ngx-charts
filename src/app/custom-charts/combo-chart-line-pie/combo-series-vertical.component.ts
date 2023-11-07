import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'g[ngx-combo-charts-series-vertical-2]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboSeriesLinePieVerticalComponent implements OnChanges {
  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() seriesLine;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() tooltipDisabled: boolean = false;
  @Input() activeEntries: any[];
  @Input() seriesName: string;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() bandwidth = new EventEmitter();

  ngOnChanges(changes): void {
    this.update();
  }

  update(): void {
    let width;
    if (this.series.length) {
      width = this.xScale.bandwidth();
      this.bandwidth.emit(width);
    }

    let total;
    if (this.type === 'normalized') {
      total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
  }
}
