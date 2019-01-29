import {
  Component,
  Input,
  Output,
  OnChanges,
  ElementRef,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';

@Component({
  selector: 'g[ngx-charts-y-axis-ticks]',
  template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="transform(tick)" >
        <title>{{tickFormat(tick)}}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'">
          {{tickTrim(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="transform(tick)">
      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line *ngIf="orient === 'left'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth" />
        <svg:line *ngIf="orient === 'right'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth" />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"/>
        <svg:g *ngIf="showRefLabels">
          <title>{{tickTrim(tickFormat(refLine.value))}}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor" >
            {{refLine.name}}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisTicksComponent implements OnChanges, AfterViewInit {

  @Input() scale;
  @Input() orient;
  @Input() tickArguments = [5];
  @Input() tickValues: any[];
  @Input() tickStroke = '#ccc';
  @Input() trimTicks: boolean = true;
  @Input() maxTickLength: number = 16;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineWidth;
  @Input() height;
  @Input() referenceLines;
  @Input() showRefLabels: boolean = false;
  @Input() showRefLines: boolean = false;

  @Output() dimensionsChanged = new EventEmitter();

  innerTickSize: any = 6;
  tickPadding: any = 3;
  tickSpacing: any;
  verticalSpacing: number = 20;
  textAnchor: any = 'middle';
  dy: any;
  x1: any;
  x2: any;
  y1: any;
  y2: any;
  adjustedScale: any;
  transform: (o: any) => string;
  tickFormat: (o: any) => string;
  ticks: any;
  width: number = 0;
  outerTickSize: number = 6;
  rotateLabels: boolean = false;
  refMax: number;
  refMin: number;
  referenceLineLength: number = 0;
  referenceAreaPath: string;

  @ViewChild('ticksel') ticksElement: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateDims());
  }

  updateDims(): void {
    const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
    if (width !== this.width) {
      this.width = width;
      this.dimensionsChanged.emit({ width });
      setTimeout(() => this.updateDims());
    }
  }

  update(): void {
    let scale;
    const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
    this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;

    scale = this.scale;
    this.ticks = this.getTicks();

    if (this.tickFormatting) {
      this.tickFormat = this.tickFormatting;
    } else if (scale.tickFormat) {
      this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
    } else {
      this.tickFormat = function(d) {
        if (d.constructor.name === 'Date') {
          return d.toLocaleDateString();
        }
        return d.toLocaleString();
      };
    }

    this.adjustedScale = scale.bandwidth ? function(d) {
      return scale(d) + scale.bandwidth() * 0.5;
    } : scale;

    if (this.showRefLines && this.referenceLines) {
      this.setReferencelines();
    }

    switch (this.orient) {
      case 'top':
        this.transform = function(tick) {
          return 'translate(' + this.adjustedScale(tick) + ',0)';
        };
        this.textAnchor = 'middle';
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? '0em' : '.71em';
        break;
      case 'bottom':
        this.transform = function(tick) {
          return 'translate(' + this.adjustedScale(tick) + ',0)';
        };
        this.textAnchor = 'middle';
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? '0em' : '.71em';
        break;
      case 'left':
        this.transform = function(tick) {
          return 'translate(0,' + this.adjustedScale(tick) + ')';
        };
        this.textAnchor = 'end';
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = '.32em';
        break;
      case 'right':
        this.transform = function(tick) {
          return 'translate(0,' + this.adjustedScale(tick) + ')';
        };
        this.textAnchor = 'start';
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = '.32em';
        break;
      default:
    }
    setTimeout(() => this.updateDims());
  }

  setReferencelines(): void {
    this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
    this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
    this.referenceLineLength = this.referenceLines.length;

    this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax,
      0, [false, false, false, false]);
  }

  getTicks(): any {
    let ticks;
    const maxTicks = this.getMaxTicks(20);
    const maxScaleTicks = this.getMaxTicks(50);

    if (this.tickValues) {
      ticks = this.tickValues;
    } else if (this.scale.ticks) {
      ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
    } else {
      ticks = this.scale.domain();
      ticks = reduceTicks(ticks, maxTicks);
    }

    return ticks;
  }

  getMaxTicks(tickHeight: number): number {
    return Math.floor(this.height / tickHeight);
  }

  tickTransform(tick): string {
    return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
  }

  gridLineTransform(): string {
    return `translate(5,0)`;
  }

  tickTrim(label: string): string {
    return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
  }
}
