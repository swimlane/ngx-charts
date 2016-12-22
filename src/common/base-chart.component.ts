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
import { Observable } from 'rxjs/Rx';

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

  constructor(protected chartElement: ElementRef, protected zone: NgZone, protected cd: ChangeDetectorRef) {
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

    if (this.cd) {
      this.cd.markForCheck();
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

  // converts all date objects that appear as name into formatted date strings
  formatDates() {
    for (let i = 0; i < this.results.length; i++) {
      let g = this.results[i];
      if (g.name instanceof Date) {
        g.name = g.name.toLocaleDateString();
      }

      if (g.series) {
        for (let j = 0; j < g.series.length; j++) {
          let d = g.series[j];
          if (d.name instanceof Date) {
            d.name = d.name.toLocaleDateString();
          }
        }
      }
    }
  }

}
