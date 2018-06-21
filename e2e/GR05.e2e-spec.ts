import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR05 - [The simple view should look the same in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
  });

  it('should match the domain page', () => {
    expect(browser.protractorImageComparison.checkScreen('domain')).toEqual(0);
  });
  it('should not match the domain page', () => {
    element(by.css('.switch')).click();
    expect(browser.protractorImageComparison.checkScreen('domain')).not.toEqual(0);
  });
});
