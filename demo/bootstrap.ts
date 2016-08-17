import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { App } from './app';
import { NgModule } from "@angular/core";
import { A2D3Module } from "../src/A2D3Module";

@NgModule({
  imports: [A2D3Module],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
