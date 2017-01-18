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
          {{trimLabel(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>
    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="transform(tick)">
      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth" />
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisTicksComponent implements OnChanges, AfterViewInit {

  @Input() scale;
  @Input() orient;
  @Input() tickArguments = [5];
  @Input() tickValues;
  @Input() tickStroke = '#ccc';
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineWidth;
  @Input() height;

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
  transform: any;
  tickFormat: any;
  ticks: any;
  width: number = 0;
  outerTickSize: number = 6;
  rotateLabels: boolean = false;
  trimLabel: any;

  @ViewChild('ticksel') ticksElement: ElementRef;

  constructor() {
    this.trimLabel = trimLabel;
  }

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

  getTicks(): any {
    let ticks;
    const maxTicks = this.getMaxTicks();

    if (this.tickValues) {
      ticks = this.tickValues;
    } else if (this.scale.ticks) {
      ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
      if (ticks.length > maxTicks) {
        if (this.tickArguments) {
          this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
        } else {
          this.tickArguments = [maxTicks];
        }
        ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
      }
    } else {
      ticks = this.scale.domain();
      ticks = reduceTicks(ticks, maxTicks);
    }
    return ticks;
  }

  getMaxTicks(): number {
    const tickHeight = 20;
    return Math.floor(this.height / tickHeight);
  }

  tickTransform(tick): string {
    return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
  }

  gridLineTransform(): string {
    return `translate(5,0)`;
  }

}
