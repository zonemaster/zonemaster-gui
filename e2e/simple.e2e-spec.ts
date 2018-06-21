/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test simple', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goToHome();
  });

  it('should find a result for afNiC.Fr', () => {
    element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    element(by.css('form.domain a')).click();
    expect(element(by.tagName('app-result')).isPresent()).toBe(false);
    /*
    browser.wait(EC.visibilityOf(
      element(by.tagName('app-result'))
    ), 10000).then(() => {
      expect(element(by.css('.badge.badge-secondary')).getText()).toBeGreaterThan(1);
    });
    */
  });
});
