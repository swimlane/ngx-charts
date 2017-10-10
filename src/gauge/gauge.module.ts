import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import { RadialGaugeComponent } from './radial-gauge/radial-gauge.component';

export { GaugeComponent, GaugeArcComponent, GaugeAxisComponent, 
  RadialGaugeComponent, LinearGaugeComponent };

@NgModule({
  imports: [ChartCommonModule, PieChartModule, BarChartModule],
  declarations: [
    LinearGaugeComponent,
    GaugeComponent,
    GaugeArcComponent,
    GaugeAxisComponent,
    RadialGaugeComponent
],
  exports: [
    LinearGaugeComponent,
    GaugeComponent,
    GaugeArcComponent,
    GaugeAxisComponent,
    RadialGaugeComponent
  ]
})
export class GaugeModule {}
