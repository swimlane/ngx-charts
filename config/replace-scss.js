const replace = require("replace");
const fs = require('fs-extra')

/**
 * This replaces all .scss extensions with .css 
 */
replace({
  regex: '.scss',
  replacement: '.css',
  paths: ['./release'],
  recursive: true,
  silent: false
});
