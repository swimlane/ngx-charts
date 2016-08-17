import {NgModule} from "@angular/core";
import {AxisLabel} from "./AxisLabel";
import {XAxis} from "./XAxis";
import {XAxisTicks} from "./XAxisTicks";
import {YAxis} from "./YAxis";
import {YAxisTicks} from "./YAxisTicks";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [BrowserModule],
  declarations: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks],
  exports: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks]
})
export class AxesModule {}
