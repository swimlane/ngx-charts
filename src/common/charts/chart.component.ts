import {
  Component, Input, OnChanges, trigger, style, transition,
  animate, ViewContainerRef, ChangeDetectionStrategy, EventEmitter,
  Output, SimpleChanges
} from '@angular/core';
import { InjectionService } from '../../utils/injection.service';

@Component({
  providers: [InjectionService],
  selector: 'chart',
  template: `
    <div 
      [style.width.px]="view[0]"
      [@animationState]="'active'">
      <svg
        class="ng2d3"
        [attr.width]="chartWidth"
        [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <scale-legend
        *ngIf="showLegend && legendType === 'scaleLegend'"
        class="chart-legend"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth">
      </scale-legend>
      <legend
        *ngIf="showLegend && legendType === 'legend'"
        class="chart-legend"
        [data]="legendOptions.domain"
        [title]="legendTitle"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)">
      </legend>
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
  ]
})
export class ChartComponent implements OnChanges {

  @Input() view;
  @Input() showLegend = false;
  @Input() legendOptions: any;

  // remove
  @Input() data;
  @Input() legendData;  
  @Input() legendType: any;
  @Input() legendTitle = 'Legend';
  @Input() colors: any;

  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelActivate: EventEmitter<any> = new EventEmitter();
  @Output() legendLabelDeactivate: EventEmitter<any> = new EventEmitter();

  chartWidth: any;
  title: any;
  legendWidth: any;

  constructor(
    private vcr: ViewContainerRef,
    private injectionService: InjectionService) {
    this.injectionService.setRootViewContainer(vcr);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let legendColumns = 0;
    if (this.showLegend) {
      this.legendType = this.getLegendType();

      if (this.legendType === 'scaleLegend') {        
        legendColumns = 1;
      } else {
        legendColumns = 2;
      }
    }

    let chartColumns = 12 - legendColumns;

    this.chartWidth = this.view[0] * chartColumns / 12.0;
    this.legendWidth = this.view[0] * legendColumns / 12.0;
  }

  getLegendType(): string {
    if (this.legendOptions.scaleType === 'linear') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }

}
