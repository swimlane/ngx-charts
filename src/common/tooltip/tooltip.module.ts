import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionService } from '../../utils/injection.service';

@NgModule({
  declarations: [TooltipContentComponent, TooltipDirective],
  providers: [InjectionService],
  exports: [TooltipContentComponent, TooltipDirective],
  imports: [BrowserModule],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule { }
