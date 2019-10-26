// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { join } = require('path');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [ /*
    {
      'browserName': 'firefox',

      'moz:firefoxOptions': {
        args: [
          '-headless',
          '--width=1920',
          '--height=1080'
        ]
      }
    }, */
    {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        '--headless',
        '--disable-web-security',
        '--window-size=1920,1080'
      ]
    }
  }],
  directConnect: true,
  baseUrl: 'http://localhost:4201/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 121*1000,
    print: function() {}
  },
   plugins: [
    {
      package: 'protractor-image-comparison',
      options: {
        autoSaveBaseline: true,
        baselineFolder: join(process.cwd(), 'e2e/baseline/'),
        screenshotPath: join(process.cwd(), '.tmp/'),
        debug: true,
        disableCSSAnimation: true,
        nativeWebScreenshot: true,
        blockOutStatusBar: true,
        savePerInstance: true
      }
    }
  ],
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: false } }));
    browser.ignoreSynchronization = true
  }
};


