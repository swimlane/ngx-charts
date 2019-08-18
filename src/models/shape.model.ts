export interface IShapeData {
  series: string | number | Date;
  name: string | number | Date;
  value: string | number | Date;
  x: string | number | Date;
  radius: number;
}

export interface IShapeBase {
  data: IShapeData;
  x: string | number | Date;
  y: string | number | Date;
  classNames: string[];
  value: string | number | Date;
  label: string | number | Date;
  tooltipLabel: string;
  color: string;
  opacity: number;
  seriesName: string | number | Date;
  isActive: boolean;
  transform: string;
  barVisible: boolean;
}

export interface IShapeCircle extends IShapeBase {
  r: number;
  cx: number;
  cy: number;
  radius: number;
}
