/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR19 - [The GUI should be able to run the test with at least one name server as input]', () => {
  const utils = new Utils();
  beforeEach(() => {
    utils.goTo('faq');
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should NOT display progress bar when we add a NS ip',  async() => {
    await expect(element.all(by.css('.progress-result')).isPresent()).toBe(false);
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('input[formControlName="ip"]')).sendKeys('192.134.4.1');
    await element(by.css('div button.launch')).click();
    try {
      await browser.wait(() => element(by.css('.progress-bar')).isPresent(), 2 * 1000);
    } catch {}
    finally   {
      await expect(element.all(by.css('.progress-result')).isPresent()).toBe(false);
    }
  });

  it('should display progress bar when we add a NS name',  async() => {
    await expect(element.all(by.css('.progress-result')).isPresent()).toBe(false);
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('input[formControlName="ns"]')).sendKeys('ns1.nic.fr');
    await element(by.css('div button.launch')).click();
    await browser.wait(() => element(by.css('.progress-bar')).isPresent(), 2 * 1000);
    await expect(element.all(by.css('.progress-result')).isPresent()).toBe(true);
  });
});
