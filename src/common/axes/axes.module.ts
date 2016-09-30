import {NgModule} from "@angular/core";
import {AxisLabel} from "./axis-label.component";
import {XAxis} from "./x-axis.component";
import {XAxisTicks} from "./x-axis-ticks.component";
import {YAxis} from "./y-axis.component";
import {YAxisTicks} from "./y-axis-ticks.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks],
  exports: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks]
})
export class AxesModule {}
