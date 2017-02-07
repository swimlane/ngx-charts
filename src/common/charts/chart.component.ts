import {
  Component, Input, OnChanges, trigger, style, transition,
  animate, ViewContainerRef, ChangeDetectionStrategy, EventEmitter,
  Output, SimpleChanges, ViewChild, ElementRef, HostListener
} from '@angular/core';
import { TooltipService } from '../tooltip';

@Component({
  providers: [TooltipService],
  selector: 'ngx-charts-chart',
  template: `
    <div
      class="ngx-charts-outer"
      [style.width.px]="containerWidth"
      [style.height.px]="containerHeight"
      [@animationState]="'active'">
      <div class="ngx-charts-chart-outer" #chartOuter>
        <svg
          class="ngx-charts"
          [attr.width]="chartWidth"
          [attr.height]="chartHeight">
          <ng-content></ng-content>
        </svg>
      </div>
      <div class="ngx-charts-legend-outer" *ngIf="showLegend">
        <ngx-charts-scale-legend
          *ngIf="showLegend && legendOptions.scaleType === 'linear'"
          [position]="legendOptions.position"
          [valueRange]="legendOptions.domain"
          [colors]="legendOptions.colors"
          [height]="containerHeight">
        </ngx-charts-scale-legend>
        <ngx-charts-legend
          *ngIf="showLegend && legendOptions.scaleType !== 'linear'"
          [position]="legendOptions.position"
          [data]="legendOptions.domain"
          [title]="legendTitle"
          [colors]="legendOptions.colors"
          [height]="containerHeight"
          [activeEntries]="activeEntries"
          (labelClick)="legendLabelClick.emit($event)"
          (labelActivate)="legendLabelActivate.emit($event)"
          (labelDeactivate)="legendLabelDeactivate.emit($event)">
        </ngx-charts-legend>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms 100ms', style({ opacity: 1 }))
      ])
    ])
  ],
   host: {
    '[class.legend-position-left]': `legendOptions.position === 'left'`,
    '[class.legend-position-right]': `legendOptions.position === 'right'`,
    '[class.legend-position-top]': `legendOptions.position === 'top'`,
    '[class.legend-position-bottom]': `legendOptions.position === 'bottom'`
  }
})
export class ChartComponent implements OnChanges {

  @Input() view: any[];
  @Input() showLegend: boolean = false;
  @Input() legendOptions: any;

  // remove
  @Input() data: any;
  @Input() legendData: any;
  @Input() legendType: any;
  @Input() legendTitle: string = 'Legend';
  @Input() colors: any;
  @Input() activeEntries: any[];

  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelActivate: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelDeactivate: EventEmitter<any> = new EventEmitter();

  @ViewChild('chartOuter') chartOuter: any;

  containerHeight: number;
  containerWidth: number;
  chartHeight: number;
  chartWidth: number;
  title: string;

  constructor(
    private vcr: ViewContainerRef,
    private element: ElementRef,
    private tooltipService: TooltipService) {
    this.tooltipService.injectionService.setRootViewContainer(vcr);
  }

  @HostListener('window:resize')
  onResize(): void {
    // todo: debounce
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    if(this.view) {
      this.containerWidth = this.view[0];
      this.containerHeight = this.view[1];
    } else {
      const hostElem = this.element.nativeElement;
      const parent = hostElem.parentNode.parentNode;
      if(parent !== null) {
        const bounds = parent.getBoundingClientRect();
        this.containerHeight = bounds.height;
        this.containerWidth = bounds.width;
      }
    }

    const bounds = this.chartOuter.nativeElement.getBoundingClientRect();
    if(this.legendOptions.position === 'left' || this.legendOptions.position === 'right') {
      this.chartWidth = Math.round(bounds.width);
      this.chartHeight = this.containerHeight;
    } else if(this.legendOptions.position === 'top' || this.legendOptions.position === 'bottom') {
      this.chartWidth = this.containerWidth;
      this.chartHeight = Math.round(bounds.height);
    }
  }

}
