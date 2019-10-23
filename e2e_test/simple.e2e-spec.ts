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

  it('should find a result for afNiC.Fr', async() => {
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await expect(element(by.css('div.result.container')).isPresent()).toBe(false);
    await element(by.css('div button.launch')).click();

    await browser.wait(() => element(by.css('div.result.container')).isPresent(), 120 * 1000);
    await expect(element(by.css('.badge.badge-secondary')).getText()).toBeGreaterThan(1);

  });
});
