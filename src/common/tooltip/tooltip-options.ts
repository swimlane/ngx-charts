import { Injectable } from '@angular/core';

import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';

@Injectable()
export class TooltipOptions {

  title: string;
  template: any;
  context: any;
  host: any;
  showCaret: boolean;
  type: StyleTypes;
  placement: PlacementTypes;
  alignment: AlignmentTypes;
  closeOnClickOutside: boolean;
  closeOnMouseLeave: boolean;
  spacing: number;
  hide: any;
  cssClass: string;

  constructor(opts) {
    Object.assign(this, opts);
  }

}
