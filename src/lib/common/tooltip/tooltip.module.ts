import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';

import { InjectionService } from './injection.service';

@NgModule({
  declarations: [TooltipContentComponent, TooltipDirective],
  providers: [InjectionService, TooltipService],
  exports: [TooltipContentComponent, TooltipDirective],
  imports: [CommonModule],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule { }
