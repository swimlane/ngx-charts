import {
  Component, Input, Output, EventEmitter, ElementRef,
  OnChanges, SimpleChanges, ChangeDetectionStrategy
} from '@angular/core';
import d3 from '../d3';
import { invertColor } from '../utils/color-utils';

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
          <xhtml:span class="treemap-label">
            {{label}}
          </xhtml:span>
          <xhtml:br />
          <xhtml:span 
            class="treemap-val" 
            ngx-charts-count-up 
            [countTo]="value">
          </xhtml:span>
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellComponent implements OnChanges {

  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() value;
  @Input() valueType;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  transform: string;
  formattedValue: string; // todo check string or number ?
  initialized: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
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
    const node = d3.select(this.element).select('.cell');

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
    const node = d3.select(this.element).select('.cell');

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
