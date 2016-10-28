import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';

export class TooltipOptions {

  id: string;
  title: string;
  template: any;
  host: any;
  showCaret: boolean;
  type: StyleTypes;
  placement: PlacementTypes;
  alignment: AlignmentTypes;
  spacing: number;
  cssClass: string;
  context: any;

  constructor(opts) {
    Object.assign(this, opts);
  }

}
