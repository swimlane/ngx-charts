import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { scaleLinear } from 'd3-scale';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';

enum ElementType {
  Value = 'value',
  Units = 'units'
}

@Component({
    selector: 'ngx-charts-linear-gauge',
    template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g
          ngx-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>
        <svg:g
          ngx-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text
              #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge"
            >
              {{ displayValue }}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text
              #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge"
            >
              {{ units }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
    styleUrls: ['../common/base-chart.component.scss', './linear-gauge.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LinearGaugeComponent extends BaseChartComponent implements AfterViewInit {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() units: string;
  @Input() previousValue: number;
  @Input() valueFormatting: any;

  @ViewChild('valueTextEl') valueTextEl: ElementRef;
  @ViewChild('unitsTextEl') unitsTextEl: ElementRef;

  dims: ViewDimensions;
  valueDomain: [number, number];
  valueScale: any;

  colors: ColorHelper;
  transform: string;
  margin: number[] = [10, 20, 10, 20];
  transformLine: string;

  valueResizeScale: number = 1;
  unitsResizeScale: number = 1;
  valueTextTransform: string = '';
  valueTranslate: string = '';
  unitsTextTransform: string = '';
  unitsTranslate: string = '';
  displayValue: string;
  hasPreviousValue: boolean;

  barOrientation = BarOrientation;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.scaleText(ElementType.Value);
      this.scaleText(ElementType.Units);
    });
  }

  update(): void {
    super.update();

    this.hasPreviousValue = this.previousValue !== undefined;
    this.max = Math.max(this.max, this.value);
    this.min = Math.min(this.min, this.value);
    if (this.hasPreviousValue) {
      this.max = Math.max(this.max, this.previousValue);
      this.min = Math.min(this.min, this.previousValue);
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.valueDomain = this.getValueDomain();
    this.valueScale = this.getValueScale();
    this.displayValue = this.getDisplayValue();

    this.setColors();

    const xOffset = this.margin[3] + this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;

    this.transform = `translate(${xOffset}, ${yOffset})`;
    this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
    this.valueTranslate = `translate(0, -15)`;
    this.unitsTranslate = `translate(0, 15)`;

    if (isPlatformServer(this.platformId)) {
      this.scaleTextSSR('value');
      this.scaleTextSSR('units');
    } else {
      setTimeout(() => this.scaleText(ElementType.Value), 50);
      setTimeout(() => this.scaleText(ElementType.Units), 50);
    }
  }

  getValueDomain(): [number, number] {
    return [this.min, this.max];
  }

  getValueScale(): any {
    return scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
  }

  getDisplayValue(): string {
    if (this.valueFormatting) {
      return this.valueFormatting(this.value);
    }
    return this.value.toLocaleString();
  }

  scaleText(element: ElementType, repeat: boolean = true): void {
    let el;
    let resizeScale;
    if (element === ElementType.Value) {
      el = this.valueTextEl;
      resizeScale = this.valueResizeScale;
    } else {
      el = this.unitsTextEl;
      resizeScale = this.unitsResizeScale;
    }

    const { width, height } = el.nativeElement.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const oldScale = resizeScale;
    const availableWidth = this.dims.width;
    const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
    const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
    const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
    resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);

    if (resizeScale !== oldScale) {
      if (element === ElementType.Value) {
        this.valueResizeScale = resizeScale;
        this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
      } else {
        this.unitsResizeScale = resizeScale;
        this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
      }
      this.cd.markForCheck();
      if (repeat && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.scaleText(element, false);
        }, 50);
      }
    }
  }

  scaleTextSSR(element) {
    let resizeScale = 1;

    const value = element === 'value' ? this.displayValue : this.units;
    const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
    const height = 25;

    const availableWidth = this.dims.width;
    const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
    const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
    const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
    resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);

    if (element === 'value') {
      this.valueResizeScale = resizeScale;
      this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
    } else {
      this.unitsResizeScale = resizeScale;
      this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
    }

    this.cd.markForCheck();
  }

  onClick(): void {
    this.select.emit({
      name: 'Value',
      value: this.value
    });
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, [this.value], this.customColors);
  }
}
