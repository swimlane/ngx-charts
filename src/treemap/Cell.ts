import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { formatNumber } from 'common/utils/number/format'; // todo fix import
// todo fix missing "props"
import d3 from '../d3';

@Component({
  selector: 'g[cell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <svg:rect
        [attr.fill]="fill"
        [attr.width]="width"
        [attr.height]="height"
        class="viz cell"
        (click)="click()"
      />

      <svg:foreignObject
        *ngIf="width >= 70 && height >= 35"
        x="0"
        [attr.y]="height/2 - 15"
        [attr.width]="width"
        height="40">
        <xhtml:p>
          <xhtml:b>{{label}}</xhtml:b>
          <xhtml:br/>
          {{formattedValue}}
        </xhtml:p>
      </svg:foreignObject>
    </svg:g>
  `
})
export class Cell implements OnInit {
  element: HTMLElement;
  transform: string;
  formattedValue: string; // todo check string or number ?
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

  ngOnInit() {
    this.transform = `translate(${props.x} , ${props.y})`;
    this.formattedValue = formatNumber(props.value, props.valueType);

    this.loadAnimation();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.cell');

    node
      .attr('opacity', 0);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1);
  }

  click() {
    this.clickHandler.emit(this.label);
  }


}
