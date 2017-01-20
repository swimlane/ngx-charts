import {
  ElementRef,
  NgZone,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'base-chart',
  template: ``
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

  constructor(
    protected chartElement: ElementRef, 
    protected zone: NgZone, 
    protected cd: ChangeDetectorRef,
    protected location: Location) {
  }

  ngAfterViewInit(): void {
    this.bindWindowResizeEvent();
  }

  ngOnDestroy(): void {
    this.unbindEvents();
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
      this.width = dims.width;
      this.height = dims.height;
    }

    if (this.cd) {
      this.cd.markForCheck();
    }
  }

  getContainerDims(): any {
    let width = 0;
    let height = 0;
    const hostElem = this.chartElement.nativeElement;

    if (hostElem.parentNode !== null) {
      // Get the container dimensions
      width = hostElem.parentNode.clientWidth;
      height = hostElem.parentNode.clientHeight;
    }

    return { width, height };
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
