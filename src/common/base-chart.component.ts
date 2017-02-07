import {
  ElementRef, NgZone, ChangeDetectorRef, Component, Input, ViewChild, HostListener,
  Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';

import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { VisibilityObserver } from '../utils';
import { ChartComponent } from '../common/charts/chart.component';

@Component({
  selector: 'base-chart',
  template: `<div></div>`
})
export class BaseChartComponent implements OnChanges, AfterViewInit, OnDestroy {

  @Input() results: any;
  @Input() view: number[];
  @Input() scheme: any;
  @Input() schemeType: string = 'ordinal';
  @Input() customColors: any;

  @Output() select = new EventEmitter();

  @ViewChild(ChartComponent) container: any;

  get width(): number {
    if(this.container.chartWidth) return this.container.chartWidth;
    if(this.view) return this.view[0];
    return 0;
  }

  get height(): number {
    if(this.container.chartHeight) return this.container.chartHeight;
    if(this.view) return this.view[1];
    return 0;
  }

  resizeSubscription: any;
  visibilityObserver: VisibilityObserver;
  viewInit: boolean = false;

  constructor(
    protected chartElement: ElementRef,
    protected zone: NgZone,
    protected cd: ChangeDetectorRef,
    protected location: Location) {
  }

  ngAfterViewInit(): void {
    // listen for visibility of the element for hidden by default scenario
    this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
    this.visibilityObserver.visible.subscribe(this.update.bind(this));
  }

  ngOnDestroy(): void {
    if (this.visibilityObserver) {
      this.visibilityObserver.visible.unsubscribe();
      this.visibilityObserver.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  @HostListener('window:resize')
  onResize(): void {
    // todo: debounce
    this.update();
  }

  update(): void {
    if (this.results) {
      this.results = this.cloneData(this.results);
    }

    if (this.cd) {
      this.cd.markForCheck();
    }
  }

  /**
   * Converts all date objects that appear as name
   * into formatted date strings
   */
  formatDates(): void {
    for (let i = 0; i < this.results.length; i++) {
      const g = this.results[i];

      if (g.name instanceof Date) {
        g.name = g.name.toLocaleDateString();
      }

      if (g.series) {
        for (let j = 0; j < g.series.length; j++) {
          const d = g.series[j];
          if (d.name instanceof Date) {
            d.name = d.name.toLocaleDateString();
          }
        }
      }
    }
  }

  /**
   * Clones the data into a new object
   *
   * @private
   * @param {any} data
   * @returns {*}
   *
   * @memberOf BaseChart
   */
  private cloneData(data): any {
    const results = [];

    for (const item of data) {
      const copy = {
        name: item['name']
      };

      if (item['value'] !== undefined) {
        copy['value'] = item['value'];
      }

      if (item['series'] !== undefined) {
        copy['series'] = [];
        for (const seriesItem of item['series']) {
          const seriesItemCopy = Object.assign({}, seriesItem);
          copy['series'].push(seriesItemCopy);
        }
      }

      results.push(copy);
    }

    return results;
  }

}
