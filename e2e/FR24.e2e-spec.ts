/**
 * Created by pamasse on 05/11/2017.
 */
import {$, protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR24 - [The list of previous runs should contain links to the previous tests]', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goTo('result/2005cf23e9fb24b6');
    utils.setLang('en');
  });

  it('should display previous run link',  async() => {
    await browser.sleep(1000);
    await browser.wait(() => element(by.css('a.btn.history')).isPresent(), 120 * 1000);

    await expect(element(by.css('a.btn.history')).getText()).toEqual('History');
    await element(by.css('a.btn.history')).click();
    await browser.sleep(1000);

    expect(await $('ngb-modal-window').isPresent()).toBe(true);

    await expect(element.all(by.css('.list-group-item.list-group-item-action.list-group-item-success a')).get(0)
      .getAttribute('href')).toEqual(browser.baseUrl + 'result/84bfac6ae74d0e62');
    await expect(element.all(by.css('.list-group-item.list-group-item-action.list-group-item-danger a')).get(0)
      .getAttribute('href')).toEqual(browser.baseUrl + 'result/293f626579274f18');

  });
});
