import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { ColorHelper } from '../color.helper';
import { LegendEntry, getLegendEntries, areActiveEntriesEqual } from './legend.helper';

@Component({
  selector: 'ngx-charts-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LegendComponent implements OnChanges {
  @Input() data: string[];
  @Input() title: string;
  @Input() colors: ColorHelper;
  @Input() height: number;
  @Input() width: number;
  @Input() activeEntries;
  @Input() horizontal = false;

  @Output() labelClick: EventEmitter<string> = new EventEmitter();
  @Output() labelActivate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<{ name: string }> = new EventEmitter();

  legendEntries: LegendEntry[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    let shouldUpdate = false;

    for (const propName in changes) {
      if (propName === 'activeEntries') {
        const current = changes[propName].currentValue;
        const previous = changes[propName].previousValue;
        if (!areActiveEntriesEqual(previous, current)) {
          shouldUpdate = true;
        }
      } else {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      this.update();
    }
  }

  update(): void {
    this.cd.markForCheck();
    this.legendEntries = getLegendEntries(this.data, this.colors);
  }

  isActive(entry: LegendEntry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.label === d.name;
    });
    return item !== undefined;
  }

  activate(item: { name: string }) {
    this.labelActivate.emit(item);
  }

  deactivate(item: { name: string }) {
    this.labelDeactivate.emit(item);
  }

  trackBy(index: number, item: LegendEntry): string {
    return item.label;
  }
}
