import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  NgZone
 } from '@angular/core';
 import { formatLabel } from '../label.helper';

@Component({
  selector: 'legend',
  template: `
    <div [style.width.px]="width">
      <header class="legend-title">
        <span class="legend-icon icon-eye"></span>
        <span class="legend-title-text">{{title}}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels"
          [style.max-height.px]="height - 45">
          <li
            *ngFor="let entry of legendEntries; trackBy: entry?.formattedLabel"
            class="legend-label">
            <legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)">
            </legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnChanges {

  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;
  @Input() width;

  @Output() labelClick: EventEmitter<any> = new EventEmitter();
  @Output() labelActivate: EventEmitter<any> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<any> = new EventEmitter();

  legendEntries: any[] = [];

  constructor(private cd: ChangeDetectorRef, private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.zone.run(() => {
      this.cd.markForCheck();
      this.legendEntries = this.getLegendEntries();
    });
  }

  getLegendEntries(): any[] {
    let items = [];

    for(const label of this.data) {
      const formattedLabel = formatLabel(label);

      let idx = items.findIndex((i) => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          color: this.colors.getColor(label)
        });
      }
    }

    return items;
  }

  activate(item) {
    this.zone.run(() => {
      this.labelActivate.emit(item);
    });
  }

  deactivate(item) {
    this.zone.run(() => {
      this.labelDeactivate.emit(item);
    });
  }

}
