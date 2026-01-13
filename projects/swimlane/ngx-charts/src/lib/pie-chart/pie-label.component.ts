import { isPlatformServer } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from '@angular/core';

import { trimLabel } from '../common/trim-label.helper';
import { TextAnchor } from '../common/types/text-anchor.enum';
import {
  PieData,
  getPieLabelLine,
  getPieLabelTransforms,
  getPieLabelTextAnchor
} from './pie-label.helper';

@Component({
  selector: 'g[ngx-charts-pie-label]',
  templateUrl: './pie-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PieLabelComponent implements OnChanges {
  @Input() data: PieData;
  @Input() radius: number;
  @Input() label: string;
  @Input() color: string;
  @Input() max: number;
  @Input() value: number;
  @Input() explodeSlices: boolean;
  @Input() animations: boolean = true;
  @Input() labelTrim: boolean = true;
  @Input() labelTrimSize: number = 10;

  trimLabel: (label: string, max?: number) => string;
  line: string;
  styleTransform: string;
  attrTransform: string;
  textTransition: string;

  constructor(@Inject(PLATFORM_ID) public platformId: any) {
    this.trimLabel = trimLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const updateFields = ['data', 'radius', 'label', 'color', 'max', 'value', 'explodeSlices', 'labelTrim', 'labelTrimSize'];
    const shouldUpdate = updateFields.some(f => changes[f]);

    if (shouldUpdate) {
      // Check for data equality if it's the only change
      if (Object.keys(changes).length === 1 && changes.data) {
        const prev = changes.data.previousValue;
        const curr = changes.data.currentValue;
        if (prev && curr &&
          prev.data === curr.data &&
          prev.index === curr.index &&
          prev.pos[0] === curr.pos[0] &&
          prev.pos[1] === curr.pos[1] &&
          prev.value === curr.value) {
          return;
        }
      }

      this.setTransforms();
      this.update();
    }
  }

  setTransforms() {
    const transform = getPieLabelTransforms(
      isPlatformServer(this.platformId),
      this.animations,
      this.textX,
      this.textY
    );
    this.styleTransform = transform.styleTransform;
    this.attrTransform = transform.attrTransform;
    this.textTransition = transform.textTransition;
  }

  update(): void {
    this.line = getPieLabelLine(
      this.data,
      this.radius,
      this.explodeSlices,
      this.max,
      this.value
    );
  }

  get textX(): number {
    return this.data.pos[0];
  }

  get textY(): number {
    return this.data.pos[1];
  }

  textAnchor(): TextAnchor {
    return getPieLabelTextAnchor(this.data);
  }
}
