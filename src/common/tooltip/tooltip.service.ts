import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { InjectionRegistery } from './injection-registery.service';
import { TooltipContentComponent } from './tooltip.component';

@Injectable()
export class TooltipService extends InjectionRegistery {

  type: any = TooltipContentComponent;

  constructor(public injectionService: InjectionService) {
    super(injectionService);
  }

}
