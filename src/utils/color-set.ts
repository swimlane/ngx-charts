import { ColorSetGroup } from './color-set-group.enum';

export interface ColorSet {
  name?: string;
  selectable?: boolean;
  group?: ColorSetGroup;
  domain: string[];
}
