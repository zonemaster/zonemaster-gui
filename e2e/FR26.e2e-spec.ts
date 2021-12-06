/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR26 - [Should be able to show a progress bar with a rough estimate of the total test progress]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.setLang('en');
  });

  it('should display progress bar',  async() => {
    await expect(element(by.css('.progress-bar')).isPresent()).toBe(false);
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('div button.launch')).click();
    await browser.wait(() => element(by.css('.progress-bar')).isPresent(), 120 * 1000);
    await expect(element(by.css('.progress-bar')).isPresent()).toBe(true);
    await expect(element(by.css('.progress-value')).getText()).toBe('0%');

  });
});
