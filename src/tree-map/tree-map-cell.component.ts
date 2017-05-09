import {
  Component, Input, Output, EventEmitter, ElementRef,
  OnChanges, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import { select } from 'd3-selection';

import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';

@Component({
  selector: 'g[ngx-charts-tree-map-cell]',
  template: `
    <svg:g>
      <svg:rect
        [attr.fill]="fill"
        [attr.width]="width"
        [attr.height]="height"
        [style.cursor]="'pointer'"
        class="cell"
        (click)="onClick()"
      />
      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        [attr.x]="x"
        [attr.y]="y"
        [attr.width]="width"
        [attr.height]="height"
        class="label"
        [style.pointer-events]="'none'">
        <xhtml:p
          [style.color]="getTextColor()"
          [style.height]="height + 'px'"
          [style.width]="width + 'px'">
          <xhtml:span class="treemap-label" [innerHTML]="formattedLabel">
          </xhtml:span>
          <xhtml:br />
          <xhtml:span 
            class="treemap-val" 
            ngx-charts-count-up 
            [countTo]="value"
            [valueFormatting]="valueFormatting">
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellComponent implements OnChanges {

  @Input() data;
  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() value;
  @Input() valueType;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  transform: string;
  formattedLabel: string;
  initialized: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(/* changes: SimpleChanges */): void {
    this.update();

    const hasValue = this.data && typeof this.data.value !== 'undefined';
    this.valueFormatting = this.valueFormatting || (cell => cell.value.toLocaleString());
    const labelFormatting = this.labelFormatting || (cell => trimLabel(cell.label, 55));

    const cellData = {
      data: this.data,
      label: this.label,
      value: this.value
    };

    this.formattedLabel = labelFormatting(cellData);
  }

  update(): void {
    if (this.initialized) {
      this.animateToCurrentForm();
    } else {
      this.loadAnimation();
      this.initialized = true;
    }
  }

  loadAnimation(): void {
    const node = select(this.element).select('.cell');

    node
      .attr('opacity', 0)
      .attr('x', this.x)
      .attr('y', this.y);

    this.animateToCurrentForm();
  }

  getTextColor(): string {
    return invertColor(this.fill);
  }

  animateToCurrentForm(): void {
    const node = select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1)
      .attr('x', this.x)
      .attr('y', this.y)
      .attr('width', this.width)
      .attr('height', this.height);
  }

  onClick(): void {
    this.select.emit({
      name: this.label,
      value: this.value
    });
  }

}
