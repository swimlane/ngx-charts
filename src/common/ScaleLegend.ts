import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scale-legend',
  template: `
    <div>
      <div
        style="padding: 10px 0px; width: 30px; text-align: center;"
        [style.height]="(height - 40) + 'px'">

        <div>
          <span>{{valueRange[0]}}</span>
        </div>

        <div class="legend-wrap"
          style="height: 100%; width: 100%; border-radius: 5;"
          [style.background]="gradient">
        </div>

        <div>
          <span>{{valueRange[1].toFixed()}}</span>
        </div>
      </div>
    </div>
  `
})
export class ScaleLegend {
  @Input() valueRange;
  @Input() colors;
  @Input() height;

  gradient: any;

  ngOnInit(){
    let gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
    this.gradient = `linear-gradient(to bottom, ${gradientValues})`;
  }

  /**
   * Generates the string used in the gradient stylesheet properties
   * @param  {array} colors array of colors
   * @param  {array} splits array of splits on a scale of (0, 1)
   * @return {string}
   */
  gradientString(colors, splits) {
    // add the 100%
    splits.push(1);
    let pairs = [];
    colors.forEach((c, i) =>{
      pairs.push(`${c} ${Math.round(splits[i]*100)}%`);
    })

    return pairs.join(', ');
  }
}
