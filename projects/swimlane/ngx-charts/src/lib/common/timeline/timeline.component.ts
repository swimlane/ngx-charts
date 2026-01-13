import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';
import { id } from '../../utils/id';
import { ScaleType } from '../types/scale-type.enum';
import { ViewDimensions } from '../types/view-dimension.interface';
import { getXDomain, getXScale, getTimelineDims, getTimelineTransform } from './timeline.helper';

@Component({
  selector: 'g[ngx-charts-timeline]',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class Timeline implements OnChanges {
  @Input() view: [number, number];
  @Input() results;
  @Input() scheme;
  @Input() customColors;
  @Input() legend: boolean;
  @Input() autoScale: boolean;
  @Input() scaleType: ScaleType;
  @Input() height: number = 50;

  @Output() select = new EventEmitter();
  @Output() onDomainChange = new EventEmitter();

  element: HTMLElement;
  dims: ViewDimensions;
  xDomain: any[];
  xScale: any;
  brush: any;
  transform: string;
  initialized: boolean = false;
  filterId: string;
  filter: string;

  constructor(element: ElementRef, private cd: ChangeDetectorRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();

    if (!this.initialized) {
      this.addBrush();
      this.initialized = true;
    }
  }

  update(): void {
    this.dims = getTimelineDims(this.view, this.height);
    this.height = this.dims.height;

    this.xDomain = getXDomain(this.results, this.scaleType);
    this.xScale = getXScale(this.xDomain, this.dims.width, this.scaleType);

    if (this.brush) {
      this.updateBrush();
    }

    this.transform = getTimelineTransform(this.view, this.height);

    this.filterId = 'filter' + id().toString();
    this.filter = `url(#${this.filterId})`;

    this.cd.markForCheck();
  }

  addBrush(): void {
    if (this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('brush end', ({ selection }) => {
        const newSelection = selection || this.xScale.range();
        const newDomain = newSelection.map(this.xScale.invert);

        this.onDomainChange.emit(newDomain);
        this.cd.markForCheck();
      });

    select(this.element).select('.brush').call(this.brush);
  }

  updateBrush(): void {
    if (!this.brush) return;

    const height = this.height;
    const width = this.view[0];

    this.brush.extent([
      [0, 0],
      [width, height]
    ]);
    select(this.element).select('.brush').call(this.brush);

    // clear hardcoded properties so they can be defined by CSS
    select(this.element)
      .select('.selection')
      .attr('fill', undefined)
      .attr('stroke', undefined)
      .attr('fill-opacity', undefined);

    this.cd.markForCheck();
  }
}
