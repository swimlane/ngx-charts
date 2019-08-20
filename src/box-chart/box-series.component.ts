import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  EventEmitter
} from '@angular/core';
import { ColorHelper, ViewDimensions, formatLabel } from '../common';
import { ScaleLinear, ScalePoint } from 'd3-scale';
import { BoxChartDataItem, IBoxModel } from '../models/chart-data.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'g[ngx-charts-box-series]',
  template: `
    <svg:g
      ngx-charts-box
      *ngFor="let box of boxes; trackBy: trackBy"
      [@animationState]="'active'"
      [@.disabled]="!animations"
      [width]="box.width"
      [height]="box.height"
      [x]="box.x"
      [y]="box.y"
      [fill]="box.color"
      [data]="box.data"
      [orientation]="'vertical'"
      [ariaLabel]="box.ariaLabel"
      (select)="onClick($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BoxSeriesComponent implements OnChanges {
  @Input() dims: ViewDimensions;
  @Input() series: BoxChartDataItem[];
  @Input() xScale: ScalePoint<string>;
  @Input() yScale: ScaleLinear<number, number>;
  @Input() colors: ColorHelper;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  boxes: IBoxModel[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  trackBy(index: number, box: IBoxModel): string {
    return box.formattedLabel;
  }

  onClick(data: any): void {
    this.select.emit(data);
  }

  update(): void {
    const width = this.series && this.series.length ? Math.round(this.xScale.bandwidth()) : 20;
    const yScaleMin = Math.max(this.yScale.domain()[0], 0);

    this.boxes = this.series.map((serie, idx) => {
      const value = serie.value;
      const label = serie.label ? serie.label : serie.name;
      const formattedLabel = formatLabel(label);

      const box: IBoxModel = {
        value,
        label,
        data: serie,
        formattedLabel,
        width,
        height: 0,
        x: 0,
        y: 0
      };

      box.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
      box.x = this.xScale(label.toString());
      box.ariaLabel = formattedLabel + ' ' + value.toLocaleString();

      if (value < 0) {
        box.y = this.yScale(0);
      } else {
        box.y = this.yScale(value);
      }
      box.color = this.colors.getColor(label);

      return box;
    });
  }
}
