import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import moment = require("moment");
import ObjectId from "../utils/object-id";

@Component({
  selector: 'g[circleSeries]',
  template: `
    <svg:g *ngFor="let circle of circles">
      <svg:rect
        [attr.x]="circle.cx - circle.radius"
        [attr.y]="circle.cy"
        [attr.width]="circle.radius * 2"
        [attr.height]="circle.height"
        [attr.fill]="color"
        class="tooltip-bar"
        style="pointerEvents: 'none'; opacity: 0;"
      />

      <svg:g circle
        [attr.class]="className"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circle.radius"
        [fill]="color"
        [stroke]="strokeColor"
        [pointerEvents]="circle.value.value === 0 ? 'none': 'all'"
        [data]="circle.value"
        [classNames]="circle.classNames"
        (clickHandler)="click($event)"
      />
    </svg:g>
  `
})
export class CircleSeries implements OnInit {
  areaPath: any;
  circles: any[];

  @Input() data;
  @Input() type = 'standard';
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() strokeColor;
  @Input() scaleType;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    // let pageUrl = window.location.href; // unused variable

    if (this.scaleType === 'time') {
      this.data = this.data.filter(d => {
        return d.vals[0].label[0][0] !== 'No Value' && d.vals[0].label[0][0] !== 'Other'
          && d.vals[0].label[0][1] !== 'No Value' && d.vals[0].label[0][1] !== 'Other';
      });
    }

    this.circles = this.processCircles();
  }

  processCircles() {
    return this.data.map((d, i) => {
      let value = d.vals[0];
      let label = value.label[0][0];

      // unused variable
      // let circle = {
      //   value: value,
      //   label: label,
      // };

      if (value.value) {
        let cx;
        if (this.scaleType === 'time') {
          cx = this.xScale(moment(label).toDate());
        } else {
          cx = this.xScale(label) + this.xScale.bandwidth() / 2;
        }
        let cy = this.yScale(this.type === 'standard' ? value.value : value.d1);
        let radius = 5;
        let height = this.yScale.range()[0] - cy;

        let gradientIdRect = 'grad' + ObjectId().toString();

        return {
          classNames: [`circle-data-${i}`],
          value: value,
          label: label,
          cx: cx,
          cy: cy,
          radius: radius,
          height: height,
          gradientIdRect: gradientIdRect
        };
      }
    }).filter((circle) => circle !== undefined);
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
