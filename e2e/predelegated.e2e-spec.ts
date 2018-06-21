/**
 * Created by pamasse on 05/11/2017.
 */
import {protractor, by, browser, element } from 'protractor';

import { Utils } from './pages/app.utils';

describe('Zonemaster test predelegated', () => {
  const utils = new Utils();
  const EC = protractor.ExpectedConditions;
  beforeAll(() => {
    utils.goTo('preDelegatedDomainCheck');
  });

  it('should find a result for afNiC.Fr', () => {
    element(by.css('#domain_check_name')).sendKeys('afNiC.Fr');
    element(by.className('fetchDataFromParent'));
    browser.wait(EC.textToBePresentInElement(
      element.all(by.css('input[formControlName="ns"')).get(0)
    , 'ns1.nic.fr'), 5000);
    expect(element.all(by.css('input[formControlName="ns"')).count()).toBeGreaterThan(2);
    /*element(by.css('form.domain a')).click();
    browser.wait(EC.visibilityOf(
      element(by.css('.result'))
    ), 5000);
    expect(element(by.css('.badge.badge-secondary')).getText()).toBeGreaterThan(1);
    */
  });
});
