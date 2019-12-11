import { Component, Input, OnChanges, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
import { id } from '../utils';
import { DomSanitizer } from '@angular/platform-browser';
import { Series } from '../models/chart-data.model';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:marker *ngIf="showPoints" [attr.id]="markerId" markerWidth="8" markerHeight="8" refX="5" refY="5">
      <svg:circle cx="5" cy="5" r="3" [attr.fill]="stroke" style="stroke: none" />
    </svg:marker>
    <svg:path
      [@animationState]="'active'"
      class="line"
      [attr.d]="initialPath"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      stroke-width="1.5px"
      [style.marker-start]="markerRef"
      [style.marker-mid]="markerRef"
      [style.marker-end]="markerRef"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000
        }),
        animate(
          1000,
          style({
            strokeDashoffset: 0
          })
        )
      ])
    ])
  ]
})
export class LineComponent implements OnChanges {
  @Input() path: string;
  @Input() stroke: string;
  @Input() data: Series;
  @Input() fill: string = 'none';
  @Input() animations: boolean = true;
  @Input() showPoints: boolean = false;

  initialized: boolean = false;
  initialPath: string;
  markerId: string = '';
  markerRef: any = {};

  constructor(private element: ElementRef, private sanitizer: DomSanitizer) {
    this.markerId = `marker${id()}`;
    this.markerRef = this.sanitizer.bypassSecurityTrustStyle(`url(#${this.markerId})`);
  }

  ngOnChanges(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.initialPath = this.path;
    } else {
      this.updatePathEl();
    }
  }

  updatePathEl(): void {
    const node = select(this.element.nativeElement).select('.line');

    if (this.animations) {
      node
        .transition()
        .duration(750)
        .attr('d', this.path);
    } else {
      node.attr('d', this.path);
    }
  }
}
