import { isPlatformBrowser, isPlatformServer } from '@angular/common';
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
  SimpleChanges,
  PLATFORM_ID,
  Inject,
  OnInit
} from '@angular/core';

import { fromEvent as observableFromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { VisibilityObserver } from '../utils/visibility-observer';
import { isDate, isDefined } from '../utils/types';
import { Color } from '../utils/color-sets';
import { ScaleType } from './types/scale-type.enum';
import { ViewDimensions } from './types/view-dimension.interface';
import { dataTypeMap } from '@swimlane/ngx-ui';
import { StringOrNumberOrDate } from '../models/chart-data.model';

export interface ResultItem {
  extra?: unknown;
  label?: string | Date;
  min?: number;
  max?: number;
  name?: StringOrNumberOrDate;
  value?: number;
  percent?: number;
  total?: number;
  x?: StringOrNumberOrDate;
  y?: StringOrNumberOrDate;
  r?: number;
  series?: ResultItem[];
  [key: string]: unknown;
}

export interface FinalResultItem {
  extra?: unknown;
  label?: string | number;
  min?: number;
  max?: number;
  name?: string | number;
  value?: number;
  percent?: number;
  x?: StringOrNumberOrDate;
  y?: StringOrNumberOrDate;
  r?: number;
  total?: number;
  series?: FinalResultItem[];
  [key: string]: unknown;
}

@Component({
  selector: 'base-chart',
  template: ` <div></div> `
})
export class BaseChartComponent implements OnChanges, AfterViewInit, OnDestroy, OnInit {
  @Input() results: ResultItem[];
  @Input() view: [number, number];
  @Input() scheme: string | Color = 'cool';
  @Input() schemeType: ScaleType = ScaleType.Ordinal;
  @Input() customColors: any;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  finalResults: FinalResultItem[] = [];

  width: number;
  height: number;
  resizeSubscription: any;
  visibilityObserver: VisibilityObserver;

  constructor(
    protected chartElement: ElementRef,
    protected zone: NgZone,
    protected cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) public platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.animations = false;
    }
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
    this.finalResults = this.formatResults(this.results);

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

    // default values if width or height are 0 or undefined
    if (!this.width) {
      this.width = 600;
    }

    if (!this.height) {
      this.height = 400;
    }

    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);

    if (this.cd) {
      this.cd.markForCheck();
    }
  }

  getContainerDims(): ViewDimensions {
    let width: number;
    let height: number;
    const hostElem = this.chartElement.nativeElement;

    if (isPlatformBrowser(this.platformId) && hostElem.parentNode !== null) {
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
   * Formats the provided results by:
   *  - filtering out empty/undefined entries
   *  - setting label equal to name and converting it to a string if it is a Date object
   *  - setting value, min, max, percent, total, x, y, r, series, and extra
   * @param results The results provided by the component input.
   * @returns The formatted final results array.
   */
  formatResults(results: ResultItem[]): FinalResultItem[] {
    const finalResults: FinalResultItem[] = [];

    if (!results?.length) {
      return [];
    }

    results
      .filter((item: ResultItem) => !!item)
      .forEach((item: ResultItem) => {
        const copy: FinalResultItem = {};

        if (isDefined(item.name)) {
          copy.name = isDate(item.name) ? (item.name as Date).toLocaleDateString() : item.name.toString();
          copy.label = copy.name;
        }

        if (isDefined(item.value)) {
          copy.value = item.value;
        }

        if (isDefined(item.min)) {
          copy.min = item.min;
        }

        if (isDefined(item.max)) {
          copy.max = item.max;
        }

        if (isDefined(item.percent)) {
          copy.percent = item.percent;
        }

        if (isDefined(item.total)) {
          copy.total = item.total;
        }

        if (isDefined(item.x)) {
          copy.x = item.x;
        }

        if (isDefined(item.y)) {
          copy.y = item.y;
        }

        if (isDefined(item.r)) {
          copy.r = item.r;
        }

        if (isDefined(item.series)) {
          copy.series = this.formatResults(item.series);
        }

        if (isDefined(item.extra)) {
          copy.extra = JSON.parse(JSON.stringify(item.extra));
        }

        finalResults.push(copy);
      });

    return finalResults;
  }

  protected unbindEvents(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private bindWindowResizeEvent(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const source = observableFromEvent(window, 'resize');
    const subscription = source.pipe(debounceTime(200)).subscribe(e => {
      this.update();
      if (this.cd) {
        this.cd.markForCheck();
      }
    });
    this.resizeSubscription = subscription;
  }
}
