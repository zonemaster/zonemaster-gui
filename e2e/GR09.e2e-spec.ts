import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR08 - [The advanced view should look the same in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    element(by.css('.switch')).click();
  });

  it('should match the domain page with options on', () => {
    expect(browser.imageComparison.checkFullPageScreen('domain_with_options')).toBeLessThan(5);
  });
  it('should not match the domain page with options off', () => {
    element(by.css('.switch')).click(); // switch off options
    expect(browser.imageComparison.checkFullPageScreen('domain_with_options')).toBeGreaterThan(5);
  });
});
