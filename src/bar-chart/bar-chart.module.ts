import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BarComponent } from './bar.component';
import { BarHorizontalComponent } from './bar-horizontal.component';
import { BarHorizontal2DComponent } from './bar-horizontal-2d.component';
import { BarHorizontalNormalizedComponent } from './bar-horizontal-normalized.component';
import { BarHorizontalStackedComponent } from './bar-horizontal-stacked.component';
import { BarVerticalComponent } from './bar-vertical.component';
import { BarVertical2DComponent } from './bar-vertical-2d.component';
import { BarVerticalNormalizedComponent } from './bar-vertical-normalized.component';
import { BarVerticalStackedComponent } from './bar-vertical-stacked.component';
import { SeriesHorizontal } from './series-horizontal.component';
import { SeriesVerticalComponent } from './series-vertical.component';
import { BarLabelComponent } from './bar-label.component';

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    BarComponent,
    BarHorizontalComponent,
    BarHorizontal2DComponent,
    BarHorizontalNormalizedComponent,
    BarHorizontalStackedComponent,
    BarVerticalComponent,
    BarVertical2DComponent,
    BarVerticalNormalizedComponent,
    BarVerticalStackedComponent,
    BarLabelComponent,
    SeriesHorizontal,
    SeriesVerticalComponent
  ],
  exports: [
    BarComponent,
    BarHorizontalComponent,
    BarHorizontal2DComponent,
    BarHorizontalNormalizedComponent,
    BarHorizontalStackedComponent,
    BarVerticalComponent,
    BarVertical2DComponent,
    BarVerticalNormalizedComponent,
    BarVerticalStackedComponent,
    BarLabelComponent,
    SeriesHorizontal,
    SeriesVerticalComponent    
  ]
})
export class BarChartModule {}
