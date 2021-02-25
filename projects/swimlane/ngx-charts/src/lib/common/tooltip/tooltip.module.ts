import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';

@NgModule({
  declarations: [TooltipContentComponent, TooltipDirective],
  providers: [],
  exports: [TooltipContentComponent, TooltipDirective],
  imports: [CommonModule],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule {}
