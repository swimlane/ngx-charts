import {
  Component, Input, ChangeDetectionStrategy, Output, EventEmitter
 } from '@angular/core';

@Component({
  selector: 'ngx-charts-legend-entry',
  template: `
    <span 
      [title]="formattedLabel"
      tabindex="-1"
      (mouseenter)="activate.emit(formattedLabel)"
      (mouseleave)="deactivate.emit(formattedLabel)"
      (click)="select.emit(formattedLabel)">
      <span
        class="legend-label-color"
        [style.background-color]="color"
        (click)="toggle.emit(formattedLabel)">
      </span>
      <span class="legend-label-text">
        {{trimmedLabel}}
      </span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryComponent {

  @Input() color: string;
  @Input() label: any;
  @Input() formattedLabel: string;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

}
