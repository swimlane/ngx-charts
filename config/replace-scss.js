const replace = require("replace");

/**
 * This replaces all .scss extensions with .css 
 */
replace({
  regex: '.scss',
  replacement: '.css',
  paths: ['./build'],
  recursive: true,
  silent: false
});
