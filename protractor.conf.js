exports.config = {
  baseUrl: 'http://localhost:8080/build/dev',

  allScriptsTimeout: 11000,

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showTiming: false
  },

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // args: ['show-fps-counter=true']
    }
  },

  specs: ['test/**/*.e2e.js'],

  directConnect: true,

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  // useAllAngular2AppRoots: true
  rootElement: 'app'

}