import {NgModule} from "@angular/core";
import {CommonModule} from "../common/common.module";
import {Card} from "./card.component";
import {CardSeries} from "./card-series.component";
import {NumberCard} from "./number-card.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    Card,
    CardSeries,
    NumberCard
  ],
  exports: [
    Card,
    CardSeries,
    NumberCard
  ]
})
export class NumberCardModule {}
