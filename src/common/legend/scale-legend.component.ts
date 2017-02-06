import {
  Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-charts-scale-legend',
  template: `
    <div
      class="scale-legend"
      [style.height.px]="height"
      [style.width.px]="width">
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div
        class="scale-legend-wrap"
        [style.background]="gradient">
      </div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./scale-legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.chart-legend]': 'true',
    '[class.legend-position-left]': `position === 'left'`,
    '[class.legend-position-right]': `position === 'right'`,
    '[class.legend-position-top]': `position === 'top'`,
    '[class.legend-position-bottom]': `position === 'bottom'`
  }
})
export class ScaleLegendComponent implements OnChanges {

  @Input() valueRange: any;
  @Input() colors: any;
  @Input() height: number;
  @Input() width: number;
  @Input() position: string;

  gradient: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
    this.gradient = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to bottom, ${gradientValues})`);
  }

  /**
   * Generates the string used in the gradient stylesheet properties
   * @param  {array} colors array of colors
   * @param  {array} splits array of splits on a scale of (0, 1)
   * @return {string}
   */
  gradientString(colors, splits): string {
    // add the 100%
    splits.push(1);
    const pairs = [];
    colors.reverse().forEach((c, i) => {
      pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
    });

    return pairs.join(', ');
  }

}
