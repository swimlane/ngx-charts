import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {Card} from "./Card";
import {CardSeries} from "./CardSeries";
import {NumberCard} from "./NumberCard";

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
