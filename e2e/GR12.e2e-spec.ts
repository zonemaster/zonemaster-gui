import { by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test GR12 - [The undelegated view should look the same in latest version of different browsers]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goTo('preDelegatedDomainCheck');
  });

  it('should match the preDelegatedDomainCheck page', () => {
    expect(browser.protractorImageComparison.checkScreen('preDelegatedDomainCheck')).toBeLessThan(1);
  });
  it('should not match the preDelegatedDomainCheck page', () => {
    element(by.css('.switch')).click();
    expect(browser.protractorImageComparison.checkScreen('preDelegatedDomainCheck')).not.toBeLessThan(1);
  });

});
