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
import { interpolate } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';

import rfdc from 'rfdc';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { IBoxModel } from '../models/chart-data.model';
import { IVector2D } from '../models/coordinates.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';

const cloneDeep = rfdc();

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
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.gradientStops = this.getGradient();
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
    this.boxPath = this.oldPath = this.getStartingPath();
    this.oldLineCoordinates = this.getStartingLineCoordinates();
    setTimeout(this.update.bind(this), 100);
  }

  updatePathEl(): void {
    const nodeBar = select(this.nativeElm).selectAll('.bar');
    const path = this.getPath();
    if (this.animations) {
      nodeBar
        .attr('d', this.oldPath)
        .transition()
        .ease(easeSinInOut)
        .duration(500)
        .attrTween('d', this.pathTween(path, 4));
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

  // TODO: Refactor into another .ts file if https://github.com/swimlane/ngx-charts/pull/1179 gets merged.
  pathTween(d1: string, precision: number) {
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const path0 = this;
      const path1 = this.cloneNode();
      path1.setAttribute('d', d1);
      const n0 = path0?.getTotalLength();
      const n1 = path1?.getTotalLength();
      // Uniform sampling of distance based on specified precision.
      const distances = [0];
      let i = 0;
      const dt = precision / Math.max(n0, n1);
      while (i < 1) {
        distances.push(i);
        i += dt;
      }
      distances.push(1);

      // Compute point-interpolators at each distance.
      const points = distances.map((t: number) => {
        const p0 = path0.getPointAtLength(t * n0);
        const p1 = path1.getPointAtLength(t * n1);
        return interpolate([p0.x, p0.y], [p1.x, p1.y]);
      });

      // 't': T is the fraction of time (between 0 and 1) since the transition began.
      return (t: any) => {
        return t < 1 ? 'M' + points.map((p: (t: number) => any[]) => p(t)).join('L') : d1;
      };
    };
  }

  getStartingPath(): string {
    if (!this.animations) {
      return this.getPath();
    }

    const radius = this.roundEdges ? 1 : 0;
    const { x, y } = this.lineCoordinates[2].v1;

    return roundedRect(x - this.width, y - 1, this.width, 2, radius, this.edges);
  }

  getPath(): string {
    const radius = this.getRadius();
    let path = '';

    path = roundedRect(this.x, this.y, this.width, this.height, Math.min(this.height, radius), this.edges);

    return path;
  }

  getStartingLineCoordinates(): LineCoordinates {
    if (!this.animations) {
      return [...this.lineCoordinates];
    }

    const lineCoordinates: LineCoordinates = cloneDeep(this.lineCoordinates);

    lineCoordinates[1].v1.y = lineCoordinates[1].v2.y = lineCoordinates[3].v1.y = lineCoordinates[3].v2.y = lineCoordinates[0].v1.y = lineCoordinates[0].v2.y =
      lineCoordinates[2].v1.y;

    return lineCoordinates;
  }

  getRadius(): number {
    let radius = 0;

    if (this.roundEdges && this.height > 5 && this.width > 5) {
      radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
    }

    return radius;
  }

  getGradient(): Gradient[] {
    return [
      {
        offset: 0,
        color: this.fill,
        opacity: this.getStartOpacity()
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
      }
    ];
  }

  getStartOpacity(): number {
    if (this.roundEdges) {
      return 0.2;
    } else {
      return 0.5;
    }
  }

  get edges(): boolean[] {
    let edges: [boolean, boolean, boolean, boolean] = [false, false, false, false];
    if (this.roundEdges) {
      edges = [true, true, true, true];
    }
    return edges;
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
