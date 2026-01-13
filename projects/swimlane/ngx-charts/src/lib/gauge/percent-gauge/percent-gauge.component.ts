import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { BaseChartComponent } from '../../common/base-chart.component';
import { ColorHelper } from '../../common/color.helper';
import { ViewDimensions } from '../../common/types/view-dimension.interface';
import { id } from '../../utils/id';
import { calculatePercentGaugeState } from './percent-gauge.helper';

@Component({
  selector: 'ngx-charts-percent-gauge',
  templateUrl: './percent-gauge.component.html',
  styleUrls: ['../../common/base-chart.component.scss', './percent-gauge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PercentGaugeComponent extends BaseChartComponent {
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() target: number = 75;
  @Input() targetLabel: string = 'Target';
  @Input() label: string;
  @Input() valueFormatting: any;
  @Input() showLabel = true;

  defaultMargin: number[] = [20, 40, 20, 40];
  margin: number[] = [20, 40, 20, 40];
  dims: ViewDimensions;

  colors: ColorHelper;
  radius: number;
  transform: string;

  targetTransform: string;
  targetColor: string;
  targetRadius: number;
  targetTextTransform: string;

  circleMaskId = `circleMask${id()}`;
  circleTransform: string = 'rotate(-90,0,0)';
  ticks: any[] = [];
  ticHeight: number;

  dashes: string;

  valueDomain: [number, number];
  valueFontSize: number;
  displayValue: string;
  percent: number;
  circumference: number;

  labelTransform: string;

  update(): void {
    super.update();

    const state = calculatePercentGaugeState(
      this.width,
      this.height,
      this.max,
      this.value,
      this.target,
      this.showLabel,
      this.valueFormatting,
      this.scheme,
      this.customColors,
      this.defaultMargin
    );

    this.margin = state.margin;
    this.dims = state.dims;
    this.percent = state.percent;
    this.ticHeight = state.ticHeight;
    this.radius = state.radius;
    this.circumference = state.circumference;
    this.dashes = state.dashes;
    this.valueFontSize = state.valueFontSize;
    this.targetRadius = state.targetRadius;
    this.targetTextTransform = state.targetTextTransform;
    this.valueDomain = state.valueDomain;
    this.displayValue = state.displayValue;
    this.targetColor = state.targetColor;
    this.transform = state.transform;
    this.labelTransform = state.labelTransform;
    this.targetTransform = state.targetTransform;
    this.ticks = state.ticks;

    this.cd.markForCheck();
  }

  onClick(): void {
    this.select.emit({
      name: 'Value',
      value: this.value
    });
  }
}
