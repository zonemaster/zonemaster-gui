// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const protractorImageComparison = require('protractor-image-comparison');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [{
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--disable-web-security', '--user-data-dir=~/.e2e-chrome-profile']
    }
  }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: false } }));
    // protractor-image-comparison module
    browser.protractorImageComparison = new protractorImageComparison(
      {
        autoSaveBaseline: true,
        baselineFolder: './e2e/compare_image/baseline/',
        screenshotPath: './e2e/compare_image/actual_screenshots/',
        debug: true,
        disableCSSAnimation: true,
        nativeWebScreenshot: true,
        blockOutStatusBar: true,
        ignoreColors: true
      }
    );
  }
};


