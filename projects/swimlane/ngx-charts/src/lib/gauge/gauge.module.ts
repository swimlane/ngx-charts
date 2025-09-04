import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { LinearGaugeComponent } from './linear-gauge.component';
import { GaugeComponent } from './gauge.component';
import { GaugeArcComponent } from './gauge-arc.component';
import { GaugeAxisComponent } from './gauge-axis.component';
import { PieChartModule } from '../pie-chart/pie-chart.module';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import { PercentGaugeComponent } from './percent-gauge/percent-gauge.component';

@NgModule({
  imports: [ChartCommonModule, PieChartModule, BarChartModule],
  declarations: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent, PercentGaugeComponent],
  exports: [LinearGaugeComponent, GaugeComponent, GaugeArcComponent, GaugeAxisComponent, PercentGaugeComponent]
})
export class GaugeModule {}
