import {NgModule} from "@angular/core";
import {AxisLabel} from "./axis-label.component";
import {XAxis} from "./x-axis.component";
import {XAxisTicks} from "./x-axis-ticks.component";
import {YAxis} from "./y-axis.component";
import {YAxisTicks} from "./y-axis-ticks.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [BrowserModule],
  declarations: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks],
  exports: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks]
})
export class AxesModule {}
