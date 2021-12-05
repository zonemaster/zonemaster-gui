import { by, browser, element, ExpectedConditions } from 'protractor';

import { Utils } from './utils/app.utils';

describe('Zonemaster test FR10 - [On launching the URL opens with a default simple view]', () => {
  const utils = new Utils();
  beforeAll(async () => {
    await utils.goToHome();
    await utils.clearBrowserCache();
  });
  it('should have [Domain name] label visible', async () => {
    await browser.wait(() => ExpectedConditions.presenceOf(element(by.xpath('//h1[.="Domain name"]'))), 5 * 1000);
  });
  it('should have [Options] label visible and NOT selected', () => {
    expect(element(by.xpath('//label[contains(., "Options")]')).isPresent()).toBe(true);
    expect(element(by.css('.switch')).isSelected()).toBe(false);
  });

  it('should have [Nameservers label] NOT visible', () => {
    expect(element(by.xpath('//legend[contains(., "Nameservers")]')).isPresent()).toBe(false);
  });
  it('should have [DS_RECORDS] NOT visible', () => {
    expect(element(by.xpath('//legend[contains(., "DS_RECORDS")]')).isPresent()).toBe(false);
  });
});
