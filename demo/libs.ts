import 'core-js';
import 'zone.js/dist/zone';
import 'web-animations-js';

import { enableProdMode } from '@angular/core';

if(IS_PRODUCTION) {
  enableProdMode();
}

if(IS_DEV) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
