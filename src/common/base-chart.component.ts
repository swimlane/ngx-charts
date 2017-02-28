import {
  ElementRef, NgZone, ChangeDetectorRef, Component, Input,
  Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';

import { LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import { VisibilityObserver } from '../utils';

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

  width: number;
  height: number;
  resizeSubscription: any;
  visibilityObserver: VisibilityObserver;

  constructor(
    protected chartElement: ElementRef,
    protected zone: NgZone,
    protected cd: ChangeDetectorRef,
    protected location: LocationStrategy) {
  }

  ngAfterViewInit(): void {
    this.bindWindowResizeEvent();

    // listen for visibility of the element for hidden by default scenario
    this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
    this.visibilityObserver.visible.subscribe(this.update.bind(this));
  }

  ngOnDestroy(): void {
    this.unbindEvents();
    if (this.visibilityObserver) {
      this.visibilityObserver.visible.unsubscribe();
      this.visibilityObserver.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    if (this.results) {
      this.results = this.cloneData(this.results);
    }

    if (this.view) {
      this.width = this.view[0];
      this.height = this.view[1];
    } else {
      const dims = this.getContainerDims();
      if (dims) {
        this.width = dims.width;
        this.height = dims.height;
      }
    }

    if (!this.width || !this.height) {
      this.width = this.height = 0;
    }

    if (this.cd) {
      this.cd.markForCheck();
    }
  }

  getContainerDims(): any {
    let width;
    let height;
    const hostElem = this.chartElement.nativeElement;

    if (hostElem.parentNode !== null) {
      // Get the container dimensions
      const dims = hostElem.parentNode.getBoundingClientRect();
      width = dims.width;
      height = dims.height;
    }

    if (width && height) {
      return { width, height };
    }

    return null;
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

  protected unbindEvents(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private bindWindowResizeEvent(): void {
    this.zone.run(() => {
      const source = Observable.fromEvent(window, 'resize', null, null);
      const subscription = source.debounceTime(200).subscribe(e => {
        this.update();
        if (this.cd) {
          this.cd.markForCheck();
        }
      });
      this.resizeSubscription = subscription;
    });
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
