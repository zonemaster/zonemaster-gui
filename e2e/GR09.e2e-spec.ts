import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR09 - [The advanced view should look the same in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    element(by.css('.switch')).click();
  });

  it('should match the domain page with advanced options on', () => {
    expect(browser.protractorImageComparison.checkScreen('domain.advanced_options')).toBeLessThan(1);
  });
  it('should not match the domain page with advanced options off', () => {
    element(by.css('.switch')).click();
    expect(browser.protractorImageComparison.checkScreen('domain.advanced_options')).not.toBeLessThan(1);
  });
});
