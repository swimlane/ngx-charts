import {NgModule} from "@angular/core";
import {Chart} from "./charts/Chart";
import {Legend} from "./Legend";
import {ScaleLegend} from "./ScaleLegend";
import {AxesModule} from "./axes/AxesModule";
import {Popover} from "./popover/PopoverComponent";
import {CircleSeries} from "./CircleSeries";
import {Circle} from "./Circle";
import {GridPanel} from "./GridPanel";
import {GridPanelSeries} from "./GridPanelSeries";
import {SvgLinearGradient} from "./SvgLinearGradient";
import {SvgRadialGradient} from "./SvgRadialGradient";
import {Timeline} from "./Timeline";
import {BrowserModule} from "@angular/platform-browser";
import {Area} from "./Area";

@NgModule({
  imports: [
    BrowserModule,
    AxesModule
  ],
  declarations: [
    Area,
    Chart,
    Legend,
    ScaleLegend,
    Circle,
    Popover,
    CircleSeries,
    GridPanel,
    GridPanelSeries,
    SvgLinearGradient,
    SvgRadialGradient,
    Timeline
  ],
  exports: [
    AxesModule,
    Area,
    BrowserModule,
    Chart,
    Legend,
    ScaleLegend,
    Circle,
    Popover,
    CircleSeries,
    GridPanel,
    GridPanelSeries,
    SvgLinearGradient,
    SvgRadialGradient,
    Timeline
  ]
})
export class CommonModule {}
