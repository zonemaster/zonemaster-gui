/**
 * Created by pamasse on 05/11/2017.
 */
import {$, protractor, by, browser, element } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR23 - [Provide a list of previous runs for the domain and should be paginated]', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goTo('result/2005cf23e9fb24b6');
    utils.setLang('en');
  });

  it('should display previous tests',  async() => {
    await browser.sleep(1000);
    await browser.wait(() => element(by.css('a.btn.history')).isPresent(), 120 * 1000);

    await expect(element(by.css('a.btn.history')).getText()).toEqual('History');
    await element(by.css('a.btn.history')).click();
    await browser.sleep(1000);

    expect(await $('ngb-modal-window').isPresent()).toBe(true);

    await expect(element.all(by.css('.list-group-item.list-group-item-action.list-group-item-success')).count())
      .toEqual(9);
    await expect(element.all(by.css('.list-group-item.list-group-item-action.list-group-item-danger')).count())
      .toEqual(1);
    await expect(element.all(by.css('ul.pagination > li')).count()).toEqual(7);

  });
});





