import { NgModule } from '@angular/core';
import { GeoMapComponent } from '@swimlane/ngx-charts/geo-map/geo-map.component';
import { ChartCommonModule } from '@swimlane/ngx-charts/common/chart-common.module';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [GeoMapComponent],
  exports: [GeoMapComponent]
})
export class GeoMapModule {}
