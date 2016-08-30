import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'g[circle]',
  template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
      (click)="click()"
    />
  `
})
export class Circle implements OnInit {
  @Input() cx;
  @Input() cy;
  @Input() r;
  @Input() fill;
  @Input() data;
  // @Input() activeLabel; // unused input
  @Input() classNames;
  @Input() circleOpacity;
  @Input() pointerEvents;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    // unused variables
    // let count = this.data.label[0].length;
    // let label = this.data.label[0][count - 1];
    // let active = label === this.activeLabel;

    this.classNames = this.classNames.join(' ') + ' viz ' + 'circle';
  }

  click() {
    this.clickHandler.emit(this.data);
  }
}
