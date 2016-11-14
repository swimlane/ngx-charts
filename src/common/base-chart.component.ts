import { ElementRef, NgZone } from "@angular/core";
import { Observable } from "rxjs";

export abstract class BaseChart {
  results: any[];
  chartElement: ElementRef;
  zone: NgZone;
  view: number[];
  width: number;
  height: number;
  resizeSubscription: any;

  constructor(chartElement: ElementRef, zone: NgZone) {
    this.chartElement = chartElement;
    this.zone = zone;
  }

  protected bindResizeEvents(view: number[]): void {
    this.view = view;
    this.bindWindowResizeEvent();
  }

  protected unbindEvents() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  update() {
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
  }

  getContainerDims() {
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

  private bindWindowResizeEvent() {
    this.zone.runOutsideAngular(() => {
      let source = Observable.fromEvent(window, 'resize', null, null);
      let subscription = source.debounceTime(200).subscribe(e => {
        this.zone.run(() => { this.update(); });
      });
      this.zone.run(() => { this.resizeSubscription = subscription; });
    });
  }

  // Clones the data into a new object
  private cloneData(data) {
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

  abstract setColors()
  abstract click(data, group)
}
