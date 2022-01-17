import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { Gradient } from '../common/types/gradient.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';

@Component({
  selector: 'g[ngx-charts-tree-map-cell]',
  template: `
    <svg:g>
      <defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="orientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        [attr.width]="width"
        [attr.height]="height"
        [attr.x]="x"
        [attr.y]="y"
        class="cell"
        (click)="onClick()"
      />
      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        [attr.x]="x"
        [attr.y]="y"
        [attr.width]="width"
        [attr.height]="height"
        class="treemap-label"
        [style.pointer-events]="'none'"
      >
        <xhtml:p [style.color]="getTextColor()" [style.height]="height + 'px'" [style.width]="width + 'px'">
          <xhtml:span class="treemap-label" [innerHTML]="formattedLabel"> </xhtml:span>
          <xhtml:br />
          <xhtml:span
            *ngIf="animations"
            class="treemap-val"
            ngx-charts-count-up
            [countTo]="value"
            [valueFormatting]="valueFormatting"
          >
          </xhtml:span>
          <xhtml:span *ngIf="!animations" class="treemap-val">
            {{ formattedValue }}
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellComponent implements OnChanges {
  @Input() data: DataItem;
  @Input() fill: string;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() label: string;
  @Input() value: any;
  // @Input() valueType;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() gradient: boolean = false;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  gradientStops: Gradient[];
  gradientId: string;
  gradientUrl: string;

  element: HTMLElement;
  transform: string;
  formattedLabel: string;
  formattedValue: string;
  initialized: boolean = false;

  orientation = BarOrientation;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(): void {
    this.update();

    this.valueFormatting = this.valueFormatting || (value => value.toLocaleString());
    const labelFormatting = this.labelFormatting || (cell => escapeLabel(trimLabel(cell.label, 55)));

    const cellData = {
      data: this.data,
      label: this.label,
      value: this.value
    };

    this.formattedValue = this.valueFormatting(cellData.value);
    this.formattedLabel = labelFormatting(cellData);

    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(#${this.gradientId})`;
    this.gradientStops = this.getGradientStops();
  }

  update(): void {
    if (this.initialized) {
      this.animateToCurrentForm();
    } else {
      if (this.animations) {
        this.loadAnimation();
      }
      this.initialized = true;
    }
  }

  loadAnimation(): void {
    const node = select(this.element).select('.cell');

    node.attr('opacity', 0).attr('x', this.x).attr('y', this.y);

    this.animateToCurrentForm();
  }

  getTextColor(): string {
    return invertColor(this.fill);
  }

  animateToCurrentForm(): void {
    const node = select(this.element).select('.cell');

    if (this.animations) {
      node
        .transition()
        .duration(750)
        .attr('opacity', 1)
        .attr('x', this.x)
        .attr('y', this.y)
        .attr('width', this.width)
        .attr('height', this.height);
    } else {
      node.attr('opacity', 1).attr('x', this.x).attr('y', this.y).attr('width', this.width).attr('height', this.height);
    }
  }

  onClick(): void {
    this.select.emit(this.data);
  }

  getGradientStops(): Gradient[] {
    return [
      {
        offset: 0,
        color: this.fill,
        opacity: 0.3
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
      }
    ];
  }
}
