import { NgModule } from '@angular/core';
import { GeoMapComponent } from '@swimlane/ngx-charts/geo-map/geo-map.component';
import { ChartCommonModule } from '@swimlane/ngx-charts/common/chart-common.module';
import {PieChartModule} from "@swimlane/ngx-charts/pie-chart/pie-chart.module";

@NgModule({
  imports: [ChartCommonModule, PieChartModule],
  declarations: [GeoMapComponent],
  exports: [GeoMapComponent]
})
export class GeoMapModule {}
