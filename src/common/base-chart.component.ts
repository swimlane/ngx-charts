import {ElementRef, NgZone} from "@angular/core";
import {Observable} from "rxjs";
export abstract class BaseChart {
  results: any[];
  chartElement: ElementRef;
  zone: NgZone;
  view: number[];


  constructor(chartElement: ElementRef, zone: NgZone) {
    this.chartElement = chartElement;
    this.zone = zone;
  }

  protected bindResizeEvents(view: number[]): void {
    this.view = view;

    this.zone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'load', null, null)
        .subscribe(e => {
          this.setChartSizeBasedOnContainer();
        });
    });
    this.bindWindowResizeEvent();
  }

  update() {
    this.results = this.cloneData(this.results);
  }

  setChartSizeBasedOnContainer() {
    const hostElem = this.chartElement.nativeElement;

    //Get the container dimensions
    let width = hostElem.parentNode.clientWidth;
    let height = hostElem.parentNode.clientHeight;

    //setTimeout is used to trigger change detection
    setTimeout(() => {
      this.view = [width, height];
      this.update();
    }, 0);
  }

  private bindWindowResizeEvent() {
    this.zone.runOutsideAngular(() => {
      Observable.fromEvent(window, 'resize', null, null).debounceTime(100)
        .subscribe(e => {
          this.setChartSizeBasedOnContainer();
        });
    });
  }

  // Clones the data into a new object
  cloneData(data) {
    let results = [];

    for (let item of data) {
      let copy = {
        name: item['name']
      };

      if (item['value']) {
        copy['value'] = item['value'];
      }

      if (item['series']) {
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
