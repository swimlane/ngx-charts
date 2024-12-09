import {
  Component,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { GradientPath } from 'gradient-path';

import { BaseChartComponent } from '../../common/base-chart.component';
import { calculateViewDimensions } from '../../common/view-dimensions.helper';
import { ColorHelper } from '../../common/color.helper';
import { ViewDimensions } from '../../common/types/view-dimension.interface';
import { ScaleType } from '../../common/types/scale-type.enum';

@Component({
  selector: 'ngx-charts-percent-gauge',
  template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="percent-gauge chart">
        <svg:g [attr.transform]="transform">
          <mask id="circleMask">
            <circle
              [attr.r]="radius"
              [style.stroke-width]="radius / 5"
              cx="50"
              cy="50"
              stroke="white"
              fill="transparent"
              [attr.stroke-dasharray]="circumference"
              transform="rotate(-90,50,50)"
              [style.stroke-dashoffset]="circumference * (1 - percent / 100)"
            />
          </mask>
          <text x="50" y="55" fill="white" stroke="none" class="total" [style.font-size]="valueFontSize">
            {{ percent }}%
          </text>
          <circle
            #circleEl
            class="dashes-back"
            [style.stroke-width]="radius / 5"
            [attr.r]="radius"
            cx="50"
            cy="50"
            fill="none"
            [style.stroke-dasharray]="dashes"
          />

          <svg:g mask="url(#circleMask)">
            <svg:g [attr.transform]="circleTransform">
              <svg:g *ngFor="let tic of tics" [attr.transform]="tic.transform">
                <rect
                  [attr.y]="-tic.height / 2"
                  [attr.x]="-tic.width"
                  [attr.width]="tic.width"
                  [attr.height]="tic.height"
                  [attr.fill]="tic.fill"
                />
              </svg:g>
            </svg:g>
          </svg:g>

          <svg:g [attr.transform]="targetTransform">
            <circle
              class="target-circle"
              cx="15"
              cy="15"
              [attr.r]="targetRadius"
              [style.stroke-width]="targetRadius / 10"
              [attr.stroke]="targetColor"
            />
            <text
              class="target-label"
              x="15"
              [attr.y]="targetRadius * 0.25"
              stroke="none"
              [style.font-size]="targetFontSize"
            >
              Target
            </text>
            <text
              class="target-value"
              x="15"
              [attr.y]="targetRadius * 0.75"
              stroke="none"
              [style.font-size]="targetFontSize"
            >
              {{ target * 100 }}%
            </text>
          </svg:g>
        </svg:g>
        <svg:g *ngIf="showLabel">
          <text class="label" x="50%" y="110px" dominant-baseline="middle" text-anchor="middle" stroke="none">
            {{ label }}
          </text>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../../common/base-chart.component.scss', './percent-gauge.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PercentGaugeComponent extends BaseChartComponent implements AfterViewInit {
  @Input() max: number = 100;
  @Input() value: number = 0;
  @Input() target: number = 0.75;
  @Input() label: string;
  @Input() valueFormatting: any;
  @Input() showLabel = true;

  @ViewChild('circleEl') circleElement: ElementRef;

  dims: ViewDimensions;
  valueDomain: [number, number];
  valueScale: any;
  valueFontSize: number;

  colors: ColorHelper;
  radius: number;
  transform: string;
  targetTransform: string;
  targetColor: string;
  targetRadius: number;
  targetFontSize: number;

  tics: any[];
  circleTransform: string;
  ticHeight: number;

  dashes: string;
  margin: number[] = [20, 40, 20, 40];

  displayValue: string;
  circumference: number;
  percent: number;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // setTimeout(() => {
    //   this.scaleText(ElementType.Value);
    //   this.scaleText(ElementType.Units);
    // });
  }

  update(): void {
    super.update();

    this.max = Math.max(this.max, this.value);

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.ticHeight = Math.min(this.dims.width, this.dims.height) / 10;
    this.radius = Math.min(this.dims.width, this.dims.height) / 2 - this.ticHeight / 2;
    this.valueFontSize = Math.floor(this.radius / 3);
    this.targetRadius = this.radius / 4;
    this.targetFontSize = Math.floor(this.targetRadius / 2);

    this.valueDomain = this.getValueDomain();
    this.valueScale = this.getValueScale();
    this.displayValue = this.getDisplayValue();

    this.setColors();
    this.targetColor = this.colors.getColor(this.target * this.max);

    const xOffset = this.margin[3] + this.dims.width / 2 - 50;
    const yOffset = this.margin[0] + this.dims.height / 2 - 50;

    this.transform = `translate(${xOffset}, ${yOffset})`;
    this.targetTransform = `translate(35, 35)
                  rotate(${this.target * 360}, 15, 15)
                  translate(0, -${this.radius})
                  rotate(-${this.target * 360}, 15, 15)`;

    this.generateTics();

    this.circumference = 2 * Math.PI * this.radius;
    this.percent = this.getPercentage();

    this.dashes = `${this.radius / 60} ${this.circumference / 60 - this.radius / 60}`;

    // if (isPlatformServer(this.platformId)) {
    //   this.scaleTextSSR('value');
    //   this.scaleTextSSR('units');
    // } else {
    //   setTimeout(() => this.scaleText(ElementType.Value), 50);
    //   setTimeout(() => this.scaleText(ElementType.Units), 50);
    // }
  }

  generateTics() {
    if (this.circleElement.nativeElement) {
      const clonedCircle = this.circleElement.nativeElement.cloneNode(true);
      this.circleElement.nativeElement.parentElement.appendChild(clonedCircle);

      const gp = new GradientPath({
        path: clonedCircle,
        segments: 60,
        samples: 2,
        precision: 2
      });

      const data = gp.data.flatMap(({ samples }) => samples);
      this.tics = [];
      this.circleTransform = `rotate(-90,50,50)`;
      for (let j = 0; j < data.length; j++) {
        const { x, y } = data[j];
        let progress = data[j].progress;
        if (progress === 1) {
          progress = 0;
        }

        this.tics.push({
          height: this.ticHeight,
          width: this.radius / 60,
          fill: this.colors.getColor(progress * this.max),
          transform: `translate(${x}, ${y}), rotate(${360 * progress - 90})`
        });
      }
    }
  }

  getValueDomain(): [number, number] {
    return [0, this.max];
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

  getPercentage(): number {
    return Math.round((this.value / this.max) * 100);
  }

  // scaleText(element: ElementType, repeat: boolean = true): void {
  //   let el;
  //   let resizeScale;
  //   if (element === ElementType.Value) {
  //     el = this.valueTextEl;
  //     resizeScale = this.valueResizeScale;
  //   } else {
  //     el = this.unitsTextEl;
  //     resizeScale = this.unitsResizeScale;
  //   }

  //   const { width, height } = el.nativeElement.getBoundingClientRect();
  //   if (width === 0 || height === 0) return;
  //   const oldScale = resizeScale;
  //   const availableWidth = this.dims.width;
  //   const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
  //   const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
  //   const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
  //   resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);

  //   if (resizeScale !== oldScale) {
  //     if (element === ElementType.Value) {
  //       this.valueResizeScale = resizeScale;
  //       this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
  //     } else {
  //       this.unitsResizeScale = resizeScale;
  //       this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
  //     }
  //     this.cd.markForCheck();
  //     if (repeat && isPlatformBrowser(this.platformId)) {
  //       setTimeout(() => {
  //         this.scaleText(element, false);
  //       }, 50);
  //     }
  //   }
  // }

  // scaleTextSSR(element) {
  //   let resizeScale = 1;

  //   const value = element === 'value' ? this.displayValue : this.units;
  //   const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
  //   const height = 25;

  //   const availableWidth = this.dims.width;
  //   const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
  //   const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
  //   const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
  //   resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);

  //   if (element === 'value') {
  //     this.valueResizeScale = resizeScale;
  //     this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
  //   } else {
  //     this.unitsResizeScale = resizeScale;
  //     this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
  //   }

  //   this.cd.markForCheck();
  // }

  onClick(): void {
    this.select.emit({
      name: 'Value',
      value: this.value
    });
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Linear, this.valueDomain, this.customColors);
  }
}
