import 'core-js';
import 'zone.js/dist/zone';
// import 'ts-helpers';

// angular
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import '@angular/platform-browser-dynamic';
import '@angular/common';

// externals
import '../src/d3';

if(IS_PRODUCTION) {
  disableDebugTools();
  enableProdMode();
}

if(IS_DEV) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
