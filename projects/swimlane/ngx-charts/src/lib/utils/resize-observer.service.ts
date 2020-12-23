/// <reference types="resize-observer-browser" />

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeObserverService {
  private resizeEventSubject = new Subject<readonly ResizeObserverEntry[]>();
  private resizeObserver: ResizeObserver | null;
  public resizeEvent$ = this.resizeEventSubject.asObservable();

  constructor() {
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(entries => {
        this.resizeEventSubject.next(entries);
      });
    }
  }

  observe(element: HTMLElement): Observable<boolean> {
    this.resizeObserver?.observe(element);
    return this.resizeEventSubject.asObservable().pipe(
      filter(entries => entries.some(entry => entry.target === element)),
      map(() => true)
    );
  }

  unobserve(element: HTMLElement) {
    this.resizeObserver?.unobserve(element);
  }
}
