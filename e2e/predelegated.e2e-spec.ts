/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster predelegated test', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
    utils.activeOptions();
  });

  it('should test for afNiC.Fr and find at least one message', async () => {
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('button.fetchDataFromParent')).click();
    await browser.sleep(60 * 1000);
    //  await browser.wait(() => expect(element.all(by.css('input[formControlName="ns"]')).count()).toBeGreaterThan(2), 120 * 1000);
    await expect(element.all(by.css('input[formControlName="ns"]')).get(0).getAttribute('value')).toEqual('ns1.nic.fr');
    await element(by.css('div button.launch')).click();

    await browser.wait(() => element(by.css('div.result.container')).isPresent(), 120 * 1000);
    await expect(element(by.css('a.text-white > span.badge.badge-secondary:nth-child(1)')).getText()).toBeGreaterThanOrEqual(0);

  });
});
