import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
import { EmojiEvent } from 'ngx-emoji-picker';

@Component({
  selector: 'ngx-charts-legend-entry',
  template: `
    <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" [ngStyle]="getShapeStyle(legendLabelStyle)" (click)="toggle.emit(formattedLabel)">
        <ng-container *ngIf = "legendLabelStyle === 'emoji'">
          <a
            class="emoji-icon"
            href="javascript:void(0)"
            (click)="toggled = !toggled"
            [(emojiPickerIf)]="toggled"
            [emojiPickerDirection]="'top'"
            (emojiPickerSelect)="handleSelection($event)"
            >{{ selectedEmoji }}</a>
        </ng-container>
      </span>
      <span class="legend-label-text">
        {{ trimmedLabel }}
      </span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryComponent {
  @Input() color: string;
  @Input() label: string;
  @Input() formattedLabel: string;
  @Input() isActive: boolean = false;
  @Input() legendLabelStyle: string = "square";

  @Output() select: EventEmitter<string> = new EventEmitter();
  @Output() activate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() deactivate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() toggle: EventEmitter<string> = new EventEmitter();

  toggled: boolean = false;
  selectedEmoji: string = {char: "😃", label: "smiley"}.char;
  $event: EmojiEvent = {char: "😃", label: "smiley"};

  handleSelection(event) {
    console.log("handle Selection");
    this.selectedEmoji = event.char;
  }
  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit({ name: this.label });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit({ name: this.label });
  }

  getShapeStyle(legendLabelStyle: string): object {
    if (legendLabelStyle === 'circle') {
      return { 'border-radius': '50%' };
    } else if (legendLabelStyle === 'diamond') {
      return { 'transform': 'rotate(45deg)' };
    } else if (legendLabelStyle === 'ellipse') {
      return { 'border-radius': '25% 100% / 25% 100%', 'transform': 'rotate(-45deg)' };
    } else if (legendLabelStyle === 'emoji') {
      return { 'board-radius': '0px', 'background-color' : 'transparent'};
    } else {
      return {}; // Square, default
    }
  }
}
