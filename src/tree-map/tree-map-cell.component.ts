import { Component, Input, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
// import { formatNumber } from 'common/utils/format';
import d3 from '../d3';

@Component({
  selector: 'g[treeMapCell]',
  template: `
    <svg:g>
      <svg:rect
        [attr.fill]="fill"
        [attr.width]="width"
        [attr.height]="height"
        [style.cursor]="'pointer'"
        class="cell"
        (click)="click()"
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
          [style.height]="height + 'px'"
          [style.width]="width + 'px'">
          {{label}}
          <xhtml:br/>
          {{formattedValue}}
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `
})
export class TreeMapCell implements OnChanges {
  element: HTMLElement;
  transform: string;
  formattedValue: string; // todo check string or number ?
  initialized: boolean = false;

  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() value;
  @Input() valueType;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();

  }

  update() {
    // this.transform = `translate(${this.x} , ${this.y})`;
    // todo fix this by adding props
    // this.formattedValue = formatNumber(props.value, props.valueType);

    this.formattedValue = this.value;
    if (this.initialized) {
      this.animateToCurrentForm();
    } else {
      this.loadAnimation();
      this.initialized = true;
    }

  }

  loadAnimation() {
    let node = d3.select(this.element).select('.cell');

    node
      .attr('opacity', 0)
      .attr('x', this.x)
      .attr('y', this.y);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1)
      .attr('x', this.x)
      .attr('y', this.y)
      .attr('width', this.width)
      .attr('height', this.height);
  }

  click() {
    this.clickHandler.emit({
      name: this.label,
      value: this.value
    });
  }
}
