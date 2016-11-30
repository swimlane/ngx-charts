import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { CardComponent } from "./card.component";
import { CardSeriesComponent } from "./card-series.component";
import { NumberCardComponent } from "./number-card.component";

export { CardComponent, CardSeriesComponent, NumberCardComponent };

@NgModule({
  imports: [CommonModule],
  declarations: [
    CardComponent,
    CardSeriesComponent,
    NumberCardComponent
  ],
  exports: [
    CardComponent,
    CardSeriesComponent,
    NumberCardComponent
  ]
})
export class NumberCardModule {}
