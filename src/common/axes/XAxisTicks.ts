import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trimLabel } from '../trimLabel';

@Component({
  selector: 'g[x-axis-ticks]',
  template: `
    <svg:g *ngFor="let tick of getTicks()" class="tick"
      [attr.transform]="tickTransform(tick)">
      <title>{{tickFormat(tick)}}</title>
      <svg:text
        stroke-width="0.01"
        [attr.text-anchor]="textAnchor"
        [attr.transform]="textTransform"
        [style.font-size]="'12px'">
        {{trimLabel(tickFormat(tick))}}
      </svg:text>

      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">

        <svg:line
          class="gridline-path gridline-path-vertical gridline-path-shadow"
          [attr.y1]="-gridLineHeight"
          y2="0" />
        <svg:line
          class="gridline-path gridline-path-vertical"
          x1="1"
          x2="1"
          [attr.y1]="-gridLineHeight"
          y2="0" />
      </svg:g>
    </svg:g>
  `
})
export class XAxisTicks {
  @Input() scale;
  @Input() orient;
  @Input() tickArguments = [5];
  @Input() tickStroke = '#ccc';
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineHeight;

  verticalSpacing: any;
  rotateLabels: any;
  innerTickSize: any;
  outerTickSize: any;
  tickPadding: any;
  textAnchor: any;
  maxTicksLength: any;
  trimLabel: any;
  adjustedScale: any;
  tickValues: any;
  textTransform: any;
  ticks: any;
  tickFormat: any;

  constructor(){
    Object.assign(this, {
      innerTickSize: 6,
      outerTickSize: 6,
      tickPadding: 3,
      rotateLabels: false,
      verticalSpacing: 20,
      textAnchor: 'middle',
      maxTicksLength: 0,
      trimLabel: trimLabel
    });
  }

  ngOnInit() {
    this.update();
  }

  update(){
    var scale;
    var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
    var tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;

    scale = this.scale;
    this.ticks = this.getTicks();

    if (this.tickFormatting) {
      this.tickFormat = this.tickFormatting;
    } else if (scale.tickFormat) {
      this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
    } else {
      this.tickFormat = function(d) { return d; };
    }

    for (var i = 0; i < this.ticks.length; i++) {
      if (typeof this.getTicks()[i] === 'string' && this.getTicks()[i].length > this.maxTicksLength) {
        this.maxTicksLength = this.getTicks()[i].length;
      }
    }

    this.adjustedScale = scale.rangeBand ? function(d) { return scale(d) + scale.rangeBand() * 0.5; } : scale;

    this.textTransform = '';
    if (this.rotateLabels) {
      this.textTransform = 'rotate(-30)';
      this.textAnchor = 'end';
      this.verticalSpacing = 10;
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

  tickTransform(tick){
    return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
  }

  gridLineTransform(){
    return `translate(0,${-this.verticalSpacing - 5})`;
  }

}
