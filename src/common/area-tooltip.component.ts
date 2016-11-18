import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChildren,
  Renderer
} from '@angular/core';

@Component({
  selector: 'g[areaTooltip]',
  template: `
    <svg:g
      #tooltips
      *ngFor="let tooltipArea of tooltipAreas; let i = index">
      <svg:rect
        class="tooltip-area"
        [attr.x]="tooltipArea.x0"
        y="0"
        [attr.width]="tooltipArea.width"
        [attr.height]="height"
        style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
        (mouseenter)="showTooltip(i)"
        (mouseleave)="hideTooltip(i)"
      />

      <xhtml:template #tooltipTemplate>
        <xhtml:div
          *ngFor="let tooltipItem of tooltipArea.values"
          class="tooltip-item">

          <span
            class="tooltip-item-color"
            [style.background-color]="colors(tooltipItem.series)">
          </span>

          {{tooltipItem.series}}: {{tooltipItem.value.toLocaleString()}}
        </xhtml:div>
      </xhtml:template>

      <svg:rect
        class="tooltip-anchor"
        [attr.x]="tooltipArea.tooltipAnchor"
        y="0"
        [attr.width]="1"
        [attr.height]="height"
        style="fill: rgb(255, 255, 255);"
        [style.opacity]="anchorOpacity[i]"
        [style.pointer-events]="'none'"

        swui-tooltip
        [tooltipPlacement]="'right'"
        [tooltipType]="'tooltip'"
        [tooltipSpacing]="5"
        [tooltipTemplate]="tooltipTemplate"
      />

    </svg:g>
  `
})
export class AreaTooltip implements OnChanges {
  tooltipAreas: any[];
  anchorOpacity: number[] = new Array();

  @Input() xSet;
  @Input() xScale;
  @Input() yScale;
  @Input() results;
  @Input() height;
  @Input() colors;
  @Input() showPercentage: boolean = false;

  @Output() hover = new EventEmitter();

  @ViewChildren('tooltips') tooltips;


  constructor(private renderer:Renderer) {
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.tooltipAreas = this.getTooltipAreas();
  }

  getTooltipAreas() {
    let uniqueSet = this.getUniqueValues(this.xSet);

    uniqueSet = uniqueSet.sort((a, b) => {
      return this.xScale(a) - this.xScale(b);
    });

    let results = [];
    for (let i = 0; i < uniqueSet.length; i++) {
      let val = uniqueSet[i];
      let ob: any = {};
      ob.tooltipAnchor = this.xScale(val);

      if (i === 0) {
        ob.x0 = this.xScale(val);
      } else {
        ob.x0 = (this.xScale(uniqueSet[i-1]) + this.xScale(uniqueSet[i])) / 2;
      }

      if (i === uniqueSet.length - 1) {
        ob.x1 = this.xScale(uniqueSet[i]);
      } else {
        ob.x1 = (this.xScale(uniqueSet[i]) + this.xScale(uniqueSet[i+1])) / 2;
      }

      ob.width = ob.x1 - ob.x0;
      ob.value = val;
      ob.values = this.getValues(val);
      results.push(ob);

      this.anchorOpacity[i] = 0;
    }

    return results;
  }

  getValues(xVal) {
    let results = [];
    for (let group of this.results) {
      let item = group.series.find(d => d.name.toString() === xVal.toString());

      if (item) {
        let val = item.value;
        if (this.showPercentage) {
          val = (item.d1 - item.d0).toFixed(2) + '%';
        }
        results.push({
          value: val,
          name: item.name,
          series: group.name
        });
      }
    }

    return results;
  }

  getUniqueValues(array) {
    let results = [];

    for (let i = 0; i < array.length; i++) {
      let val = array[i];

      let exists = results.find(v => {
        return v.toString() === val.toString();
      });

      if (!exists) {
        results.push(val);
      }
    }

    return results;
  }

  showTooltip(index) {
    let tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
    let event = new MouseEvent('mouseenter', {bubbles: false});
    this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
    this.anchorOpacity[index] = 0.7;
    this.hover.emit(this.tooltipAreas[index]);
  }

  hideTooltip(index) {
    let tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
    let event = new MouseEvent('mouseleave', {bubbles: false});
    this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
    this.anchorOpacity[index] = 0;
  }

}
