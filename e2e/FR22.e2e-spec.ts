/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR22 - [Provide the possibility to see more information about encountered errors ' +
  'within the simple view]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goToHome();
    utils.setLang('en');
  });

  it('should display full messages',  async() => {
    await expect(element.all(by.css('progress-result')).isPresent()).toBe(false);
    await element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    await element(by.css('div button.launch')).click();

    await browser.wait(() => element(by.css('#collapsed_module_1')).isPresent(), 120 * 1000);

    await expect(element(by.css('#collapsed_module_1')).getText()).toEqual('BASIC');
    await expect(element.all(by.css('#collapsed_module_1 > tr.show')).count()).toBe(0);
    await element(by.css('#collapsed_module_1 > tr:nth-child(1)')).click();
    await expect(element.all(by.css('#collapsed_module_1 > tr.show')).count()).toEqual(14);
  });
});





