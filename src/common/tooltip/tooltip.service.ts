import { Injectable } from '@angular/core';
import { InjectionRegistery, InjectionService } from '../../services';
import { TooltipContentComponent } from '.';

@Injectable()
export class TooltipService extends InjectionRegistery {

  type: any = TooltipContentComponent;

  constructor(public injectionService: InjectionService) {
    super(injectionService);
  }

}
