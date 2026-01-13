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
  SimpleChanges,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Orientation } from '../types/orientation.enum';
import { TextAnchor } from '../types/text-anchor.enum';
import {
  getYAxisApproximateWidth,
  getYAxisTickChunks,
  updateYAxisTicks,
  gridLineTransform,
  tickTrim
} from './y-axis.helper';

@Component({
  selector: 'g[ngx-charts-y-axis-ticks]',
  template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick" [attr.transform]="transform(tick)">
        <ng-container *ngIf="tickFormat(tick) as tickFormatted">
          <title>{{ tickFormatted }}</title>
          <svg:text
            stroke-width="0.01"
            [attr.dy]="dy"
            [attr.x]="x1"
            [attr.y]="y1"
            [attr.text-anchor]="textAnchor"
            [style.font-size]="'12px'"
          >
            <ng-container *ngIf="wrapTicks; then tmplMultilineTick; else tmplSinglelineTick"></ng-container>
          </svg:text>
          <ng-template #tmplMultilineTick>
            <ng-container *ngIf="tickChunks(tick) as tickLines">
              <ng-container *ngIf="tickLines.length > 1; else tmplSinglelineTick">
                <svg:tspan *ngFor="let tickLine of tickLines; let i = index" x="0" [attr.y]="i * (8 + tickSpacing)">
                  {{ tickLine }}
                </svg:tspan>
              </ng-container>
            </ng-container>
          </ng-template>
          <ng-template #tmplSinglelineTick>{{ tickTrim(tickFormatted) }}</ng-template>
        </ng-container>
      </svg:g>
    </svg:g>
    <svg:path
      *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks" [attr.transform]="transform(tick)">
      <svg:g *ngIf="showGridLines" [attr.transform]="gridLineTransform()">
        <svg:line
          *ngIf="orient === Orientation.Left"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
        />
        <svg:line
          *ngIf="orient === Orientation.Right"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth"
        />
      </svg:g>
    </svg:g>
    <svg:g *ngFor="let refLine of referenceLines" class="ref-line">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line class="refline-path gridline-path-horizontal" x1="0" [attr.x2]="gridLineWidth" />
        <svg:g *ngIf="showRefLabels">
          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor"
          >
            {{ refLine.name }}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class YAxisTicksComponent implements OnChanges, AfterViewInit {
  @Input() scale;
  @Input() orient: Orientation;
  @Input() tickArguments: number[] = [5];
  @Input() tickValues: any[];
  @Input() tickStroke: string = '#ccc';
  @Input() trimTicks: boolean = true;
  @Input() maxTickLength: number = 16;
  @Input() tickFormatting;
  @Input() showGridLines: boolean = false;
  @Input() gridLineWidth: number;
  @Input() height: number;
  @Input() referenceLines;
  @Input() showRefLabels: boolean = false;
  @Input() showRefLines: boolean = false;
  @Input() wrapTicks = false;
  @Output() dimensionsChanged = new EventEmitter();

  innerTickSize: number = 6;
  tickPadding: number = 3;
  tickSpacing: number;
  textAnchor: TextAnchor = TextAnchor.Middle;
  dy: string;
  x1: number;
  y1: number;
  adjustedScale: any;
  transform: (o: any) => string;
  tickFormat: (o: any) => string;
  ticks: any[];
  width: number = 0;
  refMax: number;
  refMin: number;
  referenceLineLength: number = 0;
  referenceAreaPath: string;
  readonly Orientation = Orientation;
  @ViewChild('ticksel') ticksElement: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.updateDims());
  }

  updateDims(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.width = getYAxisApproximateWidth(this.ticks, this.tickTrim.bind(this), this.tickFormat.bind(this));
      this.dimensionsChanged.emit({ width: this.width });
      return;
    }
    const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
    if (width !== this.width) {
      this.width = width;
      this.dimensionsChanged.emit({ width });
      setTimeout(() => this.updateDims());
    }
  }

  update(): void {
    updateYAxisTicks(this);
    setTimeout(() => this.updateDims());
  }

  tickTrim(label: string): string {
    return tickTrim(label, this.trimTicks, this.maxTickLength);
  }
  tickChunks(label: string): string[] {
    return getYAxisTickChunks(
      label,
      this.maxTickLength,
      this.scale.bandwidth ? this.scale.bandwidth() : 0,
      this.tickTrim.bind(this),
      this.tickFormat.bind(this)
    );
  }
  gridLineTransform(): string {
    return gridLineTransform();
  }
}
