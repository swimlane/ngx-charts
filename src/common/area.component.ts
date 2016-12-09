import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { id } from "../utils/id";
import d3 from '../d3';

@Component({
  selector: 'g[area]',
  template: `
    <svg:defs *ngIf="gradient">
      <svg:g svgLinearGradient
        [color]="fill"
        orientation="vertical"
        [name]="gradientId"
        [startOpacity]="startOpacity"
        [endOpacity]="endOpacity"
      />
    </svg:defs>
    <svg:path
      class="area"
      [attr.d]="areaPath"
      [attr.fill]="gradient ? gradientFill : fill"
      [style.opacity]="opacity"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaComponent implements OnChanges {

  @Input() data;
  @Input() path;
  @Input() startingPath;
  @Input() fill;
  @Input() opacity = 1;
  @Input() startOpacity = 0.5;
  @Input() endOpacity = 1;
  @Input() activeLabel;
  @Input() gradient: boolean = false;

  @Output() select = new EventEmitter();

  element: HTMLElement;
  gradientId: string;
  gradientFill: string;
  areaPath: string;
  initialized: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.loadAnimation();
      this.initialized = true;
    } else {
      this.update();
    }
  }

  update(): void {
    let pageUrl = window.location.href;
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;

    this.animateToCurrentForm();
  }

  loadAnimation(): void {
    this.areaPath = this.startingPath;
    setTimeout(this.update.bind(this), 100);
  }

  animateToCurrentForm(): void {
    let node = d3.select(this.element).select('.area');

    node.transition().duration(750)
      .attr('d', this.path);
  }
}
