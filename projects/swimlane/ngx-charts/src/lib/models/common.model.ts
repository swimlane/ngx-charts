export interface Marker {
  name: string;
  value: string | number | Date;
  active: boolean;
  color?: number | string;
  group?: number;
}
