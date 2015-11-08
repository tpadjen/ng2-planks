Error.stackTraceLimit = Infinity;

// Testing requirements
require('reflect-metadata');
require('angular2/core');
require('angular2/router');
require('angular2/http');
require('angular2/testing');
require('angular2/mock');

var browser_adapter = require('angular2/src/core/dom/browser_adapter');
browser_adapter.BrowserDomAdapter.makeCurrent();

require('./src/app/test/helper');

var context = require.context('./src/app', true, /\.spec\.ts$/);
context.keys().forEach(context);