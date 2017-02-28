import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChildren,
  SimpleChanges,
  Renderer,
  ChangeDetectionStrategy,
  trigger,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-area-tooltip]',
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
        style="opacity: 0; cursor: 'auto';"
        (mouseenter)="showTooltip(i)"
        (mouseleave)="hideTooltip(i)"
      />
      <xhtml:template #tooltipTemplate>
        <xhtml:div class="area-tooltip-container">
          <xhtml:div
            *ngFor="let tooltipItem of tooltipArea.values"
            class="tooltip-item">
            <span
              class="tooltip-item-color"
              [style.background-color]="tooltipItem.color">
            </span>
            {{getToolTipText(tooltipItem)}}
          </xhtml:div>
        </xhtml:div>
      </xhtml:template>
      <svg:rect
        [@animationState]="anchorOpacity[i] !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="tooltipArea.tooltipAnchor"
        y="0"
        [attr.width]="1"
        [attr.height]="height"
        [style.opacity]="anchorOpacity[i]"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'right'"
        [tooltipType]="'tooltip'"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('inactive => active', [
        style({
          opacity: 0,
        }),
        animate(250, style({opacity: 0.7}))
      ]),
      transition('active => inactive', [
        style({
          opacity: 0.7,
        }),
        animate(250, style({opacity: 0}))
      ])
    ])
  ]
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
  @Input() tooltipDisabled: boolean = false;

  @Output() hover = new EventEmitter();

  @ViewChildren('tooltips') tooltips;

  constructor(private renderer: Renderer) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.tooltipAreas = this.getTooltipAreas();
  }

  getTooltipAreas(): any[] {
    let uniqueSet = this.getUniqueValues(this.xSet);

    uniqueSet = uniqueSet.sort((a, b) => {
      return this.xScale(a) - this.xScale(b);
    });

    const results = [];
    for (let i = 0; i < uniqueSet.length; i++) {
      const val = uniqueSet[i];
      const ob: any = {};
      ob.tooltipAnchor = this.xScale(val);

      if (i === 0) {
        ob.x0 = this.xScale(val);
      } else {
        ob.x0 = (this.xScale(uniqueSet[i - 1]) + this.xScale(uniqueSet[i])) / 2;
      }

      if (i === uniqueSet.length - 1) {
        ob.x1 = this.xScale(uniqueSet[i]);
      } else {
        ob.x1 = (this.xScale(uniqueSet[i]) + this.xScale(uniqueSet[i + 1])) / 2;
      }

      ob.width = ob.x1 - ob.x0;
      ob.value = val;
      ob.values = this.getValues(val);
      results.push(ob);

      this.anchorOpacity[i] = 0;
    }

    return results;
  }

  getValues(xVal): any[] {
    const results = [];

    for (const group of this.results) {
      const item = group.series.find(d => d.name.toString() === xVal.toString());
      let groupName = group.name;
      if (groupName instanceof Date) {
        groupName = groupName.toLocaleDateString();
      }

      if (item) {
        let label = item.name;
        if (label instanceof Date) {
          label = label.toLocaleDateString();
        }
        let val = item.value;
        if (this.showPercentage) {
          val = (item.d1 - item.d0).toFixed(2) + '%';
        }
        let color;
        if (this.colors.scaleType === 'linear') {
          let v = val;
          if (item.d1) {
            v = item.d1;
          }
          color = this.colors.getColor(v);
        } else {
          color = this.colors.getColor(group.name);
        }

        results.push({
          value: val,
          name: label,
          series: groupName,
          min: item.min,
          max: item.max,
          color
        });
      }
    }

    return results;
  }

  getUniqueValues(array): any[] {
    const results = [];

    for (let i = 0; i < array.length; i++) {
      const val = array[i];

      const exists = results.find(v => {
        return v.toString() === val.toString();
      });

      if (!exists) {
        results.push(val);
      }
    }

    return results;
  }

  showTooltip(index): void {
    const tooltipAnchor = this.tooltips.toArray()[index].nativeElement.getElementsByTagName('rect')[1];
    const event = new MouseEvent('mouseenter', {bubbles: false});
    this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
    this.anchorOpacity[index] = 0.7;
    this.hover.emit(this.tooltipAreas[index]);
  }

  hideTooltip(index): void {
    const tooltipAnchor = this.tooltips.toArray()[index].nativeElement.getElementsByTagName('rect')[1];
    const event = new MouseEvent('mouseleave', {bubbles: false});
    this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
    this.anchorOpacity[index] = 0;
  }

  getToolTipText(tooltipItem: any): string {
    let result: string = '';
    if (tooltipItem.series !== undefined) {
      result += tooltipItem.series;
    } else {
      result += '???';
    }
    result += ': ';
    if (tooltipItem.value !== undefined) {
      result += tooltipItem.value.toLocaleString();
    }
    if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
      result += ' (';
      if (tooltipItem.min !== undefined) {
        if (tooltipItem.max === undefined) {
          result += '≥';
        }
        result += tooltipItem.min.toLocaleString();
        if (tooltipItem.max !== undefined) {
          result += ' - ';
        }
      } else if (tooltipItem.max !== undefined) {
        result += '≤';
      }
      if (tooltipItem.max !== undefined) {
        result += tooltipItem.max.toLocaleString();
      }
      result += ')';
    }
    return result;
  }

}
