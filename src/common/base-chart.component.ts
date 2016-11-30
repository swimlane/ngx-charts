import { ElementRef, NgZone, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";

export abstract class BaseChartComponent {

  results: any[];
  chartElement: ElementRef;
  zone: NgZone;
  changeDetector: ChangeDetectorRef;
  view: number[];
  width: number;
  height: number;
  resizeSubscription: any;

  constructor(chartElement: ElementRef, zone: NgZone, changeDetector: ChangeDetectorRef) {
    this.chartElement = chartElement;
    this.zone = zone;
    this.changeDetector = changeDetector;
  }

  protected bindResizeEvents(view: number[]): void {
    this.view = view;
    this.bindWindowResizeEvent();
  }

  protected unbindEvents(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  update(): void {
    if (this.results) {
      this.results = this.cloneData(this.results);
    }

    if (this.view) {
      this.width = this.view[0];
      this.height = this.view[1];
    } else {
      let dims = this.getContainerDims();
      this.width = dims.width;
      this.height = dims.height;
    }

    if (this.changeDetector) {
      this.changeDetector.markForCheck();
    }
  }

  getContainerDims(): any {
    let width = 0;
    let height = 0;
    const hostElem = this.chartElement.nativeElement;
    if (hostElem.parentNode != null) {
      //Get the container dimensions
      width = hostElem.parentNode.clientWidth;
      height = hostElem.parentNode.clientHeight;
    }
    return {width, height};
  }

  private bindWindowResizeEvent(): void {
    this.zone.run(() => {
      let source = Observable.fromEvent(window, 'resize', null, null);
      let subscription = source.debounceTime(200).subscribe(e => {
        this.update();
        if (this.changeDetector) {
          this.changeDetector.markForCheck();
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
    let results = [];

    for (let item of data) {
      let copy = {
        name: item['name']
      };

      if (item['value'] !== undefined) {
        copy['value'] = item['value'];
      }

      if (item['series'] !== undefined) {
        copy['series'] = [];
        for (let seriesItem of item['series']) {
          let seriesItemCopy = Object.assign({}, seriesItem);
          copy['series'].push(seriesItemCopy);
        }
      }

      results.push(copy);
    }

    return results;
  }

  abstract setColors(): void;
  
  abstract onClick(data, group): void;

}
