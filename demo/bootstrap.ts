import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { App } from './app';
import { A2D3Module } from "../src/A2D3Module";

@NgModule({
  imports: [A2D3Module, BrowserModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

 document.addEventListener('DOMContentLoaded', () => {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
 });
