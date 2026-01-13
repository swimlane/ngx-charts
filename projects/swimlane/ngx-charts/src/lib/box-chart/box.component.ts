import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { select, BaseType } from 'd3-selection';
import { easeSinInOut } from 'd3-ease';

import { id } from '../utils/id';
import { IBoxModel } from '../models/chart-data.model';
import { IVector2D } from '../models/coordinates.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';
import {
  getBoxRadius,
  getBoxPath,
  getBoxStartingPath,
  getBoxStartingLineCoordinates,
  getEdges,
  getGradient,
  pathTween
} from './box.helper';

type LineCoordinates = [IVector2D, IVector2D, IVector2D, IVector2D];

@Component({
  selector: 'g[ngx-charts-box]',
  template: `
    <svg:defs>
      <svg:g
        *ngIf="hasGradient"
        ngx-charts-svg-linear-gradient
        [orientation]="BarOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
      <svg:mask [attr.id]="maskLineId">
        <svg:g>
          <rect height="100%" width="100%" fill="white" fill-opacity="1" />
          <path class="bar" [attr.d]="boxPath" fill="black" fill-opacity="1" />
        </svg:g>
      </svg:mask>
    </svg:defs>
    <svg:g>
      <svg:path
        class="bar"
        role="img"
        tabIndex="-1"
        [class.active]="isActive"
        [class.hidden]="hideBar"
        [attr.d]="boxPath"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="boxStrokeWidth"
        [attr.aria-label]="ariaLabel"
        [attr.fill]="hasGradient ? gradientFill : fill"
        (click)="select.emit(data)"
      />
      <svg:line
        *ngFor="let line of lineCoordinates; let i = index"
        class="bar-line"
        [class.hidden]="hideBar"
        [attr.x1]="line.v1.x"
        [attr.y1]="line.v1.y"
        [attr.x2]="line.v2.x"
        [attr.y2]="line.v2.y"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="i === 2 ? medianLineWidth : whiskerStrokeWidth"
        [attr.mask]="i ? undefined : maskLine"
        fill="none"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class BoxComponent implements OnChanges {
  @Input() strokeColor: string;
  @Input() strokeWidth: number;
  @Input() fill: string;
  @Input() data: IBoxModel;
  @Input() width: number;
  @Input() height: number;
  @Input() x: number;
  @Input() y: number;
  @Input() lineCoordinates: LineCoordinates;
  @Input() roundEdges: boolean = true;
  @Input() gradient: boolean = false;
  @Input() gradientStops: Gradient[];
  @Input() offset: number = 0;
  @Input() isActive: boolean = false;
  @Input() animations: boolean = true;
  @Input() ariaLabel: string;
  @Input() noBarWhenZero: boolean = true;

  @Output() select: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() activate: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() deactivate: EventEmitter<IBoxModel> = new EventEmitter();

  BarOrientation = BarOrientation;

  nativeElm: any;

  // Path related properties.
  oldPath: string;
  boxPath: string;
  oldLineCoordinates: LineCoordinates;

  // Color related properties.
  gradientId: string;
  gradientFill: string;
  initialized: boolean = false;
  hasGradient: boolean = false;
  hideBar: boolean = false;

  /** Mask Path to cut the line on the box part. */
  maskLine: string;
  /** Mask Path Id to keep track of the mask element */
  maskLineId: string;

  boxStrokeWidth: number;
  whiskerStrokeWidth: number;
  medianLineWidth: number;

  constructor(element: ElementRef, protected cd: ChangeDetectorRef) {
    this.nativeElm = element.nativeElement;
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
    this.boxStrokeWidth = Math.max(this.strokeWidth, 1);
    this.whiskerStrokeWidth = Math.max(this.strokeWidth / 2, 1);
    this.medianLineWidth = 1.5 * this.strokeWidth;

    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(#${this.gradientId})`;

    if (this.gradient) {
      this.gradientStops = getGradient(this.fill, this.roundEdges);
      this.hasGradient = true;
    } else {
      this.hasGradient = false;
    }

    this.updateLineEl();
    this.updatePathEl();
    this.checkToHideBar();
    this.maskLineId = 'mask' + id().toString();
    this.maskLine = `url(#${this.maskLineId})`;

    if (this.cd) {
      this.cd.markForCheck();
    }
  }

  loadAnimation(): void {
    this.boxPath = this.oldPath = this.animations
      ? getBoxStartingPath(this.width, this.lineCoordinates, this.roundEdges, getEdges(this.roundEdges))
      : getBoxPath(
          this.x,
          this.y,
          this.width,
          this.height,
          getBoxRadius(this.roundEdges, this.height, this.width),
          getEdges(this.roundEdges)
        );
    this.oldLineCoordinates = this.animations
      ? getBoxStartingLineCoordinates(this.lineCoordinates)
      : [...this.lineCoordinates];
    setTimeout(this.update.bind(this), 100);
  }

  updatePathEl(): void {
    const nodeBar = select(this.nativeElm).selectAll('.bar');
    const path = getBoxPath(
      this.x,
      this.y,
      this.width,
      this.height,
      getBoxRadius(this.roundEdges, this.height, this.width),
      getEdges(this.roundEdges)
    );
    if (this.animations) {
      nodeBar
        .attr('d', this.oldPath)
        .transition()
        .ease(easeSinInOut)
        .duration(500)
        .attrTween('d', pathTween(path, 4));
    } else {
      nodeBar.attr('d', path);
    }
    this.oldPath = path;
  }

  updateLineEl(): void {
    const lineEl = select(this.nativeElm).selectAll('.bar-line');
    const lineCoordinates = this.lineCoordinates;
    const oldLineCoordinates = this.oldLineCoordinates;
    if (this.animations) {
      lineEl
        .attr('x1', (_, index) => oldLineCoordinates[index].v1.x)
        .attr('y1', (_, index) => oldLineCoordinates[index].v1.y)
        .attr('x2', (_, index) => oldLineCoordinates[index].v2.x)
        .attr('y2', (_, index) => oldLineCoordinates[index].v2.y)
        .transition()
        .ease(easeSinInOut)
        .duration(500)
        .attr('x1', (_, index) => lineCoordinates[index].v1.x)
        .attr('y1', (_, index) => lineCoordinates[index].v1.y)
        .attr('x2', (_, index) => lineCoordinates[index].v2.x)
        .attr('y2', (_, index) => lineCoordinates[index].v2.y);
    } else {
      lineEl
        .attr('x1', (_, index) => lineCoordinates[index].v1.x)
        .attr('y1', (_, index) => lineCoordinates[index].v1.y)
        .attr('x2', (_, index) => lineCoordinates[index].v2.x)
        .attr('y2', (_, index) => lineCoordinates[index].v2.y);
    }
    this.oldLineCoordinates = [...lineCoordinates];
  }

  /**
   * See [D3 Selections](https://www.d3indepth.com/selections/)
   * @param d The joined data.
   * @param index The index of the element within the selection
   * @param node The node element (Line).
   */
  lineTween(attr: string, d: any, index: number, node: BaseType[] | ArrayLike<BaseType>) {
    const nodeLineEl = node[index] as SVGLineElement;
    return nodeLineEl[attr].baseVal.value;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  private checkToHideBar(): void {
    this.hideBar = this.noBarWhenZero && this.height === 0;
  }
}
