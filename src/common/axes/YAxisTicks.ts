import { Component, Input, OnInit } from '@angular/core';
import { trimLabel } from '../trimLabel';

@Component({
  selector: 'g[y-axis-ticks]',
  template: `
    <svg:g *ngFor="let tick of ticks" class="tick"
      [attr.transform]="transform(tick)" >
      <title>{{tickFormat(tick)}}</title>
      <svg:text
        stroke-width="0.01"
        [attr.dy]="dy"
        [attr.x]="x1"
        [attr.y]="y1"
        [attr.text-anchor]="textAnchor"

        [style.font-size]="'12px'">
        {{trimLabel(tickFormat(tick))}}
      </svg:text>

      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">

        <svg:line
          class="gridline-path gridline-path-horizontal gridline-path-shadow"
          x1="0"
          [attr.x2]="gridLineWidth" />
        <svg:line
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          y1="1"
          y2="1" />
      </svg:g>
    </svg:g>
  `
})
export class YAxisTicks implements OnInit {
  @Input() scale;
  @Input() orient;
  @Input() tickArguments = [5];
  @Input() tickValues;
  @Input() tickStroke = '#ccc';
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineHeight;

  innerTickSize: any;
  tickPadding: any;
  tickSpacing: any;
  verticalSpacing: any;
  textAnchor: any;
  dy: any;
  x1: any;
  x2: any;
  y1: any;
  y2: any;
  adjustedScale: any;
  transform: any;
  tickFormat: any;
  ticks: any;

  constructor() {
    Object.assign(this, {
      innerTickSize: 6,
      outerTickSize: 6,
      tickPadding: 3,
      rotateLabels: false,
      verticalSpacing: 20,
      textAnchor: 'middle',
      trimLabel: trimLabel
    });
  }

  ngOnInit() {
    this.update();
  }

  update() {
    var scale;

    var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
    this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;

    scale = this.scale;
    this.ticks = this.getTicks();

    if (this.tickFormatting) {
      this.tickFormat = this.tickFormatting;
    } else if (scale.tickFormat) {
      this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
    } else {
      this.tickFormat = function(d) {
        return d;
      };
    }

    this.adjustedScale = scale.bandwidth ? function(d) {
      return scale(d) + scale.bandwidth() * 0.5;
    } : scale;

    switch (this.orient) {
      case "top":
        this.transform = function(tick) {
          return "translate(" + this.adjustedScale(tick) + ",0)";
        };
        this.textAnchor = "middle";
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? "0em" : ".71em";
        break;
      case "bottom":
        this.transform = function(tick) {
          return "translate(" + this.adjustedScale(tick) + ",0)";
        };
        this.textAnchor = "middle";
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? "0em" : ".71em";
        break;
      case "left":
        this.transform = function(tick) {
          return "translate(0," + this.adjustedScale(tick) + ")";
        };
        this.textAnchor = "end";
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = ".32em";
        break;
      case "right":
        this.transform = function(tick) {
          return "translate(0," + this.adjustedScale(tick) + ")";
        };
        this.textAnchor = "start";
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = ".32em";
        break;
    }
  }

  getTicks() {
    let ticks;

    if (this.tickValues) {
      ticks = this.tickValues;
    } else if (this.scale.ticks) {
      ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
    } else {
      ticks = this.scale.domain();
    }
    return ticks;
  }

  tickTransform(tick) {
    return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
  }

  gridLineTransform() {
    return `translate(0,${this.verticalSpacing})`;
  }

}
