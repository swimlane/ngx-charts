import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
  } from '@angular/core';
import { formatLabel } from '..';
  
@Component({
  selector: 'g[ngx-charts-bar-label]',
  template: `  
    <svg:text   
      font-size="11px" 
      alignment-baseline="middle"     
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x" 
      [attr.y]="y">
      {{formatedValue}}     
    </svg:text>          

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

  export class BarLabelComponent implements OnChanges {
  
    @Input() value;    
    @Input() barX;
    @Input() barY; 
    @Input() barWidth;
    @Input() barHeight; 
    @Input() orientation;

    x: number;
    y: number;
    horizontalPadding: number = 2;
    verticalPadding: number = 5;
    formatedValue: string;
    transform: string;
    textAnchor: string;    
    
    ngOnChanges(changes: SimpleChanges): void {
      this.update();
    }
  
    update(): void {  
      this.formatedValue = formatLabel(this.value);  
      if (this.orientation === 'horizontal') {
          this.x = this.barX + this.barWidth;    
          // if the value is negative then it's on the left of the x0. 
          // we need to put the data label in front of the bar
          if (this.value < 0) {
            this.x = this.x - this.horizontalPadding;
            this.textAnchor = "end";
          } else {
            this.x = this.x + this.horizontalPadding;
            this.textAnchor = "start"; 
          }
          this.y = this.barY + this.barHeight / 2;    

      } else {
        // orientation must be "vertical"      
        this.x = this.barX + this.barWidth / 2;    
        this.y = this.barY + this.barHeight;  
         
        if (this.value < 0) {
          this.y = this.y + this.verticalPadding;          
          this.textAnchor = "end";
        } else {
          this.y = this.y - this.verticalPadding;   
          this.textAnchor = "start"; 
        }
        this.transform = `rotate(-45, ${ this.x } , ${ this.y })`;
      }
    }  
  }
