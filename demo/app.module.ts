import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { SparklineComponent } from './sparkline/sparkline.component';
import { NgxChartsModule } from '../src';
import { NgxUIModule } from '@swimlane/ngx-ui';

@NgModule({
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseLocation
    }
  ],
  imports: [NgxChartsModule, BrowserModule, BrowserAnimationsModule, FormsModule, NgxUIModule],
  declarations: [AppComponent, SparklineComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseLocation() {
    const paths: string[] = location.pathname.split('/').splice(1, 1);
    const basePath: string = (paths && paths[0]) || '';
    return '/' + basePath;
}
