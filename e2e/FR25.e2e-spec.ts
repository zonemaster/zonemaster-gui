/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR25 - [Should be able to export the result in multiple formats (HTML, CSV, JSON, TEXT)]', () => {
  const utils = new Utils();
  beforeAll(() => {
    utils.goTo('result/2005cf23e9fb24b6');
    utils.setLang('en');
  });

  it('should have an export button',  async() => {
    await browser.wait(() => element(by.css('button.btn.export')).isPresent(), 120 * 1000);

    await expect(element(by.css('button.btn.export')).getText()).toEqual('Export');
  });

  it('should open a modal and contains for export possibilities (HTML, CSV, HTML, TEXT)', async() => {
    await element(by.css('button.btn.export')).click();
    const box = element(by.css('button.btn.export + div.show'));
    await browser.wait(() => box.isDisplayed(), 10 * 1000);

    await expect(element.all(by.css('button.btn.export + div.show button.btn')).count()).toEqual(4);
    await expect(element.all(by.css('button.btn.export + div.show button.btn')).get(0).getText()).toEqual('JSON');
    await expect(element.all(by.css('button.btn.export + div.show button.btn')).get(1).getText()).toEqual('CSV');
    await expect(element.all(by.css('button.btn.export + div.show button.btn')).get(2).getText()).toEqual('HTML');
    await expect(element.all(by.css('button.btn.export + div.show button.btn')).get(3).getText()).toEqual('TEXT');
  });
});





