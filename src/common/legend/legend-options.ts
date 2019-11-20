import { ColorHelper } from '../color.helper';
import { ScaleType } from '../../utils/scale-type.enum';
import { LegendPosition } from './legend-position.enum';

export interface LegendOptions {
  scaleType: ScaleType;
  domain: string[];
  colors: ColorHelper;
  title: string;
  position: LegendPosition;
}
