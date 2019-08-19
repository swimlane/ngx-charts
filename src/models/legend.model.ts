import { ColorHelper } from '../common';

export interface ILegendOptions {
  scaleType: string;
  colors: ColorHelper | any; // TODO: Fix colors Type.
  domain: any[]; // TODO: Fix domain type.
  title: string;
  position: string;
}
