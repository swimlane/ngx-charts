export interface TreeMapCellConfig {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: number;
  valueFormatting?: (value: any) => string;
  labelFormatting?: (cell: any) => string;
  gradient: boolean;
  animations: boolean;
}
