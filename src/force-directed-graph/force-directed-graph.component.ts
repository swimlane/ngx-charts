import { Chart } from '../common/charts/chart.component';
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import d3 from '../d3';
import { colorHelper } from '../utils/color-sets';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'force-directed-graph',
  template: `
    <chart
      [legend]="legend"
      (legendLabelClick)="legendLabelClick.emit($event)"
      [view]="[width, height]"
      [colors]="colors"
      [legendData]="seriesDomain">
      <svg:g [attr.transform]="transform" class="force-directed-graph chart">
        <svg:g class="links">
          <svg:g *ngFor="let link of links; trackBy:trackLinkBy">
            <template *ngIf="linkTemplate"
              [ngTemplateOutlet]="linkTemplate"
              [ngOutletContext]="{ $implicit: link }">
            </template>
            <svg:line *ngIf="!linkTemplate"
              strokeWidth="1" class="edge"
              [attr.x1]="link.source.x"
              [attr.y1]="link.source.y"
              [attr.x2]="link.target.x"
              [attr.y2]="link.target.y"
            />
          </svg:g>
        </svg:g>
        <svg:g class="nodes">
          <svg:g *ngFor="let node of nodes; trackBy:trackNodeBy"
            [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
            [attr.fill]="colors(groupResultsBy(node))"
            [attr.stroke]="colors(groupResultsBy(node))"
            (mousedown)="onDragStart(node, $event)"
            (click)="click($event, node)"
            swui-tooltip
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="node.value">
            <template *ngIf="nodeTemplate"
              [ngTemplateOutlet]="nodeTemplate"
              [ngOutletContext]="{ $implicit: node }">
            </template>
            <svg:circle *ngIf="!nodeTemplate" r="5" />
          </svg:g>
        </svg:g>
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceDirectedGraph extends BaseChart implements OnChanges {

  @Input() force = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("collide", d3.forceCollide(5))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  @Input() forceLink = d3.forceLink().id(node => node.value);
  @Input() groupResultsBy: (node: any) => string = node => node.value;
  @Input() legend: boolean;
  @Input() nodes: any[] = [];
  @Input() links: { source: any, target: any }[] = [];
  @Input() scheme;
  @Input() view;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();
  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();

  @ContentChild('linkTemplate') linkTemplate: TemplateRef<any>;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ViewChild(Chart, { read: ElementRef }) chart: ElementRef;

  colors: Function;
  dims: ViewDimensions;
  draggingNode: any;
  draggingStart: { x: number, y: number };
  margin = [0, 0, 0, 0];
  results = [];
  seriesDomain: any;
  transform: string;

  constructor(private element: ElementRef, private cd: ChangeDetectorRef, zone: NgZone) {
    super(element, zone, cd);
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();

    this.zone.run(() => {
      // center graph
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin,
        showLegend: this.legend,
        columns: 10
      });

      this.seriesDomain = this.getSeriesDomain();
      this.setColors();

      this.transform = `translate(${ this.dims.xOffset + this.dims.width / 2 }, ${ this.margin[0] + this.dims.height / 2 })`;
      if(this.force) {
        this.force.nodes(this.nodes)
          .force("link", this.forceLink.links(this.links))
          .alpha(0.5).restart();
      }
    });
  }

  click($event, node) {
    this.clickHandler.emit(node);
  }

  getSeriesDomain() {
    return this.nodes.map(d => this.groupResultsBy(d))
      .reduce((nodes: any[], node): any[] => nodes.includes(node) ? nodes : nodes.concat([node]), [])
      .sort();
  }

  trackLinkBy(index, link) {
    return link.index;
  }

  trackNodeBy(index, node) {
    return node.value;
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
  }

  // Easier to use Angular2 event management than use d3.drag
  onDragStart(node, $event: MouseEvent) {
    this.force.alphaTarget(0.3).restart();
    this.draggingNode = node;
    this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
    this.draggingNode.fx = $event.x - this.draggingStart.x;
    this.draggingNode.fy = $event.y - this.draggingStart.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag($event: MouseEvent) {
    if (!this.draggingNode) {
      return;
    }
    this.draggingNode.fx = $event.x - this.draggingStart.x;
    this.draggingNode.fy = $event.y - this.draggingStart.y;
  }

  @HostListener('document:mouseup')
  onDragEnd(node, $event: MouseEvent) {
    if (!this.draggingNode) {
      return;
    }
    this.force.alphaTarget(0);
    this.draggingNode.fx = undefined;
    this.draggingNode.fy = undefined;
    this.draggingNode = undefined;
  }
}
