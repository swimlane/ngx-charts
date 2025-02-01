import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  SimpleChanges
} from '@angular/core';
import { TooltipService } from '../tooltip/tooltip.service';
import { LegendOptions, LegendType, LegendPosition } from '../types/legend.model';
import { ScaleType } from '../types/scale-type.enum';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  providers: [TooltipService],
  selector: 'ngx-charts-chart',
  template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]" [style.height.px]="view[1]">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === LegendType.ScaleLegend"
        class="chart-legend"
        @toggleAnimation
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === LegendType.Legend"
        class="chart-legend"
        @toggleAnimation
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleAnimation', [
      transition(':leave', [
        style({
          opacity: '0'
        }),
        animate('500ms', style({ opacity: '0' }))
      ]),
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate('500ms 300ms', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class ChartComponent implements OnChanges {
  @Input() view: [number, number];
  @Input() showLegend: boolean = false;
  @Input() legendOptions: LegendOptions;
  @Input() legendType: LegendType;
  @Input() activeEntries: any[];
  @Input() animations: boolean = true;

  @Output() legendLabelClick = new EventEmitter<string>();
  @Output() legendLabelActivate = new EventEmitter<{ name: string }>();
  @Output() legendLabelDeactivate = new EventEmitter<{ name: string }>();

  chartWidth: number;
  title: string;
  legendWidth: number;

  readonly LegendPosition = LegendPosition;
  readonly LegendType = LegendType;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let legendColumns = 0;
    if (this.showLegend) {
      this.legendType = this.getLegendType();

      if (!this.legendOptions || this.legendOptions.position === LegendPosition.Right) {
        if (this.legendType === LegendType.ScaleLegend) {
          legendColumns = 1;
        } else {
          legendColumns = 2;
        }
      }
    }

    const chartColumns = 12 - legendColumns;

    this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
    this.legendWidth =
      !this.legendOptions || this.legendOptions.position === LegendPosition.Right
        ? Math.floor((this.view[0] * legendColumns) / 12.0)
        : this.chartWidth;
  }

  getLegendType(): LegendType {
    return this.legendOptions.scaleType === ScaleType.Linear ? LegendType.ScaleLegend : LegendType.Legend;
  }
}
